import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { ok, fail, readJson, isId } from "@/lib/api";
import { parseBlog, uniqueSlug, slugify } from "@/lib/blogPayload";
import { sectionsToHtml } from "@/lib/blogHtml";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const serialize = (doc) => {
  const b = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(b._id),
    title: b.title,
    slug: b.slug,
    category: b.category,
    excerpt: b.excerpt,
    image: b.image,
    author: b.author,
    html: b.html || sectionsToHtml(b.content || []),
    readTime: b.readTime,
    isPublished: b.isPublished,
    publishedAt: b.publishedAt,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
};

export async function adminListBlogs(req) {
  await connectDB();
  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit")) || 20));
  const q = sp.get("q")?.slice(0, 60);

  const filter = q ? { title: { $regex: escapeRegex(q), $options: "i" } } : {};
  const [items, total] = await Promise.all([
    Blog.find(filter)
      .select("-content -html")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return ok({ blogs: items.map(serialize), page, total, pages: Math.ceil(total / limit) });
}

export async function adminGetBlog(id) {
  if (!isId(id)) return fail("Invalid blog id.", 400);
  await connectDB();
  const b = await Blog.findById(id).lean();
  if (!b) return fail("Blog not found.", 404);
  return ok({ blog: serialize(b) });
}

export async function createBlog(req) {
  const { data, errors, slugInput } = parseBlog(await readJson(req));
  if (errors.length) return fail(errors[0], 422);

  await connectDB();
  const slug = await uniqueSlug(Blog, slugInput || data.title);
  const blog = await Blog.create({
    ...data,
    slug,
    publishedAt: data.isPublished ? new Date() : null,
  });
  return ok({ blog: serialize(blog) }, 201);
}

export async function updateBlog(req, id) {
  if (!isId(id)) return fail("Invalid blog id.", 400);
  const { data, errors, slugInput } = parseBlog(await readJson(req));
  if (errors.length) return fail(errors[0], 422);

  await connectDB();
  const blog = await Blog.findById(id);
  if (!blog) return fail("Blog not found.", 404);

  // Slug tabhi badlega jab admin ne khud badla ho (purane links na tootein)
  if (slugInput && slugify(slugInput) !== blog.slug) {
    blog.slug = await uniqueSlug(Blog, slugInput, blog._id);
  }
  // Pehli baar publish hone par date set hoti hai; unpublish karne par purani date rehti hai
  if (data.isPublished && !blog.publishedAt) blog.publishedAt = new Date();

  Object.assign(blog, data);
  await blog.save();
  return ok({ blog: serialize(blog) });
}

export async function deleteBlog(id) {
  if (!isId(id)) return fail("Invalid blog id.", 400);
  await connectDB();
  const b = await Blog.findByIdAndDelete(id);
  if (!b) return fail("Blog not found.", 404);
  return ok();
}
