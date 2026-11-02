import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

const statusStyles = {
  Delivered: "bg-[#7CF26B] text-black",
  Shipped: "bg-[#A8DAFF] text-black",
  Processing: "bg-[#FFF0A8] text-black",
  Cancelled: "bg-[#FFC9CF] text-black",
};

export default function OrderCard({ order }) {
  const {
    orderNumber,
    category,
    name,
    description,
    date,
    items,
    total,
    status,
    image,
    href,
  } = order;

  return (
    <article className="relative flex flex-col gap-4 border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
      {/* Image */}
      <div className="relative h-36 w-full shrink-0 sm:h-36 sm:w-34">
        {category && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-black">
            {category}
          </span>
        )}
        <ImagePlaceholder
          src={image}
          alt={name}
          label="Product"
          sizes="128px"
          imageClassName="object-contain p-2"
          className="h-full w-full bg-white"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-black sm:text-sm">
          ORDER #{orderNumber}
        </p>
        <h2 className="mt-2 text-base xl:text-[22px] font-semibold text-black">
          {name}
        </h2>
        <p className="mt-2 line-clamp-2 text-xs text-gray-800 sm:text-sm">
          {description}
        </p>
        <p className="mt-2 text-xs text-black sm:text-sm">
          <span className="font-medium">{date}</span>
          <span className="ml-2">• {items} item</span>
        </p>
      </div>

      {/* Status + Total + Detail */}
      <div className="flex items-center justify-between gap-4 sm:min-h-36 sm:flex-col sm:items-end">
        <span
          className={`rounded-full px-3 py-1 text-xs sm:text-sm ${
            statusStyles[status] || "bg-gray-100 text-black"
          }`}
        >
          {status}
        </span>

        <div className="sm:text-right">
          <p className="text-xs text-black sm:text-sm">Order total</p>
          <p className="text-base xl:text-2xl font-medium text-black">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-[#A88C35] transition-colors hover:text-[#C5A84C] sm:text-sm"
        >
          View Detail
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}