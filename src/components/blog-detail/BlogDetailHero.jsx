import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function BlogDetailHero({ post }) {
  const { category, title, date, readTime, image } = post;
  const shareHref = `https://wa.me/?text=${encodeURIComponent(title)}`;
  const BlogDetailHero="/blogdetail.jpg";

  return (
    <section
      aria-labelledby="blog-title"
      className="mx-auto  pt-8  sm:pt-12 px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
    >
      <div className="relative text-center">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-black">
          {category}
        </span>

        <h1
          id="blog-title"
          className="mx-auto mt-3 max-w-2xl lg:text-[40px] lg:text-[32px] sm:text-[28px] text-xl font-semibold leading-10 text-gray-800"
        >
          {title}
        </h1>

        <p className="mt-3 text-xs text-gray-800 sm:text-sm">
          {date} · {readTime}
        </p>

        <Link
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share this article"
          className="absolute right-0 top-0 text-black transition-colors hover:text-[#A88C35]"
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      {/* Small screen: image apni natural height me. md+: height 370px fixed (isse zyada nahi) */}
      <div className="mt-6 w-full overflow-hidden bg-gray-200 md:h-[370px]">
        {image ? (
          <Image
            src={BlogDetailHero}
            alt={title}
            width={1600}
            height={700}
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="h-auto w-full md:h-full md:object-cover md:object-center"
          />
        ) : (
          <div className="relative aspect-[16/7] w-full md:aspect-auto md:h-full">
            <ImagePlaceholder
              label="Blog image"
              className="absolute inset-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}