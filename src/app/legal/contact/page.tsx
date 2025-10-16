import { Metadata } from "next";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Bountyful",
  description: "Get in touch with Bountyful support team",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions or need help? We're here to assist you.
          </p>
        </div>

        {/* Contact Forms */}
        <div className="space-y-8 mb-12">
          <ContactForm
            type="support"
            title="General Support"
            description="For general inquiries, order issues, or app support. Response time: 24-48 hours"
          />

          <ContactForm
            type="privacy"
            title="Privacy & Data Requests"
            description="For privacy concerns, data requests, or account deletion. Response time: Within 30 days (GDPR/CCPA requirement)"
          />

          <ContactForm
            type="legal"
            title="Legal & Business Inquiries"
            description="For legal matters, partnerships, or business inquiries. Response time: 5-7 business days"
          />

          <ContactForm
            type="partners"
            title="Restaurant Partners"
            description="Interested in joining Bountyful as a restaurant partner? Response time: 2-3 business days"
          />
        </div>

        {/* Office Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <MapPinIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Mailing Address
            </h2>
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            <p className="font-medium">Bountyful, Corp.</p>
            <p className="mt-2">
              131 Continental Dr Ste 305<br />
              Newark, DE 19713<br />
              United States
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Please note: This address is for postal mail only. For faster responses, please use the contact forms above.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How long does it take to get a response?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our support team typically responds to general inquiries within 24-48 hours. Privacy and data
                requests are processed within 30 days as required by law. Business and partnership inquiries
                may take 2-7 business days.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What should I include in my message?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To help us assist you faster, please include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Your account email address</li>
                <li>A clear description of your issue or question</li>
                <li>Screenshots if applicable</li>
                <li>Order number (for order-related issues)</li>
                <li>Device type and app version</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I report a problem with an order?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use the General Support form above within 24 hours of pickup. Include your order number,
                photos of the issue (if applicable), and a description of the problem. We'll review your
                case and determine if a refund or credit is appropriate.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I delete my account?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can delete your account directly in the app (Settings → Privacy → Delete Account) or
                by using the Privacy & Data Requests form above. See our{" "}
                <a
                  href="/legal/data-deletion"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Account Deletion Instructions
                </a>{" "}
                for detailed steps.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I become a restaurant partner?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We'd love to work with you! Use the Restaurant Partners form above with information about your
                restaurant, including name, location, cuisine type, and estimated daily surplus. Our
                partnerships team will reach out within 2-3 business days.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is my message secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! All form submissions are encrypted in transit (TLS/HTTPS) and we never share your
                contact information with third parties. See our{" "}
                <a
                  href="/legal/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Additional Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="/legal/privacy"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn how we collect, use, and protect your data
              </p>
            </a>

            <a
              href="/legal/terms"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our user agreement and service terms
              </p>
            </a>

            <a
              href="/legal/data-deletion"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Deletion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instructions for deleting your account and data
              </p>
            </a>

            <a
              href="/shop"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download Mobile App</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get the app to browse restaurants and place orders
              </p>
            </a>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> For urgent order issues during pickup hours, please contact the restaurant
            directly using the contact information provided in your order confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
