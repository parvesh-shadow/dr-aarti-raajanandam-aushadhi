import Link from "next/link";
import TitleDescription from "@/components/shared/TitleDescription";

const INSTAGRAM_URL = "https://www.instagram.com/raajanandam_aushadhi_/";
const INSTAGRAM_EMBED = "https://www.instagram.com/raajanandam_aushadhi_/embed";

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

export default function Instagram() {
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

      <div className="mx-auto mt-8 h-[560px] w-full max-w-[400px] overflow-hidden rounded-2xl border-4 border-[#C5A84C] bg-white shadow-lg sm:max-w-[380px]">
        <iframe
          src={INSTAGRAM_EMBED}
          title="Instagram Feed"
          loading="lazy"
          scrolling="yes"
          className="h-full w-full border-0"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href={INSTAGRAM_URL}
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