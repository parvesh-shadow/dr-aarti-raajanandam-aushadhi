"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, Search, Video, Building2, RotateCcw, X } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import Pagination from "@/components/shared/Pagination";

const FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "new" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS = {
  new: { text: "Pending", cls: "bg-[#FFF0A8] text-black" },
  confirmed: { text: "Confirmed", cls: "bg-[#7CF26B] text-black" },
  completed: { text: "Completed", cls: "bg-[#A8DAFF] text-black" },
  cancelled: { text: "Cancelled", cls: "bg-[#FFC9CF] text-black" },
};

const fmtDate = (ymd) => {
  const d = new Date(`${ymd}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? ymd
    : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};
const fmtBooked = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function AppointmentsPage() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState({ items: [], total: 0, pages: 1, counts: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [target, setTarget] = useState(null); // cancel confirm
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const sp = new URLSearchParams({ page: String(page), limit: "20", q, status });
        const res = await fetch(`/api/appointments?${sp}`, { cache: "no-store", signal: ctrl.signal });
        if (res.status === 401) return router.replace("/auth/login?next=/account/appointments");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load your appointments.");
        setData(d);
      } catch (e) {
        if (e.name !== "AbortError")
          setError(e instanceof TypeError ? "Network error. Please check your connection." : e.message);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, status, page, reload, router]);

  useEffect(() => {
    if (!target) return;
    const onKey = (e) => e.key === "Escape" && !busy && setTarget(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, busy]);

  const confirmCancel = useCallback(async () => {
    if (!target || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/appointments/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "Could not cancel the appointment.");
      setNotice({ type: "success", text: "Your appointment has been cancelled." });
      setReload((n) => n + 1);
    } catch (e) {
      setNotice({ type: "error", text: e instanceof TypeError ? "Network error. Please try again." : e.message });
    } finally {
      setBusy(false);
      setTarget(null);
    }
  }, [target, busy]);

  const totalAll = Object.values(data.counts || {}).reduce((a, b) => a + b, 0);
  const countFor = (v) => (v ? data.counts?.[v] ?? 0 : totalAll);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <TitleDescription
            heading="My Appointments"
            description="Track your consultation requests with Dr. Arti Panwar and view their current status."
          />
        </div>
        <Link
          href="/appointment"
          className="inline-flex h-10 items-center bg-[#C5A84C] px-5 text-xs uppercase text-white transition-colors hover:bg-[#A88C35] sm:text-sm"
        >
          Book New
        </Link>
      </div>

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

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Filter appointments">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            type="button"
            role="tab"
            aria-selected={status === f.value}
            onClick={() => { setStatus(f.value); setPage(1); }}
            className={`h-10 min-w-[90px] border px-5 text-xs transition-colors sm:text-sm ${
              status === f.value
                ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                : "border-black bg-white text-black hover:border-[#C5A84C] hover:text-[#C5A84C]"
            }`}
          >
            {f.label}
            {!loading && <span className="ml-1.5 opacity-70">({countFor(f.value)})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mt-4 max-w-sm">
        <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder="Search type, reason or date"
          aria-label="Search appointments"
          className="h-11 w-full border border-gray-200 bg-[#F4F4F4] pl-9 pr-3 text-sm outline-none focus:border-[#C5A84C]"
        />
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-[#E3122E]">{error}</p>}

      {/* List */}
      <div className="mt-6 flex flex-col gap-4">
        {data.items.length > 0 ? (
          data.items.map((a) => {
            const st = STATUS[a.status] || STATUS.new;
            const online = /online/i.test(a.appointmentType);
            const Icon = online ? Video : Building2;
            const canCancel = a.status === "new" || a.status === "confirmed";
            return (
              <article key={a.id} className="flex flex-col gap-4 border border-gray-200 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-black sm:text-sm">BOOKED ON {fmtBooked(a.createdAt).toUpperCase()}</p>
                  <h2 className="mt-2 flex items-center gap-2 text-base font-semibold text-black xl:text-[22px]">
                    <Icon size={20} aria-hidden="true" className="shrink-0 text-[#A88C35]" />
                    {a.appointmentType} | {a.name} • {a.mobile} 
                  </h2>
                  <p className="mt-1 text-sm text-gray-800">Reason: {a.reason}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs  gap-4 xl:gap-5 text-black sm:text-sm">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={16} aria-hidden="true" />{fmtDate(a.date)}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock size={16} aria-hidden="true" />{a.time}</span>
                  </p>
                  {a.message && <p className="mt-2 line-clamp-2 text-xs text-gray-600 sm:text-sm">“{a.message}”</p>}
                </div>

                <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className={`px-3 py-1 text-xs font-medium ${st.cls}`}>{st.text}</span>
                  {canCancel && (
                    <button
                      type="button"
                      onClick={() => setTarget(a)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E3122E] hover:underline sm:text-sm"
                    >
                      <X size={16} aria-hidden="true" /> Cancel
                    </button>
                  )}
                  {a.status === "cancelled" && (
                    <Link href="/appointment" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A88C35] hover:underline sm:text-sm">
                      <RotateCcw size={16} aria-hidden="true" /> Book again
                    </Link>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <p className="border border-gray-200 p-8 text-center text-sm text-gray-600 sm:text-base">
            {loading
              ? "Loading your appointments..."
              : q
                ? "No appointments match your search."
                : status
                  ? `No ${STATUS[status].text.toLowerCase()} appointments found.`
                  : "You have not booked any appointments yet."}
            {!loading && !q && !status && (
              <>
                {" "}
                <Link href="/appointment" className="font-semibold text-[#A88C35] underline">Book your first appointment</Link>
              </>
            )}
          </p>
        )}
      </div>

      <Pagination className="mt-6" page={page} pages={data.pages} total={data.total} limit={20} onChange={setPage} disabled={loading} />

      {target && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => !busy && setTarget(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="cancel-title" className="w-full max-w-sm rounded bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 id="cancel-title" className="text-lg font-semibold">Cancel this appointment?</h2>
            <p className="mt-2 text-sm text-gray-600">
              {target.appointmentType} on {fmtDate(target.date)}, {target.time} will be cancelled.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setTarget(null)} disabled={busy} className="border border-black px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-60">Keep it</button>
              <button onClick={confirmCancel} disabled={busy} className="bg-[#E3122E] px-4 py-2 text-sm text-white disabled:opacity-60">{busy ? "Cancelling..." : "Yes, cancel"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
