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
  const paymentLabel = PAYMENT_LABELS[payment] || "Cash on Delivery";

  return (
    <>
      <CheckoutSteps current={3} />
      <OrderReview paymentLabel={paymentLabel} />
    </>
  );
}