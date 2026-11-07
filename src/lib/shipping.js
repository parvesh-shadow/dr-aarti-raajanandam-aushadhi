// Shipping rule: client (order review) aur server (order create) dono yahi use karte hain.
// Env se badal sakte ho: NEXT_PUBLIC_FREE_SHIPPING_ABOVE, NEXT_PUBLIC_SHIPPING_FEE
export const FREE_SHIPPING_ABOVE = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_ABOVE ?? 999);
export const SHIPPING_FEE = Number(process.env.NEXT_PUBLIC_SHIPPING_FEE ?? 99);

export const calcShipping = (subtotal) =>
  subtotal >= FREE_SHIPPING_ABOVE || subtotal === 0 ? 0 : SHIPPING_FEE;
