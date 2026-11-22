import { useSyncExternalStore } from "react";
import { getStoredWishlist, setStoredWishlist, subscribeShop } from "@/lib/shopSession";

// Client-side wishlist - sirf product ids. Guest = localStorage, logged-in user = database
// (lib/shopSession.js dekho). Details API se aati hain.

export const getWishlist = getStoredWishlist;
export const isInWishlist = (id) => getWishlist().includes(String(id));

export function addToWishlist(id) {
  const key = String(id ?? "");
  if (!key) return;
  const ids = getWishlist();
  if (!ids.includes(key)) setStoredWishlist([key, ...ids]);
}

export function removeFromWishlist(id) {
  const key = String(id ?? "");
  setStoredWishlist(getWishlist().filter((x) => x !== key));
}

// Add/remove toggle. Naya state (true = wishlist me hai) return karta hai.
export function toggleWishlist(id) {
  const key = String(id ?? "");
  if (!key) return false;
  const ids = getWishlist();
  if (ids.includes(key)) {
    setStoredWishlist(ids.filter((x) => x !== key));
    return false;
  }
  setStoredWishlist([key, ...ids]);
  return true;
}

// useSyncExternalStore ko stable (string) snapshot chahiye, isliye ids ko join karke dete hain.
const snapshot = () => getWishlist().join(",");

export function useWishlistIds() {
  const s = useSyncExternalStore(subscribeShop, snapshot, () => "");
  return s ? s.split(",") : [];
}

export const useWishlistCount = () => useWishlistIds().length;

export function useIsWishlisted(id) {
  return useWishlistIds().includes(String(id));
}
