"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

// ============================================================================
// AUTHENTICATION GUARD FOR RESTAURANT DASHBOARD
// This component protects restaurant-only pages from unauthorized access
// ============================================================================

export function RestaurantAuthGuard({ children }: { children: React.ReactNode }) {
  // TODO: Replace with actual authentication logic when implementing auth
  // For now, we'll show a login prompt since auth is not yet implemented
  const isAuthenticated = false; // Replace with actual auth check
  const router = useRouter();

  // If not authenticated, show login/download prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
              <DevicePhoneMobileIcon className="h-8 w-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Restaurant Dashboard
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Access your restaurant dashboard, manage inventory, and track analytics in the Bountyful mobile app.
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90"
                onClick={() => router.push('/shop')}
              >
                Download Mobile App
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Restaurant partners can access their dashboard through the mobile app
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Not a partner yet?{" "}
                <a
                  href="/legal/contact"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Contact us to get started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
