import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import AddressForm from "@/components/checkout/AddressForm";

export const metadata = {
  title: "Checkout | Raaj Anandam Aushadhi",
  description: "Enter your delivery details to continue with your order.",
};

export default function CheckoutPage() {
  return (
    <>
      <CheckoutSteps current={1} />
      <AddressForm />
    </>
  );
}