import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import FertilityJourney from "@/components/about/FertilityJourney";
import Values from "@/components/about/Values";
import ProductInfo from "@/components/about/ProductInfo";
import AboutCTA from "@/components/about/AboutCTA";
import AboutFAQ from "@/components/about/AboutFAQ";
import Founder from "@/components/home/Founder";

export const metadata = {
  title: "About Us | Raaj Anandam Aushadhi",
  description:
    "Discover the story behind Dr. Arti’s Raaj Anandam Aushadhi, a wellness brand inspired by traditional Ayurvedic knowledge and a thoughtful approach to women’s fertility and reproductive wellbeing.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Founder />
      <FertilityJourney />
      <Values />
      <ProductInfo />
      <AboutCTA />
      <AboutFAQ />
    </>
  );
}