import { notFound } from "next/navigation";
import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductTabs from "@/components/product-detail/ProductTabs";
import Ingredients from "@/components/product-detail/Ingredients";
import Reviews from "@/components/product-detail/Reviews";
import ProductFAQ from "@/components/product-detail/ProductFAQ";
import { getProductBySlug } from "@/lib/getProducts";
import { toDetailProduct } from "@/lib/productView";
import { getReviewsForPage } from "@/lib/reviewHelpers";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product Not Found | Raaj Anandam Aushadhi" };
  return {
    title: `${p.name} | Raaj Anandam Aushadhi`,
    description: (p.description || "").slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const product = toDetailProduct(p);
  const ingredients = p.ingredients || [];
  const faqs = p.faqs || [];
  const reviewData = await getReviewsForPage(product.id);

  return (
    <>
      {/* Top: gallery (fixed width) + details (flex-1) */}
      <section
        aria-label="Product details"
        className="mx-auto flex  flex-col gap-8 xl:gap-12 py-8  sm:py-8 lg:flex-row lg:items-start px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
      >
        <ProductGallery
          images={p.images || []}
          name={product.name}
          className="lg:sticky lg:top-28 lg:w-1/2 lg:shrink-0"
        />

        <div className="min-w-0 flex-1 space-y-8">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          {ingredients.length > 0 && (
            <Ingredients
              heading={p.ingredientsHeading || "Ingredients"}
              description={p.ingredientsDescription || ""}
              items={ingredients}
            />
          )}
        </div>
      </section>

      <Reviews
        productId={product.id}
        heading="Trusted by Our Wellness Community"
        description={`Hear from customers about their experience with ${product.name}, from product information and packaging to ordering and customer service.`}
        initialSummary={reviewData.summary}
        initialReviews={reviewData.reviews}
        initialPages={reviewData.pages}
      />

      {faqs.length > 0 && <ProductFAQ items={faqs} />}
    </>
  );
}
