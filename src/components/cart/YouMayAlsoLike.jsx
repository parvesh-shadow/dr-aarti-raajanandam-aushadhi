import Product from "@/components/shared/Product";
import Slider from "@/components/shared/Slider";

const image1='/medicine2.jpg';
const image2='/medicine3.jpg';
const image3='/medicine4.jpg';


const SUGGESTIONS = [
   {
    id: 1,
    category: "Women’s Wellness",
    name: "Femexa White Discharge Capsules",
    description: "Ayurvedic capsules formulated for women’s intimate wellness.",
    pack: "500 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    image:image1,
    href: "/products/femexa-white-discharge-capsules",
  },
  {
    id: 2,
    category: "Men’s Wellness",
    name: "Vajromax Gold Tablets",
    description: "Ayurvedic tablets positioned for men’s vitality and reproductive wellness.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    image: image2,
    href: "/products/vajromax-gold-tablets",
  },
  {
    id: 3,
    category: "Women’s Wellness",
    name: "Madivain Kit",
    description: "Ayurvedic proprietary product presented as a feminine wellness tonic.",
    pack: "300 ml",
    price: 895,
    rating: 4.8,
    image:image3,
    href: "/products/madivain-kit",
  },
  {
    id: 4,
    category: "Women’s Wellness",
    name: "Femexa White Discharge Capsules",
    description: "Ayurvedic capsules formulated for women’s intimate wellness.",
    pack: "500 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    image:image1,
    href: "/products/femexa-white-discharge-capsules",
  },
  {
    id: 5,
    category: "Men’s Wellness",
    name: "Vajromax Gold Tablets",
    description: "Ayurvedic tablets positioned for men’s vitality and reproductive wellness.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    image: image2,
    href: "/products/vajromax-gold-tablets",
  },
  {
    id: 6,
    category: "Women’s Wellness",
    name: "Madivain Kit",
    description: "Ayurvedic proprietary product presented as a feminine wellness tonic.",
    pack: "300 ml",
    price: 895,
    rating: 4.8,
    image:image3,
    href: "/products/madivain-kit",
  },
];

export default function YouMayAlsoLike() {
  return (
    <section
      aria-labelledby="also-like-heading"
      className=" py-10  sm:py-8 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <h2 id="also-like-heading" className="xl:text-[28px] text-xl font-medium text-black">
        You may also like
      </h2>

      {/* Slider: mobile 1, sm 2, lg 3, xl 4 cards (pehle wale grid jaisa) */}
      <Slider
        label="Products you may also like"
        itemClassName="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        className="mt-6"
      >
        {SUGGESTIONS.map((product) => (
          <div key={product.id} className="h-full">
            <Product product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
}