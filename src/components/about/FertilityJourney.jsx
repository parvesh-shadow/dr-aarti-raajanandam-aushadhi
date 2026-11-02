import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

const IMAGE = "/fertilityjourney.jpg";

export default function FertilityJourney() {
  return (
    <section
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-white lg:max-h-[724px] lg:min-h-[560px] xl:min-h-[640px]"
    >
      {/* Image: mobile/tablet me normal flow me (full visible), desktop me background */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <ImagePlaceholder
          src={IMAGE}
          label="Fertility journey image"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl justify-end px-0 lg:max-h-[724px] lg:min-h-[560px] lg:items-center lg:px-8 lg:py-16 xl:min-h-[640px]">
        <div className="w-full bg-white p-5 sm:p-8 lg:max-w-[500px] lg:shadow-lg">
          <h2
            id="journey-heading"
            className="lg:text-[28px] text-[22px] font-medium text-gray-800"
          >
            Every Fertility Journey Deserves Understanding and Care
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Fertility is a deeply personal journey. We believe women deserve
            compassionate support, accessible information and a thoughtful
            approach to reproductive wellbeing.
          </p>
          <p className="mt-3 text-base text-gray-600">
            Our focus includes menstrual health, ovulation awareness,
            preconception wellness, nutrition and lifestyle factors that may
            influence fertility. We also share educational perspectives on
            traditional.
          </p>
          <p className="mt-3 text-base text-gray-600">
            Ayurvedic wellness practices to help women explore their options
            with greater understanding Every woman’s experience is different.
            Our aim is to create a supportive environment where women can learn,
            ask questions and make informed choices without pressure or
            unrealistic promises.
          </p>
        </div>
      </div>
    </section>
  );
}
