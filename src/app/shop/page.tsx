"use client";

import { CustomerHero } from "@/components/customer/CustomerHero";
import { Button } from "@/components/ui/button";
import { DevicePhoneMobileIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// ============================================================================
// RESTAURANT LISTINGS TEMPORARILY DISABLED
// Users should download the mobile app to browse restaurants and place orders
// ============================================================================
// import { RestaurantGrid } from "@/components/customer/RestaurantGrid";
// import { SearchFilters } from "@/components/customer/SearchFilters";
// import { CategoryTabs } from "@/components/customer/CategoryTabs";

export default function CustomerHomepage() {
  // ============================================================================
  // COMMENTED OUT: Restaurant search and filtering functionality
  // Uncomment when ready to enable web-based restaurant browsing
  // ============================================================================
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedFilters, setSelectedFilters] = useState({
  //   bagType: "all", // all, surplus, fresh, experience
  //   priceRange: "all", // all, under-5, 5-10, 10-15, 15-plus
  //   timing: "all", // all, now, peak, slow
  //   cuisine: "all",
  //   distance: "5km"
  // });

  return (
    <div className="space-y-8">
      <CustomerHero />

      {/* App Download Section - ACTIVE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
            <DevicePhoneMobileIcon className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Download the Bountyful App
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start rescuing surplus food, saving money, and reducing waste today.
            Available on iOS and Android.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Discover Deals
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse surplus food and fresh experiences from local restaurants
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Save Up to 70%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get premium meals at a fraction of the original price
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Reduce Waste
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join the movement to fight food waste and help the planet
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon to App Store and Google Play
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================================
          COMMENTED OUT: Restaurant search and grid
          Uncomment when ready to enable web-based restaurant browsing
          ============================================================================ */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        <CategoryTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <RestaurantGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedFilters={selectedFilters}
        />
      </div> */}
    </div>
  );
}
