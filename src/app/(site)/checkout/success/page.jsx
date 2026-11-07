import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import OrderSuccess from "@/components/checkout/OrderSuccess";

export const metadata = {
  title: "Order Confirmed | Raaj Anandam Aushadhi",
  description: "Thank you for your order.",
};

export default async function SuccessPage({ searchParams }) {
  const { order } = await searchParams;

  return (
    <>
      <CheckoutSteps current={4} />
      <OrderSuccess orderNumber={order || "RAA-ORDER-XXXX"} />
    </>
  );
}