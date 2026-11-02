import Link from "next/link";
import { Check } from "lucide-react";

export default function OrderSuccess({ orderNumber = "RAA-ORDER-XXXX" }) {
  return (
    <section
      aria-labelledby="success-heading"
      className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="border border-gray-300 bg-white px-4 py-10 text-center sm:px-8 sm:py-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A84C] text-white sm:h-16 sm:w-16">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>

        <h2
          id="success-heading"
          className="mx-auto mt-5 max-w-xs text-base font-medium leading-9 text-black sm:text-xl xl:text-[32px]"
        >
          Thank You for Your Order!
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-xs text-gray-800 sm:text-sm">
          Your payment has been verified. Your order confirmation and next steps
          are shown below.
        </p>

        <p className="mt-5 text-xs text-black sm:text-sm xl:text-base">Order Number</p>
        <p className="mt-1 text-base xl:text-[24px] font-medium text-black">{orderNumber}</p>

        <Link
          href="/products"
          className="mt-8 inline-block bg-[#C5A84C] px-5 py-2.5 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}