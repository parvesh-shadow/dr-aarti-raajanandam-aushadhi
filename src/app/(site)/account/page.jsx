"use client";

import { useEffect, useState } from "react";
import TitleDescription from "@/components/shared/TitleDescription";
import OrderCard from "@/components/account/OrderCard";

const pad = (n) => String(n).padStart(2, "0");

// "Today, 10:42 AM" / "Yesterday, 09:15 PM" / "03 Nov 2026, 10:42 AM"
function formatLastLogin(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
  const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((startOf(new Date()) - startOf(d)) / 86400000);
  if (days === 0) return `Today, ${time}`;
  if (days === 1) return `Yesterday, ${time}`;
  return `${d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}, ${time}`;
}

export default function AccountDashboard() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let alive = true;
    fetch("/api/account/dashboard", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        setData(d);
        setState("ready");
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, []);

  const st = data?.stats;
  const val = (n) => (state === "ready" ? pad(n ?? 0) : "--");
  const stats = [
    { value: val(st?.total), label: "Total Orders", hint: "A record of your wellness journey" },
    { value: val(st?.active), label: "Active Orders", hint: "Currently on the way to you" },
    { value: val(st?.delivered), label: "Delivered Orders", hint: "Completed with care" },
    { value: val(st?.addresses), label: "Saved Addresses", hint: "For a smoother checkout" },
  ];
  const lastLogin = formatLastLogin(data?.lastLoginAt);
  const orders = data?.orders || [];

  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">
          Your wellness, all in one place
        </h2>
        {lastLogin && (
          <p className="text-xs text-gray-800 sm:text-sm">Last signed in · {lastLogin}</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-gray-200 bg-white p-4">
            <p className="text-2xl font-medium text-black xl:text-[34px]">{s.value}</p>
            <p className="mt-4 text-sm font-semibold text-black sm:text-base xl:text-[20px]">{s.label}</p>
            <p className="mt-1 text-xs text-gray-800 sm:text-[15px] ">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <TitleDescription
          heading="Your Recent Orders"
          description="Review previous purchases, check delivery status, and open order details"
          buttonText="View All Orders"
          buttonHref="/account/order"
        />
        <div className="mt-6 flex flex-col gap-4">
          {state === "loading" && <p className="text-sm text-gray-600">Loading your orders...</p>}
          {state === "error" && <p className="text-sm text-[#E3122E]">Could not load your dashboard. Please refresh.</p>}
          {state === "ready" && orders.length === 0 && (
            <p className="text-sm text-gray-600">You have not placed any orders yet.</p>
          )}
          {orders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
