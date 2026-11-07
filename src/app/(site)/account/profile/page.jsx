"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Pencil } from "lucide-react";

const inputClass =
  "mt-2 h-12 w-full border border-gray-200 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#C5A84C] sm:text-base";
const labelClass = "text-sm font-medium text-black sm:text-base";
const EMPTY = { fullName: "", email: "", mobile: "", dob: "" };
const today = () => new Date().toISOString().slice(0, 10);

export default function ProfilePage() {
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(EMPTY); // last saved values, dirty check ke liye
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch("/api/account/profile", { cache: "no-store" }).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("/api/account/addresses", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { addresses: [] })).catch(() => ({ addresses: [] })),
    ])
      .then(([p, a]) => {
        if (!alive) return;
        const v = { fullName: p.profile.name, email: p.profile.email, mobile: p.profile.phone, dob: p.profile.dob };
        setForm(v);
        setSaved(v);
        setAddress(a.addresses?.[0] || null);
      })
      .catch(() => alive && setError("Could not load your profile. Please refresh."))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving || loading || !dirty) return;
    if (form.fullName.trim().length < 2) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Enter a valid email address.");
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.fullName, email: form.email, phone: form.mobile, dob: form.dob }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) return setError(d.error || "Could not update profile.");
      const v = { fullName: d.profile.name, email: d.profile.email, mobile: d.profile.phone, dob: d.profile.dob };
      setForm(v);
      setSaved(v);
      setSuccess(true);
      window.dispatchEvent(new CustomEvent("profile-updated", { detail: { name: v.fullName, email: v.email, phone: v.mobile } }));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-4xl">
      <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">Personal details</h2>

      <fieldset disabled={loading} className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name</label>
          <input id="fullName" name="fullName" type="text" maxLength={60} autoComplete="name"
            value={form.fullName} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input id="email" name="email" type="email" maxLength={150} autoComplete="email"
            value={form.email} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="mobile" className={labelClass}>Mobile Number</label>
          <input id="mobile" name="mobile" type="tel" inputMode="numeric" maxLength={14} autoComplete="tel"
            value={form.mobile} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="dob" className={labelClass}>Date of Birth</label>
          <div className="relative">
            <input id="dob" name="dob" type="date" min="1900-01-01" max={today()}
              value={form.dob} onChange={handleChange}
              className={`${inputClass} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`} />
            <CalendarDays className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-black" aria-hidden="true" />
          </div>
        </div>
      </fieldset>

      <div className="mt-6">
        <p className={labelClass}>Address</p>
        <div className="relative mt-3 border-l-4 border-[#C5A84C] bg-gray-50 p-4">
          {address ? (
            <>
              <p className="text-xs text-black sm:text-sm">Saved delivery address</p>
              <p className="mt-3 text-base font-medium text-black sm:text-lg">{address.label}</p>
              <p className="mt-2 pr-8 text-xs text-black sm:text-sm">{address.text}</p>
            </>
          ) : (
            <p className="pr-8 text-xs text-black sm:text-sm">
              {loading ? "Loading..." : "No saved address yet. Add one for faster checkout."}
            </p>
          )}
          <Link href="/account/address" aria-label="Manage saved addresses"
            className="absolute right-4 top-4 text-black transition-colors hover:text-[#C5A84C]">
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-[#E3122E]">{error}</p>}
      {success && <p role="status" className="mt-4 text-sm text-green-700">Your profile has been updated.</p>}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-end">
        <Link href="/account/password-security"
          className="group flex h-12 items-center justify-center gap-2 bg-[#C5A84C] px-8 text-sm font-medium uppercase text-white transition-colors hover:bg-[#A88C35] sm:min-w-[190px]">
          Change Password
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <button type="submit" disabled={saving || loading || !dirty}
          className="flex h-12 items-center justify-center border border-black bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[190px]">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
