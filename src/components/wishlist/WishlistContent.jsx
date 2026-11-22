"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Product from "@/components/shared/Product";
import { addToCart } from "@/lib/checkoutStore";
import { useWishlistIds } from "@/lib/wishlistStore";
import { useShopReady } from "@/lib/shopSession";

// Wishlist ke ids ko public product API se hydrate karke Product card me dikhata hai.
export default function WishlistContent() {
  const ready = useShopReady(); // login status check hone tak wishlist "empty" na dikhe
  const ids = useWishlistIds();
  const key = ids.join(",");
  const [products, setProducts] = useState({}); // id -> card product
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const missing = key ? key.split(",").filter((id) => !products[id]) : [];
    if (missing.length === 0) {
      setLoading(false);
      return;
    }
    (async () => {
      const rows = await Promise.all(
        missing.map(async (id) => {
          try {
            const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
            const data = await res.json().catch(() => ({}));
            const p = data.product;
            if (!res.ok || !p) return null;
            return {
              id: p.id,
              slug: p.slug,
              href: p.href || `/products/${p.slug}`,
              category: p.category || "",
              name: p.name,
              description: p.description || "",
              pack: p.pack || [p.netQuantity].filter(Boolean).join(" • "),
              price: p.price,
              rating: p.rating > 0 ? p.rating : null,
              inStock: p.stock > 0,
              image: p.image || "",
            };
          } catch {
            return null;
          }
        })
      );
      if (!alive) return;
      setProducts((prev) => {
        const next = { ...prev };
        rows.filter(Boolean).forEach((r) => (next[r.id] = r));
        return next;
      });
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const items = ids.map((id) => products[id]).filter(Boolean);

  if (!ready || (loading && items.length === 0 && ids.length > 0)) return null;

  if (items.length === 0) {
    return (
      <section
        aria-labelledby="empty-wishlist-heading"
        className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28"
      >
        <h2 id="empty-wishlist-heading" className="text-2xl xl:text-[44px] font-medium text-black">
          Your wishlist is empty
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-sm text-gray-800 sm:text-base">
          Tap the heart on any product to save it here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-base"
        >
          Explore Medicines
        </Link>
      </section>
    );
  }

  return (
    <section
      aria-label="Wishlist items"
      className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 xl:px-48"
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 items-stretch">
        {items.map((product) => (
          <li key={product.id} className="flex h-full w-full">
            <Product
              product={product}
              onAddToCart={(p) => p.inStock && addToCart(p.id, 1)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
