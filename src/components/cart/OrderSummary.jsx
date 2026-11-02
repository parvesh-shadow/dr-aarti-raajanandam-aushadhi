"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Package, ShieldCheck, Tag } from "lucide-react";

const format = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function OrderSummary({ subtotal, shipping = 0, discountPercent, onApplyCoupon }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal + shipping - discount;

  const handleApply = (e) => {
    e.preventDefault();
    const ok = onApplyCoupon(code.trim());
    setMessage(ok ? "Coupon applied." : "Invalid coupon code.");
  };

  return (
    <aside className="h-fit border border-gray-200 bg-white p-4 sm:p-5">
      {/* Promo */}
      <h2 className="flex items-center gap-2 text-sm font-medium text-black sm:text-base xl:text-[20px]">
        <Tag className="h-5 w-5" aria-hidden="true" />
        Have a Promo Code?
      </h2>
      <p className="mt-1 text-xs sm:text-sm  text-gray-800">
        Enter your discount code to check whether an offer is available.
      </p>

      <form onSubmit={handleApply} className="mt-3 flex border border-gray-300">
        <label htmlFor="coupon" className="sr-only">Coupon code</label>
        <input
          id="coupon"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setMessage("");
          }}
          placeholder="Enter coupon code"
          className="w-full px-3 py-2 text-xs text-black placeholder:text-gray-500 focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          className="bg-[#C5A84C] px-4 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Apply
        </button>
      </form>
      {message && (
        <p role="status" className="mt-2 text-xs sm:text-sm text-[#A88C35]">
          {message}
        </p>
      )}

      <hr className="my-4 border-gray-200" />

      {/* Summary */}
      <h2 className="flex items-center gap-2 text-sm font-medium text-black sm:text-base xl:text-[18px]">
        <Package className="h-5 w-5" aria-hidden="true" />
        Order summary
      </h2>

      <dl className="mt-4 space-y-3 text-xs text-black sm:text-base">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="font-medium">{format(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="font-medium">{format(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Discount</dt>
          <dd className="font-medium">{format(discount)}</dd>
        </div>
      </dl>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between text-sm font-medium text-black sm:text-base">
        <span>Estimated Total</span>
        <span>{format(total)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
      >
        Proceed to Checkout
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      <p className="mt-3 flex items-center justify-center gap-1 text-sm font-medium text-gray-800">
        <ShieldCheck className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
        Secure checkout
      </p>
    </aside>
  );
}