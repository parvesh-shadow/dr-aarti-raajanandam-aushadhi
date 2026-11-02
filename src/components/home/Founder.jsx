import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import founderImage from "@/assets/founder.jpg";

export default function FounderSection() {
  return (
    <section aria-labelledby="founder-heading" className="bg-[#FAFAFA]">
      <div className="mx-auto grid  items-center gap-8  py-10  sm:py-14 md:grid-cols-2 md:gap-12 px-4 sm:px-6 lg:px-8 lg:px-20">
        {/* Image */}
        <div className="mx-auto w-full max-w-xs sm:max-w-sm md:w-[413px] md:max-w-none">
          <Image
            src={founderImage}
            alt="Dr. Arti, Founder of Raaj Anandam Aushadhi"
            sizes="(min-width: 768px) 413px, 90vw"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <p className="md:text-base text-gray-600 text-sm ">
            Founder - Raaj Anandam Aushadhi
          </p>

          <h2
            id="founder-heading"
            className="mt-2 max-w-md xl:text-3xl lg:text-2xl font-semibold leading-snug text-gray-800"
          >
            Ayurveda is not a quick fix. It is a way back to yourself.
          </h2>

          <p className="mt-4 max-w-sm lg:text-base text-gray-800 text-sm">
            Dr. Arti&rsquo;s Raaj Anandam Aushadhi is built around a simple
            philosophy Ayurveda should be approachable, understandable and
            connected to everyday wellbeing.
          </p>

          <p className="mt-6 xl:text-3xl lg:text-2xl font-semibold text-gray-800">
            Dr. Arti
          </p>
          <p className="mt-1 lg:text-base text-sm text-gray-600 sm:text-sm">
            (MS - Obstetrician &amp; Gynaecologist)
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A445] px-5 py-2.5 text-xs text-white transition-colors hover:bg-[#b08f38] sm:text-sm"
            >
              Book an Online Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs text-black transition-colors hover:text-[#C9A445] sm:text-sm"
            >
              <span className="border-b border-black transition-colors group-hover:border-[#C9A445]">
                Know More About Dr. Arti
              </span>

              <ArrowRight
                className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
