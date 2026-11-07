import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>
      <ProductForm key={id} productId={id} />
    </div>
  );
}
