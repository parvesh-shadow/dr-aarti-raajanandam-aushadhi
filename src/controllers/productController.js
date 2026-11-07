import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema, productUpdateSchema } from "@/lib/validators";
import { isId } from "@/lib/api";

const NO_STORE = { "Cache-Control": "no-store" };
const json = (data, status = 200) => NextResponse.json(data, { status, headers: NO_STORE });
const fail = (error, status = 400) => json({ ok: false, error }, status);

async function parse(req, schema) {
  let body;
  try {
    body = await req.json();
  } catch {
    return { error: "Invalid request body." };
  }
  const r = schema.safeParse(body);
  if (!r.success) return { error: r.error.issues[0]?.message || "Invalid input." };
  return { data: r.data };
}

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100) || "product";

async function uniqueSlug(name, excludeId = null) {
  const base = slugify(name);
  let slug = base;
  let n = 1;
  while (await Product.exists({ slug, ...(excludeId && { _id: { $ne: excludeId } }) })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Frontend components ko jo naam chahiye wahi bhejte hain
const serialize = (doc) => {
  const p = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(p._id),
    slug: p.slug,
    href: `/products/${p.slug}`,
    name: p.name,
    category: p.category,
    filter: p.filter,
    description: p.description,
    pack: p.pack,
    netQuantity: p.netQuantity,
    type: p.type,
    price: p.price,
    mrp: p.mrp,
    stock: p.stock,
    images: p.images,
    image: p.images?.[0] || "",
    brochureHref: p.brochureHref,
    about: p.about,
    specs: p.specs,
    benefitsIntro: p.benefitsIntro,
    benefits: p.benefits,
    usageIntro: p.usageIntro,
    usage: p.usage,
    ingredientsHeading: p.ingredientsHeading,
    ingredientsDescription: p.ingredientsDescription,
    ingredients: p.ingredients,
    faqs: p.faqs,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isFeatured: p.isFeatured,
    isActive: p.isActive,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
};

// PUBLIC: ?page=1&limit=12&filter=Hair Care&category=...&q=...&featured=true
export async function listProducts(req) {
  await connectDB();
  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(sp.get("limit")) || 12));

  const filter = { isActive: true };
  const f = sp.get("filter");
  const category = sp.get("category");
  const q = sp.get("q")?.slice(0, 60);
  if (f && f !== "All") filter.filter = String(f);
  if (category) filter.category = String(category);
  if (sp.get("featured") === "true") filter.isFeatured = true;
  if (q) filter.name = { $regex: escapeRegex(q), $options: "i" };

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return json({ ok: true, products: items.map(serialize), page, total, pages: Math.ceil(total / limit) });
}

// PUBLIC: id ya slug dono chalega
export async function getProduct(idOrSlug) {
  await connectDB();
  const key = String(idOrSlug).toLowerCase();
  const where = isId(key) ? { _id: key } : { slug: key };
  const p = await Product.findOne({ ...where, isActive: true }).lean();
  if (!p) return fail("Product not found.", 404);
  return json({ ok: true, product: serialize(p) });
}

// ADMIN
export async function adminListProducts(req) {
  await connectDB();
  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit")) || 20));
  const q = sp.get("q")?.slice(0, 60);

  const filter = {};
  if (q) filter.name = { $regex: escapeRegex(q), $options: "i" };

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return json({ ok: true, products: items.map(serialize), page, total, pages: Math.ceil(total / limit) });
}

export async function adminGetProduct(id) {
  if (!isId(id)) return fail("Invalid product id.", 400);
  await connectDB();
  const p = await Product.findById(id).lean();
  if (!p) return fail("Product not found.", 404);
  return json({ ok: true, product: serialize(p) });
}

export async function createProduct(req) {
  const parsed = await parse(req, productSchema);
  if (parsed.error) return fail(parsed.error, 422);

  await connectDB();
  const slug = await uniqueSlug(parsed.data.name);

  let product;
  try {
    product = await Product.create({ ...parsed.data, slug });
  } catch (err) {
    if (err?.code === 11000) return fail("A product with this name already exists.", 409);
    throw err;
  }
  return json({ ok: true, product: serialize(product) }, 201);
}

export async function updateProduct(req, id) {
  if (!isId(id)) return fail("Invalid product id.", 400);
  const parsed = await parse(req, productUpdateSchema);
  if (parsed.error) return fail(parsed.error, 422);

  await connectDB();
  const product = await Product.findById(id);
  if (!product) return fail("Product not found.", 404);

  const data = parsed.data;
  const nextPrice = data.price ?? product.price;
  const nextMrp = data.mrp ?? product.mrp;
  if (nextMrp !== 0 && nextMrp < nextPrice) return fail("MRP cannot be less than price.", 422);

  if (data.name && data.name !== product.name) {
    product.slug = await uniqueSlug(data.name, product._id);
  }
  Object.assign(product, data);
  await product.save();

  return json({ ok: true, product: serialize(product) });
}

export async function deleteProduct(id) {
  if (!isId(id)) return fail("Invalid product id.", 400);
  await connectDB();
  const p = await Product.findByIdAndDelete(id);
  if (!p) return fail("Product not found.", 404);
  return json({ ok: true });
}