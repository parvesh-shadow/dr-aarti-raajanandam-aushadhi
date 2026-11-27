import { Leaf, Heart, BookOpen } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

const IMAGE = "/ourstory.jpg";

const VALUES = [
  {
    icon: Leaf,
    title: "Rooted in Tradition",
    description:
      "Time-honoured Ayurvedic knowledge and carefully selected ingredients.",
  },
  {
    icon: Heart,
    title: "Focused on Women's Wellness",
    description:
      "From fertility to everyday reproductive wellbeing, women come first.",
  },
  {
    icon: BookOpen,
    title: "Clear and Informative",
    description:
      "Simple information so you can make confident choices.",
  },
];

export default function OurStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="w-full py-6 sm:py-14"
    >
      <div className="relative overflow-hidden">
        {/* Background image + soft overlay */}
        <div className="absolute inset-0">
          <ImagePlaceholder
            src={IMAGE}
            label="Our story image"
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

        {/* Card */}
        <div className="relative flex items-center justify-center px-3 py-4 sm:px-8 sm:py-10 lg:px-20">
          <div className="w-full max-w-5xl border-t-4 border-[#C5A84C] bg-white/95 p-4 shadow-xl sm:p-7 lg:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-10">
              {/* Left: story */}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#C5A84C] sm:text-xs">
                  Raaj Anandam Aushadhi
                </p>
                <h2
                  id="story-heading"
                  className="mt-1 text-[20px] font-medium text-gray-800 sm:text-[22px] lg:text-[28px]"
                >
                  Our Story
                </h2>

                <p className="mt-2 text-[13px] leading-relaxed text-gray-600 sm:mt-3 lg:text-[15px]">
                  Dr. Arti&rsquo;s Raaj Anandam Aushadhi brings together an
                  appreciation for traditional Ayurvedic knowledge and a focus
                  on women&rsquo;s wellness.
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-600 lg:text-[15px]">
                  We aim to make it easier for women to explore information
                  about fertility, reproductive wellbeing and Ayurvedic
                  wellness products through a more approachable and informative
                  experience.
                </p>
                <p className="mt-2 hidden text-[13px] leading-relaxed text-gray-600 sm:block lg:text-[15px]">
                  Our goal is to encourage informed choices, thoughtful
                  self-care and access to appropriate professional guidance.
                </p>
              </div>

              {/* Right: values */}
              <div className="md:border-l md:border-gray-200 md:pl-10">
                <h3 className="text-[15px] font-medium text-gray-800 sm:text-lg">
                  What We Stand For
                </h3>
                <ul className="mt-2 space-y-2.5 sm:mt-3 sm:space-y-4">
                  {VALUES.map(({ icon: Icon, title, description }) => (
                    <li key={title} className="flex items-center gap-3 sm:items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5A84C]/15 text-[#C5A84C] sm:h-9 sm:w-9">
                        <Icon
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <h4 className="text-[13px] font-medium text-gray-800 sm:text-[15px]">
                          {title}
                        </h4>
                        <p className="hidden text-[12px] text-gray-600 sm:block sm:text-[13px]">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Note */}
            <p className="mt-3 border-t border-gray-200 pt-2 text-[10px] leading-snug text-gray-500 sm:mt-5 sm:pt-3 sm:text-xs">
              Our products are traditional Ayurvedic wellness products and are
              not a substitute for medical advice. Please consult a qualified
              healthcare professional before use, especially if you are
              pregnant, planning a pregnancy or under treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}