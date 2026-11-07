import PolicyHero from "@/components/shared/PolicyHero";

export const metadata = {
  title: "Return & Refund Policy | Raaj Anandam Aushadhi",
  description:
    "How to request a cancellation, return or refund with Dr. Arti’s Raaj Anandam Aushadhi.",
};

const h2 = "text-[20px] xl:text-[26px] font-semibold text-gray-800";
const h3 = "mt-4  xl:text-[20px] font-medium text-gray-800 text-base";
const p = "mt-3 text-sm text-gray-600 sm:text-base";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";
const ol = "mt-3 list-decimal space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";

export default function RefundPolicyPage() {
  return (
    <>
      <PolicyHero title="Return & Refund Policy" />

      <article className="mx-auto max-w-6xl space-y-8  py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20">
        <section>
          <h2 className={h2}>1. Overview</h2>
          <p className={p}>
            At Dr. Arti’s Raaj Anandam Aushadhi, we want customers to receive
            the products they ordered in the expected condition.
          </p>
          <p className={p}>
            This policy explains how to request an order cancellation, report a
            damaged or incorrect product, request a return where eligible, and
            receive a refund.
          </p>
          <p className={p}>
            Because our store offers Ayurvedic products, certain items may be
            subject to health, hygiene, safety, and regulatory restrictions.
            However, those restrictions do not remove any consumer rights or
            remedies that cannot lawfully be excluded.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. When Can I Request a Return or Resolution?</h2>
          <p className={p}>You should contact us if:</p>
          <ul className={ul}>
            <li>You received a product different from the one you ordered.</li>
            <li>The product arrived damaged or leaking.</li>
            <li>The product packaging appears tampered with or compromised.</li>
            <li>The product is defective or does not conform to the order.</li>
            <li>An item is missing from your shipment.</li>
            <li>Your order was cancelled but the payment was collected.</li>
            <li>A payment was deducted but the order was not successfully created or confirmed.</li>
            <li>You have another issue covered by applicable law or the terms of your purchase.</li>
          </ul>
          <p className={p}>
            Each request will be reviewed based on the circumstances, supporting
            information, product condition, and applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className={h2}>3. Return Eligibility</h2>
          <p className={p}>
            Where returns are permitted, the following conditions may be
            considered:
          </p>
          <ul className={ul}>
            <li>
              The request is submitted within [7 days of delivery], or another
              clearly disclosed period applicable to the order.
            </li>
            <li>The order number and proof of purchase are available.</li>
            <li>The product and its packaging are retained for inspection.</li>
            <li>
              The item is unused and in its original condition, where that
              condition is relevant to eligibility.
            </li>
            <li>
              Any included accessories, seals, or documentation are retained
              where applicable.
            </li>
          </ul>
          <p className={p}>
            The period above is a proposed business setting and must be
            confirmed before publication.
          </p>
          <p className={p}>
            <span className="font-medium text-black">Important:</span> A
            sealed-product or hygiene restriction must not be used to deny a
            valid complaint about a defective, damaged, incorrect, unsafe, or
            non-conforming product, or another remedy required by law.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Ayurvedic Medicines and Hygiene-Sensitive Products</h2>
          <p className={p}>
            For safety and hygiene reasons, we may restrict voluntary returns of
            medicines or products where opening, use, tampering, or improper
            storage makes resale unsafe or unlawful.
          </p>
          <p className={p}>
            Eligibility will depend on the specific product, the reason for the
            request, applicable product rules, and consumer protection
            requirements.
          </p>
          <p className={p}>
            If a product is defective, damaged in transit, incorrect,
            compromised, or otherwise does not conform to the order, contact us
            for an assessment. We will determine the appropriate lawful remedy,
            which may include replacement, refund, or another suitable
            resolution.
          </p>
          <p className={p}>
            Please do not consume or use a product if its packaging appears
            tampered with, its seal is broken unexpectedly, or you suspect
            contamination.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Items That May Not Qualify for Voluntary Returns</h2>
          <p className={p}>
            Subject to applicable law and the customer’s statutory rights,
            voluntary returns may be restricted for:
          </p>
          <ul className={ul}>
            <li>Opened or used medicines and hygiene-sensitive products.</li>
            <li>Products with missing seals or packaging where their condition cannot be safely verified.</li>
            <li>Products damaged after delivery due to misuse or improper storage.</li>
            <li>Products returned without sufficient order identification.</li>
            <li>Items specifically identified as non-returnable before purchase, where such restriction is lawful.</li>
          </ul>
          <p className={p}>
            These restrictions do not automatically apply to valid claims
            involving defects, incorrect fulfilment, damage on arrival, safety
            concerns, or other situations in which a remedy is legally required.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. How to Request a Return or Report an Issue</h2>
          <p className={p}>To request a return or report a product issue:</p>
          <ol className={ol}>
            <li>Email info@raajanandamaushadhi.com</li>
            <li>Use the subject line “Return / Refund Request – [Order Number]”.</li>
            <li>Include your order number, name, and contact details.</li>
            <li>Explain the issue and when you received the order.</li>
            <li>Attach clear photographs of the product, packaging, and shipping label where relevant.</li>
            <li>Wait for instructions from our support team before sending any product back.</li>
          </ol>
          <p className={p}>
            Do not send products to an address that has not been confirmed by
            our team. This helps prevent lost shipments and ensures the return
            is handled correctly.
          </p>
        </section>

        <section>
          <h2 className={h2}>7. Return Review and Resolution</h2>
          <p className={p}>
            We will review the information provided and may request additional
            details where reasonably necessary.
          </p>
          <p className={p}>
            After assessment, we will communicate whether the request is
            eligible and explain the next steps. Depending on the circumstances,
            the resolution may include:
          </p>
          <ul className={ul}>
            <li>Replacement of the affected item.</li>
            <li>Refund of the eligible amount.</li>
            <li>Correction of a fulfilment error.</li>
            <li>Another appropriate remedy required by applicable law.</li>
          </ul>
          <p className={p}>
            We aim to acknowledge requests within [2 business days] and
            communicate the outcome within [5–7 business days] where reasonably
            possible. These are proposed service targets and should be replaced
            with timelines your team can consistently meet.
          </p>
        </section>

        <section>
          <h2 className={h2}>8. Order Cancellation</h2>
          <p className={p}>
            If you need to cancel an order, contact us as soon as possible.
          </p>

          <h3 className={h3}>Before dispatch</h3>
          <p className={p}>
            A cancellation may be processed if the order has not entered a stage
            where cancellation is operationally possible, subject to applicable
            law.
          </p>

          <h3 className={h3}>After dispatch</h3>
          <p className={p}>
            Once the shipment has been handed to the courier, cancellation may
            no longer be possible through the normal order process. We will
            explain the available options under the relevant return and delivery
            terms.
          </p>

          <h3 className={h3}>Cancelled by us</h3>
          <p className={p}>
            If we cancel an order after collecting payment, we will arrange the
            applicable refund. We may cancel an order for reasons such as
            unavailable stock, a material listing error, an unserviceable
            address, or a regulatory restriction.
          </p>
        </section>

        <section>
          <h2 className={h2}>9. Refund Methods</h2>
          <p className={p}>
            Approved refunds will normally be issued to the original payment
            method where supported by the payment provider.
          </p>
          <p className={p}>
            Depending on the transaction, payment method, and provider
            capabilities, the refund may be processed through the original
            gateway or another lawful method agreed with the customer.
          </p>
          <p className={p}>
            We will not ask you to disclose your UPI PIN, card PIN, banking
            password, or OTP to issue a refund.
          </p>
        </section>

        <section>
          <h2 className={h2}>10. Refund Processing Time</h2>
          <p className={p}>
            Once a refund is approved, we aim to initiate it within [5–7
            business days], subject to verification and payment-provider
            procedures.
          </p>
          <p className={p}>
            The time taken for the funds to appear in your account may depend on
            your bank, card issuer, UPI provider, or payment gateway.
          </p>
          <p className={p}>
            If the refund has been initiated but is not visible within the
            timeframe communicated to you, contact us with the order number and
            refund reference, if available.
          </p>
          <p className={p}>
            The timeline above is a proposed operational target. Confirm your
            actual refund process and any applicable statutory deadline before
            publishing.
          </p>
        </section>

        <section>
          <h2 className={h2}>11. Shipping Charges and Return Costs</h2>
          <p className={p}>
            Responsibility for return shipping costs will depend on the reason
            for the return, the order terms disclosed before purchase, and
            applicable law.
          </p>
          <p className={p}>
            Where the issue arises because we supplied an incorrect item or the
            product arrived damaged or defective, we will explain an appropriate
            return or collection arrangement and will not impose charges
            contrary to applicable law.
          </p>
          <p className={p}>
            For other eligible returns, any customer-paid return shipping or
            deductions must be clearly disclosed, lawful, and applicable to the
            particular case.
          </p>
        </section>
      </article>
    </>
  );
}