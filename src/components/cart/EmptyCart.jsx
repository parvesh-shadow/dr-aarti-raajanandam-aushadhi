import Link from "next/link";

export default function EmptyCart() {
  return (
    <section
      aria-labelledby="empty-cart-heading"
      className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28"
    >
      <h2 id="empty-cart-heading" className="text-2xl xl:text-[44px] font-medium text-black">
        Your bag is empty
      </h2>
      <p className="mx-auto mt-3 max-w-xs text-sm text-gray-800 sm:text-base">
        Explore our dispensary and begin your wellness ritual.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-base"
      >
        Explore Medicines
      </Link>
    </section>
  );
}