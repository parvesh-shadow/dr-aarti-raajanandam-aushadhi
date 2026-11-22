import { useEffect, useState, useSyncExternalStore } from "react";
import {
  MAX_QTY,
  clearShippingDetails,
  getShippingDetails,
  getStoredCart,
  setShippingDetails,
  setStoredCart,
  subscribeShop,
  useShopReady,
} from "@/lib/shopSession";

// Client-side cart + checkout details. Guest = localStorage, logged-in user = database
// (lib/shopSession.js dekho). Prices are always re-read from the DB.

export const getCart = getStoredCart;
export const saveCart = (items) => setStoredCart(items);

export function addToCart(productId, quantity = 1) {
  if (!productId) return;
  const cart = getCart().map((i) => ({ ...i }));
  const found = cart.find((i) => i.productId === productId);
  if (found) found.quantity = Math.min(MAX_QTY, found.quantity + quantity);
  else cart.push({ productId, quantity: Math.min(MAX_QTY, Math.max(1, quantity)) });
  saveCart(cart);
}

export const getShipping = getShippingDetails;
export const saveShipping = setShippingDetails;

export function clearCheckout() {
  clearShippingDetails();
  saveCart([]);
}

// Cart me alag-alag products ki ginti (quantity nahi). Navbar badge ke liye.
export const getCartCount = () => new Set(getCart().map((i) => i.productId)).size;

export function useCartCount() {
  return useSyncExternalStore(subscribeShop, getCartCount, () => 0);
}

// Cart items hydrated from the public product API (shape = CartItem props).
export function useCartItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const ready = useShopReady(); // login status check hone ke baad hi cart padho

  useEffect(() => {
    if (!ready) return;
    let alive = true;
    (async () => {
      const rows = await Promise.all(
        getCart().map(async (c) => {
          try {
            const res = await fetch(`/api/products/${c.productId}`, { cache: "no-store" });
            const data = await res.json().catch(() => ({}));
            const p = data.product;
            if (!res.ok || !p) return null;
            return {
              id: p.id,
              category: p.category,
              name: p.name,
              description: p.description,
              pack: p.pack,
              price: p.price,
              qty: Math.min(c.quantity, MAX_QTY),
              image: p.image,
              inStock: p.stock > 0,
              stock: p.stock || 0,
            };
          } catch {
            return null;
          }
        })
      );
      if (!alive) return;
      setItems(rows.filter(Boolean));
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [ready]);

  const commit = (next) => {
    setItems(next);
    saveCart(next.map((i) => ({ productId: i.id, quantity: i.qty })));
  };

  const changeQty = (id, qty) =>
    commit(items.map((i) => (i.id === id ? { ...i, qty: Math.min(Math.max(qty, 1), MAX_QTY) } : i)));
  const removeItem = (id) => commit(items.filter((i) => i.id !== id));

  return { items, loading, changeQty, removeItem };
}
