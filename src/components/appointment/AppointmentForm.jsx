"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";


const BG_IMAGE = "/appointment.jpg";

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
    const today = new Date().toISOString().split("T")[0];
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

export default function AppointmentForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      setValues(INITIAL);
    } catch (err) {
      setSubmitError(err instanceof TypeError ? "Network error. Please check your connection." : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `mt-1 w-full bg-gray-100 px-3 py-2.5 text-xs text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 sm:text-sm lg:text-[15px] ${
      errors[name] ? "ring-1 ring-red-500" : "focus:ring-[#C5A84C]"
    }`;

  const labelClass = "text-xs font-medium text-black sm:text-sm ";

  return (
    <section aria-labelledby="appointment-heading" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <ImagePlaceholder
          src={BG_IMAGE}
          label="Appointment background"
          priority
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div className="relative mx-auto grid  gap-5 xl:gap-20 py-8  sm:py-8 lg:grid-cols-2 lg:items-start sm:px-6 lg:px-8 lg:px-20 xl:px-40">
        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 id="appointment-heading" className="text-[28px] font-medium text-black">
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
              <select
                id="appointmentType"
                name="appointmentType"
                value={values.appointmentType}
                onChange={handleChange}
                aria-invalid={!!errors.appointmentType}
                aria-describedby={errors.appointmentType ? "appointmentType-error" : undefined}
                className={fieldClass("appointmentType")}
              >
                <option value="">Appointment type</option>
                {APPOINTMENT_TYPES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
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
                <select
                  id="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? "time-error" : undefined}
                  className={fieldClass("time")}
                >
                  <option value="">Select Preferred Time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <FieldError id="time-error" message={errors.time} />
              </div>
            </div>

            <div>
              <label htmlFor="reason" className={labelClass}>Reason for Appointment</label>
              <select
                id="reason"
                name="reason"
                value={values.reason}
                onChange={handleChange}
                aria-invalid={!!errors.reason}
                aria-describedby={errors.reason ? "reason-error" : undefined}
                className={fieldClass("reason")}
              >
                <option value="">Select reason</option>
                {REASONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
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
            className="disabled:opacity-60 mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs uppercase text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35] sm:text-sm"
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
        <aside className="bg-white p-6 flex flex-col justify-center xl:gap-4 gap-1 sm:p-10 lg:self-stretch">
          <h2 className="text-[24px] lg:text-[32px] xl:text-[54px] pr-4 font-medium lg:leading-10 leading-8  xl:leading-15 text-gray-800">
            Personalized guidance, from the comfort of home.
          </h2>
          <p className="mt-6 text-sm text-gray-800 sm:text-base xl:text-[18px]">
            Share your concerns with Dr. Arti Panwar, MS — Obstetrician &amp;
            Gynaecologist, in a focused one-to-one digital consultation.
          </p>

          <ul className="mt-8 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-xs text-black font-semibold sm:text-sm xl:text-base">
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}