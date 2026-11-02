import FAQ from "@/components/shared/FAQ";

export default function ProductFAQ({ items }) {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={items}
    />
  );
}