import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import BlogFAQ from "@/components/blog/BlogFAQ";

export const metadata = {
  title: "Blogs | Raaj Anandam Aushadhi",
  description:
    "Explore helpful articles on Ayurvedic traditions, herbal ingredients, everyday wellness, and mindful self-care with Dr. Arti’s Raaj Anandam Aushadhi.",
};

export default function BlogsPage() {
  return (
    <>
      <BlogHero />
      <BlogList />
      <BlogFAQ />
    </>
  );
}