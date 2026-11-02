"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Package } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";

const cartImage = "/medicine1.jpg";

const format = (n) => `₹${n.toLocaleString("en-IN")}`;

// Dummy order. Real cart data will come later.
const INITIAL_ITEMS = [
  {
    id: 1,
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily wellness routine.",
    pack: "800 mg • 60 Capsules",
    price: 1098,
    qty: 1,
    image: cartImage,
    inStock: true,
  },
];

export default function OrderReview({ paymentLabel = "Cash on Delivery" }) {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_ITEMS);

  const changeQty = (id, qty) => {
    const safeQty = Math.min(Math.max(qty, 1), 10);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: safeQty } : item)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleConfirm = () => {
    // No API. A dummy order number is created here.
    const orderNumber = `RAA-ORDER-${Date.now().toString().slice(-6)}`;
    router.push(`/checkout/success?order=${orderNumber}`);
  };

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

        <button
          type="button"
          onClick={handleConfirm}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Confirm
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}