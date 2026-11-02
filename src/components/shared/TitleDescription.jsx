import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TitleDescription({
  heading,
  description,
  buttonText,
  buttonHref = "#",
  align = "left",
}) {
  const center = align === "center";

  if (center) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mx-auto max-w-2xl">
          {heading && (
            <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-sm font-medium leading-[22px] text-gray-600 lg:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Row 1: heading + See All */}
      <div className="flex items-center justify-between gap-4">
        {heading && (
          <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">
            {heading}
          </h2>
        )}

        {buttonText && (
          <Link
            href={buttonHref}
            className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-current text-sm transition-colors hover:font-semibold hover:text-[#C5A84C]"
          >
            {buttonText}
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>

      {/* Row 2: description full width */}
      {description && (
        <p className="mt-2 w-full text-sm font-medium leading-[22px] text-gray-600 lg:text-base">
          {description}
        </p>
      )}
    </div>
  );
}