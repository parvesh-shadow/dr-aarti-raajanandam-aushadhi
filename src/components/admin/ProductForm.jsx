"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Trash2, Upload, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const INPUT =
  "mt-1 w-full border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:border-[#C5A84C]";
const LABEL = "block text-sm font-medium";
const ICONS = ["leaf", "heart", "book", "shield"];

const EMPTY = {
  name: "", category: "", filter: "", description: "", pack: "",
  netQuantity: "", type: "", price: "", mrp: "", stock: "",
  images: [], brochureHref: "",
  about: "", specs: [],
  benefitsIntro: "", benefits: [],
  usageIntro: "", usage: [],
  ingredientsHeading: "", ingredientsDescription: "", ingredients: [],
  faqs: [],
  isFeatured: false, isActive: true,
};

async function upload(url, field, files) {
  const fd = new FormData();
  [...files].forEach((f) => fd.append(field, f));
  const res = await fetch(url, { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data;
}

async function uploadImage(file) {
  const { url } = await upload("/api/admin/upload-image", "file", [file]);
  return url;
}

// Form ke bahar declare kiya hai (render ke andar component nahi banta)
function Section({ title, children }) {
  return (
    <section className="space-y-4 rounded border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, as = "input", ...rest }) {
  const Tag = as;
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <Tag className={INPUT} {...rest} />
    </div>
  );
}

// Custom file upload card (asli input hidden hai, poora card clickable hai)
function UploadBox({ title, subtitle, hint, maxMB, onChange, disabled, ...rest }) {
  const [sizeError, setSizeError] = useState("");

  const handleChange = (e) => {
    const tooBig = [...(e.target.files || [])].some((f) => f.size > maxMB * 1024 * 1024);
    if (tooBig) {
      setSizeError(`File must be ${maxMB} MB or smaller.`);
      e.target.value = "";
      return;
    }
    setSizeError("");
    onChange(e);
  };

  return (
    <div className="mt-2">
      <label
        className={`flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition sm:gap-4 sm:px-4 focus-within:border-[#C5A84C] ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-[#C5A84C]"
        }`}
      >
        <input
          type="file"
          className="sr-only"
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#C5A84C]/10 text-[#A88C35]">
          <Upload size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-slate-800">{title}</span>
          <span className="block text-xs text-slate-500">{subtitle}</span>
        </span>
        <span className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-slate-700">
          Browse
        </span>
      </label>
      <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      {sizeError && <p role="alert" className="mt-1 text-sm text-red-600">{sizeError}</p>}
    </div>
  );
}

// Repeat hone wali rows (specs, benefits, usage, ingredients, faqs)
function Repeater({ title, addLabel, items, onChange, blank, render }) {
  const setRow = (i, key, val) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it)));

  return (
    <Section title={title}>
      {items.map((item, i) => (
        <div key={i} className="relative space-y-3 border border-gray-200 p-3 pr-10">
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Remove row"
            className="absolute right-2 top-2 text-[#E3122E]"
          >
            <Trash2 size={16} />
          </button>
          {render(item, (key, val) => setRow(i, key, val))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { ...blank }])}
        className="flex items-center gap-2 border border-black px-3 py-2 text-sm hover:bg-gray-100"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </Section>
  );
}

