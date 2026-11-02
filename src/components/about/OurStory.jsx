import Image from "next/image";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import logo from "@/assets/logo.svg";

const IMAGE = "/ourstory.jpg";

export default function OurStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="mx-auto grid items-center gap-6  py-10  sm:py-14 md:grid-cols-2 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      {/* Left: image + white card */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImagePlaceholder
            src={IMAGE}
            label="Our story image"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full"
          />
        </div>
        <div className="relative flex h-full items-center justify-center p-4 sm:p-8">
          <div className="max-w-md bg-white p-5 sm:p-6">
            <h2 id="story-heading" className="lg:text-[28px] text-[22px] font-medium text-gray-800">
              Our Story
            </h2>
            <p className="mt-3 lg:text-base text-[14px] text-gray-600 ">
              Dr. Arti’s Raaj Anandam Aushadhi brings together an appreciation
              for traditional Ayurvedic knowledge and a focus on women’s
              wellness.
            </p>
            <p className="mt-3 lg:text-base text-[14px] text-gray-600">
              We aim to make it easier for women to explore information about
              fertility, reproductive wellbeing and Ayurvedic wellness products
              through a more approachable and informative experience.
            </p>
            <p className="mt-3 lg:text-base text-[14px] text-gray-600">
              Our goal is to encourage informed choices, thoughtful self-care
              and access to appropriate professional guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Right: logo */}
      <div className="mx-auto w-48 rounded-full border-4 border-[#C5A84C] p-2 sm:w-64">
        <Image
          src={logo}
          alt="Raaj Anandam Aushadhi logo"
          loading="eager"
          className="h-auto w-full rounded-full object-cover"
        />
      </div>
    </section>
  );
}