"use client";
import { Share2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Download, Lock, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { addToCart } from "@/lib/checkoutStore";

export default function ProductInfo({ product, className = "" }) {
  const {
    id,
    category,
    name,
    rating,
    reviewCount,
    price,
    stock,
    description,
    netQuantity,
    type,
    brochureHref = "#",
  } = product;

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const changeQty = (value) => {
    setQty(Math.min(Math.max(value, 1), Math.max(stock, 1)));
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (stock < 1) return;
    addToCart(id, qty);
    setAdded(true);
  };

  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-gray-100 font-semibold px-3 py-0.5 text-xs lg:text-sm text-gray-600">
            {category}
          </span>
          <h1 className="mt-2 xl:text-[40px] lg:text-[32px] text-2xl  font-semibold leading-tight text-gray-800">
            {name}
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center gap-3">
          <Link
          href={brochureHref}
          className="inline-flex shrink-0 items-center gap-1 text-xs text-black transition-colors hover:text-[#A88C35] sm:text-sm"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Brochure
        </Link>
        <Share2 size={20} strokeWidth={1.8} />
        </div>
      </div>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-4  text-gray-800 text-sm">
        <span className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#C5A84C] text-[#C5A84C]" aria-hidden="true" />
          ))}
        </span>
        <span className="font-bold">{rating}</span>
        <span>{reviewCount} verified reviews</span>
      </div>

      {/* Price */}
      <p className="mt-4 text-[36px] font-semibold text-gray-800">₹{price}</p>
      <p className="text-xs lg:text-sm text-gray-600 -mt-2">Inclusive of all taxes</p>

      <p className="mt-1.5 text-sm text-black sm:text-base font-medium text-gray-600">
        Availability: <span className="font-bold text-lg text-gray-900">In stock</span> {stock} available
      </p>

      <p className="mt-3 text-xs text-gray-800 sm:text-sm">{description}</p>

      {/* Quick details */}
      <dl className="mt-4 grid grid-cols-3 divide-x divide-gray-200 border border-gray-200 text-center">
        {[
          ["Category", category],
          ["Net quantity", netQuantity],
          ["Product type", type],
        ].map(([label, value]) => (
          <div key={label} className="px-2 py-3">
            <dt className="text-xs sm:text-sm text-gray-700">{label}</dt>
            <dd className="mt-1 text-sm  font-semibold text-[#A88C35] sm:text-base">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Quantity */}
      <div className="mt-4 flex items-center gap-3 text-xs text-black sm:text-sm">
        <span>Quantity :</span>
        <div className="flex items-center border border-gray-300">
          <button
            type="button"
            onClick={() => changeQty(qty - 1)}
            aria-label="Decrease quantity"
            className="p-2 transition-colors hover:text-[#A88C35]"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center" aria-live="polite">
            {String(qty).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => changeQty(qty + 1)}
            aria-label="Increase quantity"
            className="p-2 transition-colors hover:text-[#A88C35]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Add to cart
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <Link
          href="/checkout"
          onClick={() => stock > 0 && addToCart(id, qty)}
          className="border border-[#C5A84C] px-4 py-3 text-center text-xs text-[#A88C35] transition-colors hover:bg-[#A88C35] hover:text-white active:bg-[#A88C35] active:text-white sm:text-sm"
        >
          Buy Now
        </Link>
      </div>

      {added && (
        <p role="status" className="mt-2 text-xs text-[#A88C35]">
          {qty} item(s) added to cart.
        </p>
      )}

      <p className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-800">
        <Lock className="h-3 w-3" aria-hidden="true" />
        <span className="font-semibold">Secure checkout</span>
        <span>Product information available below</span>
      </p>
    </div>
  );
}