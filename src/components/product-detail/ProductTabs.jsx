"use client";

import { useState } from "react";
import { ChevronDown, Leaf, HeartPulse, BookOpen, ShieldCheck } from "lucide-react";

const TABS = [
  { id: "description", label: "Description" },
  { id: "benefits", label: "Benefits / uses" },
  { id: "usage", label: "Usage" },
];

// string name -> lucide icon component
const ICONS = {
  leaf: Leaf,
  heart: HeartPulse,
  book: BookOpen,
  shield: ShieldCheck,
};

export default function ProductTabs({ product, className = "" }) {
  const {
    about,
    specs = [],
    benefitsIntro,
    benefits = [],
    usageIntro,
    usage = [],
  } = product;

  const [active, setActive] = useState("description");
  const [openUsage, setOpenUsage] = useState(0);

  const toggleUsage = (i) => setOpenUsage((cur) => (cur === i ? -1 : i));

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div
        role="tablist"
        aria-label="Product information"
        className="grid grid-cols-3 border border-gray-200"
      >
        {TABS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              onClick={() => setActive(id)}
              className={`border-r border-gray-200 px-2 py-3 text-xs transition-colors font-semibold last:border-r-0 sm:text-sm ${
                isActive
                  ? "border-b-2 border-b-[#C5A84C] text-[#A88C35]"
                  : "text-black hover:text-[#A88C35]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="mt-3 border border-gray-200 bg-white p-4 sm:p-5">
        {/* Description */}
        {active === "description" && (
          <div
            role="tabpanel"
            id="panel-description"
            aria-labelledby="tab-description"
          >
            <h2 className="text-[18px] font-medium text-black">About us</h2>
            <p className="mt-2 text-sm text-gray-800 sm:text-sm">{about}</p>

            <hr className="my-5 border-gray-200" />

            <h2 className="text-[18px] font-medium text-black">
              Product Specifications
            </h2>
            <dl className="mt-4 space-y-4">
            {specs.map(({ label, value }, i) => (
                <div
                  key={`${label}-${i}`}
                  className="grid grid-cols-2 gap-3 text-xs sm:text-sm"
                >
                  <dt className="font-medium text-black">{label}</dt>
                  <dd className="text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Benefits / uses */}
        {active === "benefits" && (
          <div
            role="tabpanel"
            id="panel-benefits"
            aria-labelledby="tab-benefits"
          >
            <h2 className="text-[18px] font-medium text-black">
              Benefits &amp; Uses
            </h2>
            <p className="mt-2 text-xs text-gray-800 sm:text-sm">
              {benefitsIntro}
            </p>

            <hr className="my-5 border-gray-200" />

            <ul className="space-y-4">
              {benefits.map(({ icon, title, description }, index) => {
                const Icon = ICONS[icon] || ShieldCheck;
                return (
                  <li
                    key={`benefit-${index}`}
                    className="flex items-center gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center  text-[#C5A84C]">
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-black sm:text-base">
                        {title}
                      </h3>
                      <p className=" text-xs text-gray-800 sm:text-sm">
                        {description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Usage */}
        {active === "usage" && (
          <div role="tabpanel" id="panel-usage" aria-labelledby="tab-usage">
            <h2 className="text-[18px] font-medium text-black">
              Usage Instructions
            </h2>
            <p className="mt-2 text-xs text-gray-800 sm:text-sm">
              {usageIntro}
            </p>

            <hr className="my-5 border-gray-200" />

            <ul>
              {usage.map(({ question, answer }, i) => {
                const isOpen = openUsage === i;
                return (
                  <li key={`usage-${i}`}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggleUsage(i)}
                        aria-expanded={isOpen}
                        aria-controls={`usage-panel-${i}`}
                        id={`usage-button-${i}`}
                        className="group flex w-full items-center justify-between gap-4 py-3 text-left"
                      >
                        <span className="text-sm font-medium text-black transition-colors group-hover:text-[#A88C35] sm:text-base">
                          {question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-black transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={`usage-panel-${i}`}
                      role="region"
                      aria-labelledby={`usage-button-${i}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-800 sm:text-sm">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}