import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import Order from "@/models/Order";
import User from "@/models/User";
import { ok, fail } from "@/lib/api";
import { toCard } from "@/lib/orderHelpers";
import { backfillAddresses } from "@/lib/addressHelpers";

export const runtime = "nodejs";

// GET /api/account/dashboard — logged-in user ka poora dashboard data
export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectMongo();
    await backfillAddresses(user._id);
    const mine = { user: user._id };
    const [total, active, delivered, recent, u] = await Promise.all([
      Order.countDocuments(mine),
      Order.countDocuments({ ...mine, status: { $in: ["Processing", "Shipped"] } }),
      Order.countDocuments({ ...mine, status: "Delivered" }),
      Order.find(mine).sort({ createdAt: -1 }).limit(3).lean(),
      User.findById(user._id).select("lastLoginAt addresses").lean(),
    ]);
    return ok({
      stats: { total, active, delivered, addresses: u?.addresses?.length || 0 },
      lastLoginAt: u?.lastLoginAt || null,
      orders: recent.map(toCard),
    });
  } catch (e) {
    console.error("GET /api/account/dashboard", e);
    return fail("Could not load dashboard.", 500);
  }
}
