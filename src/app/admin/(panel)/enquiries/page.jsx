import SubmissionsTable from "@/components/admin/SubmissionsTable";

export const metadata = { title: "Contact Enquiries" };

export default function AdminEnquiriesPage() {
  return <SubmissionsTable kind="enquiries" />;
}
