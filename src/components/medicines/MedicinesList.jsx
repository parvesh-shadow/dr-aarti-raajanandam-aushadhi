"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Product from "@/components/shared/Product";

const image1="/medicine1.jpg";
const image2="/medicine2.jpg";
const image3="/medicine3.jpg";
const image4="/medicine4.jpg";
const image5="/medicine5.jpg";
const image6="/medicine6.jpg";

const FILTERS = ["All", "Women’s Wellness", "Men’s Wellness", "Ayurvedic Wellness", "Hair Care"];

// Dummy data. image: null -> placeholder dikhega. Asli image: "/images/products/x.jpg"
// filter = jis button se ye product dikhna chahiye
const PRODUCTS = [
  {
    id: 1,
    slug: "root-tricks-hair-care-capsule",
    href: "/products/root-tricks-hair-care-capsule",
    category: "Ayurvedic Hair Care",
    filter: "Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily wellness routine.",
    pack: "800 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    image: image1,
  },
  {
    id: 2,
    slug: "fem-rasayan-tablets",
    href: "/products/fem-rasayan-tablets",
    category: "Women’s Wellness",
    filter: "Women’s Wellness",
    name: "Fem Rasayan Tablets",
    description: "Ayurvedic wellness formula presented for women’s reproductive wellness and everyday care.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    image: image2,
  },
  {
    id: 3,
    slug: "shatavar-tablets",
    href: "/products/shatavar-tablets",
    category: "Women’s Wellness",
    filter: "Ayurvedic Wellness",
    name: "Shatavar™ Tablets",
    description: "Ayurvedic medicine formulated with Shatavari, presented in a convenient tablet format for everyday wellness.",
    pack: "800 mg • 60 Tablets",
    price: 895,
    rating: 4.8,
    image: image3,
  },
  {
    id: 4,
    slug: "femexa-white-discharge-capsules",
    href: "/products/femexa-white-discharge-capsules",
    category: "Women’s Wellness",
    filter: "Women’s Wellness",
    name: "Femexa White Discharge Capsules",
    description: "Ayurvedic capsules formulated for women’s intimate wellness.",
    pack: "500 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    image: image4,
  },
  {
    id: 5,
    slug: "vajromax-gold-tablets",
    href: "/products/vajromax-gold-tablets",
    category: "Men’s Wellness",
    filter: "Men’s Wellness",
    name: "Vajromax Gold Tablets",
    description: "Ayurvedic tablets positioned for men’s vitality and reproductive wellness.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    image: image5,
  },
  {
    id: 6,
    slug: "madivain-kit",
    href: "/products/madivain-kit",
    category: "Women’s Wellness",
    filter: "Women’s Wellness",
    name: "Madivain Kit",
    description: "Ayurvedic proprietary product presented as a feminine wellness tonic.",
    pack: "300 ml",
    price: 895,
    rating: 4.8,
    image: image6,
  },
];

export default function MedicinesList() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [cart, setCart] = useState([]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchFilter = activeFilter === "All" || p.filter === activeFilter;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [query, activeFilter]);

  // Abhi sirf state me cart. Baad me real cart logic yahan jodenge.
  const handleAddToCart = (product) => {
    setCart((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  };

  return (
    <section
      aria-label="Ayurvedic medicines list"
      className=" py-8  sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-48 "
    >
      {/* Search + filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="medicine-search" className="sr-only">
            Search Ayurvedic medicines
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
          <input
            id="medicine-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ayurvedic medicines..."
            className="w-full border border-gray-300 py-2.5 pl-9 pr-3 text-base text-black placeholder:text-gray-500 focus:border-[#C5A84C] focus:outline-none sm:text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {FILTERS.map((name) => {
            const active = activeFilter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActiveFilter(name)}
                aria-pressed={active}
                className={`border px-4 py-2 text-xs transition-colors sm:text-sm ${
                  active
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  lg:gap-5">
          {visible.map((product) => (
            <li key={product.id}>
              <Product product={product} onAddToCart={handleAddToCart} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-xs text-gray-800 sm:text-sm">
          No medicines found. Try a different search or category.
        </p>
      )}

      {cart.length > 0 && (
        <p role="status" className="mt-6 text-xs text-gray-800 sm:text-sm">
          {cart.length} item(s) added to cart.
        </p>
      )}
    </section>
  );
}