import Image from "next/image";

export const metadata = {
  title: "Terms & Conditions | Raaj Anandam Aushadhi",
  description:
    "Terms & Conditions governing the use of the Dr. Arti’s Raaj Anandam Aushadhi website and online store.",
};

const HERO_IMAGE = "/policy.jpg";
const h2 = "text-[20px] xl:text-[26px] font-semibold text-gray-800";
const p = "mt-3 text-sm text-gray-600 sm:text-base";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";


export default function TermsPage() {
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
                Terms &amp; Conditions
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
          <h1 className="text-base font-medium text-black">Terms &amp; Conditions</h1>
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
          <h2 className={h2}>1. Introduction and Acceptance</h2>
          <p className={p}>
            Welcome to Dr. Arti’s Raaj Anandam Aushadhi. These Terms &amp;
            Conditions govern your access to and use of our website, online
            store, customer account, appointment services, and related features.
          </p>
          <p className={p}>
            By accessing our website or placing an order, you agree to these
            Terms &amp; Conditions and our applicable Privacy Policy, Shipping
            &amp; Delivery Policy, and Return &amp; Refund Policy.
          </p>
          <p className={p}>
            If you do not agree with these terms, please discontinue using the
            website.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. About Our Products</h2>
          <p className={p}>
            We offer Ayurvedic products and related information through our
            online store. Product listings may include descriptions,
            photographs, prices, packaging information, usage instructions, and
            other details supplied or approved for publication.
          </p>
          <p className={p}>
            We make reasonable efforts to present product information
            accurately. However, product images are illustrative, and packaging,
            appearance, or presentation may vary where applicable. Please review
            the product label and packaging supplied with your order.
          </p>
        </section>

        <section>
          <h2 className={h2}>3. Important Health and Product Disclaimer</h2>
          <p className={p}>
            Information published on our website is intended for general
            informational and shopping purposes. It is not a substitute for
            diagnosis, medical advice, or treatment from a qualified healthcare
            professional.
          </p>
          <p className={p}>
            Product descriptions must not be interpreted as a guarantee that a
            product will prevent, treat, or cure any disease or condition.
            Individual experiences may vary, and no specific outcome is
            guaranteed.
          </p>
          <p className={p}>
            Before using an Ayurvedic medicine or wellness product, read the
            label and follow the applicable instructions. Consult a qualified
            healthcare professional if you are pregnant, breastfeeding, taking
            medication, have an existing medical condition, or are uncertain
            whether a product is appropriate for you.
          </p>
          <p className={p}>
            Do not exceed the recommended use stated on the approved product
            label. Seek professional medical assistance when necessary.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Eligibility to Use the Website</h2>
          <p className={p}>
            You must be legally capable of entering into a binding agreement
            under applicable law to make purchases through our website.
          </p>
          <p className={p}>
            If you are not legally eligible to enter into such an agreement
            independently, you must use the website with the involvement of a
            parent, guardian, or other legally authorised person, as applicable.
          </p>
          <p className={p}>
            You agree to provide accurate information when creating an account,
            placing an order, or contacting our team.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Customer Accounts</h2>
          <p className={p}>
            You may need an account to access certain features. You are
            responsible for maintaining the confidentiality of your login
            credentials and for activity carried out through your account,
            subject to applicable law.
          </p>
          <p className={p}>
            Please notify us promptly if you suspect unauthorised access or
            activity. We may restrict or suspend an account where reasonably
            necessary to protect customers, prevent fraud, investigate misuse,
            or comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Product Availability and Pricing</h2>
          <p className={p}>
            Product availability, prices, offers, and delivery options may
            change without prior notice, subject to applicable law.
          </p>
          <p className={p}>
            The price and charges displayed during checkout will form the basis
            of your order, subject to correction of genuine errors and
            applicable legal requirements. Any material correction or
            cancellation will be handled fairly and in accordance with
            applicable law.
          </p>
          <p className={p}>
            Shipping charges, taxes, and applicable discounts will be displayed
            during checkout where relevant. We will not intentionally impose
            undisclosed charges after an order is placed.
          </p>
          <p className={p}>
            If an item becomes unavailable after payment, we will contact you
            and arrange an appropriate solution, which may include cancellation
            and a refund where applicable.
          </p>
        </section>

        <section>
          <h2 className={h2}>7. Orders and Order Acceptance</h2>
          <p className={p}>
            Submitting an order is a request to purchase the selected products.
            You should receive an order acknowledgement or confirmation
            containing available order details.
          </p>
          <p className={p}>
            An acknowledgement of receipt does not necessarily mean that an
            order has been finally accepted or dispatched. Order acceptance and
            fulfilment may depend on payment verification, product availability,
            address validation, and applicable legal requirements.
          </p>
          <p className={p}>
            We reserve the right to decline or cancel an order for legitimate
            reasons, including suspected fraud, incorrect pricing, unavailable
            inventory, delivery restrictions, or regulatory requirements. Where
            payment has already been collected for an order that cannot be
            fulfilled, we will arrange an applicable refund.
          </p>
        </section>

        <section>
          <h2 className={h2}>8. Payments</h2>
          <p className={p}>
            Payments may be processed through supported third-party payment
            gateways. Available payment methods will be displayed during
            checkout.
          </p>
          <p className={p}>
            You must provide accurate payment information and complete any
            authentication required by your payment provider. Never share your
            UPI PIN, card PIN, banking password, or OTP with our customer
            support team.
          </p>
          <p className={p}>
            An order will be marked as paid only after successful payment
            verification. If a payment is pending, failed, duplicated, or
            disputed, order processing may be delayed while the transaction is
            checked.
          </p>
        </section>

        <section>
          <h2 className={h2}>9. Shipping and Delivery</h2>
          <p className={p}>
            Orders will be shipped to serviceable addresses using the delivery
            methods available at checkout.
          </p>
          <p className={p}>
            Estimated delivery dates are indicative and may be affected by
            courier operations, weather, public holidays, regional restrictions,
            address issues, or other circumstances beyond reasonable control.
          </p>
          <p className={p}>
            Please review our Shipping &amp; Delivery Policy for details on
            processing times, tracking, delivery attempts, and delayed or
            undelivered shipments.
          </p>
        </section>

        <section>
          <h2 className={h2}>10. Cancellations, Returns, and Refunds</h2>
          <p className={p}>
            Order cancellations, product returns, and refunds are governed by
            our Return &amp; Refund Policy.
          </p>
          <p className={p}>
            Eligibility may depend on the product type, order status, product
            condition, applicable health and hygiene restrictions, and consumer
            protection requirements. Nothing in our policies is intended to
            remove any right or remedy that cannot lawfully be excluded.
          </p>
          <p className={p}>
            If a product is damaged, incorrect, defective, or otherwise does not
            conform to the order, please contact us promptly with your order
            number and supporting information.
          </p>
        </section>

        <section>
          <h2 className={h2}>11. Customer Responsibilities and Prohibited Activities</h2>
          <p className={p}>You agree not to:</p>
          <ul className={ul}>
            <li>Use the website for unlawful or fraudulent purposes.</li>
            <li>Submit false, misleading, or unauthorised information.</li>
            <li>Interfere with website security or attempt unauthorised access.</li>
            <li>Introduce malicious software or disrupt website operations.</li>
            <li>Misuse promotional codes, payment facilities, or account features.</li>
            <li>Copy, republish, or commercially exploit website content without permission or a lawful basis.</li>
            <li>Resell products in breach of applicable law or product-specific restrictions.</li>
          </ul>
          <p className={p}>
            We may take reasonable steps to address suspected misuse, subject to
            applicable law.
          </p>
        </section>

        <section>
          <h2 className={h2}>12. Intellectual Property</h2>
          <p className={p}>
            Unless otherwise indicated, website text, branding, logos, graphics,
            product presentation, photographs, and design elements are owned by
            or licensed to the relevant rights holder.
          </p>
          <p className={p}>
            You may view and use the website for personal, lawful shopping
            purposes. You may not reproduce, distribute, modify, or commercially
            exploit protected material without permission, except where
            permitted by law.
          </p>
        </section>

        <section>
          <h2 className={h2}>13. Third-Party Services</h2>
          <p className={p}>
            Our website may rely on third-party services such as payment
            gateways, courier companies, email providers, and social media
            platforms. Their services may be subject to separate terms and
            policies.
          </p>
          <p className={p}>
            We are not responsible for independent third-party systems beyond
            our reasonable control, but we will take reasonable steps to assist
            customers with order or payment issues involving our service
            providers.
          </p>
        </section>

        <section>
          <h2 className={h2}>14. Limitation of Liability</h2>
          <p className={p}>
            To the extent permitted by applicable law, we are not liable for
            losses caused by events beyond our reasonable control, misuse of
            products, inaccurate information supplied by customers, or
            interruptions attributable to external systems.
          </p>
          <p className={p}>
            Nothing in these terms excludes or limits liability where such
            exclusion or limitation is prohibited by law, including applicable
            consumer rights, statutory product obligations, or liability that
            cannot legally be excluded.
          </p>
        </section>

        <section>
          <h2 className={h2}>15. Privacy</h2>
          <p className={p}>
            Personal information is handled in accordance with our Privacy
            Policy and applicable data protection requirements. Please review
            that policy to understand how your information is collected, used,
            and protected.
          </p>
        </section>
      </article>
    </>
  );
}