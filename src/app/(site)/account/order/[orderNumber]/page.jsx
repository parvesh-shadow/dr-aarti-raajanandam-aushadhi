"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const PAY_LABEL = { upi: "UPI", card: "Credit / Debit Card", netbanking: "Net Banking", cod: "Cash on Delivery" };

export default function OrderDetailPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderNumber}`, { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || "Order not found.");
        setOrder(d.order);
      })
      .catch((e) => setError(e.message));
  }, [orderNumber]);

  async function cancel() {
    if (!confirm("Cancel this order?")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Could not cancel order.");
      setOrder(d.order);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (!order) return <p className="text-sm text-gray-600">{error || "Loading…"}</p>;
  const s = order.shipping || {};

  return (
    <div>
      <Link href="/account/order" className="text-sm text-[#A88C35] hover:underline">← Back to orders</Link>
      <h1 className="mt-2 text-xl font-semibold sm:text-2xl">Order {order.orderNumber}</h1>
      <p className="mt-1 text-sm text-gray-600">
        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} · Status: <b>{order.status}</b>
      </p>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 border border-gray-200">
        {order.items.map((i, idx) => (
          <div key={idx} className="flex items-center gap-4 border-b border-gray-200 p-4 last:border-0">
            {i.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={i.image} alt={i.name} className="h-16 w-16 object-cover" />
            ) : (
              <div className="h-16 w-16 bg-gray-100" />
            )}
            <div className="flex-1 text-sm">
              <Link href={`/products/${i.slug}`} className="font-medium hover:underline">{i.name}</Link>
              <p className="text-gray-500">₹{i.price} × {i.quantity}</p>
            </div>
            <p className="text-sm font-medium">₹{i.price * i.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 text-sm sm:grid-cols-2">
        <div className="border border-gray-200 p-4">
          <h2 className="font-semibold">Delivery address</h2>
          <p className="mt-2">{s.fullName}</p>
          <p>{s.address}</p>
          <p>{s.city}, {s.state} - {s.pincode}</p>
          <p className="mt-1">Phone: {s.phone}</p>
          {order.trackingId && <p className="mt-2">Tracking ID: <b>{order.trackingId}</b></p>}
        </div>
        <div className="border border-gray-200 p-4">
          <h2 className="font-semibold">Payment summary</h2>
          <p className="mt-2 text-gray-600">{PAY_LABEL[order.paymentMethod]} · {order.paymentStatus}</p>
          <div className="mt-3 flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{order.shippingFee ? `₹${order.shippingFee}` : "Free"}</span></div>
          <div className="mt-1 flex justify-between border-t border-gray-200 pt-2 font-semibold"><span>Total</span><span>₹{order.total}</span></div>
        </div>
      </div>

      {order.status === "Processing" && (
        <button onClick={cancel} disabled={busy} className="mt-6 border border-red-600 px-5 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60">
          {busy ? "Cancelling…" : "Cancel order"}
        </button>
      )}
    </div>
  );
}
