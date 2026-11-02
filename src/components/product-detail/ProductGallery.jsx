"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

// images = [src, src, ...]
// Laptop/desktop (lg+): main box 480 x 550 + thumbs column (106px wide), side by side.
// Tablet/mobile (< lg): main image full width, thumbnails 5-column row below it.

export default function ProductGallery({
  images = [],
  name = "Product",
  className = "",
}) {
  const [active, setActive] = useState(0);
  const thumbs = images.slice(0, 5);

  return (
    <div
      className={`flex w-full flex-col gap-3 lg:max-w-1/2 lg:flex-row ${className}`}
    >
      {/* Main Image */}
      <div className="w-full min-w-0 lg:w-auto lg:shrink-0">
        <div className="relative mx-auto aspect-[480/550] w-full max-w-[480px] overflow-hidden border border-[#C2C2C2] bg-white lg:mx-0 lg:aspect-auto lg:h-[550px] lg:w-[480px] lg:max-w-none">
          {images[active] ? (
            <Image
              src={images[active]}
              alt={name}
              fill
              priority
              quality={100}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <ImagePlaceholder
              label="Product image"
              className="absolute inset-0"
            />
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <ul className="mx-auto grid w-full max-w-[480px] grid-cols-5 gap-2 lg:mx-0 lg:flex lg:w-[106px] lg:max-w-none lg:shrink-0 lg:flex-col lg:self-stretch">
        {thumbs.map((src, i) => (
          <li key={i} className="aspect-[110/100] lg:aspect-auto lg:min-h-0 lg:flex-1">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`relative block h-full w-full overflow-hidden border bg-white transition-colors ${
                i === active
                  ? "border-[#C5A84C]"
                  : "border-gray-200 hover:border-[#A88C35]"
              }`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 106px, 20vw"
                  className="object-cover object-center"
                />
              ) : (
                <ImagePlaceholder label="" className="absolute inset-0" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}