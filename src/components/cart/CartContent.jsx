"use client";

import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import YouMayAlsoLike from "@/components/cart/YouMayAlsoLike";
const cartImage='/medicine1.jpg';

// Dummy cart. Khali cart dekhne ke liye INITIAL_ITEMS = [] kar do ya item remove karo.
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

// Dummy coupons: code -> discount percent
const COUPONS = { WELLNESS10: 10 };

export default function CartContent() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [discountPercent, setDiscountPercent] = useState(0);

  const changeQty = (id, qty) => {
    const safeQty = Math.min(Math.max(qty, 1), 10);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: safeQty } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = (code) => {
    const percent = COUPONS[code.toUpperCase()];
    setDiscountPercent(percent || 0);
    return Boolean(percent);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Cart khali -> empty page
  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      <section
        aria-label="Cart items"
        className="mx-auto grid  gap-6  py-8  sm:py-12 lg:grid-cols-[1fr_340px] px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
      >
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id}>
              <CartItem item={item} onQtyChange={changeQty} onRemove={removeItem} />
            </li>
          ))}
        </ul>

        <OrderSummary
          subtotal={subtotal}
          discountPercent={discountPercent}
          onApplyCoupon={applyCoupon}
        />
      </section>

      <YouMayAlsoLike />
    </>
  );
}