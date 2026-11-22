import RequireLogin from "@/components/auth/RequireLogin";

export default function CheckoutLayout({ children }) {
  return <RequireLogin>{children}</RequireLogin>;
}
