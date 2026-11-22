"use client";

import { useState } from "react";
import { useCartItems } from "@/lib/checkoutStore";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import YouMayAlsoLike from "@/components/cart/YouMayAlsoLike";
// Dummy coupons: code -> discount percent
const COUPONS = { WELLNESS10: 10 };

export default function CartContent() {
  const { items, loading, changeQty, removeItem } = useCartItems();
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyCoupon = (code) => {
    const percent = COUPONS[code.toUpperCase()];
    setDiscountPercent(percent || 0);
    return Boolean(percent);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading) return null;

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
          blocked={items.some((i) => !i.inStock || i.qty > i.stock)}
        />
      </section>

      <YouMayAlsoLike />
    </>
  );
}