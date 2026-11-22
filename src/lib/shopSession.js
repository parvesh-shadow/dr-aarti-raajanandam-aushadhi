import { useSyncExternalStore } from "react";

// Cart + wishlist ka ek hi source:
//  - Guest (login nahi)  -> localStorage ("guest" keys)
//  - Logged-in user      -> database (User.cart / User.wishlist), memory me cache
// Login hote hi guest ka data DB me merge hota hai aur guest localStorage saaf ho jaata hai,
// isliye ek browser par alag-alag users ka data kabhi mix nahi hota.

export const MAX_QTY = 10;

const KEY = { cart: "raa_cart_guest", wish: "raa_wishlist_guest", ship: "raa_shipping" };
const LEGACY = { cart: "raa_cart", wish: "raa_wishlist" }; // purani (shared) keys -> guest me migrate
const EVENT = "raa-shop-updated";
const API = "/api/account/shopping";

const isBrowser = () => typeof window !== "undefined";

const readLocal = (key, fallback) => {
  try {
    const v = JSON.parse(window.localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const writeLocal = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
const removeLocal = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch {}
};

const cleanCart = (c) =>
  Array.isArray(c)
    ? c.filter((i) => i && typeof i.productId === "string" && Number.isInteger(i.quantity) && i.quantity > 0)
    : [];
const cleanWish = (w) =>
  Array.isArray(w) ? [...new Set(w.filter((x) => typeof x === "string" && x))] : [];

let loaded = false;
let userId = null; // null = guest
let ready = false; // pehla login-status check ho chuka hai
let cart = [];
let wish = [];
let dirty = false;
let pushTimer = null;

const emit = () => {
  try {
    window.dispatchEvent(new Event(EVENT));
  } catch {}
};

function loadGuest() {
  cart = cleanCart(readLocal(KEY.cart, []));
  wish = cleanWish(readLocal(KEY.wish, []));
}

function flushPush() {
  clearTimeout(pushTimer);
  pushTimer = null;
  if (!dirty || !userId) return;
  dirty = false;
  try {
    fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, wishlist: wish }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

function schedulePush() {
  dirty = true;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(flushPush, 300);
}

function ensureLoaded() {
  if (loaded || !isBrowser()) return;
  loaded = true;
  // Purani shared keys ka data guest me le aao (ek baar)
  for (const [k, legacyKey] of [
    ["cart", LEGACY.cart],
    ["wish", LEGACY.wish],
  ]) {
    const old = readLocal(legacyKey, null);
    if (old !== null) {
      if (readLocal(KEY[k], null) === null) writeLocal(KEY[k], old);
      removeLocal(legacyKey);
    }
  }
  loadGuest();
  window.addEventListener("pagehide", flushPush);
  // Dusre tab me guest data badle to yahan bhi update
  window.addEventListener("storage", (e) => {
    if (userId || (e.key !== KEY.cart && e.key !== KEY.wish && e.key !== null)) return;
    loadGuest();
    emit();
  });
}

// ---- cart / wishlist read-write ----
export function getStoredCart() {
  ensureLoaded();
  return cart;
}
export function setStoredCart(items) {
  ensureLoaded();
  cart = cleanCart(items);
  if (userId) schedulePush();
  else writeLocal(KEY.cart, cart);
  emit();
}
export function getStoredWishlist() {
  ensureLoaded();
  return wish;
}
export function setStoredWishlist(ids) {
  ensureLoaded();
  wish = cleanWish(ids);
  if (userId) schedulePush();
  else writeLocal(KEY.wish, wish);
  emit();
}

// ---- checkout address (user ke hisaab se alag key) ----
const shipKey = () => `${KEY.ship}_${userId || "guest"}`;
export const getShippingDetails = () => {
  ensureLoaded();
  return readLocal(shipKey(), null);
};
export const setShippingDetails = (v) => {
  ensureLoaded();
  writeLocal(shipKey(), v);
};
export const clearShippingDetails = () => {
  ensureLoaded();
  removeLocal(shipKey());
};

// ---- subscribe / hooks ----
export function subscribeShop(cb) {
  ensureLoaded();
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
export const useShopReady = () =>
  useSyncExternalStore(subscribeShop, () => ready, () => false);

// ---- login-status sync ----
async function applyUser(user) {
  ensureLoaded();
  if (!user) {
    if (userId !== null) {
      // logout: pending save band, memory saaf, guest (khali) state
      userId = null;
      dirty = false;
      clearTimeout(pushTimer);
      loadGuest();
    }
    return;
  }
  if (userId === user.id) return; // is user ka data pehle se load hai

  // Guest ka localStorage data DB me merge karo; DB ka final data wapas aata hai
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      cart: cleanCart(readLocal(KEY.cart, [])),
      wishlist: cleanWish(readLocal(KEY.wish, [])),
    }),
  });
  const d = res.ok ? await res.json().catch(() => null) : null;
  if (!d?.ok) return; // guest state rehne do, agle sync par dobara try hoga

  dirty = false;
  clearTimeout(pushTimer);
  userId = user.id;
  cart = cleanCart(d.cart);
  wish = cleanWish(d.wishlist);
  removeLocal(KEY.cart);
  removeLocal(KEY.wish);
}

let chain = Promise.resolve(null);
let lastUser = null;

// /api/auth/me check karta hai aur cart/wishlist ko login status ke saath sync karta hai.
// Navbar har page change par, aur login/register ke baad ye chalta hai. Return: user ya null.
export function syncShopSession() {
  chain = chain.then(async () => {
    let user = null;
    let failed = false;
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : null;
      user = data?.user ?? null;
    } catch {
      failed = true; // network error: pehle jaisa hi rehne do
    }
    if (!failed) {
      try {
        await applyUser(user);
      } catch {}
      lastUser = user;
    }
    ready = true;
    emit();
    return lastUser;
  });
  return chain;
}
