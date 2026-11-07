"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Product from "@/components/shared/Product";
import { addToCart } from "@/lib/checkoutStore";

const FILTERS = ["All", "Women’s Wellness", "Men’s Wellness", "Ayurvedic Wellness", "Hair Care"];

export default function MedicinesList({ products = [], initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("All");
  const [cart, setCart] = useState([]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchFilter = activeFilter === "All" || p.filter === activeFilter;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [products, query, activeFilter]);

  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    addToCart(product.id, 1);
    setCart((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  };

  return (
    <section
      aria-label="Ayurvedic medicines list"
      className="py-8 sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-48"
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

      {/* Products Grid */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 items-stretch">
          {visible.map((product) => (
            <li key={product.id} className="flex h-full w-full">
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






// "use client";

// import { useMemo, useState } from "react";
// import { Search } from "lucide-react";
// import Product from "@/components/shared/Product";
// import { addToCart } from "@/lib/checkoutStore";

// const FILTERS = ["All", "Women’s Wellness", "Men’s Wellness", "Ayurvedic Wellness", "Hair Care"];

// export default function MedicinesList({ products = [] }) {
//   const [query, setQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [cart, setCart] = useState([]);

//   const visible = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return products.filter((p) => {
//       const matchFilter = activeFilter === "All" || p.filter === activeFilter;
//       const matchSearch =
//         !q ||
//         p.name.toLowerCase().includes(q) ||
//         p.description.toLowerCase().includes(q);
//       return matchFilter && matchSearch;
//     });
//   }, [products, query, activeFilter]);

//   const handleAddToCart = (product) => {
//     if (!product.inStock) return;
//     addToCart(product.id, 1);
//     setCart((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
//   };

//   return (
//     <section
//       aria-label="Ayurvedic medicines list"
//       className=" py-8  sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-48 "
//     >
//       {/* Search + filters */}
//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
//         <div className="relative w-full lg:max-w-sm">
//           <label htmlFor="medicine-search" className="sr-only">
//             Search Ayurvedic medicines
//           </label>
//           <Search
//             className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
//             aria-hidden="true"
//           />
//           <input
//             id="medicine-search"
//             type="search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search Ayurvedic medicines..."
//             className="w-full border border-gray-300 py-2.5 pl-9 pr-3 text-base text-black placeholder:text-gray-500 focus:border-[#C5A84C] focus:outline-none sm:text-sm"
//           />
//         </div>

//         <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
//           {FILTERS.map((name) => {
//             const active = activeFilter === name;
//             return (
//               <button
//                 key={name}
//                 type="button"
//                 onClick={() => setActiveFilter(name)}
//                 aria-pressed={active}
//                 className={`border px-4 py-2 text-xs transition-colors sm:text-sm ${
//                   active
//                     ? "border-[#C5A84C] bg-[#C5A84C] text-white"
//                     : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
//                 }`}
//               >
//                 {name}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Products */}
//       {visible.length > 0 ? (
//         <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  lg:gap-5">
//           {visible.map((product) => (
//             <li key={product.id}>
//               <Product product={product} onAddToCart={handleAddToCart} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="mt-10 text-center text-xs text-gray-800 sm:text-sm">
//           No medicines found. Try a different search or category.
//         </p>
//       )}

//       {cart.length > 0 && (
//         <p role="status" className="mt-6 text-xs text-gray-800 sm:text-sm">
//           {cart.length} item(s) added to cart.
//         </p>
//       )}
//     </section>
//   );
// }