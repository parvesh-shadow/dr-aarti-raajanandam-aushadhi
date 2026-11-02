"use client";

import { useState } from "react";
import TitleDescription from "@/components/shared/TitleDescription";

const fieldClass =
  "mt-2 h-12 w-full border border-gray-200 bg-[#F4F4F4] px-4 text-sm text-black outline-none transition-colors placeholder:text-gray-500 focus:border-[#C5A84C] sm:text-base";
const labelClass = "text-sm font-medium text-black sm:text-base";
const errorClass = "mt-1 text-xs text-[#E3122E]";

const initialForm = { current: "", next: "", confirm: "" };

export default function PasswordSecurityPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Please enter your current password.";
    if (form.next.length < 8) e.next = "Password must be at least 8 characters.";
    else if (form.next === form.current)
      e.next = "New password must be different from the current one.";
    if (form.confirm !== form.next) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    // TODO: yahan API call aayegi
    setForm(initialForm);
    setSuccess(true);
  };

  return (
    <div>
      <TitleDescription
        heading="Password & Security"
        description="Keep your account safe by updating your password regularly."
      />

      <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md">
        <div>
          <label htmlFor="current" className={labelClass}>
            Current Password
          </label>
          <input
            id="current"
            name="current"
            type="password"
            autoComplete="current-password"
            value={form.current}
            onChange={handleChange}
            placeholder="Enter current password"
            className={fieldClass}
          />
          {errors.current && <p className={errorClass}>{errors.current}</p>}
        </div>

        <div className="mt-5">
          <label htmlFor="next" className={labelClass}>
            New Password
          </label>
          <input
            id="next"
            name="next"
            type="password"
            autoComplete="new-password"
            value={form.next}
            onChange={handleChange}
            placeholder="Enter new password"
            className={fieldClass}
          />
          {errors.next && <p className={errorClass}>{errors.next}</p>}
        </div>

        <div className="mt-5">
          <label htmlFor="confirm" className={labelClass}>
            Confirm Password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Re-enter password"
            className={fieldClass}
          />
          {errors.confirm && <p className={errorClass}>{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 flex h-12 w-full items-center justify-center bg-[#C5A84C] text-sm font-medium uppercase text-white transition-colors hover:bg-[#A88C35]"
        >
          Save Password
        </button>

        {success && (
          <p role="status" className="mt-3 text-sm text-green-700">
            Your password has been updated.
          </p>
        )}
      </form>
    </div>
  );
}