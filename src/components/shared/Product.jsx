"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { addToCart } from "@/lib/checkoutStore";
import { toggleWishlist, useIsWishlisted } from "@/lib/wishlistStore";

export default function Product({
  product,
  onAddToCart,
  onToggleWishlist,
  className = "",
  buyNowLabel = "Buy Now",
}) {
  const {
    id,
    category,
    name,
    description,
    pack,
    price,
    rating,
    inStock = true,
    image,
    href = "/checkout",
  } = product;

  const wishlisted = useIsWishlisted(id);
  const [added, setAdded] = useState(false);

  // Cart: parent ne onAddToCart diya ho to wahi chalega, warna yahin se cart me add hoga.
  // (Sirf DB wale products, jinki id string hoti hai - demo/static numeric ids cart me nahi jaate.)
  const handleAddToCart = () => {
    if (!inStock) return;
    if (onAddToCart) onAddToCart(product);
    else if (typeof id === "string") addToCart(id, 1);
    else return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    // Image Link ke andar hai, isliye navigation rokna zaroori hai
    e.preventDefault();
    e.stopPropagation();
    if (id === undefined || id === null) return;
    const nowIn = toggleWishlist(id);
    onToggleWishlist?.(product, nowIn);
  };

  return (
    <article
      className={`flex h-full w-full flex-col relative border border-gray-200 bg-white p-3 sm:p-4 ${className}`}
    >
      {/* Image Container - Height fixed to 242px for all screens */}
      <div className="relative w-full h-[242px]">
        <Link
          href={href}
          className="relative block h-full w-full"
          aria-label={`View ${name}`}
        >
          {category && (
            <span className="absolute left-2 top-2 z-20 rounded-full font-semibold bg-gray-100 px-3 py-0.5 text-xs text-gray-600 shadow-sm">
              {category}
            </span>
          )}

          <div className="w-full h-full overflow-hidden border border-gray-200 shadow-sm rounded-sm">
            <ImagePlaceholder
              src={image}
              alt={name}
              label="Product"
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              imageClassName="object-cover w-full h-full"
              className="h-full w-full bg-white"
            />
          </div>

          {inStock && (
            <span className="absolute bottom-2 right-2 z-20 text-xs font-medium bg-white/90 px-2 py-0.5 rounded text-black sm:text-sm shadow-sm">
              In Stock
            </span>
          )}
        </Link>

        {/* Wishlist icon - top right */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-700 hover:text-[#A88C35]"
            }`}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 xl:text-xl text-lg font-semibold text-gray-800">
          {name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600 sm:text-sm">
          {description}
        </p>
        {pack && <p className="mt-2 text-sm text-gray-800">{pack}</p>}

       <div className="mt-3 flex items-center justify-between">
  <span className="text-lg font-bold text-gray-800">₹{price}</span>

  {rating != null && rating !== "" && (
    <span className="flex items-center gap-1 text-xs text-black sm:text-sm">
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < Number(rating);

          return (
            <Star
              key={i}
              size={14}
              fill={isFilled ? "#C5A84C" : "none"}
              color={isFilled ? "#C5A84C" : "#D1D5DB"}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          );
        })}
      </span>

      {/* <span className="sr-only">Rated</span>
      <span className="ml-1 font-medium">{rating}</span> */}
    </span>
  )}
</div>

        {/* Buttons stay at the bottom */}
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={href}
            className="flex-1 bg-[#C5A84C] px-4 py-2.5 text-center text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
          >
            {buyNowLabel}
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            aria-label={`Add ${name} to cart`}
            className="border border-black px-3 text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:bg-[#A88C35] active:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {added ? (
              <Check className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}


// "use client";

// import Link from "next/link";
// import { ShoppingBag, Star } from "lucide-react";
// import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

// export default function Product({
//   product,
//   onAddToCart,
//   className = "",
//   buyNowLabel = "Buy Now",
// }) {
//   const {
//     category,
//     name,
//     description,
//     pack,
//     price,
//     rating,
//     inStock = true,
//     image,
//     href = "/checkout",
//   } = product;

//   return (
//     <article
//       className={`flex h-full flex-col  w-full relative border border-gray-200 bg-white p-3 sm:p-4 ${className}`}
//     >
//       <Link
//         href={href}
//         className="relative block h-44 sm:h-52 "
//         aria-label={`View ${name}`}
//       >
//         {category && (
//           <span className="absolute left-0 top-0 z-10 rounded-full font-semibold bg-gray-100 px-3 py-0.5 text-xs text-gray-600">
//             {category}
//           </span>
//         )}

//         <ImagePlaceholder
//           src={image}
//           alt={name}
//           label="Product"
//           sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
//           imageClassName="object-contain p-4"
//           className="h-full w-full bg-white"
//         />

//         {inStock && (
//           <span className="absolute bottom-0 right-0 z-10 text-xs font-medium text-black sm:text-sm">
//             In Stock
//           </span>
//         )}
//       </Link>

//       <div className="mt-4 flex flex-1 flex-col">
//         <h3 className="line-clamp-2  xl:text-xl text-lg font-semibold  text-gray-800 ">
//           {name}
//         </h3>
//         <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-600 sm:text-sm">
//           {description}
//         </p>
//         {pack && <p className="mt-2 text-sm text-gray-800 ">{pack}</p>}

//         <div className="mt-3 flex items-center justify-between">
//           <span className="text-lg font-bold text-gray-800">₹{price}</span>
//           {rating && (
//             <span className="flex items-center gap-1 text-xs text-black sm:text-sm">
//               <span className="flex" aria-hidden="true">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     className="h-3 w-3 fill-black"
//                     strokeWidth={0}
//                   />
//                 ))}
//               </span>
//               <span className="sr-only">Rated</span>
//               {rating}
//             </span>
//           )}
//         </div>

//         <div className="mt-auto flex gap-2 pt-4">
//           <Link
//             href={href}
//             className="flex-1 bg-[#C5A84C] px-4 py-2.5 text-center text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
//           >
//             {buyNowLabel}
//           </Link>
//           <button
//             type="button"
//             onClick={() => onAddToCart?.(product)}
//             aria-label={`Add ${name} to cart`}
//             className="border border-black px-3 text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:bg-[#A88C35] active:text-white"
//           >
//             <ShoppingBag
//               className="h-4 w-4"
//               strokeWidth={1.5}
//               aria-hidden="true"
//             />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }
