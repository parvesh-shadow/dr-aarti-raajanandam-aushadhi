"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { SOCIAL_PLATFORMS } from "@/lib/socials";

const INPUT =
  "mt-1 w-full border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:border-[#C5A84C]";
const LABEL = "block text-sm font-medium";

export default function SettingsForm() {
  const router = useRouter();
  const [form, setForm] = useState({ phone: "", email: "", socials: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load settings.");
        if (alive) setForm({ phone: d.settings.phone || "", email: d.settings.email || "", socials: d.settings.socials || [] });
      } catch (e) {
        if (alive) setError(e instanceof TypeError ? "Network error. Check your connection." : e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [router]);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };
  const setSocial = (i, k, v) => {
    setForm((f) => ({ ...f, socials: f.socials.map((s, n) => (n === i ? { ...s, [k]: v } : s)) }));
    setSaved(false);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) return router.replace("/admin/login");
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "Save failed.");
      setForm({ phone: d.settings.phone, email: d.settings.email, socials: d.settings.socials });
      setSaved(true);
    } catch (err) {
      setError(err instanceof TypeError ? "Network error. Check your connection." : err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <section className="space-y-4 rounded border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Contact details</h2>
        <p className="text-xs text-gray-500">This will be displayed on the Contact page and footer.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="s-phone">Phone number</label>
            <input id="s-phone" type="tel" className={INPUT} maxLength={20} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className={LABEL} htmlFor="s-email">Email</label>
            <input id="s-email" type="email" className={INPUT} maxLength={150} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Social media</h2>
        <p className="text-xs text-gray-500">
These links are used in the footer, Contact page (Instagram), and Instagram section on the Home page. Links must start with https://.
        </p>

        {form.socials.length === 0 && <p className="text-sm text-gray-500">No social links added.</p>}

        {form.socials.map((s, i) => (
          <div key={i} className="grid gap-3 border border-gray-200 p-3 sm:grid-cols-[180px_1fr_auto] sm:items-end">
            <div>
              <label className={LABEL} htmlFor={`s-p-${i}`}>Platform</label>
              <select id={`s-p-${i}`} className={INPUT} value={s.platform} onChange={(e) => setSocial(i, "platform", e.target.value)}>
                <option value="">Select</option>
                {SOCIAL_PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor={`s-u-${i}`}>Link</label>
              <input id={`s-u-${i}`} type="url" className={INPUT} maxLength={300} value={s.url} onChange={(e) => setSocial(i, "url", e.target.value)} placeholder="https://www.instagram.com/your_page" />
            </div>
            <button
              type="button"
              onClick={() => { setForm((f) => ({ ...f, socials: f.socials.filter((_, n) => n !== i) })); setSaved(false); }}
              aria-label={`Remove social link ${i + 1}`}
              className="justify-self-start p-2 text-[#E3122E] sm:justify-self-auto"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => { setForm((f) => ({ ...f, socials: [...f.socials, { platform: "", url: "" }] })); setSaved(false); }}
          className="flex items-center gap-2 border border-black px-3 py-2 text-sm hover:bg-gray-100"
        >
          <Plus size={16} /> Add social media
        </button>
      </section>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {saved && <p role="status" className="text-sm text-green-700">Settings saved. Updated on the website..</p>}

      <div>
        <button
          type="submit"
          disabled={saving}
          className="bg-[#C5A84C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#A88C35] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save settings"}
        </button>
      </div>
    </form>
  );
}
