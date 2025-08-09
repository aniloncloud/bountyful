import { CustomerNavigation } from "@/components/customer/CustomerNavigation";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { AnalyticsTracker } from "@/components/customer/AnalyticsTracker";
import { ConversionOptimizer } from "@/components/customer/ConversionOptimizer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20">
      <AnalyticsTracker />
      <ConversionOptimizer />
      <CustomerNavigation />
      <main className="pb-16">
        {children}
      </main>
      <CustomerFooter />
    </div>
  );
}