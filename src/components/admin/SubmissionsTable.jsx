"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import Pagination from "@/components/shared/Pagination";

const fmt = (d) =>
  new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const netMsg = (e, fallback) =>
  e instanceof TypeError ? "Network error. Check your connection." : e?.message || fallback;

const STATUS_STYLE = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-200 text-gray-700",
  resolved: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
  active: "bg-green-100 text-green-800",
  unsubscribed: "bg-gray-200 text-gray-700",
};
const label = (s) => s.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase());

// kind -> API + columns + detail fields. Shared by Appointments, Enquiries, Reviews and Subscribers.
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

const CONFIG = {
  reviews: {
    title: "Reviews",
    api: "/api/admin/reviews",
    statuses: ["pending", "approved", "rejected"],
    columns: [
      ["Product", (r) => <div className="max-w-[200px] font-medium">{r.productName || "—"}</div>],
      ["Review", (r) => (
        <>
          <div className="text-[#A88C35]" aria-label={`${r.rating} out of 5`}>{stars(r.rating)}</div>
          <div className="font-medium">{r.title}</div>
          {r.comment && <div className="line-clamp-2 max-w-xs text-gray-600">{r.comment}</div>}
        </>
      )],
      ["Customer", (r) => (<><div>{r.name}</div><div className="text-xs text-gray-500">{r.email}</div></>)],
    ],
    details: [
      ["Product", "productName"], ["Rating (out of 5)", "rating"], ["Title", "title"],
      ["Review text", "comment"], ["Customer", "name"], ["Email", "email"],
    ],
    hint: "Ratings are counted immediately. The review text appears on the site only when its status is Approved. If a review is rejected, its rating is removed as well.",
  },
  appointments: {
    title: "Appointments",
    api: "/api/admin/appointments",
    statuses: ["new", "confirmed", "completed", "cancelled"],
    columns: [
      ["Patient", (r) => (<><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.mobile}</div></>)],
      ["Appointment", (r) => (<><div>{r.date}</div><div className="text-xs text-gray-500">{r.time}</div></>)],
      ["Type / Reason", (r) => (<><div>{r.appointmentType}</div><div className="text-xs text-gray-500">{r.reason}</div></>)],
    ],
    details: [
      ["Name", "name"], ["Email", "email"], ["Mobile", "mobile"], ["Appointment type", "appointmentType"],
      ["Preferred date", "date"], ["Preferred time", "time"], ["Reason", "reason"], ["Message", "message"],
    ],
  },
  enquiries: {
    title: "Contact Enquiries",
    api: "/api/admin/enquiries",
    statuses: ["new", "in_progress", "resolved"],
    columns: [
      ["From", (r) => (<><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.mobile}</div></>)],
      ["Type", (r) => (<><div>{r.enquiryType}</div>{r.orderNumber && <div className="text-xs text-gray-500">Order: {r.orderNumber}</div>}</>)],
      ["Message", (r) => <div className="line-clamp-2 max-w-xs text-gray-600">{r.message}</div>],
    ],
    details: [
      ["Name", "name"], ["Email", "email"], ["Mobile", "mobile"], ["Enquiry type", "enquiryType"],
      ["Order number", "orderNumber"], ["Message", "message"],
    ],
  },
};

CONFIG.subscribers = {
  title: "Newsletter Subscribers",
  api: "/api/admin/subscribers",
  statuses: ["active", "unsubscribed"],
  columns: [
    ["Email", (r) => <div className="font-medium">{r.email}</div>],
    ["Source", (r) => <div className="capitalize text-gray-600">{r.source || "footer"}</div>],
  ],
  details: [["Email", "email"], ["Source", "source"]],
  hint: "Emails collected from the \"Stay in touch\" form in the footer.",
};

