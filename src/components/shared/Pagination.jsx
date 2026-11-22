"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Page numbers with "…" (1 … 4 5 6 … 20)
function pageList(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, 2, pages - 1, pages, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("gap-" + n);
    out.push(n);
  });
  return out;
}

const btn =
  "inline-flex h-9 min-w-9 items-center justify-center border px-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";
const idle = "border-gray-300 bg-white text-black hover:border-[#C5A84C] hover:text-[#A88C35] disabled:hover:border-gray-300 disabled:hover:text-black";

// Shared pagination: First / Prev / 1 2 3 … / Next / Last + "Go to page" + "Showing x–y of z"
export default function Pagination({ page, pages, total, limit = 20, onChange, disabled = false, className = "" }) {
  const [jump, setJump] = useState("");
  if (!total) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(total, page * limit);
  const go = (p) => {
    const n = Math.min(pages, Math.max(1, p));
    if (n !== page && !disabled) onChange(n);
  };
  const submitJump = (e) => {
    e.preventDefault();
    const n = parseInt(jump, 10);
    if (Number.isFinite(n)) go(n);
    setJump("");
  };

  return (
    <div className={`flex flex-col items-center justify-between gap-3 text-sm lg:flex-row ${className}`}>
      <p className="text-gray-600">
        Showing <span className="font-medium text-black">{from}–{to}</span> of{" "}
        <span className="font-medium text-black">{total}</span>
      </p>

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1.5">
          <button type="button" onClick={() => go(1)} disabled={disabled || page <= 1} aria-label="First page" title="First page" className={`${btn} ${idle}`}>
            <ChevronsLeft size={16} />
          </button>
          <button type="button" onClick={() => go(page - 1)} disabled={disabled || page <= 1} aria-label="Previous page" className={`${btn} ${idle} gap-1`}>
            <ChevronLeft size={16} /> <span className="hidden sm:inline">Prev</span>
          </button>

          {pageList(page, pages).map((n) =>
            typeof n === "string" ? (
              <span key={n} className="px-1 text-gray-400" aria-hidden="true">…</span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                disabled={disabled}
                aria-label={`Page ${n}`}
                aria-current={n === page ? "page" : undefined}
                className={`${btn} ${n === page ? "border-[#C5A84C] bg-[#C5A84C] text-white" : idle}`}
              >
                {n}
              </button>
            )
          )}

          <button type="button" onClick={() => go(page + 1)} disabled={disabled || page >= pages} aria-label="Next page" className={`${btn} ${idle} gap-1`}>
            <span className="hidden sm:inline">Next</span> <ChevronRight size={16} />
          </button>
          <button type="button" onClick={() => go(pages)} disabled={disabled || page >= pages} aria-label="Last page" title="Last page" className={`${btn} ${idle}`}>
            <ChevronsRight size={16} />
          </button>

          <form onSubmit={submitJump} className="ml-1 flex items-center gap-1.5">
            <label htmlFor="page-jump" className="sr-only">Go to page</label>
            <input
              id="page-jump"
              type="number"
              inputMode="numeric"
              min={1}
              max={pages}
              value={jump}
              onChange={(e) => setJump(e.target.value)}
              placeholder={`1-${pages}`}
              className="h-9 w-20 border border-gray-300 bg-white px-2 text-sm outline-none focus:border-[#C5A84C]"
            />
            <button type="submit" disabled={disabled || !jump} className={`${btn} ${idle}`}>Go</button>
          </form>
        </nav>
      )}
    </div>
  );
}
