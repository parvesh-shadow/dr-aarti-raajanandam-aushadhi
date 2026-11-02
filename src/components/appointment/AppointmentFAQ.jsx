import FAQ from "@/components/shared/FAQ";

const APPOINTMENT_FAQS = [
  {
    question: "Is my appointment confirmed immediately?",
    answer:
      "No. Your request must be reviewed and confirmed by the team before it is considered booked.",
  },
  {
    question: "Can I request an online consultation?",
    answer:
      "Yes. Select Online consultation as the appointment type and choose your preferred date and time.",
  },
  {
    question: "Can I change my appointment date?",
    answer:
      "Yes. Please contact our team with your name and mobile number to request a change of date or time.",
  },
  {
    question: "What should I prepare before my appointment?",
    answer:
      "Keep your health concerns, previous reports and any current medicines handy so the consultation can be more focused.",
  },
];

export default function AppointmentFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={APPOINTMENT_FAQS}
    />
  );
}