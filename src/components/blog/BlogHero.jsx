import Image from "next/image";
import heroImg from "@/assets/heroimage.webp";

const HEADING = "Discover the Wisdom of Ayurveda";
const DESCRIPTION =
  "Explore helpful articles on Ayurvedic traditions, herbal ingredients, everyday wellness, and mindful self-care with Dr. Arti’s Raaj Anandam Aushadhi.";

export default function BlogHero() {
  return (
    <section className="bg-white">
      {/* Banner: Account jaisi height. Mobile par natural height, md+ par 240px, lg+ par 300px */}
      <div className="relative w-full overflow-hidden md:h-[240px] lg:h-[300px]">
        <Image
          src={heroImg}
          alt="Blog banner"
          priority
          quality={90}
          sizes="100vw"
          className="block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-[center_40%]"
        />

        {/* Readability overlay: sabhi screens par */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Text: sabhi screens par image ke andar, font size Account jaisa */}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-3xl font-medium text-black md:text-[44px]">
              {HEADING}
            </h1>
            <p className="mt-2 text-sm text-gray-800 sm:text-base">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}