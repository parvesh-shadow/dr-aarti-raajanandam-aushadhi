import { notFound } from "next/navigation";
import BlogDetailHero from "@/components/blog-detail/BlogDetailHero";
import BlogContent from "@/components/blog-detail/BlogContent";
import RelatedArticles from "@/components/blog-detail/RelatedArticles";
import BlogDetailFAQ from "@/components/blog-detail/BlogDetailFAQ";
import { getPostBySlug, getRelatedPosts } from "@/data/blogs";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found | Raaj Anandam Aushadhi" };

  return {
    title: `${post.title} | Raaj Anandam Aushadhi`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const { related: relatedPage } = await searchParams;

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const currentPage = Number(relatedPage) || 1;

  return (
    <>
      <BlogDetailHero post={post} />
      <BlogContent post={post} />
      <RelatedArticles
        posts={related}
        currentPage={currentPage}
        basePath={`/blogs/${slug}`}
      />
      <BlogDetailFAQ />
    </>
  );
}