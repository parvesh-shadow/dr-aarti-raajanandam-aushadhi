"use client";

import { useEffect, useState } from "react";
import TitleDescription from "@/components/shared/TitleDescription";
import OrderCard from "@/components/account/OrderCard";

const filters = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

export default function OrderPage() {
  const [active, setActive] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/orders", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => alive && setOrders(d.orders || []))
      .catch(() => alive && setFailed(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const filteredOrders =
    active === "All" ? orders : orders.filter((o) => o.status === active);

  return (
    <div>
      <TitleDescription
        heading="Your Recent Orders"
        description="Review previous purchases, check delivery status, and open individual order details."
      />

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Filter orders">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`h-10 min-w-[90px] border px-5 text-xs transition-colors sm:text-sm ${
              active === f
                ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                : "border-black bg-white text-black hover:border-[#C5A84C] hover:text-[#C5A84C]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="mt-6 flex flex-col gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} />
          ))
        ) : (
          <p className="border border-gray-200 p-8 text-center text-sm text-gray-600 sm:text-base">
            {loading
              ? "Loading your orders..."
              : failed
                ? "Could not load your orders. Please refresh."
                : active === "All"
                  ? "You have not placed any orders yet."
                  : `No ${active.toLowerCase()} orders found.`}
          </p>
        )}
      </div>
    </div>
  );
}