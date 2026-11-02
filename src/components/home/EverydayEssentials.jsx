import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import Product from "@/components/shared/Product";
import image1 from "@/assets/product1.jpg";
import image2 from "@/assets/product2.jpg";
import image3 from "@/assets/product3.jpg";

const PRODUCTS = [
  {
    id: 1,
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description:
      "Ayurvedic hair care capsules formulated for a convenient daily wellness routine.",
    pack: "800 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    inStock: true,
    image: image1,
    href: "/checkout",
  },
  {
    id: 2,
    category: "Women’s Wellness",
    name: "Fem Rasayan Tablets",
    description:
      "Ayurvedic wellness formula presented for women’s reproductive wellness and everyday care.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    inStock: true,
    image: image2,
    href: "/checkout",
  },
  {
    id: 3,
    category: "Ayurvedic Wellness",
    name: "Shatavar™ Tablets",
    description:
      "Ayurvedic medicine formulated with Shatavari, presented in a convenient tablet format for everyday wellness.",
    pack: "800 mg • 60 Tablets",
    price: 895,
    rating: 4.8,
    inStock: true,
    image: image3,
    href: "/checkout",
  },
  {
    id: 4,
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description:
      "Ayurvedic hair care capsules formulated for a convenient daily wellness routine.",
    pack: "800 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    inStock: true,
    image: image1,
    href: "/checkout",
  },
  {
    id: 5,
    category: "Women’s Wellness",
    name: "Fem Rasayan Tablets",
    description:
      "Ayurvedic wellness formula presented for women’s reproductive wellness and everyday care.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    inStock: true,
    image: image2,
    href: "/checkout",
  },
  {
    id: 6,
    category: "Ayurvedic Wellness",
    name: "Shatavar™ Tablets",
    description:
      "Ayurvedic medicine formulated with Shatavari, presented in a convenient tablet format for everyday wellness.",
    pack: "800 mg • 60 Tablets",
    price: 895,
    rating: 4.8,
    inStock: true,
    image: image3,
    href: "/checkout",
  },
];

export default function EverydayEssentials() {
  return (
    <section
      aria-labelledby="essentials-heading"
      className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-20"
    >
      <TitleDescription
        heading="Everyday essentials"
        description="Explore thoughtfully selected Ayurvedic products designed to complement your daily wellness routine and bring traditional care into modern everyday living."
        buttonText="See All"
        buttonHref="/products"
        align="left"
      />

      <Slider label="Featured products" className="mt-10">
        {PRODUCTS.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}