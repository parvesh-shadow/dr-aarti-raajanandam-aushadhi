import Image from "next/image";

const HEADING = "Rooted in Ayurveda. Created with Care.";
const DESCRIPTION =
  "Discover the story behind Dr. Arti’s Raaj Anandam Aushadhi, a wellness brand inspired by traditional Ayurvedic knowledge and a thoughtful approach to women’s fertility and reproductive wellbeing.";

export default function AboutHero() {
  return (
    <section className="bg-white">
      <div className="relative">
        {/* Image: poori dikhegi, crop nahi hogi */}
        <Image
          src="/abouthero.jpg"
          alt="About banner"
          width={1920}
          height={480}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* Text overlay: sirf md+ */}
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