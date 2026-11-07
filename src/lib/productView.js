// DB product -> props of the existing UI components.

// Card (shared <Product /> / MedicinesList)
export function toCardProduct(p) {
  return {
    id: String(p._id),
    slug: p.slug,
    href: `/products/${p.slug}`,
    category: p.category || "",
    filter: p.filter || "",
    name: p.name,
    description: p.description || "",
    pack: p.pack || [p.netQuantity].filter(Boolean).join(" • "),
    price: p.price,
    rating: p.rating > 0 ? p.rating : null,
    inStock: p.stock > 0,
    image: p.images?.[0] || "",
  };
}

// Product detail page (ProductInfo / ProductTabs)
export function toDetailProduct(p) {
  return {
    id: String(p._id),
    category: p.category || "",
    name: p.name,
    rating: p.rating || 0,
    reviewCount: p.reviewCount || 0,
    price: p.price,
    stock: p.stock || 0,
    description: p.description || "",
    netQuantity: p.netQuantity || "",
    type: p.type || "",
    brochureHref: p.brochureHref || "#",
    about: p.about || "",
    specs: p.specs || [],
    benefitsIntro: p.benefitsIntro || "",
    benefits: p.benefits || [],
    usageIntro: p.usageIntro || "",
    usage: p.usage || [],
  };
}
