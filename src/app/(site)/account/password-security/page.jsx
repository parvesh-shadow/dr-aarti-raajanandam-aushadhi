"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";

const fieldClass =
  "mt-2 h-12 w-full border border-gray-200 bg-[#F4F4F4] px-4 pr-12 text-sm text-black outline-none transition-colors placeholder:text-gray-500 focus:border-[#C5A84C] sm:text-base";
const labelClass = "text-sm font-medium text-black sm:text-base";
const errorClass = "mt-1 text-xs text-[#E3122E]";
const initialForm = { current: "", next: "", confirm: "" };

function PasswordField({ id, label, value, onChange, placeholder, autoComplete, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className={labelClass}>{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={fieldClass}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-600 hover:text-[#C5A84C]"
        >
          {show ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function PasswordSecurityPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Please enter your current password.";
    if (form.next.length < 8) e.next = "Password must be at least 8 characters.";
    else if (form.next.length > 72) e.next = "Password is too long (max 72 characters).";
    else if (form.next === form.current) e.next = "New password must be different from the current one.";
    if (form.confirm !== form.next) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    const found = validate();
    if (Object.keys(found).length) return setErrors(found);
    setSaving(true);
    setServerError("");
    try {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 400) setErrors({ current: d.error || "Current password is incorrect." });
        else setServerError(d.error || "Could not update password.");
        return;
      }
      setForm(initialForm);
      setSuccess(true);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <TitleDescription
        heading="Password & Security"
        description="Keep your account safe by updating your password regularly."
      />
      <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md">
        <PasswordField id="current" label="Current Password" value={form.current} onChange={handleChange}
          placeholder="Enter current password" autoComplete="current-password" error={errors.current} />
        <PasswordField id="next" label="New Password" value={form.next} onChange={handleChange}
          placeholder="Enter new password (min 8 characters)" autoComplete="new-password" error={errors.next} />
        <PasswordField id="confirm" label="Confirm Password" value={form.confirm} onChange={handleChange}
          placeholder="Re-enter password" autoComplete="new-password" error={errors.confirm} />
        <button
          type="submit"
          disabled={saving}
          className="mt-6 flex h-12 w-full items-center justify-center bg-[#C5A84C] text-sm font-medium uppercase text-white transition-colors hover:bg-[#A88C35] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Password"}
        </button>
        {serverError && <p role="alert" className="mt-3 text-sm text-[#E3122E]">{serverError}</p>}
        {success && (
          <p role="status" className="mt-3 text-sm text-green-700">
            Your password has been updated. You have been signed out from other devices.
          </p>
        )}
      </form>
    </div>
  );
}
