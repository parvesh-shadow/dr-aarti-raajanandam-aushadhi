import mongoose from "mongoose";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { ok, fail } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    await connectMongo();
    const [products, orders, pending, revenueAgg, recent, lowStock] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: "Processing" }),
      Order.aggregate([{ $match: { status: { $ne: "Cancelled" } } }, { $group: { _id: null, sum: { $sum: "$total" } } }]),
      Order.find().sort({ createdAt: -1 }).limit(5).select("orderNumber shipping.fullName total status createdAt").lean(),
      Product.find({ stock: { $lte: 5 } }).sort({ stock: 1 }).limit(5).select("name stock isActive").lean(),
    ]);
    // users collection ka naam "users" maana hai (User model ka default)
    let customers = 0;
    try {
      customers = await mongoose.connection.collection("users").countDocuments();
    } catch {}
    return ok({ stats: { products, orders, pending, customers, revenue: revenueAgg[0]?.sum || 0 }, recent, lowStock });
  } catch (e) {
    console.error("GET /api/admin/stats", e);
    return fail("Could not load stats.", 500);
  }
}
