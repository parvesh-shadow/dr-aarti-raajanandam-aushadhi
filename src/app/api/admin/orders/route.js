import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { connectMongo } from "@/lib/mongo";
import Order, { ORDER_STATUSES } from "@/models/Order";
import { ok, fail } from "@/lib/api";

export const runtime = "nodejs";

// ADMIN: sab orders  ?status=&q=&page=
export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    await connectMongo();
    const sp = new URL(req.url).searchParams;
    const page = Math.max(1, parseInt(sp.get("page")) || 1);
    const limit = 20;
    const filter = {};
    const status = sp.get("status");
    if (ORDER_STATUSES.includes(status)) filter.status = status;
    const q = (sp.get("q") || "").trim().slice(0, 60);
    if (q) {
      const rx = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
      filter.$or = [{ orderNumber: rx }, { "shipping.fullName": rx }, { "shipping.phone": rx }];
    }
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Order.countDocuments(filter),
    ]);
    return ok({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    console.error("GET /api/admin/orders", e);
    return fail("Could not load orders.", 500);
  }
}
