"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import sideImage from "@/assets/appointment-side.jpg";

const APPOINTMENT_TYPES = ["Online consultation", "In-clinic consultation", "Follow-up consultation"];
const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];
const REASONS = [
  "Fertility guidance",
  "Menstrual health",
  "Preconception wellness",
  "Hair care",
  "General wellness",
  "Other",
];

const POINTS = [
  "Personal health and lifestyle review",
  "Women's and reproductive wellness guidance",
  "A considered wellness plan",
];

const INITIAL = {
  name: "",
  email: "",
  mobile: "",
  appointmentType: "",
  date: "",
  time: "",
  reason: "",
  message: "",
};

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

  if (!values.appointmentType) errors.appointmentType = "Please select an appointment type.";

  if (!values.date) errors.date = "Please select a date.";
  else {
    const today = new Date().toLocaleDateString("en-CA"); // local date
    if (values.date < today) errors.date = "Date cannot be in the past.";
  }

  if (!values.time) errors.time = "Please select a time.";
  if (!values.reason) errors.reason = "Please select a reason.";

  return errors;
}

// Component function ke bahar declare hai (render ke andar nahi)
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

// Select ke right side par chevron icon
function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-800"
        aria-hidden="true"
      />
    </div>
  );
}

export default function AppointmentForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Logged-in user ho to naam / email / mobile pehle se bhar do (khaali fields par hi)
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const u = d?.user;
        if (!alive || !u) return;
        setValues((prev) => ({
          ...prev,
          name: prev.name || u.name || "",
          email: prev.email || u.email || "",
          mobile: prev.mobile || (u.phone || "").replace(/\D/g, "").slice(-10),
        }));
      })
      .catch(() => { });
    return () => {
      alive = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSuccess("");
    setSubmitError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setSuccess(data.message || "Thank you. We have received your request.");
      setValues((v) => ({ ...INITIAL, name: v.name, email: v.email, mobile: v.mobile }));
    } catch (err) {
      setSubmitError(err instanceof TypeError ? "Network error. Please check your connection." : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `mt-1 block w-full border bg-[#F4F4F4] px-3 py-2.5 text-xs text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 sm:text-sm lg:text-[15px] ${errors[name] ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 focus:ring-[#C5A84C]"
    }`;

  const selectClass = (name) => `${fieldClass(name)} appearance-none pr-9`;

  const labelClass = "text-xs font-medium text-black sm:text-sm";

  const cardClass = "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]";

  return (
    <section aria-labelledby="appointment-heading" className="bg-white">
      <div className="mx-auto grid gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:px-20 xl:gap-12 xl:px-40">
        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`${cardClass} p-5 sm:p-6`}
        >
          <h2 id="appointment-heading" className="text-[22px] font-medium text-black sm:text-2xl">
            Request an Appointment
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
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
              <label htmlFor="email" className={labelClass}>Email Address</label>
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
              <label htmlFor="mobile" className={labelClass}>Mobile Number</label>
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
              <label htmlFor="appointmentType" className={labelClass}>Appointment Type</label>
              <SelectWrap>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={values.appointmentType}
                  onChange={handleChange}
                  aria-invalid={!!errors.appointmentType}
                  aria-describedby={errors.appointmentType ? "appointmentType-error" : undefined}
                  className={selectClass("appointmentType")}
                >
                  <option value="">Appointment type</option>
                  {APPOINTMENT_TYPES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </SelectWrap>
              <FieldError id="appointmentType-error" message={errors.appointmentType} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className={labelClass}>Preferred Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={fieldClass("date")}
                />
                <FieldError id="date-error" message={errors.date} />
              </div>

              <div>
                <label htmlFor="time" className={labelClass}>Preferred Time</label>
                <SelectWrap>
                  <select
                    id="time"
                    name="time"
                    value={values.time}
                    onChange={handleChange}
                    aria-invalid={!!errors.time}
                    aria-describedby={errors.time ? "time-error" : undefined}
                    className={selectClass("time")}
                  >
                    <option value="">Select Preferred Time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </SelectWrap>
                <FieldError id="time-error" message={errors.time} />
              </div>
            </div>

            <div>
              <label htmlFor="reason" className={labelClass}>Reason for Appointment</label>
              <SelectWrap>
                <select
                  id="reason"
                  name="reason"
                  value={values.reason}
                  onChange={handleChange}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? "reason-error" : undefined}
                  className={selectClass("reason")}
                >
                  <option value="">Select reason</option>
                  {REASONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </SelectWrap>
              <FieldError id="reason-error" message={errors.reason} />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                placeholder="Share any scheduling preferences or questions....."
                className={`${fieldClass("message")} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs uppercase text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] disabled:opacity-60 sm:text-sm"
          >
            Submit Appointment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {success && (
            <p role="status" className="mt-3 text-xs text-[#A88C35] sm:text-sm">{success}</p>
          )}
          {submitError && (
            <p role="alert" className="mt-3 text-xs text-red-600 sm:text-sm">{submitError}</p>
          )}
        </form>

        {/* Info card */}
        <aside className={`${cardClass} flex flex-col p-5 sm:p-6`}>
          {/* Image */}
          <div className="relative aspect-[488/280] w-full overflow-hidden rounded-2xl">
            <Image
              src={sideImage}
              alt="Ayurvedic herbs and spices"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between gap-6 px-1 pb-2 pt-6 sm:px-3">
            <div>
              <h2 className="text-[30px] font-medium leading-[1.15] text-black sm:text-[36px] xl:text-[46px]">
                Personalized guidance, from the comfort of home.
              </h2>
              <p className="mt-5 text-base text-gray-800 sm:text-lg">
                Share your concerns with Dr. Arti Panwar, MS — Obstetrician &amp;
                Gynaecologist, in a focused one-to-one digital consultation.
              </p>
            </div>

            <ul className="space-y-4">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base font-medium text-black sm:text-lg"
                >
                  <Check className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}