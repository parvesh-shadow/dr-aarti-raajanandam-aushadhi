import Image from "next/image";
import Link from "next/link";
import TitleDescription from "@/components/shared/TitleDescription";
import instagramPreview from "@/assets/instaimage.jpg";
import { findSocial, getSiteSettings } from "@/lib/siteSettings";

function InstagramIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default async function Instagram() {
  const instagramUrl = findSocial(await getSiteSettings(), "instagram")?.url;
  // Admin ne Instagram link nahi diya to ye section nahi dikhega
  if (!instagramUrl) return null;

  return (
    <section
      aria-labelledby="instagram-heading"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8"
    >
      <TitleDescription
        id="instagram-heading"
        heading="Ayurveda Beyond the Store"
        description="Follow Dr. Arti’s Raaj Anandam Aushadhi for Ayurvedic insights, product updates and wellness inspiration."
        align="center"
        contentClassName="max-w-xl"
      />

      <div className="mx-auto mt-8 w-full max-w-[400px] border-2 border-[#C5A84C] sm:max-w-[380px]">
        <Image
          src={instagramPreview}
          alt="Preview of the raajanandam_aushadhi Instagram profile"
          sizes="(min-width: 640px) 280px, 240px"
          className="h-auto w-full"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-black bg-white px-5 py-2.5 font-medium text-xs text-black transition-colors hover:border-[#A88C35] hover:bg-[#C5A84C] hover:text-white active:bg-[#A88C35] sm:text-sm"
        >
          <InstagramIcon className="h-4 w-4" />
          Follow Us on Instagram
        </Link>
      </div>
    </section>
  );
}