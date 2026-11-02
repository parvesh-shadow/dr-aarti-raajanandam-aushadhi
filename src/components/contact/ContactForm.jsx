"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

const ENQUIRY_TYPES = [
  "Product enquiry",
  "Order & delivery",
  "Payment & refund",
  "Appointment enquiry",
  "Other",
];

const INITIAL = {
  name: "",
  email: "",
  mobile: "",
  enquiryType: "Product enquiry",
  orderNumber: "",
  message: "",
};

// Har field ki validation yahan likhi hai. Error string return hoti hai, sahi ho to koi key nahi.
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name.";
  else if (values.name.trim().length < 2) errors.name = "Name is too short.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (!values.mobile.trim()) errors.mobile = "Please enter your mobile number.";
  else if (!/^[6-9]\d{9}$/.test(values.mobile.trim()))
    errors.mobile = "Enter a valid 10-digit mobile number.";

  if (!values.enquiryType)
    errors.enquiryType = "Please select an enquiry type.";

  if (!values.message.trim()) errors.message = "Please write your message.";
  else if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";

  return errors;
}

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

// Component function ke BAHAR declare hai (render ke andar nahi), isliye error nahi aayega
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Type karte hi us field ka error hata do
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      // TODO: backend/API yahan jodenge. Abhi sirf console me data.
      console.log("Contact form:", values);
      setSuccess(true);
      setValues(INITIAL);
    }
  };

  const fieldClass = (name) =>
    `mt-1 w-full bg-gray-100 px-3 py-2.5 text-xs text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 sm:text-sm ${
      errors[name] ? "ring-1 ring-red-500" : "focus:ring-[#C5A84C]"
    }`;

  const labelClass = "text-xs font-medium text-black sm:text-sm xl:text-base";

  return (
    <section
      aria-labelledby="contact-heading"
      className=" py-10 sm:py-8 px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
    >
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12 ">
        {/* Left: details */}
        <ul className="space-y-5 lg:self-center">
          <h2
            id="contact-heading"
            className="xl:text-[30px] mb-14 text-xl font-medium text-black"
          >
            Contact details
          </h2>
          <li className="max-w-sm border-b border-gray-200 pb-5">
            <div className="flex items-center gap-3 xl:text-[18px] text-base-800 sm:text-base text-sm">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Us
            </div>
            <a
              href="tel:+919876543210"
              className=" block xl:text-[18px] text-base-800 sm:text-base font-semibold  text-sm transition-colors hover:text-[#A88C35]"
            >
              +91 98765 43210
            </a>
          </li>
          <li className=" max-w-sm border-b border-gray-200 pb-5">
            <div className="flex items-center gap-3 xl:text-[18px] text-base-800 sm:text-base text-sm">
              <Mail className="h-5 w-5" aria-hidden="true" />
              Email Us
            </div>
            <a
              href="mailto:raajanandamofficial@gmail.com"
              className=" block break-all xl:text-[18px] text-base-800 sm:text-base font-semibold  text-sm transition-colors hover:text-[#A88C35]"
            >
              raajanandamofficial@gmail.com
            </a>
          </li>
          <li>
            <div className="flex items-center gap-3 xl:text-[18px] text-base-800 sm:text-base text-sm">
              <InstagramIcon className="h-5 w-5" />
              Instagram ID
            </div>
            <a
              href="https://www.instagram.com/raajanandam_aushadhi"
              target="_blank"
              rel="noopener noreferrer"
              className=" block xl:text-[18px] text-base-800 sm:text-base text-sm font-semibold transition-colors hover:text-[#A88C35]"
            >
              @raajanandam_aushadhi
            </a>
          </li>
        </ul>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-gray-300 bg-white p-4 sm:p-6"
        >
          <h3 className="text-xl text-center font-medium text-black">
            Get in Touch with Us
          </h3>

          {/* Mobile: 1 column. sm+: ek row me 2 column */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Row 1 */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
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
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
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

            {/* Row 2 */}
            <div>
              <label htmlFor="mobile" className={labelClass}>
                Mobile Number
              </label>
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

            <div>
              <label htmlFor="enquiryType" className={labelClass}>
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={values.enquiryType}
                onChange={handleChange}
                aria-invalid={!!errors.enquiryType}
                aria-describedby={
                  errors.enquiryType ? "enquiryType-error" : undefined
                }
                className={fieldClass("enquiryType")}
              >
                {ENQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FieldError id="enquiryType-error" message={errors.enquiryType} />
            </div>

            {/* Row 3: full width */}
            <div className="sm:col-span-2">
              <label htmlFor="orderNumber" className={labelClass}>
                Order Number (if applicable)
              </label>
              <input
                id="orderNumber"
                name="orderNumber"
                value={values.orderNumber}
                onChange={handleChange}
                placeholder="e.g,. RAA-21354"
                className={fieldClass("orderNumber")}
              />
            </div>

            {/* Row 4: full width */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelClass}>
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={values.message}
                onChange={handleChange}
                placeholder="Tell us how we can help......"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${fieldClass("message")} `}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
          >
            SUBMIT
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {success && (
            <p role="status" className="mt-3 text-xs text-[#A88C35] sm:text-sm">
              Thank you. Your message has been sent. Our team will get back to
              you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
