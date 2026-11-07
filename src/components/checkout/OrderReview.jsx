"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import { clearCheckout, getShipping, useCartItems } from "@/lib/checkoutStore";
import { placeOrder } from "@/lib/orderClient";
import { calcShipping } from "@/lib/shipping";

const format = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function OrderReview({ paymentLabel = "Cash on Delivery", paymentMethod = "cod" }) {
  const router = useRouter();
  const { items, loading, changeQty, removeItem } = useCartItems();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = calcShipping(subtotal); // server jaisa hi rule
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleConfirm = async () => {
    if (submitting) return;
    const ship = getShipping();
    if (!ship) {
      router.push("/checkout");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { orderNumber } = await placeOrder({
        items: items.map((i) => ({ productId: i.id, quantity: i.qty })),
        shipping: ship,
        paymentMethod,
      });
      clearCheckout();
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch (e) {
      setError(e.message || "Could not place your order.");
      setSubmitting(false);
    }
  };

  if (loading) return null;
  if (items.length === 0) return <EmptyCart />;

  return (
    <section
      aria-labelledby="review-heading"
      className="mx-auto max-w-5xl  py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <div className="border border-gray-300 bg-white p-4 sm:p-6">
        <h2 id="review-heading" className="sr-only">
          Review your order
        </h2>

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id}>
              <CartItem item={item} onQtyChange={changeQty} onRemove={removeItem} />
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="flex items-center gap-2 text-sm font-medium text-black sm:text-base xl:text-[20px]">
          <Package className="h-4 w-4" aria-hidden="true" />
          Order summary
        </h3>

        <dl className="mt-4 space-y-3 text-xs text-black sm:text-sm xl:text-base">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold">{format(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-semibold">{format(shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="font-semibold">{format(discount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Payment</dt>
            <dd className="font-semibold">{paymentLabel}</dd>
          </div>
        </dl>

        <hr className="my-4 border-gray-200" />

        <div className="flex justify-between text-sm font-medium text-black sm:text-base xl:text-[20px]">
          <span>Estimated Total</span>
          <span>{format(total)}</span>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={submitting}
          className="mt-4 disabled:opacity-60 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          {submitting ? "Placing order..." : "Confirm"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Back options: koi error aaye to user phas na jaye */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <Link
            href="/checkout/payment"
            className="inline-flex items-center gap-1.5 text-black transition-colors hover:text-[#A88C35]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to payment
          </Link>
          <Link href="/checkout" className="text-[#A88C35] underline hover:text-[#C5A84C]">
            Edit delivery address
          </Link>
        </div>
      </div>
    </section>
  );
}