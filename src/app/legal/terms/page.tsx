import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Bountyful",
  description: "Bountyful Terms of Service - User agreement and service terms",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Bountyful! These Terms of Service ("Terms") constitute a legally binding agreement between
              you and Bountyful, Inc. ("Bountyful," "we," "our," or "us") governing your access to and use of the
              Bountyful mobile application, website, and related services (collectively, the "Service").
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              By creating an account, downloading our app, or using our Service, you agree to be bound by these
              Terms and our <a href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy</a>. If you do not agree to these Terms, you must not access or use the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              <strong>IMPORTANT:</strong> These Terms contain an arbitration clause and class action waiver that
              affects your rights. Please read Section 14 carefully.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Eligibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To use Bountyful, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Be at least 13 years old (or 16 in the European Economic Area)</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Not be prohibited from using the Service under applicable laws</li>
              <li>Provide accurate, current, and complete information during registration</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to
              these Terms on your behalf.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Account Registration and Security
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.1 Account Creation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To access certain features, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Not create an account using false or misleading information</li>
              <li>Not create an account for anyone other than yourself without permission</li>
              <li>Not have more than one account unless authorized by us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              3.2 Account Security
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Maintaining the confidentiality of your password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              We are not liable for any loss or damage arising from your failure to protect your account credentials.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Service Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bountyful is a platform that connects users with local restaurants offering surplus food at
              discounted prices ("Magic Bags"). The Service allows you to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Browse available surplus food offerings from partner restaurants</li>
              <li>Purchase Magic Bags at discounted prices</li>
              <li>Pick up your orders at specified times</li>
              <li>Track your environmental impact (food saved, CO2 reduced)</li>
              <li>Save favorites and receive notifications about new offerings</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              <strong>Important:</strong> Bountyful acts as a marketplace platform. We do not prepare, handle,
              or guarantee the quality of food. All food is prepared and provided by independent third-party
              restaurants.
            </p>
          </section>

          {/* Orders and Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Orders and Payments
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              5.1 Placing Orders
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you place an order through the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>You make an offer to purchase a Magic Bag from the restaurant</li>
              <li>The restaurant accepts your offer when they confirm your order</li>
              <li>A binding contract is formed between you and the restaurant</li>
              <li>Bountyful facilitates the transaction but is not a party to the contract</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              5.2 Pricing and Payment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All prices are displayed in your local currency and include applicable taxes unless otherwise stated.
              You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Pay the full amount displayed at checkout</li>
              <li>Provide valid payment information</li>
              <li>Authorize us to charge your payment method</li>
              <li>Pay any additional fees, taxes, or charges that may apply</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              We use Stripe for payment processing. Your payment information is handled in accordance with
              PCI DSS standards.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              5.3 Order Confirmation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You will receive an order confirmation via email or push notification. This confirmation does not
              signify our acceptance of your order; it is merely a receipt of your order.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              5.4 Pickup Requirements
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Pick up your order during the designated pickup window</li>
              <li>Bring your order confirmation (in-app or email)</li>
              <li>Verify the pickup details before leaving the restaurant</li>
              <li>Notify us immediately of any issues with your order</li>
            </ul>
          </section>

          {/* Cancellations and Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Cancellations and Refunds
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              6.1 Cancellation by User
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may cancel an order according to the following policy:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li><strong>More than 2 hours before pickup:</strong> Full refund</li>
              <li><strong>Less than 2 hours before pickup:</strong> No refund (subject to restaurant discretion)</li>
              <li><strong>No-show:</strong> No refund, and may result in account suspension</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              6.2 Cancellation by Restaurant
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Restaurants may cancel orders due to unforeseen circumstances (e.g., insufficient surplus food,
              equipment failure). If a restaurant cancels your order, you will receive a full refund within
              5-7 business days.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              6.3 Refund Process
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Approved refunds will be processed to your original payment method within 5-7 business days.
              Processing times may vary depending on your bank or payment provider.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              6.4 Disputes
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have an issue with your order, contact us at support@bountyful.app within 24 hours of
              pickup. We will review your claim and determine if a refund or credit is warranted at our sole
              discretion.
            </p>
          </section>

          {/* Food Safety and Quality */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Food Safety and Quality
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.1 Restaurant Responsibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Partner restaurants are solely responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Food preparation, handling, and storage</li>
              <li>Compliance with local health and safety regulations</li>
              <li>Accuracy of allergen and ingredient information</li>
              <li>Food quality and freshness</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.2 Allergens and Dietary Restrictions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              While we display allergen information provided by restaurants, we cannot guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Complete accuracy of allergen information</li>
              <li>Prevention of cross-contamination</li>
              <li>Suitability for specific dietary requirements</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              <strong>If you have food allergies or dietary restrictions, you are solely responsible for verifying
              ingredients with the restaurant before consuming any food.</strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.3 Magic Bag Contents
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Magic Bags contain surplus food and may vary in contents. By purchasing a Magic Bag, you understand:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Contents are determined by the restaurant based on available surplus</li>
              <li>Specific items cannot be guaranteed</li>
              <li>Contents may differ from photos or descriptions</li>
              <li>Value is approximate and not guaranteed</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              7.4 Disclaimer
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>BOUNTYFUL IS NOT RESPONSIBLE FOR FOOD QUALITY, SAFETY, OR ANY ILLNESS OR INJURY RESULTING
              FROM CONSUMING FOOD OBTAINED THROUGH THE SERVICE. YOU ASSUME ALL RISKS ASSOCIATED WITH FOOD
              CONSUMPTION.</strong>
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. User Conduct
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You agree NOT to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Use the Service for fraudulent or unauthorized purposes</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm others</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use automated scripts, bots, or scrapers to access the Service</li>
              <li>Reverse engineer, decompile, or disassemble the app</li>
              <li>Remove or modify any copyright, trademark, or proprietary notices</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Resell or commercially exploit the Service without authorization</li>
              <li>Abuse refund policies or engage in fraudulent chargebacks</li>
              <li>Repeatedly fail to pick up orders ("no-shows")</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Intellectual Property
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              9.1 Bountyful Property
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service, including all content, features, functionality, software, logos, and trademarks
              (collectively, "Bountyful Property") is owned by Bountyful and protected by copyright, trademark,
              and other intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the
              Service for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Modifying, copying, or distributing the app or content</li>
              <li>Creating derivative works</li>
              <li>Selling, renting, or sublicensing access</li>
              <li>Using the Service for commercial purposes without authorization</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              9.2 User Content
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you submit feedback, reviews, photos, or other content ("User Content"), you grant us a
              worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify,
              publish, and distribute such content for any purpose related to the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              You represent that you own or have the necessary rights to submit User Content and that it does
              not violate any third-party rights or laws.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Third-Party Services and Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service may contain links to third-party websites, services, or content. We do not endorse,
              control, or assume responsibility for any third-party services. Your interactions with third-party
              services are governed by their terms and privacy policies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We use third-party service providers (e.g., Stripe for payments, analytics tools) to operate the
              Service. These providers are governed by their own terms and privacy policies.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Disclaimers and Limitations of Liability
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              11.1 Service Provided "As Is"
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>The Service will be uninterrupted, secure, or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Service is free of viruses or harmful components</li>
              <li>Results obtained from the Service will be accurate or reliable</li>
              <li>Restaurant information, availability, or food quality is guaranteed</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              11.2 Limitation of Liability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOUNTYFUL AND ITS AFFILIATES, OFFICERS, DIRECTORS,
              EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
              OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Loss of profits, revenue, data, or use</li>
              <li>Food poisoning, allergic reactions, or other health issues</li>
              <li>Damages resulting from restaurant actions or omissions</li>
              <li>Unauthorized access to your account</li>
              <li>Service interruptions or data loss</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE
              GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM OR (B) $100 USD.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              11.3 Basis of the Bargain
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You acknowledge that these limitations of liability are an essential basis of the agreement between
              you and Bountyful, and that we would not provide the Service without these limitations.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              12. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Bountyful and its affiliates, officers,
              directors, employees, and agents from any claims, liabilities, damages, losses, costs, and
              expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
              <li>Your fraudulent or illegal activities</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              13. Termination
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              13.1 By You
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may terminate your account at any time by deleting it through app settings or contacting us
              at support@bountyful.app.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              13.2 By Bountyful
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may suspend or terminate your account immediately, without notice, if you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Violate these Terms</li>
              <li>Engage in fraudulent activity</li>
              <li>Repeatedly fail to pick up orders</li>
              <li>Abuse refund policies</li>
              <li>Harass or abuse restaurants or other users</li>
              <li>Pose a security risk to the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              13.3 Effect of Termination
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Your right to use the Service immediately ceases</li>
              <li>We will delete your account and personal data (subject to legal retention requirements)</li>
              <li>Outstanding payment obligations remain in effect</li>
              <li>Sections 9, 11, 12, 14, and 15 survive termination</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              14. Dispute Resolution and Arbitration
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              14.1 Informal Resolution
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have a dispute with Bountyful, you agree to first contact us at support@bountyful.app to
              attempt to resolve the dispute informally for at least 30 days before initiating arbitration or
              litigation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              14.2 Binding Arbitration
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If we cannot resolve the dispute informally, you and Bountyful agree that any dispute, claim, or
              controversy arising from or relating to these Terms or the Service will be resolved by binding
              arbitration administered by the American Arbitration Association (AAA) under its Consumer
              Arbitration Rules.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              The arbitration will be conducted in [Your Jurisdiction] or remotely by video conference. The
              arbitrator's decision is final and binding, and judgment may be entered in any court of competent
              jurisdiction.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              14.3 Class Action Waiver
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>YOU AND BOUNTYFUL AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY.
              YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              14.4 Exceptions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Either party may seek injunctive or equitable relief in court to protect intellectual property
              rights or confidential information.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              14.5 Opt-Out
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may opt out of arbitration by sending written notice to legal@bountyful.app within 30 days
              of first accepting these Terms. Your notice must include your name, email address, and a clear
              statement that you wish to opt out of arbitration.
            </p>
          </section>

          {/* General Provisions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              15. General Provisions
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.1 Governing Law
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law
              principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.2 Changes to Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may modify these Terms at any time. We will notify you of material changes via email or
              in-app notification at least 30 days before the changes take effect. Continued use of the Service
              after changes constitutes acceptance of the new Terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.3 Entire Agreement
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and
              Bountyful regarding the Service and supersede all prior agreements.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.4 Severability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If any provision of these Terms is found invalid or unenforceable, the remaining provisions will
              remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.5 Waiver
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.6 Assignment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may not assign or transfer these Terms without our written consent. We may assign these Terms
              without restriction.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              15.7 Force Majeure
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are not liable for delays or failures in performance due to causes beyond our reasonable control,
              including natural disasters, war, terrorism, labor disputes, or internet outages.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              16. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> legal@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2"><strong>Support:</strong> support@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Mail:</strong> Bountyful Legal Department<br />
                [Your Company Address]<br />
                [City, State ZIP]
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>BY USING BOUNTYFUL, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE
              BOUND BY THESE TERMS OF SERVICE.</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
