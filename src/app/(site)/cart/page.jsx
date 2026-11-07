import CartHero from "@/components/cart/CartHero";
import CartContent from "@/components/cart/CartContent";

export const metadata = {
  title: "Your Cart | Raaj Anandam Aushadhi",
  description:
    "Review your selected products and make sure everything is ready for checkout.",
};

export default function CartPage() {
  return (
    <>
      <CartHero />
      <CartContent />
    </>
  );
}