import Image from "next/image";

export const metadata = {
  title: "Privacy Policy | Raaj Anandam Aushadhi",
  description:
    "How Dr. Arti’s Raaj Anandam Aushadhi collects, uses and protects your personal information.",
};

const HERO_IMAGE = "/policy.jpg";
const h2 = "text-[20px] xl:text-[26px] font-semibold text-gray-800";
const h3 = "mt-4  xl:text-[20px] font-medium text-gray-800 text-base";
const p = "mt-3 text-sm text-gray-600 sm:text-base";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";

export default function PrivacyPolicyPage() {
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
                Privacy Policy
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
          <h1 className="text-base font-medium text-black">Privacy Policy</h1>
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
          <h2 className={h2}>1. Introduction</h2>
          <p className={p}>
            Welcome to Dr. Arti’s Raaj Anandam Aushadhi (“we,” “our,” or “us”).
            We value your privacy and are committed to protecting the personal
            information you share with us when visiting our website, browsing
            our products, creating an account, placing an order, or contacting
            our team.
          </p>
          <p className={p}>
            This Privacy Policy explains what information we collect, how we use
            and protect it, when we may share it, and what choices you have
            regarding your information.
          </p>
          <p className={p}>
            By using our website, you acknowledge that you have read this
            Privacy Policy. Where applicable, we will obtain any consent
            required by law.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Information We Collect</h2>

          <h3 className={h3}>2.1 Personal Information</h3>
          <p className={p}>
            When you create an account, place an order, book an appointment, or
            contact us, we may collect:
          </p>
          <ul className={ul}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Mobile number</li>
            <li>Billing and delivery address</li>
            <li>City, state, and PIN code</li>
            <li>Account login information</li>
            <li>Order history and transaction references</li>
            <li>Customer support messages and feedback</li>
          </ul>

          <h3 className={h3}>2.2 Order and Transaction Information</h3>
          <p className={p}>
            We collect information necessary to process and manage purchases,
            including products ordered, quantities, order totals, payment
            status, delivery details, and refund or cancellation records.
          </p>
          <p className={p}>
            Payments may be processed by third-party payment service providers.
            We do not ask customers to share their UPI PIN, banking password,
            card PIN, or one-time password with us through customer support.
          </p>

          <h3 className={h3}>2.3 Appointment and Health-Related Information</h3>
          <p className={p}>
            If you request an appointment or voluntarily provide information
            about your wellness concerns, we may process that information to
            respond to your request and coordinate the service you have
            requested.
          </p>
          <p className={p}>
            Please avoid submitting unnecessary medical records or sensitive
            health information through general contact forms. Any collection or
            processing of health-related information will be subject to
            applicable legal requirements and any additional notice or consent
            required.
          </p>

          <h3 className={h3}>2.4 Technical and Usage Information</h3>
          <p className={p}>
            When you use our website, certain technical information may be
            collected, such as browser type, device information, IP address,
            pages visited, approximate usage patterns, and website performance
            data. Cookies and similar technologies may be used as described
            below.
          </p>
        </section>

        <section>
          <h2 className={h2}>3. How We Use Your Information</h2>
          <p className={p}>We may use your information to:</p>
          <ul className={ul}>
            <li>Create and manage your customer account.</li>
            <li>Process orders, payments, cancellations, returns, and refunds.</li>
            <li>Arrange shipping, delivery, and order tracking.</li>
            <li>Respond to enquiries and customer support requests.</li>
            <li>Manage appointments and service requests.</li>
            <li>Send order confirmations and important account notifications.</li>
            <li>Improve our website, product information, and shopping experience.</li>
            <li>Detect suspicious transactions, prevent fraud, and protect website security.</li>
            <li>Meet legal, accounting, tax, and regulatory obligations.</li>
            <li>
              Send promotional communications where permitted and, when
              required, with your consent.
            </li>
          </ul>
          <p className={p}>
            We do not use personal information for purposes that are
            incompatible with the purpose for which it was collected, except
            where permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Cookies and Similar Technologies</h2>
          <p className={p}>
            Our website may use cookies and similar technologies to maintain
            sessions, remember preferences, support shopping-cart functionality,
            understand website performance, and improve usability.
          </p>
          <p className={p}>
            You can manage cookies through your browser settings. Disabling
            certain cookies may affect features such as account login, cart
            functionality, or checkout.
          </p>
          <p className={p}>
            Where required, we will provide appropriate choices for
            non-essential cookies or tracking technologies.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. When We Share Information</h2>
          <p className={p}>
            We may share relevant information with trusted service providers
            when necessary to operate our website and fulfil your requests,
            including:
          </p>
          <ul className={ul}>
            <li>Payment gateways and payment service providers</li>
            <li>Courier, logistics, and delivery partners</li>
            <li>Website hosting and technical support providers</li>
            <li>Email, SMS, and customer communication providers</li>
            <li>Appointment or customer relationship management providers</li>
            <li>Professional advisers, auditors, and authorities where legally required</li>
          </ul>
          <p className={p}>
            We expect service providers to handle information appropriately and
            use it only for authorised purposes.
          </p>
          <p className={p}>
            We do not sell personal information to third parties as a business
            practice. We may disclose information when required by law, to
            respond to lawful requests, protect our rights, or address fraud and
            security concerns.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Data Retention</h2>
          <p className={p}>
            We retain personal information only for as long as reasonably
            necessary for the purposes described in this policy, including
            account management, order fulfilment, customer support, dispute
            resolution, and legal or accounting obligations.
          </p>
          <p className={p}>
            Certain transaction and tax records may need to be retained for
            periods prescribed by law. When information is no longer required,
            we will take appropriate steps to delete it or make it
            non-identifiable, subject to applicable requirements.
          </p>
        </section>

        <section>
          <h2 className={h2}>7. Information Security</h2>
          <p className={p}>
            We use reasonable technical and organisational safeguards intended
            to protect personal information against unauthorised access, loss,
            misuse, alteration, and disclosure.
          </p>
          <p className={p}>
            However, no internet transmission or electronic storage system can
            be guaranteed to be completely secure. Customers should use strong
            passwords, protect their devices, and never disclose account
            passwords or payment authentication details to anyone claiming to
            represent us.
          </p>
        </section>

        <section>
          <h2 className={h2}>8. Your Privacy Choices and Rights</h2>
          <p className={p}>Subject to applicable law, you may be able to:</p>
          <ul className={ul}>
            <li>Request access to personal information associated with your account.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of information where legally permitted.</li>
            <li>Withdraw consent where processing relies on consent.</li>
            <li>Opt out of promotional emails or messages.</li>
            <li>Raise a privacy complaint or request clarification about our data practices.</li>
          </ul>
          <p className={p}>
            To make a privacy-related request, contact us using the details
            below. We may need to verify your identity before processing the
            request. Some information may need to be retained to comply with
            legal obligations or resolve disputes.
          </p>
        </section>

        <section>
          <h2 className={h2}>9. Third-Party Websites and Services</h2>
          <p className={p}>
            Our website may contain links to third-party payment services,
            social media platforms, or other websites. Their privacy practices
            are governed by their own policies. We encourage you to review those
            policies before sharing personal information with them.
          </p>
        </section>

        <section>
          <h2 className={h2}>10. Children’s Privacy</h2>
          <p className={p}>
            Our website is not intended to encourage children to make purchases
            independently. If a child’s personal information is collected, it
            must be handled in accordance with applicable law, including any
            required parental consent and restrictions. Please contact us if you
            believe a child’s information has been submitted improperly.
          </p>
        </section>

        <section>
          <h2 className={h2}>11. Changes to This Privacy Policy</h2>
          <p className={p}>
            We may update this policy to reflect changes in our services,
            technology, or legal obligations. The revised version will be
            published on this page with an updated “Last Updated” date. Where
            required, we will provide additional notice or obtain consent.
          </p>
        </section>
      </article>
    </>
  );
}





