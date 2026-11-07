"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

const initialForm = { type: "Home", address: "", city: "", state: "", pin: "" };

const fieldClass =
  "mt-0.5 w-full border border-transparent bg-[#F4F4F4] px-4 text-sm text-black outline-none transition-colors placeholder:text-gray-500 focus:border-[#C5A84C] sm:text-base";
const labelClass = "text-sm font-medium text-black sm:text-base";
const errorClass = "mt-1 text-xs text-[#E3122E]";

export default function AddAddressModal({ onClose, onSave, initial = null, saving = false, serverError = "" }) {
  const [form, setForm] = useState(
    initial ? { type: initial.label || "Home", address: initial.address, city: initial.city, state: initial.state, pin: initial.pincode } : initialForm
  );
  const [errors, setErrors] = useState({});

  // Escape se band + background scroll lock
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pin" ? value.replace(/\D/g, "").slice(0, 6) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.address.trim()) e.address = "Please enter your address.";
    if (!form.city.trim()) e.city = "Please enter your city.";
    if (!form.state) e.state = "Please select your state.";
    if (form.pin.length !== 6) e.pin = "Enter a valid 6-digit PIN code.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-address-title"
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-md bg-white p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-black transition-colors hover:text-[#C5A84C]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h2
          id="add-address-title"
          className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]"
        >
          {initial ? "Edit address" : "Add a new address"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="mt-2">
          <p className="text-sm font-medium text-black sm:text-base">
            Shipping Address
          </p>

          {/* Home / Work */}
          <div className="mt-2 flex gap-3">
            {["Home", "Work"].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={form.type === t}
                onClick={() => setForm((prev) => ({ ...prev, type: t }))}
                className={`h-9 min-w-[72px] border px-4 text-xs transition-colors sm:text-sm ${
                  form.type === t
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : "border-black bg-white text-black hover:border-[#C5A84C] hover:text-[#C5A84C]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Address */}
          <div className="mt-5">
            <label htmlFor="address" className={labelClass}>
              House No. / Street / Area *
            </label>
            <textarea
              id="address"
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              className={`${fieldClass}  py-2`}
            />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>

          {/* City */}
          <div className="mt-2">
            <label htmlFor="city" className={labelClass}>
              City *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter City"
              className={`${fieldClass} h-10`}
            />
            {errors.city && <p className={errorClass}>{errors.city}</p>}
          </div>

          {/* State */}
          <div className="mt-2">
            <label htmlFor="state" className={labelClass}>
              State *
            </label>
            <select
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`${fieldClass} h-10 ${form.state ? "" : "text-gray-500"}`}
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && <p className={errorClass}>{errors.state}</p>}
          </div>

          {/* PIN */}
          <div className="mt-2">
            <label htmlFor="pin" className={labelClass}>
              PIN Code *
            </label>
            <input
              id="pin"
              name="pin"
              type="text"
              inputMode="numeric"
              value={form.pin}
              onChange={handleChange}
              placeholder="6 - digit pin"
              className={`${fieldClass} h-10`}
            />
            {errors.pin && <p className={errorClass}>{errors.pin}</p>}
          </div>

          {serverError && <p className={`${errorClass} mt-3`}>{serverError}</p>}
          <button
            type="submit"
            disabled={saving}
            className="group mt-6 flex h-10 w-full items-center justify-center gap-2 bg-[#C5A84C] text-sm font-medium uppercase text-white transition-colors hover:bg-[#A88C35]"
          >
            {saving ? "Saving..." : "Save Address"}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </form>
      </div>
    </div>
  );
}