import SubmissionsTable from "@/components/admin/SubmissionsTable";

export const metadata = { title: "Newsletter Subscribers" };

export default function AdminSubscribersPage() {
  return <SubmissionsTable kind="subscribers" />;
}
