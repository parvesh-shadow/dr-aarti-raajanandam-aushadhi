import { useSyncExternalStore } from "react";

// Client-side wishlist (localStorage) - sirf product ids. Details API se aati hain.
const WISH_KEY = "raa_wishlist";
export const WISH_EVENT = "raa-wishlist-updated";

const readIds = () => {
  try {
    const v = JSON.parse(window.localStorage.getItem(WISH_KEY));
    return Array.isArray(v) ? v.filter((x) => typeof x === "string" && x) : [];
  } catch {
    return [];
  }
};

const writeIds = (ids) => {
  try {
    window.localStorage.setItem(WISH_KEY, JSON.stringify(ids));
  } catch {}
  try {
    window.dispatchEvent(new Event(WISH_EVENT));
  } catch {}
};

export const getWishlist = readIds;
export const isInWishlist = (id) => readIds().includes(String(id));

export function addToWishlist(id) {
  const key = String(id ?? "");
  if (!key) return;
  const ids = readIds();
  if (!ids.includes(key)) writeIds([key, ...ids]);
}

export function removeFromWishlist(id) {
  const key = String(id ?? "");
  writeIds(readIds().filter((x) => x !== key));
}

// Add/remove toggle. Naya state (true = wishlist me hai) return karta hai.
export function toggleWishlist(id) {
  const key = String(id ?? "");
  if (!key) return false;
  const ids = readIds();
  if (ids.includes(key)) {
    writeIds(ids.filter((x) => x !== key));
    return false;
  }
  writeIds([key, ...ids]);
  return true;
}

// useSyncExternalStore ko stable (string) snapshot chahiye, isliye ids ko join karke dete hain.
const snapshot = () => readIds().join(",");
const subscribe = (cb) => {
  window.addEventListener(WISH_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(WISH_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

export function useWishlistIds() {
  const s = useSyncExternalStore(subscribe, snapshot, () => "");
  return s ? s.split(",") : [];
}

export const useWishlistCount = () => useWishlistIds().length;

export function useIsWishlisted(id) {
  return useWishlistIds().includes(String(id));
}
