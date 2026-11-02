"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";

export default function FAQ({
  items = [], // [{ question, answer }]
  heading,
  description,
  defaultOpen = 0, // index, or -1 for all closed
  className = "",
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section
      aria-labelledby={heading ? `${baseId}-heading` : undefined}
      className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 ${className}`}
    >
      {(heading || description) && (
        <TitleDescription
          id={`${baseId}-heading`}
          heading={heading}
          description={description}
          align="center"
        />
      )}

      <ul className="mx-auto mt-8 max-w-3xl">
        {items.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={question} className="border-b border-gray-100 last:border-b-0">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-panel-${i}`}
                  id={`${baseId}-button-${i}`}
                  className="group flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
                >
                  <span className="lg:text-[18px] font-medium text-gray-800 transition-colors group-hover:text-[#A88C35] sm:text-base">
                    {question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#C5A84C] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C5A84C]" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <div
                id={`${baseId}-panel-${i}`}
                role="region"
                aria-labelledby={`${baseId}-button-${i}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl lg:text-[15px] text-gray-600 sm:text-sm">
                    {answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}