import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";


export default function Ingredients({ heading, description, items = [], className = "" }) {
  return (
    <section aria-labelledby="ingredients-heading" className={className}>
      <TitleDescription
        id="ingredients-heading"
        heading={heading}
        description={description}
        align="left"
      />

      <Slider
        label="Ingredients"
        itemClassName="w-3/4 sm:w-1/2"
        className="mt-5"
      >
        {items.map((item) => (
          <article key={item.name} className="h-full border border-gray-200 bg-white p-2">
            <div className="h-36 sm:h-40">
              <ImagePlaceholder
                src={item.image}
                alt={item.name}
                label={item.name}
                sizes="(min-width: 640px) 220px, 60vw"
                className="h-full w-full"
              />
            </div>
            <h3 className="mt-3 text-sm font-medium text-black sm:text-base">{item.name}</h3>
            <p className="mt-1 line-clamp-3 text-xs text-gray-800 sm:text-sm">
              {item.description}
            </p>
          </article>
        ))}
      </Slider>
    </section>
  );
}