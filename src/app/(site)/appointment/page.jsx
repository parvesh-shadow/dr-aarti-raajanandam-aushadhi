import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentFAQ from "@/components/appointment/AppointmentFAQ";

export const metadata = {
  title: "Request an Appointment | Raaj Anandam Aushadhi",
  description:
    "Share your concerns with Dr. Arti Panwar, MS — Obstetrician & Gynaecologist, in a focused one-to-one digital consultation.",
};

export default function AppointmentPage() {
  return (
    <>
      <AppointmentForm />
      <AppointmentFAQ />
    </>
  );
}