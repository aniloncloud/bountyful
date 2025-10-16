"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DevicePhoneMobileIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface AppDownloadRedirectProps {
  title: string;
  description: string;
}

export function AppDownloadRedirect({ title, description }: AppDownloadRedirectProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
            <DevicePhoneMobileIcon className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto min-w-[200px]"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              App Store
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90 w-full sm:w-auto min-w-[200px]"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Google Play
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon to App Store and Google Play
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
