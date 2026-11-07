import { connectMongo } from "@/lib/mongo";
import Blog from "@/models/Blog";
import { sectionsToHtml, sanitizeBlogHtml } from "@/lib/blogHtml";

const clean = (doc) => JSON.parse(JSON.stringify(doc));
const PUBLIC = { isPublished: true };

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })
    : "";

// DB blog -> props of BlogCard / BlogContent / BlogDetailHero
export function toBlogView(b) {
  return {
    id: String(b._id),
    slug: b.slug,
    href: `/blogs/${b.slug}`,
    category: b.category || "",
    title: b.title,
    excerpt: b.excerpt || "",
    image: b.image || "",
    author: b.author || "",
    date: formatDate(b.publishedAt || b.createdAt),
    readTime: `${b.readTime || 1} minute read`,
    html: b.html ? sanitizeBlogHtml(b.html) : sectionsToHtml(b.content || []),
  };
}

// Published blogs (newest first). Content list ke liye zaroori nahi, isliye hata diya.
// DB fail ho to [] (page empty state dikhata hai).
export async function getPublishedBlogs({ limit = 0, excludeSlug = "" } = {}) {
  try {
    await connectMongo();
    const filter = { ...PUBLIC, ...(excludeSlug && { slug: { $ne: excludeSlug } }) };
    let q = Blog.find(filter).select("-content -html").sort({ publishedAt: -1, createdAt: -1 });
    if (limit) q = q.limit(limit);
    return clean(await q.lean()).map(toBlogView);
  } catch (e) {
    console.error("getPublishedBlogs:", e.message);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  const key = typeof slug === "string" ? slug.trim().toLowerCase().slice(0, 150) : "";
  if (!key) return null;
  try {
    await connectMongo();
    const b = await Blog.findOne({ slug: key, ...PUBLIC }).lean();
    return b ? toBlogView(clean(b)) : null;
  } catch (e) {
    console.error("getBlogBySlug:", e.message);
    return null;
  }
}
