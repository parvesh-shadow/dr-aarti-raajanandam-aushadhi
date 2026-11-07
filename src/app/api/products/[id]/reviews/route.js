import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Review from "@/models/Review";
import { ok, fail, readJson, fromError, isId } from "@/lib/api";
import { getApprovedReviews, getReviewSummary, refreshProductRating } from "@/lib/reviewHelpers";

export const runtime = "nodejs";

const s = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// GET /api/products/:id/reviews?page=1  -> approved reviews (10 per page) + rating summary
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!isId(id)) return fail("Invalid product id.", 400);
    await connectMongo();
    const page = req.nextUrl.searchParams.get("page");
    const [list, summary] = await Promise.all([getApprovedReviews(id, page), getReviewSummary(id)]);
    return ok({ ...list, summary });
  } catch (e) {
    return fromError(e, "GET /api/products/[id]/reviews", "Could not load reviews.");
  }
}

// POST /api/products/:id/reviews  -> rating turant gini jaati hai, review text admin approve kare tab dikhta hai
export async function POST(req, { params }) {
  const blocked = guard(req, { name: "review-submit", limit: 10, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;

  const { user, error } = await verifyUser(req);
  if (error) return fail("Please log in to write a review.", 401);

  try {
    const { id } = await params;
    if (!isId(id)) return fail("Invalid product id.", 400);

    const body = await readJson(req);
    const rating = Number(body?.rating);
    const title = s(body?.title, 100);
    const name = s(body?.name, 60) || user.name || "";
    const comment = s(body?.comment, 1500);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return fail("Please select a rating from 1 to 5.", 422);
    if (!title) return fail("Please add a review title.", 422);
    if (name.length < 2) return fail("Please enter your name.", 422);

    await connectMongo();
    const product = await Product.findOne({ _id: id, isActive: true }).select("name").lean();
    if (!product) return fail("Product not found.", 404);

    // Rating ke liye sirf login chahiye. Review text ke liye verified purchase
    // (is user ka is product ka cancel na hua order). Sirf delivered chahiye to: status: "Delivered"
    const purchased = Boolean(
      await Order.exists({ user: user._id, status: { $ne: "Cancelled" }, "items.product": product._id })
    );

    const existing = await Review.findOne({ product: product._id, user: user._id });
    // Pehle se verified review hai, ya purchase ke bina dobara rating -> block
    if (existing && (existing.isVerifiedPurchase || !purchased)) {
      return fail("You have already reviewed this product.", 409);
    }

    const data = purchased
      ? { name, title, comment, isVerifiedPurchase: true, status: "pending" }
      : { name, title: "Rating", comment: "", isVerifiedPurchase: false, status: "approved" }; // text save nahi hota

    if (existing) {
      // Pehle sirf rating di thi, ab purchase ke baad text ke saath review
      Object.assign(existing, { ...data, rating, email: user.email || "" });
      await existing.save();
    } else {
      try {
        await Review.create({
          product: product._id,
          productName: product.name,
          user: user._id,
          email: user.email || "",
          rating,
          ...data,
        });
      } catch (e) {
        if (e?.code === 11000) return fail("You have already reviewed this product.", 409);
        throw e;
      }
    }

    const { average, count } = await refreshProductRating(product._id);
    const summary = await getReviewSummary(product._id);

    return ok(
      {
        message: !purchased
          ? "Thank you! Your rating has been added. Written reviews can be posted only after purchasing this product."
          : comment
            ? "Thank you! Your rating has been added. Your review will appear after our team approves it."
            : "Thank you! Your rating has been added.",
        average,
        count,
        summary,
      },
      201
    );
  } catch (e) {
    return fromError(e, "POST /api/products/[id]/reviews", "Could not submit your review. Please try again.");
  }
}
