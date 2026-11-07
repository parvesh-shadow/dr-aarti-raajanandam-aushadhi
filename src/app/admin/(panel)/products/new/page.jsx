import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Product</h1>
      <ProductForm />
    </div>
  );
}
