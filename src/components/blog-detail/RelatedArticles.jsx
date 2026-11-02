import Link from "next/link";
import BlogCard from "@/components/shared/BlogCard";

const PER_PAGE = 4;

export default function RelatedArticles({ posts = [], currentPage = 1, basePath = "" }) {
  if (posts.length === 0) return null;

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const visible = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section
      id="related"
      aria-labelledby="related-heading"
      className="mx-auto   py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <h2 id="related-heading" className="xl:text-[28px] lg:text-[24px] text-xl font-medium text-black">
        Related Articles
      </h2>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
        {visible.map((post) => (
          <li key={post.id}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav aria-label="Related articles pagination" className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const number = i + 1;
            const active = number === page;
            return (
              <Link
                key={number}
                href={`${basePath}?related=${number}#related`}
                scroll={false}
                aria-label={`Page ${number}`}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center border text-xs transition-colors sm:text-sm ${
                  active
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
                }`}
              >
                {String(number).padStart(2, "0")}
              </Link>
            );
          })}
        </nav>
      )}
    </section>
  );
}