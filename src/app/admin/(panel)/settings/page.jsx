import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Site Settings" };

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Site Settings</h1>
      <SettingsForm />
    </div>
  );
}
