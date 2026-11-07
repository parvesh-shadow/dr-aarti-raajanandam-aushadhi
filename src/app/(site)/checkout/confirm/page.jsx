import { redirect } from "next/navigation";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import OrderReview from "@/components/checkout/OrderReview";

export const metadata = {
  title: "Confirm Order | Raaj Anandam Aushadhi",
  description: "Review your order and confirm.",
};

const PAYMENT_LABELS = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  cod: "Cash on Delivery",
};

export default async function ConfirmPage({ searchParams }) {
  const { payment } = await searchParams;
  // Abhi sirf Cash on Delivery available hai
  if (payment !== "cod") redirect("/checkout/payment");
  const paymentLabel = PAYMENT_LABELS.cod;

  return (
    <>
      <CheckoutSteps current={3} />
      <OrderReview paymentLabel={paymentLabel} paymentMethod="cod" />
    </>
  );
}