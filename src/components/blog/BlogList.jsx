"use client";

import { useState } from "react";
import BlogCard from "@/components/shared/BlogCard";
import { POSTS } from "@/data/blogs";

const FILTERS = [
  "All",
  "Ayurvedic Wellness",
  "Daily Self-Care",
  "Product Education",
  "Herbal Ingredients",
];

const PER_PAGE = 8;

export default function BlogList() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changeFilter = (name) => {
    setActiveFilter(name);
    setPage(1);
  };

  return (
    <section
      aria-label="Blog articles"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      {/* Filters */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter articles by category"
      >
        {FILTERS.map((name) => {
          const active = activeFilter === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => changeFilter(name)}
              aria-pressed={active}
              className={`border px-4 py-2 text-xs transition-colors sm:text-sm ${
                active
                  ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                  : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {visible.map((post) => (
            <li key={post.id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-xs text-gray-800 sm:text-sm">
          No articles found in this category.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const number = i + 1;
            const active = page === number;
            return (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-label={`Page ${number}`}
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