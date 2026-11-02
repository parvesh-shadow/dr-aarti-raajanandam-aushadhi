import Image from "next/image";


const HEADING = "Discover the Wisdom of Ayurveda";
const DESCRIPTION =
  "Explore helpful articles on Ayurvedic traditions, herbal ingredients, everyday wellness, and mindful self-care with Dr. Arti’s Raaj Anandam Aushadhi.";
const blogImage="/abouthero.jpg"
export default function BlogHero() {
  return (
    <section className="bg-white">
      <div className="relative">
        {/* Image: poori dikhegi, crop nahi hogi */}
        <Image
          src={blogImage}
          alt="Blog banner"
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