// import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

// export const metadata = {
//   title: "Privacy Policy | Raaj Anandam Aushadhi",
//   description:
//     "How Dr. Arti’s Raaj Anandam Aushadhi collects, uses and protects your personal information.",
// };

// const HERO_IMAGE = "/policy.jpg";
// const h2 = "text-[20px] xl:text-[26px] font-semibold text-gray-800";
// const h3 = "mt-4  xl:text-[20px] font-medium text-gray-800 text-base";
// const p = "mt-3 text-sm text-gray-600 sm:text-base";
// const ul = "mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-800 sm:text-[15px]";

// export default function PrivacyPolicyPage() {
//   return (
//     <>
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0">
//           <ImagePlaceholder
//             src={HERO_IMAGE}
//             label="Policy banner"
//             priority
//             sizes="100vw"
//             className="h-full w-full"
//           />
//         </div>
//         <div className="absolute inset-0 bg-white/60" />
//         <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
//           <h1 className="text-base font-medium text-black">Privacy Policy</h1>
//           <p className="mt-3 text-xs font-medium text-black sm:text-sm">
//             Dr. Arti’s Raaj Anandam Aushadhi
//           </p>
//           <p className="mt-1 text-xs text-gray-800 sm:text-sm">
//             Last Updated: 02/02/2026
//           </p>
//         </div>
//       </section>

