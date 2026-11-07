import mongoose from "mongoose";
import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import Review, { COUNTED_STATUSES } from "@/models/Review";

export const REVIEWS_PER_PAGE = 10;

const LABELS = { 5: "5.0 Excellent", 4: "4.0 Good", 3: "3.0 Average", 2: "2.0 Poor", 1: "1.0 Terrible" };

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

// Rating summary (pending + approved reviews ki rating gini jaati hai)
export async function getReviewSummary(productId) {
  const rows = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(String(productId)), status: { $in: COUNTED_STATUSES } } },
    { $group: { _id: "$rating", count: { $sum: 1 } } },
  ]);
  const byStar = Object.fromEntries(rows.map((r) => [r._id, r.count]));
  const count = rows.reduce((n, r) => n + r.count, 0);
  const sum = rows.reduce((n, r) => n + r._id * r.count, 0);
  return {
    average: count ? Math.round((sum / count) * 10) / 10 : 0,
    count,
    breakdown: [5, 4, 3, 2, 1].map((s) => ({ label: LABELS[s], count: byStar[s] || 0 })),
  };
}

// Product ke rating/reviewCount ko Review collection se sync karo
export async function refreshProductRating(productId) {
  const { average, count } = await getReviewSummary(productId);
  await Product.updateOne({ _id: productId }, { $set: { rating: average, reviewCount: count } });
  return { average, count };
}

// Sirf approved reviews, 10 per page
export async function getApprovedReviews(productId, page = 1) {
  const pid = new mongoose.Types.ObjectId(String(productId));
  const filter = { product: pid, status: "approved", isVerifiedPurchase: true }; // text sirf verified purchase ka
  const total = await Review.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(total / REVIEWS_PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), pages);

  const rows = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip((current - 1) * REVIEWS_PER_PAGE)
    .limit(REVIEWS_PER_PAGE)
    .select("name rating title comment createdAt")
    .lean();

  return {
    reviews: rows.map((r) => ({
      id: String(r._id),
      name: r.name,
      rating: r.rating,
      title: r.title,
      text: r.comment || "",
      time: fmtDate(r.createdAt),
    })),
    page: current,
    pages,
    total,
  };
}

// Product page ke liye: DB fail ho to khali data (page crash nahi hota)
export async function getReviewsForPage(productId) {
  try {
    await connectMongo();
    const [list, summary] = await Promise.all([getApprovedReviews(productId, 1), getReviewSummary(productId)]);
    return { ...list, summary };
  } catch (e) {
    console.error("getReviewsForPage:", e.message);
    return { reviews: [], page: 1, pages: 1, total: 0, summary: { average: 0, count: 0, breakdown: [] } };
  }
}
