import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { connectMongo } from "@/lib/mongo";
import Order, { ORDER_STATUSES, PAYMENT_STATUSES } from "@/models/Order";
import { ok, fail, isId, readJson } from "@/lib/api";
import { restoreStock } from "@/lib/orderHelpers";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid order id.");
  try {
    await connectMongo();
    const order = await Order.findById(id).lean();
    if (!order) return fail("Order not found.", 404);
    return ok({ order });
  } catch (e) {
    console.error(e);
    return fail("Could not load order.", 500);
  }
}

// ADMIN: status / paymentStatus / trackingId update
export async function PATCH(req, { params }) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-order-write", limit: 300, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid order id.");
  const body = await readJson(req);
  if (!body || typeof body !== "object") return fail("Invalid request.");

  try {
    await connectMongo();
    const order = await Order.findById(id);
    if (!order) return fail("Order not found.", 404);

    const wasCancelled = order.status === "Cancelled";
    let cancelNow = false;

    if (body.status !== undefined) {
      if (!ORDER_STATUSES.includes(body.status)) return fail("Invalid status.");
      // Cancelled order wapas active nahi hota (stock pehle hi wapas ja chuka hai)
      if (wasCancelled && body.status !== "Cancelled") return fail("A cancelled order cannot be reopened. Ask the customer to place a new order.", 409);
      cancelNow = !wasCancelled && body.status === "Cancelled";
      if (!cancelNow) order.status = body.status;
      // COD: deliver hote hi paisa mil gaya
      if (body.status === "Delivered" && order.paymentMethod === "cod" && order.paymentStatus === "pending") order.paymentStatus = "paid";
    }
    if (body.paymentStatus !== undefined) {
      if (!PAYMENT_STATUSES.includes(body.paymentStatus)) return fail("Invalid payment status.");
      order.paymentStatus = body.paymentStatus;
    }
    if (body.trackingId !== undefined) order.trackingId = String(body.trackingId).trim().slice(0, 100);

    // Cancel atomically: agar customer ne usi waqt cancel kar diya ho to stock dobara wapas nahi jaayega
    if (cancelNow) {
      const r = await Order.updateOne(
        { _id: order._id, status: { $ne: "Cancelled" } },
        { $set: { status: "Cancelled", cancelledAt: new Date() } }
      );
      if (r.modifiedCount === 1) await restoreStock(order.items);
    }

    // Baaki fields (status Cancelled wale path me status ko dobara overwrite nahi karte)
    if (cancelNow) {
      const fresh = await Order.findById(order._id);
      if (order.isModified("paymentStatus") || order.isModified("trackingId")) {
        fresh.paymentStatus = order.paymentStatus;
        fresh.trackingId = order.trackingId;
      }
      if (fresh.paymentStatus === "paid") fresh.paymentStatus = "refunded";
      await fresh.save();
      return ok({ order: fresh });
    }

    await order.save();
    return ok({ order });
  } catch (e) {
    console.error("PATCH /api/admin/orders/[id]", e?.name, e?.message);
    return fail("Could not update order.", 500);
  }
}


// ADMIN: order delete
// Processing/Shipped order delete hone par stock wapas jaata hai (Cancelled me pehle hi gaya hai, Delivered me ja chuka hai)
export async function DELETE(req, { params }) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-order-write", limit: 300, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid order id.");

  try {
    await connectMongo();
    // Atomic: delete wahi karega jo order ko pehle nikaal le, isliye stock do baar wapas nahi jaata
    const order = await Order.findOneAndDelete({ _id: id });
    if (!order) return fail("Order not found.", 404);
    if (order.status === "Processing" || order.status === "Shipped") {
      await restoreStock(order.items);
    }
    return ok({ message: "Order deleted." });
  } catch (e) {
    console.error("DELETE /api/admin/orders/[id]", e?.name, e?.message);
    return fail("Could not delete order.", 500);
  }
}