//       <article className="mx-auto max-w-6xl space-y-8  py-8  sm:py-12 px-4 sm:px-6 lg:px-8 lg:px-20">
//         <section>
//           <h2 className={h2}>1. Introduction</h2>
//           <p className={p}>
//             Welcome to Dr. Arti’s Raaj Anandam Aushadhi (“we,” “our,” or “us”).
//             We value your privacy and are committed to protecting the personal
//             information you share with us when visiting our website, browsing
//             our products, creating an account, placing an order, or contacting
//             our team.
//           </p>
//           <p className={p}>
//             This Privacy Policy explains what information we collect, how we use
//             and protect it, when we may share it, and what choices you have
//             regarding your information.
//           </p>
//           <p className={p}>
//             By using our website, you acknowledge that you have read this
//             Privacy Policy. Where applicable, we will obtain any consent
//             required by law.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>2. Information We Collect</h2>

//           <h3 className={h3}>2.1 Personal Information</h3>
//           <p className={p}>
//             When you create an account, place an order, book an appointment, or
//             contact us, we may collect:
//           </p>
//           <ul className={ul}>
//             <li>Full name</li>
//             <li>Email address</li>
//             <li>Mobile number</li>
//             <li>Billing and delivery address</li>
//             <li>City, state, and PIN code</li>
//             <li>Account login information</li>
//             <li>Order history and transaction references</li>
//             <li>Customer support messages and feedback</li>
//           </ul>

//           <h3 className={h3}>2.2 Order and Transaction Information</h3>
//           <p className={p}>
//             We collect information necessary to process and manage purchases,
//             including products ordered, quantities, order totals, payment
//             status, delivery details, and refund or cancellation records.
//           </p>
//           <p className={p}>
//             Payments may be processed by third-party payment service providers.
//             We do not ask customers to share their UPI PIN, banking password,
//             card PIN, or one-time password with us through customer support.
//           </p>

//           <h3 className={h3}>2.3 Appointment and Health-Related Information</h3>
//           <p className={p}>
//             If you request an appointment or voluntarily provide information
//             about your wellness concerns, we may process that information to
//             respond to your request and coordinate the service you have
//             requested.
//           </p>
//           <p className={p}>
//             Please avoid submitting unnecessary medical records or sensitive
//             health information through general contact forms. Any collection or
//             processing of health-related information will be subject to
//             applicable legal requirements and any additional notice or consent
//             required.
//           </p>

