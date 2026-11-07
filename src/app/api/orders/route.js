import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import Order, { PAYMENT_METHODS } from "@/models/Order";
import { ok, fail, readJson, isId } from "@/lib/api";
import { saveOrderAddress } from "@/lib/addressHelpers";
import { calcShipping, nextOrderNumber, restoreStock, toCard } from "@/lib/orderHelpers";

export const runtime = "nodejs";

const s = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function parseShipping(x) {
  const sh = {
    fullName: s(x?.fullName, 100),
    phone: s(x?.phone, 15).replace(/[\s-]/g, "").replace(/^(\+91|91)(?=\d{10}$)/, ""),
    email: s(x?.email, 150).toLowerCase(),
    address: s(x?.address, 300),
    city: s(x?.city, 100),
    state: s(x?.state, 100),
    pincode: s(x?.pincode, 6),
  };
  const errs = [];
  if (sh.fullName.length < 2) errs.push("Enter your full name.");
  if (!/^[6-9]\d{9}$/.test(sh.phone)) errs.push("Enter a valid 10-digit mobile number.");
  if (sh.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sh.email)) errs.push("Enter a valid email.");
  if (sh.address.length < 5) errs.push("Enter your full address.");
  if (!sh.city) errs.push("Enter your city.");
  if (!sh.state) errs.push("Enter your state.");
  if (!/^\d{6}$/.test(sh.pincode)) errs.push("Enter a valid 6-digit pincode.");
  return { sh, errs };
}

// POST /api/orders  — guest ya logged-in user order place kare
// body: { items:[{productId, quantity}], shipping:{...}, paymentMethod }
export async function POST(req) {
  const blocked = guard(req, { name: "place-order", limit: 15, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;

  const body = await readJson(req);
  if (!body) return fail("Invalid request.");

  const paymentMethod = PAYMENT_METHODS.includes(body.paymentMethod) ? body.paymentMethod : null;
  if (!paymentMethod) return fail("Select a payment method.");
  if (paymentMethod !== "cod") return fail("Only Cash on Delivery is available right now.", 400);

  const { sh, errs } = parseShipping(body.shipping);
  if (errs.length) return fail(errs.join(" "));

  // duplicate items merge karo, quantity 1..10
  const wanted = new Map();
  for (const it of Array.isArray(body.items) ? body.items.slice(0, 50) : []) {
    const id = String(it?.productId || "");
    const qty = Number(it?.quantity);
    if (!isId(id) || !Number.isInteger(qty) || qty < 1) return fail("Invalid cart item.");
    wanted.set(id, Math.min(10, (wanted.get(id) || 0) + qty));
  }
  if (!wanted.size) return fail("Your cart is empty.");

  try {
    await connectMongo();

    // logged-in ho to user attach karo, nahi to guest
    let userId = null;
    try {
      const { user, error } = await verifyUser(req);
      if (!error && user) userId = user._id;
    } catch {}

    // price hamesha DB se (client ka price kabhi nahi)
    const products = await Product.find({ _id: { $in: [...wanted.keys()] }, isActive: true }).lean();
    if (products.length !== wanted.size) return fail("Some products are no longer available.", 409);

    const items = products.map((p) => ({
      product: p._id,
      name: p.name,
      slug: p.slug,
      image: p.images?.[0] || "",
      category: p.category,
      price: p.price,
      quantity: wanted.get(String(p._id)),
    }));

    // stock atomically kaato; fail ho to jo kaata wo wapas
    const taken = [];
    for (const it of items) {
      const r = await Product.updateOne({ _id: it.product, stock: { $gte: it.quantity } }, { $inc: { stock: -it.quantity } });
      if (r.modifiedCount !== 1) {
        await restoreStock(taken);
        return fail(`"${it.name}" does not have enough stock.`, 409);
      }
      taken.push(it);
    }

    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    const shippingFee = calcShipping(subtotal);

    try {
      const order = await Order.create({
        orderNumber: await nextOrderNumber(),
        user: userId,
        items,
        shipping: sh,
        paymentMethod,
        paymentStatus: "pending",
        status: "Processing",
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
      });
      await saveOrderAddress(userId, sh, body.shipping?.addressType);
      return ok({ orderNumber: order.orderNumber, total: order.total }, 201);
    } catch (e) {
      await restoreStock(taken);
      throw e;
    }
  } catch (e) {
    console.error("POST /api/orders", e);
    return fail("Could not place your order. Please try again.", 500);
  }
}

// GET /api/orders  — logged-in user ke apne orders
export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectMongo();
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).limit(100).lean();
    return ok({ orders: orders.map(toCard) });
  } catch (e) {
    console.error("GET /api/orders", e);
    return fail("Could not load orders.", 500);
  }
}
