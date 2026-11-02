import Image from "next/image";

const HEADING = "Your Cart, Your Wellness Journey";
const DESCRIPTION =
  "Review your selected products and make sure everything is ready for checkout.";

export default function CartHero() {
  return (
    <section className="bg-white">
      {/* Banner: fixed wide ratio (About/Blog/Contact hero jaisa), image crop hoke fit hogi */}
      <div className="relative aspect-[16/7] w-full overflow-hidden md:aspect-[1920/340]">
        <Image
          src="/carthero.jpg"
          alt="Cart banner"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Readability overlay + text: sirf md+ */}
        <div className="absolute inset-0 hidden bg-white/10 md:block" />
        <div className="absolute inset-0 hidden items-center justify-center px-6 text-center md:flex">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-medium text-black lg:text-2xl">
              {HEADING}
            </h1>
            <p className="mt-2 text-sm text-gray-800 lg:text-base">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      {/* Text: sirf mobile pe image ke neeche */}
      <div className="px-4 py-6 text-center sm:px-6 md:hidden">
        <h1 className="text-2xl font-medium text-black sm:text-2xl">
          {HEADING}
        </h1>
        <p className="mt-2 text-sm text-gray-800">{DESCRIPTION}</p>
      </div>
    </section>
  );
}