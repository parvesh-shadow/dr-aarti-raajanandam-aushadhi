import CartHero from "@/components/cart/CartHero";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata = {
  title: "Your Wishlist | Raaj Anandam Aushadhi",
  description: "Products you have saved for later.",
};

export default function WishlistPage() {
  return (
    <>
      <CartHero
        heading="Your Wishlist"
        description="Products you have saved for later, all in one place."
      />
      <WishlistContent />
    </>
  );
}
