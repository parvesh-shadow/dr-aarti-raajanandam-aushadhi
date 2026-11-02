import TitleDescription from "@/components/shared/TitleDescription";
import OrderCard from "@/components/account/OrderCard";

const stats = [
  { value: "02", label: "Total Orders", hint: "A record of your wellness journey" },
  { value: "02", label: "Active Orders", hint: "Currently on the way to you" },
  { value: "02", label: "Delivered Orders", hint: "Completed with care" },
  { value: "01", label: "Saved Addresses", hint: "For a smoother checkout" },
];

const orders = [
  {
    orderNumber: "RAA-10245",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Delivered",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10245",
  },
  {
    orderNumber: "RAA-10246",
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description: "Ayurvedic hair care capsules formulated for a convenient daily routine.",
    date: "20 Oct 2026",
    items: 1,
    total: 1098,
    status: "Shipped",
    image: "/medicine1.jpg",
    href: "/account/order/RAA-10246",
  },
];

export default function AccountDashboard() {
  return (
    <div>
      {/* Top heading + last signed in */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">
          Your wellness, all in one place
        </h2>
        <p className="text-xs text-gray-800 sm:text-sm">
          Last signed in · Today, 10:42 AM
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 xl:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-gray-200 bg-white p-4">
            <p className="text-2xl font-medium text-black xl:text-[34px]">
              {s.value}
            </p>
            <p className="mt-4 text-sm font-semibold text-black sm:text-base xl:text-[20px]">
              {s.label}
            </p>
            <p className="mt-1 text-xs text-gray-800 sm:text-[15px] ">{s.hint}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-10">
        <TitleDescription
          heading="Your Recent Orders"
          description="Review previous purchases, check delivery status, and open order details"
          buttonText="View All Orders"
          buttonHref="/account/order"
        />

        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}