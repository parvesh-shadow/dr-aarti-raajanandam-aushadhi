import SubmissionsTable from "@/components/admin/SubmissionsTable";

export const metadata = { title: "Reviews" };

export default function AdminReviewsPage() {
  return <SubmissionsTable kind="reviews" />;
}
