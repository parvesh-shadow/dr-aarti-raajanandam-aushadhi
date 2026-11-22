import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import Product from "@/components/shared/Product";
import { getActiveProducts } from "@/lib/getProducts";
import { toCardProduct } from "@/lib/productView";

const LIMIT = 10;

// Admin panel ke latest active products (max 10), DB se.
export default async function EverydayEssentials() {
  const products = (await getActiveProducts({ limit: LIMIT })).map(toCardProduct);

  // Koi product nahi hai to section hi nahi dikhega
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="essentials-heading"
      className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-20"
    >
      <TitleDescription
        heading="Reproductive Wellness"
       // description="Explore thoughtfully selected Ayurvedic products designed to complement your daily wellness routine and bring traditional care into modern everyday living."
        description="Explore thoughtfully selected Ayurvedic products for female and male reproductive health, fertility and overall wellness."
        buttonText="See All"
        buttonHref="/products"
        align="left"
      />

      <Slider label="Featured products" className="mt-10">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}
