"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { saveShipping } from "@/lib/checkoutStore";

const STATES = [
  "Andhra Pradesh", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const INITIAL = {
  name: "",
  email: "",
  mobile: "",
  addressType: "Home",
  address: "",
  city: "",
  state: "",
  pincode: "",
  instructions: "",
};

// Simple validation. Returns an object with an error message per invalid field.
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (!values.mobile.trim()) errors.mobile = "Please enter your mobile number.";
  else if (!/^[6-9]\d{9}$/.test(values.mobile.trim()))
    errors.mobile = "Enter a valid 10-digit mobile number.";

  if (!values.address.trim()) errors.address = "Please enter your delivery address.";
  else if (values.address.trim().length < 5) errors.address = "Please enter your full address (at least 5 characters).";
  if (!values.city.trim()) errors.city = "Please enter your city.";
  if (!values.state) errors.state = "Please select your state.";

  if (!values.pincode.trim()) errors.pincode = "Please enter your PIN code.";
  else if (!/^\d{6}$/.test(values.pincode.trim()))
    errors.pincode = "PIN code must be 6 digits.";

  return errors;
}

// Declared outside the form component (not inside render)
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

const NEW_ADDRESS = "new";

export default function AddressForm() {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  // Logged-in user ke saved addresses (guest ke liye khali, select nahi dikhega)
  const [saved, setSaved] = useState([]);
  const [selectedId, setSelectedId] = useState(NEW_ADDRESS);

  const fillFrom = (a) =>
    setValues((prev) => ({
      ...prev,
      name: a.fullName || prev.name,
      mobile: a.phone || prev.mobile,
      addressType: a.label === "Work" ? "Work" : "Home",
      address: a.address,
      city: a.city,
      state: a.state,
      pincode: a.pincode,
    }));

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/account/addresses", { cache: "no-store" });
        if (!res.ok) return; // login nahi hai
        const data = await res.json();
        const list = Array.isArray(data.addresses) ? data.addresses : [];
        if (!alive || list.length === 0) return;
        setSaved(list);
        setSelectedId(list[0].id);
        fillFrom(list[0]);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleSelectAddress = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setErrors({});
    if (id === NEW_ADDRESS) {
      setValues((prev) => ({ ...prev, addressType: "Home", address: "", city: "", state: "", pincode: "" }));
      return;
    }
    const a = saved.find((x) => x.id === id);
    if (a) fillFrom(a);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      saveShipping({
        fullName: values.name.trim(),
        phone: values.mobile.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        state: values.state,
        pincode: values.pincode.trim(),
        addressType: values.addressType,
      });
      router.push("/checkout/payment");
    }
  };

  const fieldClass = (name) =>
    `mt-1 w-full bg-gray-100 px-3 py-2.5 text-xs text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 sm:text-sm ${
      errors[name] ? "ring-1 ring-red-500" : "focus:ring-[#C5A84C]"
    }`;

  const labelClass = "text-xs font-medium text-black sm:text-sm";

  return (
    <section
      aria-labelledby="delivery-heading"
      className="mx-auto max-w-2xl py-8  sm:py-8 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="border border-gray-300 bg-white p-4 sm:p-6"
      >
        <h2 id="delivery-heading" className="text-base font-medium text-black">
          Customer &amp; Delivery Details
        </h2>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name *</label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={fieldClass("name")}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClass("email")}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="mobile" className={labelClass}>Mobile Number *</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={values.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              className={fieldClass("mobile")}
            />
            <FieldError id="mobile-error" message={errors.mobile} />
          </div>
        </div>

        {/* Shipping address */}
        <h3 className="mt-6 text-base font-medium text-black">Shipping Address</h3>

        {saved.length > 0 && (
          <div className="mt-3">
            <label htmlFor="saved-address" className={labelClass}>
              Choose a saved address
            </label>
            <select
              id="saved-address"
              value={selectedId}
              onChange={handleSelectAddress}
              className={fieldClass("savedAddress")}
            >
              {saved.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} - {a.text}
                </option>
              ))}
              <option value={NEW_ADDRESS}>+ Add a new address</option>
            </select>
          </div>
        )}

        <div className="mt-3 flex gap-2" role="group" aria-label="Address type">
          {["Home", "Work"].map((type) => {
            const active = values.addressType === type;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => setValues((prev) => ({ ...prev, addressType: type }))}
                className={`border px-5 py-2 text-xs transition-colors sm:text-sm ${
                  active
                    ? "border-[#C5A84C] bg-[#C5A84C] text-white"
                    : "border-black bg-white text-black hover:border-[#A88C35] hover:text-[#A88C35]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="address" className={labelClass}>
              House No. / Street / Area *
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              className={`${fieldClass("address")} resize-none`}
            />
            <FieldError id="address-error" message={errors.address} />
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>City *</label>
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="Enter City"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
              className={fieldClass("city")}
            />
            <FieldError id="city-error" message={errors.city} />
          </div>

          <div>
            <label htmlFor="state" className={labelClass}>State *</label>
            <select
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? "state-error" : undefined}
              className={fieldClass("state")}
            >
              <option value="">Select state</option>
              {(!values.state || STATES.includes(values.state) ? STATES : [...STATES, values.state]).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <FieldError id="state-error" message={errors.state} />
          </div>

          <div>
            <label htmlFor="pincode" className={labelClass}>PIN Code *</label>
            <input
              id="pincode"
              name="pincode"
              inputMode="numeric"
              maxLength={6}
              value={values.pincode}
              onChange={handleChange}
              placeholder="6 - digit pin"
              aria-invalid={!!errors.pincode}
              aria-describedby={errors.pincode ? "pincode-error" : undefined}
              className={fieldClass("pincode")}
            />
            <FieldError id="pincode-error" message={errors.pincode} />
          </div>

          <div>
            <label htmlFor="instructions" className={labelClass}>
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={3}
              value={values.instructions}
              onChange={handleChange}
              placeholder="Any special delivery instructions....."
              className={`${fieldClass("instructions")} resize-none`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs uppercase text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
        >
          Save address &amp; continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}