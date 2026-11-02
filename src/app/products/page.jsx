import MedicinesHero from "@/components/medicines/MedicinesHero";
import MedicinesList from "@/components/medicines/MedicinesList";
import MedicinesFAQ from "@/components/medicines/MedicinesFAQ";

export const metadata = {
  title: "Ayurvedic Medicines | Raaj Anandam Aushadhi",
  description:
    "Explore our collection of Ayurvedic products with clear information to help you make informed choices.",
};

export default function ProductsPage() {
  return (
    <>
      <MedicinesHero />
      <MedicinesList />
      <MedicinesFAQ />
    </>
  );
}