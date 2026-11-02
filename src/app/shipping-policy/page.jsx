import Image from "next/image";

export const metadata = {
  title: "Shipping & Delivery Policy | Raaj Anandam Aushadhi",
  description:
    "How orders are processed, dispatched, tracked and delivered by Dr. Arti’s Raaj Anandam Aushadhi.",
};

const HERO_IMAGE = "/policy.jpg";
const h2 = "text-[20px] xl:text-[26px] font-semibold text-gray-800";
const p = "mt-3 text-sm text-gray-600 sm:text-base";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";


export default function ShippingPolicyPage() {
  return (
    <>
      <section className="bg-white">
        {/* Banner: image poori dikhegi (crop nahi), apni natural ratio me responsive */}
        <div className="relative">
          <Image
            src={HERO_IMAGE}
            alt="Policy banner"
            width={1920}
            height={480}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />

          {/* Readability overlay + text: sirf lg+ */}
          <div className="absolute inset-0 hidden bg-white/10 lg:block" />
          <div className="absolute inset-0 hidden items-center lg:flex px-4 sm:px-6 lg:px-8 lg:px-20">
            <div className="mx-auto w-full max-w-5xl xl:px-4 ">
              <h1 className="text-base font-medium text-black xl:text-[44px]">
                Shipping &amp; Delivery Policy
              </h1>
              <p className="mt-3 text-xs font-medium text-black sm:text-sm xl:text-[24px]">
                Dr. Arti’s Raaj Anandam Aushadhi
              </p>
              <p className="mt-1 text-xs text-gray-800 sm:text-sm xl:text-base">
                Last Updated: 02/02/2026
              </p>
            </div>
          </div>
        </div>

        {/* Text: lg se chhoti screen par image ke neeche */}
        <div className="mx-auto max-w-4xl px-4 py-6  lg:hidden  sm:px-6 lg:px-8 lg:px-20">
          <h1 className="text-base font-medium text-black">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="mt-3 text-xs font-medium text-black sm:text-sm">
            Dr. Arti’s Raaj Anandam Aushadhi
          </p>
          <p className="mt-1 text-xs text-gray-800 sm:text-sm">
            Last Updated: 02/02/2026
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-6xl space-y-8  py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20">
        <section>
          <h2 className={h2}>1. Overview</h2>
          <p className={p}>
            At Dr. Arti’s Raaj Anandam Aushadhi, we aim to deliver your orders
            safely and reliably. This policy explains how orders are processed,
            dispatched, tracked, and delivered when you purchase products
            through our website.
          </p>
          <p className={p}>
            Delivery availability, charges, and estimated timelines will be
            shown during checkout wherever possible.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Order Processing</h2>
          <p className={p}>
            After you place an order, we will review the order details and
            verify payment where applicable.
          </p>
          <p className={p}>
            Orders are generally processed within [1–3 business days] after
            successful order confirmation, subject to stock availability,
            address verification, holidays, and other operational requirements.
          </p>
          <p className={p}>
            Orders placed on weekends or public holidays may begin processing on
            the next business day.
          </p>
          <p className={p}>
            The processing time is separate from the estimated courier transit
            time. If an order requires additional verification or an item is
            unavailable, we may contact you before dispatch.
          </p>
          <p className={p}>
            <span className="font-medium text-black">Important:</span> Replace
            the sample processing period above with your actual fulfilment
            timeline before publishing.
          </p>
        </section>

        <section>
          <h2 className={h2}>3. Delivery Locations</h2>
          <p className={p}>
            We deliver to serviceable PIN codes in India, subject to courier
            coverage and product-specific restrictions.
          </p>
          <p className={p}>
            Before placing an order, please ensure that your address and PIN
            code are complete and accurate. Some remote locations may have
            limited delivery services or longer transit times.
          </p>
          <p className={p}>
            If delivery to your location is unavailable, the checkout system or
            our customer support team will inform you where possible.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Shipping Charges</h2>
          <p className={p}>
            Applicable shipping charges will be displayed during checkout before
            you confirm your order.
          </p>
          <p className={p}>
            Charges may depend on factors such as delivery location, shipment
            weight, order value, and the shipping service available.
          </p>
          <p className={p}>
            If free shipping is offered for eligible orders, the qualifying
            conditions will be clearly communicated. Any shipping promotion may
            be subject to the terms displayed at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Estimated Delivery Time</h2>
          <p className={p}>
            Delivery timelines depend on the destination, courier service, and
            date of dispatch.
          </p>
          <p className={p}>
            The website should display the actual estimated delivery window for
            the available shipping service. As an operational placeholder, you
            may use:
          </p>
          <ul className={ul}>
            <li>
              <span className="font-medium text-black">Order processing:</span>{" "}
              1–3 business days.
            </li>
            <li>
              <span className="font-medium text-black">Estimated transit:</span>{" "}
              3–7 business days after dispatch for many serviceable locations.
            </li>
          </ul>
          <p className={p}>
            These are illustrative periods, not guaranteed delivery commitments.
            Confirm them with your fulfilment partner before publishing.
          </p>
          <p className={p}>
            Remote areas, weather disruptions, courier delays, public holidays,
            and other exceptional circumstances may extend delivery times.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Order Confirmation and Tracking</h2>
          <p className={p}>
            After placing an order, you may receive an order confirmation by
            email, SMS, or another supported communication channel.
          </p>
          <p className={p}>
            Once your order has been dispatched, we will provide a tracking link
            or tracking reference when available.
          </p>
          <p className={p}>
            Tracking information may take some time to appear in the courier’s
            system. If the tracking status has not updated for an unusually long
            period, please contact our support team with your order number.
          </p>
        </section>

        <section>
          <h2 className={h2}>7. Delivery Address and Contact Details</h2>
          <p className={p}>
            Customers are responsible for entering a complete and accurate
            delivery address, PIN code, and contact number.
          </p>
          <p className={p}>
            If you notice an error after placing an order, contact us as soon as
            possible. Address changes may not be possible after the shipment has
            been processed or handed to the courier.
          </p>
          <p className={p}>
            Additional delivery charges may apply if a change requires a new
            shipment and the applicable terms permit such charges.
          </p>
        </section>

        <section>
          <h2 className={h2}>8. Failed Delivery Attempts</h2>
          <p className={p}>A delivery may fail if:</p>
          <ul className={ul}>
            <li>The recipient is unavailable.</li>
            <li>The address is incomplete or incorrect.</li>
            <li>The courier cannot reach the recipient.</li>
            <li>The recipient declines the package.</li>
            <li>The location is inaccessible or outside the courier’s service area.</li>
          </ul>
          <p className={p}>
            The courier may attempt delivery again according to its operating
            procedures. If the shipment is returned to us, we will contact you
            where possible to determine the appropriate next step.
          </p>
          <p className={p}>
            Any cancellation, reshipment, or refund will be handled in
            accordance with the applicable order terms and law. We will not
            automatically deduct a fee unless it is permitted and properly
            disclosed.
          </p>
        </section>

        <section>
          <h2 className={h2}>9. Damaged, Tampered With, or Incorrect Deliveries</h2>
          <p className={p}>
            Please inspect the outer packaging when your order arrives.
          </p>
          <p className={p}>
            If the package appears seriously damaged or tampered with, report
            the issue to the courier where possible and contact us promptly.
          </p>
          <p className={p}>
            If you receive an incorrect item, a damaged product, or a product
            that does not match your order, contact us with:
          </p>
          <ul className={ul}>
            <li>Your order number.</li>
            <li>A description of the issue.</li>
            <li>Clear photographs of the outer packaging and product, where relevant.</li>
            <li>Photographs of the shipping label or invoice, if needed.</li>
          </ul>
          <p className={p}>
            Please retain the packaging until the issue has been reviewed. We
            will assess the case and explain the available resolution under our
            Return &amp; Refund Policy and applicable law.
          </p>
        </section>

        <section>
          <h2 className={h2}>10. Product Packaging and Handling</h2>
          <p className={p}>
            We aim to ensure that products are packed appropriately for
            shipment. Customers should store and handle products according to
            the instructions printed on the packaging or product label.
          </p>
          <p className={p}>
            If a product arrives with compromised packaging, leakage, visible
            contamination, or other safety concerns, do not use it. Contact our
            support team for assistance.
          </p>
        </section>

        <section>
          <h2 className={h2}>11. Delayed, Lost, or Undelivered Orders</h2>
          <p className={p}>
            If your order is delayed beyond the estimated delivery window, check
            the tracking information first and then contact us if the issue
            remains unresolved.
          </p>
          <p className={p}>
            We may coordinate with the courier to investigate a delayed or
            missing shipment. The resolution may include an updated delivery
            estimate, replacement shipment, cancellation, or refund, depending
            on the circumstances and applicable law.
          </p>
          <p className={p}>
            An order will not be treated as successfully delivered solely
            because a tracking status is disputed; relevant delivery records may
            be reviewed.
          </p>
        </section>

        <section>
          <h2 className={h2}>12. Order Cancellation Before Dispatch</h2>
          <p className={p}>
            If you wish to cancel an order, contact us as early as possible with
            your order number.
          </p>
          <p className={p}>
            Cancellation may be possible before dispatch, subject to the order
            status and applicable requirements. Once a shipment has been handed
            to the courier, cancellation may require the return or refusal
            process.
          </p>
          <p className={p}>
            Any eligible refund will be processed according to our Return &amp;
            Refund Policy.
          </p>
        </section>
      </article>
    </>
  );
}