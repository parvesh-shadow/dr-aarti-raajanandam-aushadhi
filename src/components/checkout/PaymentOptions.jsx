"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Banknote, CreditCard, Landmark, Smartphone } from "lucide-react";

const METHODS = [
  {
    id: "upi",
    icon: Smartphone,
    title: "UPI",
    description: "Pay using a UPI app or supported UPI ID",
  },
  {
    id: "card",
    icon: CreditCard,
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay or other supported cards",
  },
  {
    id: "netbanking",
    icon: Landmark,
    title: "Net Banking",
    description: "Pay through a supported bank",
  },
  {
    id: "cod",
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Pay when your order arrives, if eligible.",
  },
];

export default function PaymentOptions() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!selected) {
      setError("Please select a payment method.");
      return;
    }
    router.push(`/checkout/confirm?payment=${selected}`);
  };

  return (
    <section
      aria-labelledby="payment-heading"
      className="mx-auto max-w-2xl  py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <div className="border border-gray-300 bg-white p-4 sm:p-6">
        <h2 id="payment-heading" className="sr-only">
          Select a payment method
        </h2>

        <fieldset>
          <legend className="sr-only">Payment method</legend>

          <div className="space-y-3">
            {METHODS.map(({ id, icon: Icon, title, description }) => {
              const active = selected === id;
              return (
                <label
                  key={id}
                  htmlFor={`pay-${id}`}
                  className={`flex cursor-pointer items-center gap-3 border px-3 py-3 transition-colors sm:px-4 ${
                    active
                      ? "border-[#C5A84C] bg-[#C5A84C]/5"
                      : "border-gray-300 hover:border-[#A88C35]"
                  }`}
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-black"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-black sm:text-[18px]">
                      {title}
                    </span>
                    <span className="block text-xs text-gray-800 sm:text-[14px]">
                      {description}
                    </span>
                  </span>
                  <input
                    id={`pay-${id}`}
                    type="radio"
                    name="payment"
                    value={id}
                    checked={active}
                    onChange={() => {
                      setSelected(id);
                      setError("");
                    }}
                    className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#C5A84C] bg-white checked:bg-[#C5A84C] checked:shadow-[inset_0_0_0_2px_white]"
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs uppercase text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}