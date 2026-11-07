// Checkout ke liye client helper.
// cart items: [{ productId, quantity }]   (productId = product ka MongoDB _id)
export async function placeOrder({ items, shipping, paymentMethod }) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, shipping, paymentMethod }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not place your order.");
  return data; // { ok, orderNumber, total }
}
