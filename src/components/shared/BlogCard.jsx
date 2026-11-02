import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function BlogCard({ post, className = "" }) {
  const { category, title, excerpt, date, image, href = "#" } = post;

  return (
    <article
      className={`flex h-full flex-col border border-gray-200 bg-white ${className}`}
    >
      <Link
        href={href}
        aria-label={`Read article: ${title}`}
        className="relative block h-[200px] w-full overflow-hidden bg-gray-200 sm:h-[220px]"
      >
        <ImagePlaceholder
          src={image}
          alt={title}
          label="Blog image"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          imageClassName="object-cover"
          className="h-full w-full"
        />
        {category && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-0.5 text-sm text-gray-800">
            {category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2  xl:text-xl    text-gray-800 leading-6 text-lg font-semibold  ">
          <Link href={href} className="transition-colors hover:text-[#A88C35]">
            {title}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 leading-5 lg:text-base text-gray-800 text-sm">
          {excerpt}
        </p>

        <div className=" flex items-center justify-between pt-5">
          <time className="text-xs text-black sm:text-sm">{date}</time>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm text-[#C5A84C] transition-colors hover:text-[#A88C35] active:text-[#A88C35] sm:text-sm"
          >
            <span className="border-b border-current">Read article</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
