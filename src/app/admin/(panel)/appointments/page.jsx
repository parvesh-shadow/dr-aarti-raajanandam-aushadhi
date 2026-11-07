import SubmissionsTable from "@/components/admin/SubmissionsTable";

export const metadata = { title: "Appointments" };

export default function AdminAppointmentsPage() {
  return <SubmissionsTable kind="appointments" />;
}
