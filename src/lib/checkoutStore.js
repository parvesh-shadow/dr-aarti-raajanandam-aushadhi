import { useEffect, useState, useSyncExternalStore } from "react";

// Client-side cart + checkout details (localStorage). Prices are always re-read from the DB.
const CART_KEY = "raa_cart";
const SHIP_KEY = "raa_shipping";
const MAX_QTY = 10;

const read = (key, fallback) => {
  try {
    const v = JSON.parse(window.localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export function getCart() {
  const c = read(CART_KEY, []);
  return Array.isArray(c)
    ? c.filter((i) => i && typeof i.productId === "string" && Number.isInteger(i.quantity) && i.quantity > 0)
    : [];
}

// Cart change hote hi ye event jaata hai, taaki Navbar ka count turant update ho.
export const CART_EVENT = "raa-cart-updated";
const notifyCart = () => {
  try {
    window.dispatchEvent(new Event(CART_EVENT));
  } catch {}
};

export const saveCart = (items) => {
  write(CART_KEY, items);
  notifyCart();
};

export function addToCart(productId, quantity = 1) {
  if (!productId) return;
  const cart = getCart();
  const found = cart.find((i) => i.productId === productId);
  if (found) found.quantity = Math.min(MAX_QTY, found.quantity + quantity);
  else cart.push({ productId, quantity: Math.min(MAX_QTY, Math.max(1, quantity)) });
  saveCart(cart);
}

export const getShipping = () => read(SHIP_KEY, null);
export const saveShipping = (shipping) => write(SHIP_KEY, shipping);

export function clearCheckout() {
  try {
    window.localStorage.removeItem(CART_KEY);
    window.localStorage.removeItem(SHIP_KEY);
  } catch {}
  notifyCart();
}

// Cart me alag-alag products ki ginti (quantity nahi). Navbar badge ke liye.
export const getCartCount = () => new Set(getCart().map((i) => i.productId)).size;

const subscribeCart = (cb) => {
  window.addEventListener(CART_EVENT, cb);
  window.addEventListener("storage", cb); // dusre tab me change ho to bhi update
  return () => {
    window.removeEventListener(CART_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

export function useCartCount() {
  return useSyncExternalStore(subscribeCart, getCartCount, () => 0);
}

// Cart items hydrated from the public product API (shape = CartItem props).
export function useCartItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const commit = (next) => {
    setItems(next);
    saveCart(next.map((i) => ({ productId: i.id, quantity: i.qty })));
  };

  const changeQty = (id, qty) =>
    commit(items.map((i) => (i.id === id ? { ...i, qty: Math.min(Math.max(qty, 1), MAX_QTY) } : i)));
  const removeItem = (id) => commit(items.filter((i) => i.id !== id));

  return { items, loading, changeQty, removeItem };
}
