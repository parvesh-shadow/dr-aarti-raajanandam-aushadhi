"use client";

import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function Product({
  product,
  onAddToCart,
  className = "",
  buyNowLabel = "Buy Now",
}) {
  const {
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

  return (
    <article
      className={`flex h-full flex-col border border-gray-200 bg-white p-3 sm:p-4 ${className}`}
    >
      <Link
        href={href}
        className="relative block h-44 sm:h-52 "
        aria-label={`View ${name}`}
      >
        {category && (
          <span className="absolute left-0 top-0 z-10 rounded-full font-semibold bg-gray-100 px-3 py-0.5 text-xs text-gray-600">
            {category}
          </span>
        )}

        <ImagePlaceholder
          src={image}
          alt={name}
          label="Product"
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          imageClassName="object-contain p-4"
          className="h-full w-full bg-white"
        />

        {inStock && (
          <span className="absolute bottom-0 right-0 z-10 text-xs font-medium text-black sm:text-sm">
            In Stock
          </span>
        )}
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2  xl:text-xl text-lg font-semibold  text-gray-800 ">
          {name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-600 sm:text-sm">
          {description}
        </p>
        {pack && <p className="mt-2 text-sm text-gray-800 ">{pack}</p>}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">₹{price}</span>
          {rating && (
            <span className="flex items-center gap-1 text-xs text-black sm:text-sm">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-black"
                    strokeWidth={0}
                  />
                ))}
              </span>
              <span className="sr-only">Rated</span>
              {rating}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={href}
            className="flex-1 bg-[#C5A84C] px-4 py-2.5 text-center text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
          >
            {buyNowLabel}
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${name} to cart`}
            className="border border-black px-3 text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:bg-[#A88C35] active:text-white"
          >
            <ShoppingBag
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
