import BlogForm from "@/components/admin/BlogForm";

export const metadata = { title: "Add Blog" };

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add Blog</h1>
      <BlogForm />
    </div>
  );
}
