// Public appointment / contact form ka server-side validation.

const s = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function base(b) {
  const errors = [];
  const name = s(b.name, 100);
  const email = s(b.email, 150).toLowerCase();
  const mobile = s(b.mobile, 15).replace(/[\s-]/g, "").replace(/^(\+91|91)(?=\d{10}$)/, "");

  if (name.length < 2) errors.push("Please enter your full name.");
  if (!EMAIL.test(email)) errors.push("Please enter a valid email address.");
  if (!/^[6-9]\d{9}$/.test(mobile)) errors.push("Enter a valid 10-digit mobile number.");
  return { errors, name, email, mobile };
}

// Aaj ki date India (IST) me, YYYY-MM-DD
const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

export function parseAppointment(body) {
  const b = body && typeof body === "object" ? body : {};
  const { errors, name, email, mobile } = base(b);

  const appointmentType = s(b.appointmentType, 100);
  const date = s(b.date, 10);
  const time = s(b.time, 50);
  const reason = s(b.reason, 100);

  if (!appointmentType) errors.push("Please select an appointment type.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) errors.push("Please select a valid date.");
  else if (date < todayIST()) errors.push("Date cannot be in the past.");
  if (!time) errors.push("Please select a time.");
  if (!reason) errors.push("Please select a reason.");

  return { errors, data: { name, email, mobile, appointmentType, date, time, reason, message: s(b.message, 2000) } };
}

export function parseContact(body) {
  const b = body && typeof body === "object" ? body : {};
  const { errors, name, email, mobile } = base(b);

  const enquiryType = s(b.enquiryType, 100);
  const message = s(b.message, 3000);

  if (!enquiryType) errors.push("Please select an enquiry type.");
  if (message.length < 10) errors.push("Message should be at least 10 characters.");

  return { errors, data: { name, email, mobile, enquiryType, orderNumber: s(b.orderNumber, 50), message } };
}