export default function SubmissionsTable({ kind }) {
  const cfg = CONFIG[kind];
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState({ items: [], pages: 1, total: 0, newCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [view, setView] = useState(null);
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const sp = new URLSearchParams({ page: String(page), limit: "20", q, status });
        const res = await fetch(`${cfg.api}?${sp}`, { cache: "no-store", signal: ctrl.signal });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load data.");
        setData(d);
      } catch (e) {
        if (e.name !== "AbortError") setError(netMsg(e, "Could not load data."));
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [cfg.api, q, status, page, reload, router]);

  const changeStatus = useCallback(
    async (row, next) => {
      if (busy || row.status === next) return;
      setBusy(true);
      try {
        const res = await fetch(`${cfg.api}/${row.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not update status.");
        setView((v) => (v && v.id === row.id ? { ...v, status: next } : v));
        setReload((n) => n + 1);
      } catch (e) {
        setNotice({ type: "error", text: netMsg(e, "Could not update status.") });
      } finally {
        setBusy(false);
      }
    },
    [busy, cfg.api, router]
  );

  async function confirmDelete() {
    if (!del || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`${cfg.api}/${del.id}`, { method: "DELETE" });
      if (res.status === 401) return router.replace("/admin/login");
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "Could not delete.");
      setNotice({ type: "success", text: "Deleted." });
      setView(null);
      if (data.items.length === 1 && page > 1) setPage((p) => p - 1);
      else setReload((n) => n + 1);
    } catch (e) {
      setNotice({ type: "error", text: netMsg(e, "Could not delete.") });
    } finally {
      setBusy(false);
      setDel(null);
    }
  }

  useEffect(() => {
    if (!view && !del) return;
    const onKey = (e) => {
      if (e.key !== "Escape" || busy) return;
      if (del) setDel(null);
      else setView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, del, busy]);

  const colCount = cfg.columns.length + 3;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold">{cfg.title}</h1>
        {data.newCount > 0 && <span className="bg-blue-100 px-2 py-1 text-xs text-blue-800">{data.newCount} new</span>}
      </div>

      {cfg.hint && <p className="mt-0.5 text-xs sm:text-sm text-gray-500">{cfg.hint}</p>}

      {notice && (
        <div
          role="status"
          className={`mt-4 flex items-start justify-between gap-3 border px-4 py-3 text-sm ${
            notice.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="leading-none">×</button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder={kind === "subscribers" ? "Search email..." : "Search name, email, mobile..."}
          className="w-full max-w-xs border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          aria-label="Filter by status"
          className="border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]"
        >
          <option value="">All statuses</option>
          {cfg.statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              {cfg.columns.map(([h]) => <th key={h} className="p-3">{h}</th>)}
              <th className="p-3">Received</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={colCount} className="p-6 text-center text-gray-500">Loading…</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={colCount} className="p-6 text-center text-gray-500">Nothing here yet.</td></tr>
            ) : (
              data.items.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 align-top last:border-0">
                  {cfg.columns.map(([h, render]) => <td key={h} className="p-3">{render(r)}</td>)}
                  <td className="p-3 text-gray-600">{fmt(r.createdAt)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs ${STATUS_STYLE[r.status] || ""}`}>{label(r.status)}</span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => setView(r)} title="View" aria-label="View" className="mr-4 inline-flex items-center text-[#A88C35] transition-colors hover:text-[#8A7229]"><Eye size={18} /></button>
                    <button onClick={() => setDel(r)} title="Delete" aria-label="Delete" className="inline-flex items-center text-[#E3122E] transition-colors hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination className="mt-4" page={page} pages={data.pages} total={data.total} limit={20} onChange={setPage} disabled={loading} />


      {view && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => !busy && setView(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Details"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">Details</h2>
              <button onClick={() => setView(null)} aria-label="Close" className="text-xl leading-none">×</button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Received {fmt(view.createdAt)}</p>

            <dl className="mt-4 space-y-3 text-sm">
              {cfg.details.map(([lbl, key]) =>
                view[key] ? (
                  <div key={key}>
                    <dt className="text-xs uppercase text-gray-500">{lbl}</dt>
                    <dd className="mt-0.5 whitespace-pre-wrap break-words">
                      {key === "email" ? <a className="text-[#A88C35] underline" href={`mailto:${view[key]}`}>{view[key]}</a>
                        : key === "mobile" ? <a className="text-[#A88C35] underline" href={`tel:${view[key]}`}>{view[key]}</a>
                        : view[key]}
                    </dd>
                  </div>
                ) : null
              )}
            </dl>

            <div className="mt-5">
              <label htmlFor="sub-status" className="text-xs uppercase text-gray-500">Status</label>
              <select
                id="sub-status"
                value={view.status}
                disabled={busy}
                onChange={(e) => changeStatus(view, e.target.value)}
                className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]"
              >
                {cfg.statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {del && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4" onClick={() => !busy && setDel(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="del-title" className="w-full max-w-sm rounded bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 id="del-title" className="text-lg font-semibold">Delete this entry?</h2>
            <p className="mt-2 text-sm text-gray-600">Entry from “{del.name || del.email}” will be permanently deleted. This cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setDel(null)} disabled={busy} className="border border-black px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-60">Cancel</button>
              <button onClick={confirmDelete} disabled={busy} className="bg-[#E3122E] px-4 py-2 text-sm text-white disabled:opacity-60">{busy ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}