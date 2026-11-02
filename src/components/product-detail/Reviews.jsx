"use client";

import { useState } from "react";
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
  heading,
  description,
  overall = 4.0,
  totalLabel = "Based on 100 reviews",
  breakdown = [], // [{ label: "5.0 Excellent", count: 45 }]
  initialReviews = [],
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const total = breakdown.reduce((sum, row) => sum + row.count, 0) || 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Abhi sirf list me jodta hai. Backend baad me.
    setReviews((prev) => [
      { id: Date.now(), rating, title, name, text: comment, time: "Just now" },
      ...prev,
    ]);
    setRating(1);
    setTitle("");
    setName("");
    setComment("");
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
          className="mt-4 bg-[#C5A84C] px-6 py-2.5 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Submit Review
        </button>
      </form>

      {/* Review list */}
      <ul className="mt-8 space-y-4">
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
             
              <p className="text-xs text-gray-600 sm:text-sm border-l-4 px-1  border-[#C5A84C] rounded-lg">{time}</p>
            </div>
            <p className="text-sm text-gray-800">Verified Customer</p>
          </li>
        ))}
      </ul>
    </section>
  );
}