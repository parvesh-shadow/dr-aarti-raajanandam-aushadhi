"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";

function Stars({ count, size = "h-4 w-4" }) {
  return (
    <span
      className="flex gap-0.5"
      role="img"
      aria-label={`Rated ${count} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < count ? "fill-[#C5A84C] text-[#C5A84C]" : "text-[#C5A84C]"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function Reviews({
  productId,
  heading,
  description,
  initialSummary = { average: 0, count: 0, breakdown: [] },
  initialReviews = [],
  initialPages = 1,
}) {
  const [summary, setSummary] = useState(initialSummary);
  const [reviews, setReviews] = useState(initialReviews);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(initialPages);
  const [loadingPage, setLoadingPage] = useState(false);

  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text, login? }

  const overall = summary.average || 0;
  const breakdown = summary.breakdown || [];
  const totalLabel = `Based on ${summary.count} review${summary.count === 1 ? "" : "s"}`;
  const total = breakdown.reduce((sum, row) => sum + row.count, 0) || 1;

  // Logged-in user ho to naam pehle se bhar do
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d?.user?.name && setName((n) => n || d.user.name))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const goToPage = async (next) => {
    if (next === page || loadingPage) return;
    setLoadingPage(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews?page=${next}`, { cache: "no-store" });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error();
      setReviews(d.reviews);
      setPage(d.page);
      setPages(d.pages);
      document.getElementById("review-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setMessage({ type: "error", text: "Could not load reviews. Please try again." });
    } finally {
      setLoadingPage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, title, name, comment }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setMessage({ type: "error", text: "Please log in to write a review.", login: true });
        return;
      }
      if (!res.ok || !d.ok) throw new Error(d.error || "Could not submit your review.");
      setSummary(d.summary); // rating turant update
      setMessage({ type: "success", text: d.message });
      setRating(1);
      setTitle("");
      setComment("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof TypeError ? "Network error. Please check your connection." : err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full bg-gray-100 px-3 py-2.5 text-xs text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A84C] sm:text-sm";

  return (
    <section
      aria-labelledby="reviews-heading"
      className="mx-auto  py-10  sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
    >
      <TitleDescription
        id="reviews-heading"
        heading={heading}
        description={description}
        align="left"
        contentClassName="max-w-4xl"
      />

      {/* Rating summary */}
      <div className="mt-6 grid gap-6 border border-gray-200 p-4 sm:p-6 xl:gap-12 md:grid-cols-[200px_1fr] md:h-[260px] md:items-center xl:px-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="text-[36px] font-medium text-gray-800">
            {overall.toFixed(1)}
          </p>
          <Stars count={Math.round(overall)} size="h-5 w-5" />
          <p className="mt-3 text-base font-medium text-black">
            Overall Rating
          </p>
          <p className="text-sm text-gray-700">{totalLabel}</p>
        </div>

        <ul className="space-y-2">
          {breakdown.map(({ label, count }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-base text-black"
            >
              <span className="w-24 shrink-0 sm:w-28">{label}</span>
              <span className="h-2 flex-1 bg-gray-100">
                <span
                  className="block h-full bg-[#C5A84C]"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right">( {count} )</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Write a review */}
      <form onSubmit={handleSubmit} className="mt-10">
        <h3 className="xl:text-[26px] text-xl font-medium text-black">
          Write a Review
        </h3>
        <p className="mt-1 xl:text-[16px] text-base text-gray-800 sm:text-sm">
          Share your experience and help others make an informed choice.
        </p>
        

        <div
          className="mt-5 flex gap-1"
          role="radiogroup"
          aria-label="Your rating"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 text-[#C5A84C] ${value <= rating ? "fill-[#C5A84C]" : ""}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="review-title"
                className="text-xs font-medium text-black sm:text-sm lg:text-base"
              >
                Review Title *
              </label>
              <input
                id="review-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label
                htmlFor="review-name"
                className="text-xs font-medium text-black sm:text-sm lg:text-base "
              >
                Your Name *
              </label>
              <input
                id="review-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="review-comment" className="sr-only ">
              Your review
            </label>
            <textarea
              id="review-comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or what could be improved ?"
              className={`h-full min-h-28 resize-none ${fieldClass}`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 disabled:opacity-60 bg-[#C5A84C] px-6 py-2.5 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Submit Review
        </button>

        {message && (
          <p
            role={message.type === "error" ? "alert" : "status"}
            className={`mt-3 text-xs sm:text-sm ${message.type === "error" ? "text-red-600" : "text-[#A88C35]"}`}
          >
            {message.text}
            {message.login && (
              <>
                {" "}
                <Link href="/auth/login" className="underline">
                  Log in
                </Link>
              </>
            )}
          </p>
        )}
      </form>

      {/* Review list */}
      <ul id="review-list" className="mt-8 space-y-4 scroll-mt-28">
        {reviews.map(({ id, rating: r, title: t, text, name: n, time }) => (
          <li key={id} className="border border-gray-300 bg-white p-4 sm:p-5">
            <Stars count={r} />
            <h3 className="mt-3 text-sm font-medium text-black sm:text-base lg:text-[18px]">
              &ldquo;{t}&rdquo;
            </h3>
            {text && (
              <p className="mt-2 text-xs text-gray-800 sm:text-sm lg:text-base ">
                &ldquo;{text}&rdquo;
              </p>
            )}
            <div className="mt-4 flex flex-row flex-wrap items-center justify-start gap-x-2 sm:gap-x-4">
              <p className="text-sm font-medium text-black sm:text-base lg:text-[18px]">
                {n}
              </p>
             
              <p className="text-xs   border px-2 py-0  bg-[#C5A84C]  text-white cursor-pointer rounded-full">{time}</p>
            </div>
            <p className="text-sm text-gray-800">Verified Purchase</p>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <nav aria-label="Reviews pagination" className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => {
            const number = i + 1;
            const active = page === number;
            return (
              <button
                key={number}
                type="button"
                onClick={() => goToPage(number)}
                disabled={loadingPage}
                aria-label={`Reviews page ${number}`}
                aria-current={active ? "page" : undefined}
                className={`h-8 w-8 border text-xs transition-colors sm:text-sm ${
                  active
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
                }`}
              >
                {String(number).padStart(2, "0")}
              </button>
            );
          })}
        </nav>
      )}
    </section>
  );
}