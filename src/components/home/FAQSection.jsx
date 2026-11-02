"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is Dr. Arti’s Raaj Anandam Aushadhi?",
    answer:
      "Dr. Arti’s Raaj Anandam Aushadhi is an Ayurvedic wellness brand offering a range of Ayurvedic medicines and wellness products. Customers can explore product information, place orders online and connect with the team for appointments and assistance.",
  },
  {
    question: "How can I purchase Ayurvedic products online?",
    answer:
      "Browse the products page, choose the product you want and click Buy Now or add it to your cart. Then complete the checkout with your delivery details and payment.",
  },
  {
    question: "How can I know which product is suitable for me?",
    answer:
      "Each product page shares clear information about the formulation and its intended use. For personalised guidance, you can book an online consultation or contact our team.",
  },
  {
    question: "Are the products Ayurvedic?",
    answer:
      "Yes. Our products are inspired by traditional Ayurvedic principles and made in India.",
  },
  {
    question: "How do I use an Ayurvedic product?",
    answer:
      "Usage instructions are given on the product label and the product page. If you have a health condition or take other medicines, please consult a qualified healthcare professional first.",
  },
  {
    question: "Can I order without creating an account?",
    answer:
      "Yes, you can place an order as a guest. Creating an account is optional and helps you track orders and reorder faster.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((current) => (current === i ? -1 : i));

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      {/* Heading */}
      <div className="mx-auto max-w-xl text-center">
        <h2 id="faq-heading" className="text-base font-medium text-black">
          Everything You Need to Know
        </h2>
        <p className="mt-3 text-xs text-gray-800 sm:text-sm">
          Find answers to common questions about our Ayurvedic products,
          ordering, delivery, payments, appointments and customer support.
        </p>
      </div>

      {/* Accordion */}
      <ul className="mx-auto mt-8 max-w-3xl">
        {FAQS.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={question}>
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
                >
                  <span className="text-xs font-medium text-black sm:text-sm">
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
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl text-xs text-gray-800">{answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}