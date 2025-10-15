import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Deletion Instructions | Bountyful",
  description: "How to delete your Bountyful account and personal data",
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Account Deletion Instructions
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You have the right to delete your Bountyful account and associated personal data at any time.
              This page provides instructions on how to request account deletion and explains what data is
              deleted and what is retained.
            </p>
          </section>

          {/* How to Delete Your Account */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. How to Delete Your Account
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can delete your account using any of the following methods:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Option 1: Delete In-App (Recommended)
            </h3>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Open the Bountyful app on your device</li>
              <li>Navigate to <strong>Settings</strong> (tap your profile icon, then Settings)</li>
              <li>Scroll down to the <strong>Account</strong> section</li>
              <li>Tap <strong>"Delete Account"</strong></li>
              <li>Read the confirmation dialog carefully</li>
              <li>Enter your password to confirm</li>
              <li>Tap <strong>"Permanently Delete My Account"</strong></li>
            </ol>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> This action is permanent and cannot be undone. All your data will
                be permanently deleted within 30 days.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Option 2: Request Deletion by Email
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you cannot access your account or prefer to request deletion by email:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Send an email to <strong>privacy@bountyful.app</strong></li>
              <li>Use the subject line: <strong>"Account Deletion Request"</strong></li>
              <li>
                Include the following information:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Your full name</li>
                  <li>Email address associated with your account</li>
                  <li>Phone number (if applicable)</li>
                  <li>Reason for deletion (optional)</li>
                </ul>
              </li>
              <li>We will verify your identity and process your request within 30 days</li>
              <li>You will receive a confirmation email once deletion is complete</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Option 3: Contact Support
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For assistance with account deletion:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Visit our <a href="/legal/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Page</a></li>
              <li>Email: support@bountyful.app</li>
              <li>Subject: "Account Deletion Assistance"</li>
            </ul>
          </section>

          {/* What Gets Deleted */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. What Data Gets Deleted
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you delete your account, the following information is permanently deleted:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Profile photo and bio</li>
              <li>Saved addresses (delivery and pickup locations)</li>
              <li>Account credentials (password hash)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Account Data
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Saved favorites and preferences</li>
              <li>Notification settings</li>
              <li>Dietary preferences and allergen information</li>
              <li>App settings and customizations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Usage Data
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Browsing history and search queries</li>
              <li>App usage statistics</li>
              <li>Device information and identifiers</li>
              <li>Location history</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Communications
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Customer support conversations</li>
              <li>Email subscriptions (you will be unsubscribed)</li>
              <li>Push notification tokens</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Payment Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Saved payment methods (tokenized card information)</li>
              <li>Billing addresses</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Note: Full payment card details are stored by our payment processor (Stripe) and are never stored
              on our servers. Stripe retains payment information according to their retention policies and
              regulatory requirements.
            </p>
          </section>

          {/* What Gets Retained */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. What Data Gets Retained
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Certain data may be retained for legal, regulatory, or operational reasons:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Transaction Records (7 Years)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are required by law to retain transaction records for tax and accounting purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Order history (anonymized after 30 days)</li>
              <li>Payment receipts and invoices</li>
              <li>Refund records</li>
              <li>Transaction IDs and amounts</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              These records are anonymized (personal identifiers removed) 30 days after account deletion but
              retained for regulatory compliance.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Fraud Prevention Data (Indefinite)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If your account was flagged for fraud, abuse, or Terms of Service violations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Account identifiers (hashed email, device ID)</li>
              <li>IP addresses and access logs</li>
              <li>Fraud indicators and risk scores</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This data is retained indefinitely to prevent future fraud and protect our community.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Legal Holds
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If your account is subject to an active legal investigation, court order, or regulatory inquiry,
              all data may be retained until the matter is resolved.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Aggregated and Anonymized Data (Indefinite)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain aggregated, anonymized analytics data that cannot be linked back to you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>App usage trends and statistics</li>
              <li>Environmental impact metrics (total food saved, CO2 reduced)</li>
              <li>Performance and crash data</li>
            </ul>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Deletion Timeline
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Here's what happens after you request account deletion:
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-semibold text-gray-900 dark:text-white">
                  Immediate
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Your account is deactivated and you can no longer log in. Email subscriptions are canceled.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-semibold text-gray-900 dark:text-white">
                  Within 24 hours
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Your profile is removed from search results and restaurant partner systems.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-semibold text-gray-900 dark:text-white">
                  Within 7 days
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Personal data is deleted from active databases and backups are purged.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-semibold text-gray-900 dark:text-white">
                  Within 30 days
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  All personal data is permanently deleted, except for legally required transaction records
                  (which are anonymized).
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-semibold text-gray-900 dark:text-white">
                  30 days
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  You receive a confirmation email that your account has been permanently deleted.
                </div>
              </div>
            </div>
          </section>

          {/* Before You Delete */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Before You Delete Your Account
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Please consider the following before deleting your account:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Outstanding Orders
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Cancel or complete any active orders before deletion</li>
              <li>Pick up any unpicked orders to avoid restaurant issues</li>
              <li>Resolve any pending refunds or disputes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Download Your Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can download a copy of your data before deletion:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Go to <strong>Settings → Privacy → Download My Data</strong></li>
              <li>Tap <strong>"Request Data Export"</strong></li>
              <li>You'll receive an email with a download link within 48 hours</li>
              <li>Download your data archive (JSON format)</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Alternative: Deactivate Instead of Delete
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you're unsure about permanent deletion, you can temporarily deactivate your account:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>Go to <strong>Settings → Account → Deactivate Account</strong></li>
              <li>Your account will be hidden but not deleted</li>
              <li>You can reactivate anytime by logging back in</li>
              <li>Data is retained for up to 90 days during deactivation</li>
            </ul>
          </section>

          {/* After Deletion */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. After Account Deletion
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              You Will Lose Access To:
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Order history and receipts</li>
              <li>Saved favorites and preferences</li>
              <li>Environmental impact statistics</li>
              <li>Account credits or promotional offers</li>
              <li>All app features and services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Creating a New Account
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can create a new account at any time using the same or different email address. However:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>You will start fresh with no order history or preferences</li>
              <li>Previous promotional offers or credits will not be restored</li>
              <li>Environmental impact statistics will reset to zero</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Third-Party Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Deleting your Bountyful account does not automatically delete data held by third parties:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li><strong>Stripe:</strong> Contact Stripe directly to delete payment data</li>
              <li><strong>Partner Restaurants:</strong> Restaurants may retain records of your orders</li>
              <li><strong>Analytics Providers:</strong> Anonymized usage data may be retained</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              See our <a href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy</a> for details on third-party data sharing.
            </p>
          </section>

          {/* Rights and Laws */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Your Rights Under Data Protection Laws
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Account deletion is part of your data protection rights:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              GDPR (European Users)
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Right to Erasure:</strong> Also known as the "right to be forgotten"</li>
              <li>We will delete your data within 30 days unless legally required to retain it</li>
              <li>You can file a complaint with your local Data Protection Authority</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              CCPA (California Users)
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Right to Deletion:</strong> Request deletion of personal information</li>
              <li>We will confirm deletion within 45 days</li>
              <li>Some data may be retained for legal compliance or fraud prevention</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Other Jurisdictions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Data deletion rights may vary by location. Contact privacy@bountyful.app for jurisdiction-specific
              information.
            </p>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Troubleshooting
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              "Delete Account" Button Not Working
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Ensure you're using the latest version of the app</li>
              <li>Check your internet connection</li>
              <li>Try logging out and back in</li>
              <li>If the issue persists, use Option 2 (email deletion request)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Still Receiving Emails After Deletion
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Email systems may take up to 48 hours to update</li>
              <li>Check spam/junk folders for confirmation email</li>
              <li>If emails continue after 7 days, contact support@bountyful.app</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Account Deletion Denied
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may delay or deny deletion if:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
              <li>You have outstanding payments or unpaid orders</li>
              <li>Your account is under investigation for fraud or abuse</li>
              <li>There's an active legal hold on your account</li>
              <li>You have pending refund disputes</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              We will notify you of the reason and provide next steps to resolve the issue.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Questions or Help
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you need assistance with account deletion or have questions:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300"><strong>Privacy Team:</strong> privacy@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2"><strong>Support Team:</strong> support@bountyful.app</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Contact Page:</strong>{" "}
                <a href="/legal/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                  legal/contact
                </a>
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We typically respond within 24-48 hours.
            </p>
          </section>

          {/* Additional Info */}
          <section className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page complies with Apple App Store requirements for account deletion (effective June 30, 2022)
              and GDPR/CCPA data deletion rights.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              For more information, see our{" "}
              <a href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/legal/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
