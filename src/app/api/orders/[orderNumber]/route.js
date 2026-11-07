import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import Order from "@/models/Order";
import { ok, fail, readJson } from "@/lib/api";
import { restoreStock } from "@/lib/orderHelpers";

export const runtime = "nodejs";

// Sirf logged-in user apna order dekh / cancel kar sakta hai.
// (Pehle ?phone= se guest lookup tha: order numbers sequential hain, isse kisi ka bhi
// address/phone leak ho sakta tha. Frontend isse use nahi karta, isliye hata diya.)
async function findMine(req, orderNumber) {
  const { user, error } = await verifyUser(req);
  if (error || !user) return { error: error || fail("Unauthorized", 401) };
  if (typeof orderNumber !== "string" || !/^RAA-\d{4,12}$/.test(orderNumber)) {
    return { error: fail("Order not found.", 404) };
  }
  await connectMongo();
  const order = await Order.findOne({ orderNumber, user: user._id }).lean();
  if (!order) return { error: fail("Order not found.", 404) };
  return { order };
}

// Response shape same, bas internal fields (user id, __v) nahi jaate
const view = (o) => ({
  id: String(o._id),
  orderNumber: o.orderNumber,
  items: (o.items || []).map((i) => ({
    product: String(i.product),
    name: i.name,
    slug: i.slug,
    image: i.image,
    category: i.category,
    price: i.price,
    quantity: i.quantity,
  })),
  shipping: o.shipping || {},
  paymentMethod: o.paymentMethod,
  paymentStatus: o.paymentStatus,
  status: o.status,
  subtotal: o.subtotal,
  shippingFee: o.shippingFee,
  total: o.total,
  trackingId: o.trackingId || "",
  cancelledAt: o.cancelledAt || null,
  createdAt: o.createdAt,
  updatedAt: o.updatedAt,
});

export async function GET(req, { params }) {
  try {
    const { orderNumber } = await params;
    const { order, error } = await findMine(req, orderNumber);
    if (error) return error;
    return ok({ order: view(order) });
  } catch (e) {
    console.error("GET /api/orders/[orderNumber]", e?.name, e?.message);
    return fail("Could not load order.", 500);
  }
}

// Customer sirf cancel kar sakta hai (jab tak Processing hai)
export async function PATCH(req, { params }) {
  const blocked = guard(req, { name: "order-cancel", limit: 30, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const body = await readJson(req);
  if (body?.action !== "cancel") return fail("Unsupported action.");
  try {
    const { orderNumber } = await params;
    const { order, error } = await findMine(req, orderNumber);
    if (error) return error;
    if (order.status !== "Processing") return fail("This order can no longer be cancelled.", 409);

    // double-cancel se bachne ke liye conditional update; stock sirf jeetne wale request par wapas jaata hai
    const r = await Order.updateOne(
      { _id: order._id, status: "Processing" },
      { $set: { status: "Cancelled", cancelledAt: new Date() } }
    );
    if (r.modifiedCount === 1) {
      await restoreStock(order.items);
      if (order.paymentStatus === "paid") {
        await Order.updateOne({ _id: order._id }, { $set: { paymentStatus: "refunded" } });
      }
    }
    const fresh = await Order.findById(order._id).lean();
    return ok({ order: view(fresh) });
  } catch (e) {
    console.error("PATCH /api/orders/[orderNumber]", e?.name, e?.message);
    return fail("Could not cancel order.", 500);
  }
}
