import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import PaymentOptions from "@/components/checkout/PaymentOptions";

export const metadata = {
  title: "Payment | Raaj Anandam Aushadhi",
  description: "Select a payment method to continue with your order.",
};

export default function PaymentPage() {
  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentOptions />
    </>
  );
}