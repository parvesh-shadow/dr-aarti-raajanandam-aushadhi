import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="w-full bg-[#C5A84C]">
      <div className="flex w-full flex-col gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-20">
        <div className="max-w-xl">
          <h2
            id="cta-heading"
            className="text-[30px] font-medium leading-tight text-white"
          >
            Not sure where to begin?
          </h2>
          <p className="mt-3 text-[18px] leading-snug text-white">
            Book a private consultation with Dr. Arti and find a path designed
            around you.
          </p>
        </div>

        <Link
          href="/appointment"
          className="inline-flex w-full items-center justify-center gap-2 border border-white bg-transparent px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black active:bg-white active:text-black md:w-auto"
        >
          Book A Consultation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}