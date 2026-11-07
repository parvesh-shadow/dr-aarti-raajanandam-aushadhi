import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ctaImg from "@/assets/ayurvedic.webp";

export default function AboutCTA() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-white"
    >
      {/* Image: sabhi screens par background, card uske andar */}
      <Image
        src={ctaImg}
        alt="Products image"
        fill
        quality={90}
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />

      {/* Content: image ke andar. Section ki height card se banti hai */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-end px-4 py-8 sm:px-6 sm:py-10 lg:min-h-[400px] lg:px-8 lg:py-10">
        <div className="w-full bg-white p-5 sm:p-8 lg:max-w-md lg:shadow-lg">
          <h2
            id="about-cta-heading"
            className="lg:text-[28px] text-[24px] font-medium text-black "
          >
            Explore Wellness with Confidence
          </h2>
          <p className="mt-3 text-base text-gray-800">
            Discover our Ayurvedic wellness range, learn about women’s
            reproductive health and find information to support more informed
            wellness choices.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center font-medium gap-2 bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
            >
              Shop Ayurvedic Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border font-medium border-[#C5A84C] px-5 py-2.5 text-sm text-[#A88C35] transition-colors hover:bg-[#A88C35] hover:text-white active:bg-[#A88C35] active:text-white"
            >
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}