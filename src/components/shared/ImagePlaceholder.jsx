import Image from "next/image";
import { ImageIcon } from "lucide-react";

// src diya hai -> asli image dikhegi
// src nahi diya -> lucide icon wala dummy box dikhega (UI par error nahi aayega)
export default function ImagePlaceholder({
  src,
  alt = "",
  label = "Image",
  priority = false,
  sizes = "100vw",
  imageClassName = "object-cover",
  className = "",
}) {
  return (
    <div className={`relative overflow-hidden bg-[#F1ECDD] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
      ) : (
        <div
          role="img"
          aria-label={alt || label}
          className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#A88C35]"
        >
          <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-sm">{label}</span>
        </div>
      )}
    </div>
  );
}