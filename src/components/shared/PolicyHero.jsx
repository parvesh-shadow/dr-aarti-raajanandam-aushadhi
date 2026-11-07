import Image from "next/image";
import heroImg from "@/assets/pageimage.jpg";

export default function PolicyHero({ title, updated = "02/02/2026" }) {
  return (
    <section className="bg-white">
      {/* Banner: Account jaisi height. Mobile par natural height (min 120px), md+ par 240px, lg+ par 300px */}
      <div className="relative w-full overflow-hidden md:h-[240px] lg:h-[300px]">
        <Image
          src={heroImg}
          alt="Policy banner"
          priority
          quality={90}
          sizes="100vw"
          className="block h-auto min-h-[120px] w-full object-cover md:absolute md:inset-0 md:h-full md:min-h-0 md:object-[center_40%]"
        />

        {/* Readability overlay: sabhi screens par */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Text: sabhi screens par image ke andar, same style aur font size */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8 lg:px-20">
          <div className="mx-auto w-full max-w-5xl xl:px-4">
            <h1 className="text-3xl font-medium text-black xl:text-[44px]">
              {title}
            </h1>
            <p className="mt-3 text-sm font-medium text-black sm:text-sm xl:text-[24px]">
              Dr. Arti’s Raaj Anandam Aushadhi
            </p>
            <p className="mt-1 text-sm text-gray-800 sm:text-sm xl:text-base">
              Last Updated: {updated}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}