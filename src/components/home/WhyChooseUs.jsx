"use client";

import { useState } from "react";
import { ChevronDown, Leaf } from "lucide-react";

const ITEMS = [
  {
    title: "Rooted in Ayurveda",
    content:
      "Inspired by traditional Ayurvedic principles and wellness practices.",
  },
  {
    title: "Carefully Selected Products",
    content:
      "Every product is thoughtfully selected and presented with clear information.",
  },
  {
    title: "Simple Online Experience",
    content:
      "Browse, choose and order easily with a simple and secure checkout.",
  },
  {
    title: "Made in India",
    content:
      "Our products are prepared in India, drawing on the country’s Ayurvedic heritage.",
  },
];

export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section
      aria-labelledby="why-heading"
      className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-20"
    >
      <h2
        id="why-heading"
        className="font-semibold text-gray-800 lg:text-xl xl:text-2xl"
      >
        Why Choose Raaj Anandam Aushadhi?
      </h2>

      <div className="mt-2 grid gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:self-center">
          <h3 className="max-w-xs font-semibold leading-snug text-black lg:text-2xl xl:text-3xl">
            A More Thoughtful Way to Explore Ayurveda
          </h3>
          <p className="mt-4 max-w-xs text-gray-600 sm:text-sm lg:text-base">
            We bring together Ayurvedic knowledge, carefully presented products
            and a simple digital shopping experience.
          </p>
        </div>

        <ul>
          {ITEMS.map(({ title, content }, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={title}
                className="border-b border-gray-200 last:border-b-0"
              >
                <h4>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`why-panel-${i}`}
                    id={`why-button-${i}`}
                    className="group flex w-full items-center gap-3 py-4 text-left"
                  >
                    <Leaf
                      className="h-6 w-6 shrink-0"
                      style={{ color: "#166534" }} // dark green
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-[18px] font-medium text-gray-800 transition-colors group-hover:text-[#A88C35] sm:text-base">
                      {title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-gray-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h4>

                <div
                  id={`why-panel-${i}`}
                  role="region"
                  aria-labelledby={`why-button-${i}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden pl-9">
                    <p className="text-sm text-gray-800">{content}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}