export default function ProductForm({ productId }) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/admin/products/${productId}`, { cache: "no-store" })
      .then(async (r) => {
        if (r.status === 401) { router.replace("/admin/login"); throw new Error("Session expired."); }
        return r.json().catch(() => ({}));
      })
      .then((d) => {
        if (!d.ok) throw new Error(d.error || "Failed to load product.");
        setForm({ ...EMPTY, ...d.product });
      })
      .catch((e) => setError(e instanceof TypeError ? "Network error. Check your connection." : e.message || "Failed to load product."))
      .finally(() => setLoading(false));
  }, [productId]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const change = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };

  // Upload ka common wrapper (busy + error)
  async function run(task) {
    setBusy(true);
    setError("");
    try {
      await task();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const onImages = (e) => {
    const input = e.target;
    const files = input.files;
    if (!files?.length) return;
    run(async () => {
      const urls = [];
      // Max 5 images: sirf bachi hui jagah jitni files upload karo
      const room = Math.max(0, 5 - form.images.length);
      for (const file of [...files].slice(0, room)) urls.push(await uploadImage(file));
      setForm((f) => ({ ...f, images: [...f.images, ...urls].slice(0, 5) }));
    }).finally(() => (input.value = ""));
  };

  const onBrochure = (e) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    run(async () => {
      const { url } = await upload("/api/admin/upload-brochure", "file", [file]);
      set("brochureHref", url);
    }).finally(() => (input.value = ""));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (saving || busy) return;
    setError("");
    const priceNum = Number(form.price);
    if (!form.name.trim()) return setError("Product name is required.");
    if (!CATEGORIES.includes(form.category)) return setError("Please select a category.");
    if (form.price === "" || !Number.isFinite(priceNum) || priceNum < 0) return setError("Enter a valid price.");
    if (Number(form.mrp) > 0 && Number(form.mrp) < priceNum) return setError("MRP cannot be less than price.");
    if (form.stock !== "" && (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)) return setError("Stock must be a whole number (0 or more).");
    setSaving(true);

    const body = {
      name: form.name,
      category: form.category,
      filter: form.category,
      description: form.description,
      pack: form.pack,
      netQuantity: form.netQuantity,
      type: form.type,
      price: Number(form.price),
      mrp: Number(form.mrp) || 0,
      stock: Number(form.stock) || 0,
      images: form.images.slice(0, 5), // purane products ki 5 se zyada images bhi save ho sake
      brochureHref: form.brochureHref,
      about: form.about,
      specs: form.specs.filter((r) => r.label?.trim() && r.value?.trim()),
      benefitsIntro: form.benefitsIntro,
      benefits: form.benefits.filter((r) => r.title?.trim()),
      usageIntro: form.usageIntro,
      usage: form.usage.filter((r) => r.question?.trim() && r.answer?.trim()),
      ingredientsHeading: form.ingredientsHeading,
      ingredientsDescription: form.ingredientsDescription,
      ingredients: form.ingredients
        .filter((r) => r.name?.trim())
        .map((r) => ({ name: r.name, description: r.description || "", image: r.image || "" })),
      faqs: form.faqs.filter((r) => r.question?.trim() && r.answer?.trim()),
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    };

    try {
      const res = await fetch(
        productId ? `/api/admin/products/${productId}` : "/api/admin/products",
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 401) { router.replace("/admin/login"); return; }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed.");
      router.push(`/admin/products?msg=${productId ? "updated" : "created"}`);
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
      {/* 1. Basic */}
      <Section title="Basic details">
        <Field label="Product Name *" name="name" required value={form.name} onChange={change} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Category *</label>
            <select name="category" required value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value, filter: e.target.value }))} className={INPUT}>
              <option value="">-- Select category --</option>
              {CATEGORIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <Field label="Price (₹) *" name="price" type="number" min="0" required value={form.price} onChange={change} />
          <Field label="MRP (₹)" name="mrp" type="number" min="0" value={form.mrp} onChange={change} />
          <Field label="Stock" name="stock" type="number" min="0" value={form.stock} onChange={change} />
          <Field label="Pack (card par, e.g. 800 mg • 60 Capsules)" name="pack" value={form.pack} onChange={change} />
          <Field label="Net quantity (e.g. 800 mg)" name="netQuantity" value={form.netQuantity} onChange={change} />
          <Field label="Product type (e.g. Ayurvedic product)" name="type" value={form.type} onChange={change} />
        </div>
        <Field label="Short description" as="textarea" rows={3} name="description" value={form.description} onChange={change} />
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={change} /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={change} /> Active (website par dikhe)
          </label>
        </div>
      </Section>

      {/* 2. Images + brochure */}
      <Section title="Images & Brochure">
        <div>
          <p className={LABEL}>Images (max 5. Pehli image main hai)</p>
          <UploadBox
            title="Choose product images"
            subtitle={form.images.length >= 5 ? "Maximum 5 images added" : "Select images from your device"}
            hint="JPG, PNG or WEBP · Maximum 5 MB each"
            maxMB={5}
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={onImages}
            disabled={busy || form.images.length >= 5}
          />
          {form.images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {form.images.map((url, i) => (
                <div key={url} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Product image ${i + 1}`} className="h-28 w-28 rounded-xl border border-gray-200 object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-[#C5A84C] px-1.5 py-0.5 text-xs text-white">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => set("images", form.images.filter((img) => img !== url))}
                    aria-label="Remove image"
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[#E3122E] text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className={LABEL}>Brochure</p>
          <UploadBox
            title="Choose brochure"
            subtitle="Select a PDF from your device"
            hint="PDF · Maximum 10 MB"
            maxMB={10}
            accept="application/pdf"
            onChange={onBrochure}
            disabled={busy}
          />
          {form.brochureHref && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm">
              <FileText size={20} className="shrink-0 text-[#A88C35]" />
              <a href={form.brochureHref} target="_blank" rel="noreferrer" className="flex-1 text-[#A88C35] underline">
                Current brochure
              </a>
              <button type="button" onClick={() => set("brochureHref", "")} className="text-[#E3122E]">
                Remove
              </button>
            </div>
          )}
        </div>
        {busy && <p className="text-sm text-gray-500">Uploading...</p>}
      </Section>

      {/* 3. Description tab */}
      <Section title="Description tab">
        <Field label="About us" as="textarea" rows={4} name="about" value={form.about} onChange={change} />
      </Section>

      <Repeater
        title="Product Specifications"
        addLabel="Add row"
        items={form.specs}
        onChange={(v) => set("specs", v)}
        blank={{ label: "", value: "" }}
        render={(item, setRow) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Label (e.g. Strength)" value={item.label || ""} onChange={(e) => setRow("label", e.target.value)} />
            <Field label="Value (e.g. 800 mg)" value={item.value || ""} onChange={(e) => setRow("value", e.target.value)} />
          </div>
        )}
      />

      {/* 4. Benefits tab */}
      <Section title="Benefits / uses tab">
        <Field label="Intro text" as="textarea" rows={2} name="benefitsIntro" value={form.benefitsIntro} onChange={change} />
      </Section>

      <Repeater
        title="Benefits list"
        addLabel="Add benefit"
        items={form.benefits}
        onChange={(v) => set("benefits", v)}
        blank={{ icon: "leaf", title: "", description: "" }}
        render={(item, setRow) => (
          <>
            <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
              <div>
                <label className={LABEL}>Icon</label>
                <select value={item.icon || "leaf"} onChange={(e) => setRow("icon", e.target.value)} className={INPUT}>
                  {ICONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <Field label="Title" value={item.title || ""} onChange={(e) => setRow("title", e.target.value)} />
            </div>
            <Field label="Description" value={item.description || ""} onChange={(e) => setRow("description", e.target.value)} />
          </>
        )}
      />

      {/* 5. Usage tab */}
      <Section title="Usage tab">
        <Field label="Intro text" as="textarea" rows={2} name="usageIntro" value={form.usageIntro} onChange={change} />
      </Section>

      <Repeater
        title="Usage instructions (sawal / jawab)"
        addLabel="Add instruction"
        items={form.usage}
        onChange={(v) => set("usage", v)}
        blank={{ question: "", answer: "" }}
        render={(item, setRow) => (
          <>
            <Field label="Question" value={item.question || ""} onChange={(e) => setRow("question", e.target.value)} />
            <Field label="Answer" as="textarea" rows={2} value={item.answer || ""} onChange={(e) => setRow("answer", e.target.value)} />
          </>
        )}
      />

      {/* 6. Ingredients */}
      <Section title="Ingredients section">
        <Field label="Heading" name="ingredientsHeading" value={form.ingredientsHeading} onChange={change} />
        <Field label="Description" as="textarea" rows={2} name="ingredientsDescription" value={form.ingredientsDescription} onChange={change} />
      </Section>

      <Repeater
        title="Ingredients"
        addLabel="Add ingredient"
        items={form.ingredients}
        onChange={(v) => set("ingredients", v)}
        blank={{ name: "", description: "", image: "" }}
        render={(item, setRow) => (
          <>
            <Field label="Name" value={item.name || ""} onChange={(e) => setRow("name", e.target.value)} />
            <Field label="Description" as="textarea" rows={2} value={item.description || ""} onChange={(e) => setRow("description", e.target.value)} />
            <div>
              <p className={LABEL}>Image</p>
              <UploadBox
                title="Choose ingredient image"
                subtitle="Select an image from your device"
                hint="JPG, PNG or WEBP · Maximum 5 MB"
                maxMB={5}
                accept="image/jpeg,image/png,image/webp"
                disabled={busy}
                onChange={(e) => {
                  const input = e.target;
                  const file = input.files?.[0];
                  if (!file) return;
                  run(async () => {
                    setRow("image", await uploadImage(file));
                  }).finally(() => (input.value = ""));
                }}
              />
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name || "Ingredient"} className="mt-3 h-28 w-28 rounded-xl border border-gray-200 object-cover" />
              )}
            </div>
          </>
        )}
      />

      {/* 7. FAQs */}
      <Repeater
        title="FAQs"
        addLabel="Add FAQ"
        items={form.faqs}
        onChange={(v) => set("faqs", v)}
        blank={{ question: "", answer: "" }}
        render={(item, setRow) => (
          <>
            <Field label="Question" value={item.question || ""} onChange={(e) => setRow("question", e.target.value)} />
            <Field label="Answer" as="textarea" rows={3} value={item.answer || ""} onChange={(e) => setRow("answer", e.target.value)} />
          </>
        )}
      />

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 py-4">
        <button
          type="submit"
          disabled={saving || busy}
          className="bg-[#C5A84C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#A88C35] disabled:opacity-60"
        >
          {saving ? "Saving..." : productId ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="border border-black px-6 py-2.5 text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}