"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Upload } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

const INPUT =
  "mt-1 w-full border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:border-[#C5A84C]";
const LABEL = "block text-sm font-medium";
const CATEGORIES = [
  "Ayurvedic Wellness",
  "Daily Self-Care",
  "Product Education",
  "Herbal Ingredients",
];

const IMG_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  image: "",
  author: "",
  html: "",
  isPublished: false,
};

async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/admin/upload-image", {
    method: "POST",
    body: fd,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Upload failed.");
  }

  if (!data.url) {
    throw new Error("Upload completed, but no image URL was returned.");
  }

  return data.url;
}

function Section({ title, children }) {
  return (
    <section className="space-y-4 rounded border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function BlogForm({ blogId }) {
  const router = useRouter();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(Boolean(blogId));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    if (!blogId) return;

    let alive = true;

    (async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${blogId}`, {
          cache: "no-store",
        });

        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Could not load blog.");
        }

        const blog = data.blog;

        if (!alive) return;

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          category: blog.category || "",
          excerpt: blog.excerpt || "",
          image: blog.image || "",
          author: blog.author || "",
          html: blog.html || "",
          isPublished: Boolean(blog.isPublished),
        });
      } catch (err) {
        if (alive) {
          setError(
            err instanceof TypeError
              ? "Network error. Check your connection."
              : err.message
          );
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [blogId, router]);

  async function onImage(event) {
    const file = event.target.files?.[0];

    // Allows selecting the same file again later.
    event.target.value = "";

    if (!file) return;

    if (!IMG_TYPES.includes(file.type)) {
      setError("Only JPG, PNG or WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const imageUrl = await uploadImage(file);
      set("image", imageUrl);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Network error. Check your connection."
          : err.message
      );
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (saving || uploading) return;

    setError("");

    if (!form.title.trim()) return setError("Title is required.");
    if (!form.category.trim()) return setError("Category is required.");
    if (!form.excerpt.trim()) {
      return setError("Short description is required.");
    }
    if (!form.html.trim()) {
      return setError("Article content is required.");
    }

    setSaving(true);

    try {
      const res = await fetch(
        blogId ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs",
        {
          method: blogId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            category: form.category,
            excerpt: form.excerpt,
            image: form.image,
            author: form.author,
            html: form.html,
            isPublished: form.isPublished,
          }),
        }
      );

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Save failed.");
      }

      router.push(`/admin/blogs?msg=${blogId ? "updated" : "created"}`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Network error. Check your connection."
          : err.message
      );

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-4xl space-y-6">
      <Section title="Basic details">
        <div>
          <label className={LABEL} htmlFor="b-title">
            Title *
          </label>
          <input
            id="b-title"
            className={INPUT}
            maxLength={200}
            value={form.title}
            onChange={(event) => set("title", event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="b-category">
              Category *
            </label>
            <input
              id="b-category"
              list="blog-categories"
              className={INPUT}
              maxLength={100}
              value={form.category}
              onChange={(event) => set("category", event.target.value)}
              placeholder="Select or type a new one"
            />
            <datalist id="blog-categories">
              {CATEGORIES.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div>
            <label className={LABEL} htmlFor="b-author">
              Author
            </label>
            <input
              id="b-author"
              className={INPUT}
              maxLength={120}
              value={form.author}
              onChange={(event) => set("author", event.target.value)}
              placeholder="Dr. Arti’s Wellness Editorial Team"
            />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="b-slug">
            URL slug
          </label>
          <input
            id="b-slug"
            className={INPUT}
            maxLength={120}
            value={form.slug}
            onChange={(event) => set("slug", event.target.value)}
            placeholder="Auto from title if left empty"
          />
          <p className="mt-1 text-xs text-gray-500">
            /blogs/{form.slug || "your-title"}. Slug badalne se purana link
            kaam nahi karega.
          </p>
        </div>

        <div>
          <label className={LABEL} htmlFor="b-excerpt">
            Short description *
          </label>
          <textarea
            id="b-excerpt"
            rows={3}
            maxLength={500}
            className={INPUT}
            value={form.excerpt}
            onChange={(event) => set("excerpt", event.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            Blog card par dikhta hai ({form.excerpt.length}/500)
          </p>
        </div>
      </Section>

      <Section title="Cover image">
        {/* White upload button. Clicking it opens the system file picker directly. */}
        <label
          className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-[#C5A84C] hover:shadow-md ${
            uploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#C5A84C]/10 text-[#A88C35] transition-colors group-hover:bg-[#C5A84C] group-hover:text-white">
            <Upload size={22} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-800">
              {form.image ? "Change cover image" : "Choose cover image"}
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              Select an image from your device
            </span>
          </span>

          <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition-colors group-hover:border-[#C5A84C] group-hover:text-[#A88C35]">
            Browse
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onImage}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <p className="text-xs text-gray-500">
          JPG, PNG or WEBP · Maximum 5 MB
        </p>

        {uploading && (
          <p className="text-sm text-gray-500">Uploading image...</p>
        )}

        {/* Uploaded image preview appears below the upload button. */}
        {form.image && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Uploaded cover image
            </p>

            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image}
                alt="Blog cover"
                className="h-40 w-64 rounded-lg border border-gray-200 bg-gray-50 object-cover"
              />

              <button
                type="button"
                onClick={() => set("image", "")}
                aria-label="Remove image"
                className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-[#E3122E] text-white shadow transition-transform hover:scale-110"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </Section>

      <Section title="Article content">
        <RichTextEditor
          value={form.html}
          onChange={(value) => set("html", value)}
          onError={setError}
        />
      </Section>

      <Section title="Visibility">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) => set("isPublished", event.target.checked)}
          />
          Enable to publish, disable to save as draft.
        </label>
      </Section>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 py-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-[#C5A84C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#A88C35] disabled:opacity-60"
        >
          {saving ? "Saving..." : blogId ? "Update Blog" : "Create Blog"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="border border-black px-6 py-2.5 text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

