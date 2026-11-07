import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import BlogCard from "@/components/shared/BlogCard";

import { getPublishedBlogs } from "@/lib/getBlogs";

const LIMIT = 10;

export default async function BlogSlider() {
  const POSTS = await getPublishedBlogs({ limit: LIMIT });
  if (POSTS.length === 0) return null;

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