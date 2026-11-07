import MedicinesHero from "@/components/medicines/MedicinesHero";
import MedicinesList from "@/components/medicines/MedicinesList";
import MedicinesFAQ from "@/components/medicines/MedicinesFAQ";
import { getActiveProducts } from "@/lib/getProducts";
import { toCardProduct } from "@/lib/productView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ayurvedic Medicines | Raaj Anandam Aushadhi",
  description:
    "Explore our collection of Ayurvedic products with clear information to help you make informed choices.",
};

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q.slice(0, 60) : "";
  const products = (await getActiveProducts()).map(toCardProduct);

  return (
    <>
      <MedicinesHero />
      <MedicinesList key={q} products={products} initialQuery={q} />
      <MedicinesFAQ />
    </>
  );
}
