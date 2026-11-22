// Product payload ko clean + validate karta hai (admin create/update ke liye).

const str = (v, max = 1000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// image / file url sirf site ke andar (/...) ya https:// hona chahiye
const safeUrl = (v) => {
  const s = str(v, 500);
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https:\/\//i.test(s)) return s;
  return "";
};

const pairs = (arr, a, b, max = 30) =>
  (Array.isArray(arr) ? arr : [])
    .slice(0, max)
    .map((x) => ({ [a]: str(x?.[a], 300), [b]: str(x?.[b], 2000) }))
    .filter((x) => x[a] || x[b]);

export function parseProduct(body) {
  const errors = [];
  const b = body && typeof body === "object" ? body : {};

  const name = str(b.name, 200);
  const category = str(b.category, 100);
  const price = Number(b.price);
  const mrp = b.mrp === "" || b.mrp == null ? 0 : Number(b.mrp);
  const stock = Number(b.stock);

  if (!name) errors.push("Product name is required.");
  if (!category) errors.push("Category is required.");
  if (!Number.isFinite(price) || price < 0) errors.push("Enter a valid price.");
  if (!Number.isFinite(mrp) || mrp < 0) errors.push("Enter a valid MRP.");
  if (!Number.isInteger(stock) || stock < 0) errors.push("Stock must be a whole number (0 or more).");

  const data = {
    name,
    category,
    price,
    mrp: Number.isFinite(mrp) ? mrp : 0,
    stock,
    description: str(b.description, 5000),
    about: str(b.about, 5000),
    netQuantity: str(b.netQuantity, 100),
    packSize: str(b.packSize, 100),
    type: str(b.type, 100) || "Ayurvedic product",
    images: (Array.isArray(b.images) ? b.images : []).map(safeUrl).filter(Boolean).slice(0, 5),
    brochureUrl: safeUrl(b.brochureUrl),
    benefitsIntro: str(b.benefitsIntro, 2000),
    benefits: pairs(b.benefits, "title", "description"),
    usageIntro: str(b.usageIntro, 2000),
    usage: pairs(b.usage, "question", "answer"),
    faqs: pairs(b.faqs, "question", "answer"),
    ingredients: (Array.isArray(b.ingredients) ? b.ingredients : [])
      .slice(0, 30)
      .map((x) => ({ name: str(x?.name, 200), description: str(x?.description, 1000), image: safeUrl(x?.image) }))
      .filter((x) => x.name),
    rating: Math.min(5, Math.max(0, Number(b.rating) || 0)),
    reviewCount: Math.max(0, Math.floor(Number(b.reviewCount) || 0)),
    isActive: b.isActive === undefined ? true : Boolean(b.isActive),
  };

  return { data, errors, slugInput: str(b.slug, 120) };
}

// unique slug banata hai: name, name-2, name-3 ...
export async function uniqueSlug(Product, base, excludeId) {
  const root = slugify(base) || "product";
  let slug = root;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Product.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}
