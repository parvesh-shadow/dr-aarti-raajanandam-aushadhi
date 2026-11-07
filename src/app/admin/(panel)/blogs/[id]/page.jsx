import BlogForm from "@/components/admin/BlogForm";

export const metadata = { title: "Edit Blog" };

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Blog</h1>
      <BlogForm key={id} blogId={id} />
    </div>
  );
}
