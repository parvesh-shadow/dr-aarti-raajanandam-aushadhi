"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

const INPUT =
  "mt-1 w-full border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:border-[#C5A84C]";
const LABEL = "block text-sm font-medium";
const CATEGORIES = ["Ayurvedic Wellness", "Daily Self-Care", "Product Education", "Herbal Ingredients"];

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
  const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
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

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  useEffect(() => {
    if (!blogId) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${blogId}`, { cache: "no-store" });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load blog.");
        const b = d.blog;
        if (!alive) return;
        setForm({
          title: b.title || "",
          slug: b.slug || "",
          category: b.category || "",
          excerpt: b.excerpt || "",
          image: b.image || "",
          author: b.author || "",
          html: b.html || "",
          isPublished: Boolean(b.isPublished),
        });
      } catch (e) {
        if (alive) setError(e instanceof TypeError ? "Network error. Check your connection." : e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [blogId, router]);

  async function onImage(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      set("image", await uploadImage(file));
    } catch (err) {
      setError(err instanceof TypeError ? "Network error. Check your connection." : err.message);
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (saving || uploading) return;
    setError("");

    if (!form.title.trim()) return setError("Title is required.");
    if (!form.category.trim()) return setError("Category is required.");
    if (!form.excerpt.trim()) return setError("Short description is required.");

    if (!form.html.trim()) return setError("Article content is required.");

    setSaving(true);
    try {
      const res = await fetch(blogId ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs", {
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
      });
      if (res.status === 401) return router.replace("/admin/login");
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "Save failed.");
      router.push(`/admin/blogs?msg=${blogId ? "updated" : "created"}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof TypeError ? "Network error. Check your connection." : err.message);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <form onSubmit={onSubmit} className="max-w-4xl space-y-6">
      <Section title="Basic details">
        <div>
          <label className={LABEL} htmlFor="b-title">Title *</label>
          <input id="b-title" className={INPUT} maxLength={200} value={form.title} onChange={(e) => set("title", e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="b-category">Category *</label>
            <input
              id="b-category"
              list="blog-categories"
              className={INPUT}
              maxLength={100}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Select or type a new one"
            />
            <datalist id="blog-categories">
              {CATEGORIES.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <label className={LABEL} htmlFor="b-author">Author</label>
            <input id="b-author" className={INPUT} maxLength={120} value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Dr. Arti’s Wellness Editorial Team" />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="b-slug">URL slug</label>
          <input id="b-slug" className={INPUT} maxLength={120} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="Auto from title if left empty" />
          <p className="mt-1 text-xs text-gray-500">/blogs/{form.slug || "your-title"}. Slug badalne se purana link kaam nahi karega.</p>
        </div>

        <div>
          <label className={LABEL} htmlFor="b-excerpt">Short description *</label>
          <textarea id="b-excerpt" rows={3} maxLength={500} className={INPUT} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          <p className="mt-1 text-xs text-gray-500">Blog card par dikhta hai ({form.excerpt.length}/500)</p>
        </div>
      </Section>

      <Section title="Cover image">
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onImage} disabled={uploading} className="block w-full text-sm" />
        <p className="text-xs text-gray-500">JPG, PNG ya WEBP, max 5 MB.</p>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {form.image && (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.image} alt="" className="h-32 w-56 rounded border border-gray-200 object-cover" />
            <button
              type="button"
              onClick={() => set("image", "")}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[#E3122E] text-white"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </Section>

      <Section title="Article content">
        <RichTextEditor value={form.html} onChange={(v) => set("html", v)} onError={setError} />
      </Section>

      <Section title="Visibility">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} />
          Enable to publish, disable to save as draft.
        </label>
      </Section>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

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
