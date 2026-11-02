import Image from "next/image";

export default function MedicinesHero() {
  return (
    <section className="bg-white">
      <div className="relative">
        {/* Image: poori dikhegi, crop nahi hogi */}
        <Image
          src="/medicinehero.jpg"
          alt="Ayurvedic Medicines banner"
          width={1920}
          height={600}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* Text overlay: sirf md+ */}
        <div className="absolute inset-0 hidden items-center justify-center px-6 text-center md:flex">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-medium text-black lg:text-2xl">
              Ayurvedic Medicines
            </h1>
            <p className="mt-2 text-sm text-gray-800 lg:text-base">
              Explore our collection of Ayurvedic products with clear
              information to help you make informed choices.
            </p>
          </div>
        </div>
      </div>

      {/* Text: sirf mobile pe image ke neeche */}
      <div className="px-4 py-6 text-center sm:px-6 md:hidden">
        <h1 className="text-2xl font-medium text-black sm:text-2xl">
          Ayurvedic Medicines
        </h1>
        <p className="mt-2 text-sm text-gray-800">
          Explore our collection of Ayurvedic products with clear information to
          help you make informed choices.
        </p>
      </div>
    </section>
  );
}