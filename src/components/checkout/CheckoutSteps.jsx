import { Check, CreditCard, MapPin, CircleCheck } from "lucide-react";

const STEPS = [
  { label: "Cart", icon: Check },
  { label: "Address", icon: MapPin },
  { label: "Payment", icon: CreditCard },
  { label: "Confirmation", icon: CircleCheck },
];

// current = 0 (Cart), 1 (Address), 2 (Payment), 3 (Confirmation)
export default function CheckoutSteps({ current = 1 }) {
  return (
    <nav aria-label="Checkout steps" className="mx-auto max-w-3xl  pt-8 px-4 sm:px-6 lg:px-8 lg:px-20">
      <ol className="flex items-start justify-between">
        {STEPS.map(({ label, icon: Icon }, i) => {
          const done = i < current;
          const active = i === current;

          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Line (pichhle step se jodne wali) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-4 -z-0 h-0.5 w-full sm:top-5 ${
                    i <= current ? "bg-[#C5A84C]" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Circle */}
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                  done
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : active
                    ? "border-[#C5A84C] bg-white text-black"
                    : "border-gray-200 bg-gray-100 text-black"
                }`}
              >
                {done ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Icon className="h-4 w-4" aria-hidden="true" />
                )}
              </span>

              <span className="mt-2 text-xs font-medium text-black sm:text-sm">
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}