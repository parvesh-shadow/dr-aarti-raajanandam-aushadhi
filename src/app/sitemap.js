import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import Blog from "@/models/Blog";
import { SITE_URL } from "@/lib/siteUrl";

// Har ghante dobara banta hai (naye product/blog apne aap aa jaate hain)
export const revalidate = 3600;

const STATIC = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "daily" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/appointment", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const now = new Date();
  const entries = STATIC.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  // DB down ho to bhi static pages ka sitemap milta hai
  try {
    await connectMongo();
    const [products, blogs] = await Promise.all([
      Product.find({ isActive: true }).select("slug updatedAt").lean(),
      Blog.find({ isPublished: true }).select("slug updatedAt").lean(),
    ]);
    for (const p of products) {
      entries.push({ url: `${SITE_URL}/products/${p.slug}`, lastModified: p.updatedAt || now, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const b of blogs) {
      entries.push({ url: `${SITE_URL}/blogs/${b.slug}`, lastModified: b.updatedAt || now, changeFrequency: "monthly", priority: 0.6 });
    }
  } catch (e) {
    console.error("sitemap:", e?.message || e);
  }
  return entries;
}
