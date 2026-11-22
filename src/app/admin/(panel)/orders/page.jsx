"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import { Eye, Trash2 } from "lucide-react";

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
const STATUS_STYLE = {
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [status, setStatus] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ orders: [], pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const sp = new URLSearchParams({ page: String(page), q });
        if (status !== "All") sp.set("status", status);
        const res = await fetch(`/api/admin/orders?${sp}`, {
          cache: "no-store",
        });
        const d = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(d.error || "Could not load orders.");
        setData(d);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [status, q, page]);

  async function remove(o) {
    const active = o.status === "Processing" || o.status === "Shipped";
    const msg = `Delete order ${o.orderNumber}? This cannot be undone.${active ? " Stock will be returned." : ""}`;
    if (!confirm(msg)) return;
    setDeletingId(o._id);
    setError("");
    try {
      const res = await fetch(`/api/admin/orders/${o._id}`, {
        method: "DELETE",
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Could not delete order.");
      const left = data.orders.filter((x) => x._id !== o._id);
      setData({
        ...data,
        orders: left,
        total: Math.max(0, (data.total || 1) - 1),
      });
      if (left.length === 0 && page > 1) setPage(page - 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setStatus(f);
              setPage(1);
            }}
            className={`border px-4 py-1.5 text-sm ${status === f ? "border-[#C5A84C] bg-[#C5A84C] text-white" : "border-black bg-white hover:bg-gray-100"}`}
          >
            {f}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Order no., name or phone"
          className="ml-auto w-full max-w-xs border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : data.orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              data.orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="p-3">
                    <Link
                      href={`/admin/orders/${o._id}`}
                      className="font-medium text-[#A88C35] hover:underline"
                    >
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="p-3">
                    {o.shipping?.fullName}
                    <div className="text-xs text-gray-500">
                      {o.shipping?.phone}
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(o.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-3 uppercase text-gray-600">
                    {o.paymentMethod} ·{" "}
                    <span className="normal-case">{o.paymentStatus}</span>
                  </td>
                  <td className="p-3">₹{o.total}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs ${STATUS_STYLE[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/orders/${o._id}`}
                      title="View"
                      aria-label="View"
                      className="mr-4 inline-flex items-center text-[#A88C35] transition-colors hover:text-[#8A7229]"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => remove(o)}
                      disabled={deletingId === o._id}
                      title="Delete"
                      aria-label="Delete"
                      className="inline-flex items-center text-[#E3122E] transition-colors hover:text-red-700 disabled:opacity-40"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination className="mt-4" page={page} pages={data.pages} total={data.total} limit={20} onChange={setPage} disabled={loading} />

    </div>
  );
}