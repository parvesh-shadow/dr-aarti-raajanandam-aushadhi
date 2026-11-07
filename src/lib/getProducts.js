import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";

const clean = (doc) => JSON.parse(JSON.stringify(doc));

// Active products only (plain JSON). On DB failure returns [] so the page shows its empty state.
export async function getActiveProducts({ limit = 0 } = {}) {
  try {
    await connectMongo();
    let q = Product.find({ isActive: true })
      .select("name slug category filter description pack netQuantity price stock images rating")
      .sort({ createdAt: -1 });
    if (limit) q = q.limit(limit);
    return clean(await q.lean());
  } catch (e) {
    console.error("getActiveProducts:", e.message);
    return [];
  }
}

// Single active product by slug (plain JSON) or null.
export async function getProductBySlug(slug) {
  const key = typeof slug === "string" ? slug.trim().toLowerCase().slice(0, 150) : "";
  if (!key) return null;
  try {
    await connectMongo();
    const p = await Product.findOne({ slug: key, isActive: true }).lean();
    return p ? clean(p) : null;
  } catch (e) {
    console.error("getProductBySlug:", e.message);
    return null;
  }
}
