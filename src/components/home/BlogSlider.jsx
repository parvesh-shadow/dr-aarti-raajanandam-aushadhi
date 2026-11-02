import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import BlogCard from "@/components/shared/BlogCard";

import blog1 from "@/assets/blog1.jpg";
import blog2 from "@/assets/blog2.jpg";
import blog3 from "@/assets/blog3.jpg";


const POSTS = [
  {
    id: 1,
    category: "Daily Living",
    title: "5 Ayurvedic rituals for a more grounded morning",
    excerpt:
      "Start your day with simple Ayurvedic-inspired rituals that encourage calm, mindful living and a more balanced morning routine.",
    date: "18 May 2025",
    image: blog1,
    href: "/blogs/ayurvedic-rituals-grounded-morning",
  },
  {
    id: 2,
    category: "Ayurveda",
    title: "Understanding agni: your inner digestive fire",
    excerpt:
      "Discover the Ayurvedic concept of Agni, or inner digestive fire, and learn how mindful eating, daily routines, and balanced habits are traditionally connected to digestive wellbeing.",
    date: "18 May 2025",
    image:blog2,
    href: "/blogs/understanding-agni-inner-digestive-fire",
  },
  {
    id: 3,
    category: "Sleep & Stress",
    title: "Herbal wisdom for deeper, more restful sleep",
    excerpt:
      "Explore traditional herbal wisdom and simple Ayurvedic-inspired evening practices that can help create a calm, soothing routine for more restful nights.",
    date: "18 May 2025",
    image: blog3,
    href: "/blogs/herbal-wisdom-restful-sleep",
  },
  {
    id: 4,
    category: "Herbal Ingredients",
    title: "Understanding Ayurveda in Your Everyday Wellness Routine",
    excerpt:
      "Discover the principles of Ayurveda and learn how traditional wellness practices can complement a balanced everyday routine.",
    date: "18 May 2025",
    image:blog3,
    href: "/blogs/ayurveda-everyday-wellness-routine",
  },
  {
    id: 5,
    category: "Daily Living",
    title: "5 Ayurvedic rituals for a more grounded morning",
    excerpt:
      "Start your day with simple Ayurvedic-inspired rituals that encourage calm, mindful living and a more balanced morning routine.",
    date: "18 May 2025",
    image: blog1,
    href: "/blogs/ayurvedic-rituals-grounded-morning",
  },
  {
    id: 6,
    category: "Ayurveda",
    title: "Understanding agni: your inner digestive fire",
    excerpt:
      "Discover the Ayurvedic concept of Agni, or inner digestive fire, and learn how mindful eating, daily routines, and balanced habits are traditionally connected to digestive wellbeing.",
    date: "18 May 2025",
    image:blog2,
    href: "/blogs/understanding-agni-inner-digestive-fire",
  },
  {
    id: 7,
    category: "Sleep & Stress",
    title: "Herbal wisdom for deeper, more restful sleep",
    excerpt:
      "Explore traditional herbal wisdom and simple Ayurvedic-inspired evening practices that can help create a calm, soothing routine for more restful nights.",
    date: "18 May 2025",
    image: blog3,
    href: "/blogs/herbal-wisdom-restful-sleep",
  },
  {
    id: 8,
    category: "Herbal Ingredients",
    title: "Understanding Ayurveda in Your Everyday Wellness Routine",
    excerpt:
      "Discover the principles of Ayurveda and learn how traditional wellness practices can complement a balanced everyday routine.",
    date: "18 May 2025",
    image:blog3,
    href: "/blogs/ayurveda-everyday-wellness-routine",
  },
];

export default function BlogSlider() {
  return (
    <section
      aria-labelledby="blog-heading"
      className="mx-auto   py-10  sm:py-8 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <TitleDescription
        id="blog-heading"
        heading="Discover the Wisdom of Ayurveda"
        description="Explore educational articles about Ayurveda, herbs, wellness routines and healthy living."
        buttonText="Read More"
        buttonHref="/blogs"
        align="left"
      />

      <Slider label="Latest articles" className="mt-6">
        {POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Slider>
    </section>
  );
}