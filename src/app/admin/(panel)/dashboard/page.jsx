"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store", signal: ctrl.signal });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load dashboard.");
        setData(d);
      } catch (e) {
        if (e.name !== "AbortError") setError(e instanceof TypeError ? "Network error. Check your connection." : e.message);
      }
    })();
    return () => ctrl.abort();
  }, [router]);

  const s = data?.stats;
  const cards = [
    { label: "Total Products", value: s ? s.products : "—" },
    { label: "Total Orders", value: s ? s.orders : "—" },
    { label: "Customers", value: s ? s.customers : "—" },
    { label: "Revenue", value: s ? inr(s.revenue) : "—" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">Welcome back.</p>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-2 text-2xl font-semibold">{c.value}</p>
          </div>
        ))}
      </div>

      {data && (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Recent orders</h2>
            {data.recent?.length ? (
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                {data.recent.map((o) => (
                  <li key={o._id} className="flex items-center justify-between py-2">
                    <span>{o.orderNumber} <span className="text-gray-500">· {o.shipping?.fullName}</span></span>
                    <span>{inr(o.total)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No orders yet.</p>
            )}
          </div>
          <div className="rounded border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Low stock</h2>
            {data.lowStock?.length ? (
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                {data.lowStock.map((p) => (
                  <li key={p._id} className="flex items-center justify-between py-2">
                    <span>{p.name}</span>
                    <span className="text-red-700">{p.stock} left</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-500">All products are well stocked.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 rounded border border-gray-200 bg-white p-5">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="bg-[#C5A84C] px-4 py-2 text-sm text-white hover:bg-[#A88C35]">
            Add Product
          </Link>
          <Link href="/admin/products" className="border border-black px-4 py-2 text-sm hover:bg-gray-100">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
