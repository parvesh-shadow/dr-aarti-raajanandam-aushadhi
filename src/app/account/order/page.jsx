"use client";

import { useState } from "react";
import TitleDescription from "@/components/shared/TitleDescription";
import OrderCard from "@/components/account/OrderCard";

const filters = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

const orders = [
  {
    orderNumber: "RAA-10245",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Delivered",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10245",
  },
  {
    orderNumber: "RAA-10246",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Shipped",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10246",
  },
  {
    orderNumber: "RAA-10247",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Processing",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10247",
  },
  {
    orderNumber: "RAA-10248",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Cancelled",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10248",
  },
];

export default function OrderPage() {
  const [active, setActive] = useState("All");

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
            No {active.toLowerCase()} orders found.
          </p>
        )}
      </div>
    </div>
  );
}