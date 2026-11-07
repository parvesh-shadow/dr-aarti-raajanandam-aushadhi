"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENTS = ["pending", "paid", "failed", "refunded"];
const input = "w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  function apply(o) {
    setOrder(o);
    setStatus(o.status);
    setPaymentStatus(o.paymentStatus);
    setTrackingId(o.trackingId || "");
  }

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`, { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || "Could not load order.");
        apply(d.order);
      })
      .catch((e) => setMsg({ type: "error", text: e.message }));
  }, [id]);

  async function save() {
    if (status === "Cancelled" && order.status !== "Cancelled" && !confirm("Cancel this order? Stock will be returned and this cannot be undone.")) return;
    setSaving(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, paymentStatus, trackingId }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Could not update order.");
      apply(d.order);
      setMsg({ type: "ok", text: "Order updated." });
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  if (!order) return <p className="text-sm text-gray-600">{msg.text || "Loading…"}</p>;
  const locked = order.status === "Cancelled";
  const s = order.shipping || {};

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-[#A88C35] hover:underline">← All orders</Link>
      <h1 className="mt-2 text-2xl font-semibold">Order {order.orderNumber}</h1>
      <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleString("en-IN")}</p>

      {msg.text && (
        <p className={`mt-4 border p-3 text-sm ${msg.type === "ok" ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-700"}`}>{msg.text}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Items</h2>
            <div className="mt-3 divide-y divide-gray-100">
              {order.items.map((i, idx) => (
                <div key={idx} className="flex items-center gap-3 py-3">
                  {i.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={i.image} alt="" className="h-12 w-12 border border-gray-200 object-cover" />
                  ) : (
                    <div className="h-12 w-12 border border-gray-200 bg-gray-100" />
                  )}
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-gray-500">₹{i.price} × {i.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₹{i.price * i.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{order.shippingFee ? `₹${order.shippingFee}` : "Free"}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>₹{order.total}</span></div>
            </div>
          </div>

          <div className="rounded border border-gray-200 bg-white p-5 text-sm">
            <h2 className="font-semibold">Delivery address</h2>
            <p className="mt-2 font-medium">{s.fullName}</p>
            <p>{s.address}</p>
            <p>{s.city}, {s.state} - {s.pincode}</p>
            <p className="mt-2">Phone: {s.phone}</p>
            {s.email && <p>Email: {s.email}</p>}
            <p className="mt-2 text-gray-500">{order.user ? "Registered customer" : "Guest checkout"}</p>
          </div>
        </div>

        <div className="h-fit space-y-4 rounded border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Manage order</h2>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Order status</label>
            <select className={input} value={status} onChange={(e) => setStatus(e.target.value)} disabled={locked}>
              {STATUSES.map((x) => <option key={x}>{x}</option>)}
            </select>
            {locked && <p className="mt-1 text-xs text-gray-500">Cancelled orders cannot be changed.</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Payment ({order.paymentMethod.toUpperCase()})</label>
            <select className={input} value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
              {PAYMENTS.map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Tracking ID</label>
            <input className={input} value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Courier tracking number" />
          </div>
          <button onClick={save} disabled={saving} className="w-full bg-[#C5A84C] px-4 py-2.5 text-sm text-white hover:bg-[#A88C35] disabled:opacity-60">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
