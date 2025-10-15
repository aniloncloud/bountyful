import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bountyful",
  description: "Bountyful Privacy Policy - How we collect, use, and protect your data",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Bountyful, Corp. ("Bountyful," "we," "our," or "us"). We are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our mobile application and services
              (collectively, the "Service").
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              By using Bountyful, you agree to the collection and use of information in accordance with this
              Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Name and email address</li>
              <li>Phone number (optional, for order notifications)</li>
              <li>Delivery or pickup addresses</li>
              <li>Account credentials (encrypted password)</li>
              <li>Profile photo (optional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.2 Payment Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Payment processing is handled by our third-party payment processor, Stripe. We do not store your
              full credit card information on our servers. We collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Last four digits of your payment card</li>
              <li>Card type and expiration date</li>
              <li>Billing address</li>
              <li>Transaction history and receipts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.3 Location Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With your permission, we collect and process location data to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Show nearby restaurants and available surplus food</li>
              <li>Calculate distances and estimated pickup times</li>
              <li>Improve our service offerings in your area</li>
              <li>Provide location-based notifications</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              You can control location access through your device settings at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.4 Order and Usage Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We automatically collect information about your use of the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Order history, including items purchased, restaurants, and order times</li>
              <li>Saved favorites and preferences</li>
              <li>Search queries and browsing behavior</li>
              <li>Dietary preferences and allergen information</li>
              <li>App usage statistics and feature interactions</li>
              <li>Environmental impact metrics (food saved, CO2 reduced)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.5 Device and Technical Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We collect technical information from your device:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Device type, model, and operating system version</li>
              <li>Unique device identifiers (e.g., IDFA, Android ID)</li>
              <li>IP address and browser type</li>
              <li>Mobile network information</li>
              <li>Time zone and language settings</li>
              <li>App version and crash reports</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              2.6 Communications
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you contact us or communicate through the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Customer support inquiries and correspondence</li>
              <li>Feedback, ratings, and reviews</li>
              <li>Survey responses</li>
              <li>Push notification preferences</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use the information we collect for the following purposes:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.1 Service Provision
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Create and manage your account</li>
              <li>Process and fulfill your orders</li>
              <li>Facilitate payment transactions</li>
              <li>Send order confirmations and pickup notifications</li>
              <li>Provide customer support</li>
              <li>Enable communication between you and restaurants</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.2 Service Improvement
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Analyze usage patterns and trends</li>
              <li>Improve app functionality and user experience</li>
              <li>Develop new features and services</li>
              <li>Fix bugs and technical issues</li>
              <li>Conduct research and analytics</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.3 Personalization
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Recommend restaurants and offers based on your preferences</li>
              <li>Display personalized content and deals</li>
              <li>Remember your settings and preferences</li>
              <li>Show your environmental impact statistics</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.4 Communication
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Send transactional emails and notifications</li>
              <li>Provide order updates and reminders</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Request feedback and reviews</li>
              <li>Notify you of policy changes or service updates</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.5 Security and Fraud Prevention
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Detect and prevent fraudulent transactions</li>
              <li>Monitor for suspicious activity</li>
              <li>Verify user identity</li>
              <li>Protect against security threats</li>
              <li>Enforce our Terms of Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.6 Legal Compliance
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Comply with legal obligations</li>
              <li>Respond to legal requests and court orders</li>
              <li>Protect our rights and property</li>
              <li>Resolve disputes</li>
            </ul>
          </section>

          {/* How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. How We Share Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              4.1 Partner Restaurants
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you place an order, we share necessary information with the restaurant to fulfill your order:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Your name and contact information</li>
              <li>Order details and special requests</li>
              <li>Pickup time and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              4.2 Service Providers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We work with trusted third-party service providers who process data on our behalf:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li><strong>Payment Processing:</strong> Stripe (PCI DSS compliant payment processor)</li>
              <li><strong>Cloud Hosting:</strong> For app infrastructure and data storage</li>
              <li><strong>Analytics:</strong> To understand app usage and improve services</li>
              <li><strong>Customer Support:</strong> To provide technical assistance</li>
              <li><strong>Email/SMS Services:</strong> For transactional and marketing communications</li>
              <li><strong>Push Notifications:</strong> For order updates and alerts</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              These service providers are contractually obligated to protect your data and use it only for
              the purposes we specify.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              4.3 Business Transfers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If we are involved in a merger, acquisition, reorganization, or sale of assets, your information
              may be transferred as part of that transaction. We will notify you of any such change and the
              choices you may have regarding your information.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              4.4 Legal Requirements
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may disclose your information if required to do so by law or in response to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Legal process, court orders, or government requests</li>
              <li>Enforcement of our Terms of Service</li>
              <li>Protection of rights, property, or safety of Bountyful, users, or others</li>
              <li>Investigation of fraud or security issues</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              4.5 With Your Consent
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may share your information with other parties when you give us explicit consent to do so.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li><strong>Encryption:</strong> Data is encrypted in transit using TLS/SSL and at rest using AES-256</li>
              <li><strong>Secure Authentication:</strong> Passwords are hashed using bcrypt</li>
              <li><strong>Access Controls:</strong> Strict internal access policies and role-based permissions</li>
              <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
              <li><strong>PCI Compliance:</strong> Payment data is handled by PCI DSS compliant processors</li>
              <li><strong>Monitoring:</strong> Continuous monitoring for suspicious activity</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              While we strive to protect your personal information, no method of transmission over the internet
              or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to
              protecting your data using commercially acceptable means.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal, accounting, or reporting requirements</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              <strong>Retention Periods:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>Order History:</strong> Retained for 7 years for tax and legal purposes</li>
              <li><strong>Payment Information:</strong> Tokenized data retained for recurring payments</li>
              <li><strong>Support Communications:</strong> Retained for 3 years</li>
              <li><strong>Analytics Data:</strong> Anonymized and aggregated indefinitely</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              When you delete your account, we will delete or anonymize your personal information within 30 days,
              except where we are required by law to retain it longer.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Your Rights and Choices
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.1 Access and Portability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You have the right to access and receive a copy of your personal data in a machine-readable format.
              You can download your data from your account settings or by contacting us.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.2 Correction
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can update or correct your personal information at any time through your account settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.3 Deletion (Right to be Forgotten)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can request deletion of your account and personal data. Visit{" "}
              <a href="/legal/data-deletion" className="text-blue-600 dark:text-blue-400 hover:underline">
                Account Deletion Instructions
              </a>{" "}
              for detailed steps. We will process your request within 30 days.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.4 Opt-Out of Marketing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can opt out of promotional communications by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Clicking "unsubscribe" in any marketing email</li>
              <li>Adjusting notification preferences in app settings</li>
              <li>Contacting us at privacy@bountyful.app</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              Note: You cannot opt out of transactional communications (order confirmations, account security alerts).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.5 Location Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can control location access through your device settings. Disabling location services may
              limit certain features of the app.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.6 Do Not Track
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Some browsers have "Do Not Track" features. We currently do not respond to Do Not Track signals,
              but you can disable tracking through your app settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.7 California Privacy Rights (CCPA)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you are a California resident, you have additional rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or shared</li>
              <li>Right to opt out of sale/sharing (we do not sell your data)</li>
              <li>Right to deletion</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              To exercise these rights, email us at privacy@bountyful.app with "California Privacy Request"
              in the subject line.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.8 European Privacy Rights (GDPR)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you are in the European Economic Area (EEA) or UK, you have additional rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              To exercise these rights, contact us at privacy@bountyful.app.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bountyful is not intended for children under 13 years of age (or 16 in the EEA). We do not
              knowingly collect personal information from children. If you are a parent or guardian and believe
              your child has provided us with personal information, please contact us at privacy@bountyful.app,
              and we will delete that information from our systems.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of
              residence. These countries may have data protection laws different from your jurisdiction.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              When we transfer personal data from the EEA, UK, or Switzerland to other countries, we use:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Adequacy decisions by the European Commission</li>
              <li>Other lawful transfer mechanisms</li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Third-Party Links and Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Service may contain links to third-party websites, services, or restaurants. We are not
              responsible for the privacy practices of these third parties. We encourage you to read their
              privacy policies before providing any information to them.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
              legal requirements, or other factors. When we make material changes, we will:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>Notify you via email or in-app notification</li>
              <li>Obtain your consent if required by applicable law</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We encourage you to review this Privacy Policy periodically. Your continued use of the Service
              after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> privacy@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2"><strong>Support:</strong> support@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Mail:</strong> Bountyful, Corp.<br />
                Privacy Team<br />
                131 Continental Dr Ste 305<br />
                Newark, DE 19713
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We will respond to your inquiry within 30 days.
            </p>
          </section>

          {/* Data Protection Officer */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              13. Data Protection Officer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For GDPR-related inquiries, you can contact our Data Protection Officer at dpo@bountyful.app.
            </p>
          </section>

          {/* Additional Information */}
          <section className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This Privacy Policy is compliant with GDPR, CCPA, COPPA, and other applicable data protection laws.
              It covers our mobile applications on iOS and Android platforms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