//           <h3 className={h3}>2.4 Technical and Usage Information</h3>
//           <p className={p}>
//             When you use our website, certain technical information may be
//             collected, such as browser type, device information, IP address,
//             pages visited, approximate usage patterns, and website performance
//             data. Cookies and similar technologies may be used as described
//             below.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>3. How We Use Your Information</h2>
//           <p className={p}>We may use your information to:</p>
//           <ul className={ul}>
//             <li>Create and manage your customer account.</li>
//             <li>Process orders, payments, cancellations, returns, and refunds.</li>
//             <li>Arrange shipping, delivery, and order tracking.</li>
//             <li>Respond to enquiries and customer support requests.</li>
//             <li>Manage appointments and service requests.</li>
//             <li>Send order confirmations and important account notifications.</li>
//             <li>Improve our website, product information, and shopping experience.</li>
//             <li>Detect suspicious transactions, prevent fraud, and protect website security.</li>
//             <li>Meet legal, accounting, tax, and regulatory obligations.</li>
//             <li>
//               Send promotional communications where permitted and, when
//               required, with your consent.
//             </li>
//           </ul>
//           <p className={p}>
//             We do not use personal information for purposes that are
//             incompatible with the purpose for which it was collected, except
//             where permitted by applicable law.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>4. Cookies and Similar Technologies</h2>
//           <p className={p}>
//             Our website may use cookies and similar technologies to maintain
//             sessions, remember preferences, support shopping-cart functionality,
//             understand website performance, and improve usability.
//           </p>
//           <p className={p}>
//             You can manage cookies through your browser settings. Disabling
//             certain cookies may affect features such as account login, cart
//             functionality, or checkout.
//           </p>
//           <p className={p}>
//             Where required, we will provide appropriate choices for
//             non-essential cookies or tracking technologies.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>5. When We Share Information</h2>
//           <p className={p}>
//             We may share relevant information with trusted service providers
//             when necessary to operate our website and fulfil your requests,
//             including:
//           </p>
//           <ul className={ul}>
//             <li>Payment gateways and payment service providers</li>
//             <li>Courier, logistics, and delivery partners</li>
//             <li>Website hosting and technical support providers</li>
//             <li>Email, SMS, and customer communication providers</li>
//             <li>Appointment or customer relationship management providers</li>
//             <li>Professional advisers, auditors, and authorities where legally required</li>
//           </ul>
//           <p className={p}>
//             We expect service providers to handle information appropriately and
//             use it only for authorised purposes.
//           </p>
//           <p className={p}>
//             We do not sell personal information to third parties as a business
//             practice. We may disclose information when required by law, to
//             respond to lawful requests, protect our rights, or address fraud and
//             security concerns.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>6. Data Retention</h2>
//           <p className={p}>
//             We retain personal information only for as long as reasonably
//             necessary for the purposes described in this policy, including
//             account management, order fulfilment, customer support, dispute
//             resolution, and legal or accounting obligations.
//           </p>
//           <p className={p}>
//             Certain transaction and tax records may need to be retained for
//             periods prescribed by law. When information is no longer required,
//             we will take appropriate steps to delete it or make it
//             non-identifiable, subject to applicable requirements.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>7. Information Security</h2>
//           <p className={p}>
//             We use reasonable technical and organisational safeguards intended
//             to protect personal information against unauthorised access, loss,
//             misuse, alteration, and disclosure.
//           </p>
//           <p className={p}>
//             However, no internet transmission or electronic storage system can
//             be guaranteed to be completely secure. Customers should use strong
//             passwords, protect their devices, and never disclose account
//             passwords or payment authentication details to anyone claiming to
//             represent us.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>8. Your Privacy Choices and Rights</h2>
//           <p className={p}>Subject to applicable law, you may be able to:</p>
//           <ul className={ul}>
//             <li>Request access to personal information associated with your account.</li>
//             <li>Request correction of inaccurate or incomplete information.</li>
//             <li>Request deletion of information where legally permitted.</li>
//             <li>Withdraw consent where processing relies on consent.</li>
//             <li>Opt out of promotional emails or messages.</li>
//             <li>Raise a privacy complaint or request clarification about our data practices.</li>
//           </ul>
//           <p className={p}>
//             To make a privacy-related request, contact us using the details
//             below. We may need to verify your identity before processing the
//             request. Some information may need to be retained to comply with
//             legal obligations or resolve disputes.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>9. Third-Party Websites and Services</h2>
//           <p className={p}>
//             Our website may contain links to third-party payment services,
//             social media platforms, or other websites. Their privacy practices
//             are governed by their own policies. We encourage you to review those
//             policies before sharing personal information with them.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>10. Children’s Privacy</h2>
//           <p className={p}>
//             Our website is not intended to encourage children to make purchases
//             independently. If a child’s personal information is collected, it
//             must be handled in accordance with applicable law, including any
//             required parental consent and restrictions. Please contact us if you
//             believe a child’s information has been submitted improperly.
//           </p>
//         </section>

//         <section>
//           <h2 className={h2}>11. Changes to This Privacy Policy</h2>
//           <p className={p}>
//             We may update this policy to reflect changes in our services,
//             technology, or legal obligations. The revised version will be
//             published on this page with an updated “Last Updated” date. Where
//             required, we will provide additional notice or obtain consent.
//           </p>
//         </section>
//       </article>
//     </>
//   );
// }