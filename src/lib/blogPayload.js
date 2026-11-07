// Blog payload ko clean + validate karta hai (admin create/update ke liye).
import { sanitizeBlogHtml, htmlToText } from "@/lib/blogHtml";

const str = (v, max = 1000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// image url sirf site ke andar (/...) ya https:// hona chahiye
const safeUrl = (v) => {
  const s = str(v, 500);
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https:\/\//i.test(s)) return s;
  return "";
};

export function parseBlog(body) {
  const errors = [];
  const b = body && typeof body === "object" ? body : {};

  const title = str(b.title, 200);
  const category = str(b.category, 100);
  const excerpt = str(b.excerpt, 500);

  if (!title) errors.push("Title is required.");
  if (!category) errors.push("Category is required.");
  if (!excerpt) errors.push("Short description (excerpt) is required.");

  const html = sanitizeBlogHtml(str(b.html, 300000));
  const text = htmlToText(html);
  if (!text && !/<img\s/i.test(html)) errors.push("Article content is required.");

  // Padhne ka time: ~200 words/minute
  const words = text.split(/\s+/).filter(Boolean).length;

  const data = {
    title,
    category,
    excerpt,
    image: safeUrl(b.image),
    author: str(b.author, 120) || "Dr. Arti’s Wellness Editorial Team",
    html,
    content: [], // purana section-wise content hata do (ab html use hota hai)
    readTime: Math.max(1, Math.ceil(words / 200)),
    isPublished: Boolean(b.isPublished),
  };

  return { data, errors, slugInput: str(b.slug, 120) };
}

// unique slug banata hai: title, title-2, title-3 ...
export async function uniqueSlug(Blog, base, excludeId) {
  const root = slugify(base) || "blog";
  let slug = root;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Blog.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}
