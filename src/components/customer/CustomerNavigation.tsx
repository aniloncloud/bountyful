"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ShoppingBagIcon, UserIcon, MapPinIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon, ClockIcon } from "@heroicons/react/24/solid";

export function CustomerNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/shop" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{siteConfig.shortName?.slice(0,3)}</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines, bags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/shop/nearby" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <MapPinIcon className="h-5 w-5" />
              <span>Nearby</span>
            </Link>
            
            <Link href="/shop/favorites" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <HeartIcon className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            
            <Link href="/shop/orders" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <ClockIcon className="h-5 w-5" />
              <span>Orders</span>
            </Link>

            <Link href="/shop/cart" className="relative">
              <Button variant="outline" size="sm" className="p-2">
                <ShoppingBagIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/shop/profile">
              <Button variant="outline" size="sm" className="p-2">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="mb-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/shop/nearby" className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-600">
                <MapPinIcon className="h-5 w-5" />
                <span>Nearby Restaurants</span>
              </Link>
              <Link href="/shop/favorites" className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-600">
                <HeartIcon className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              <Link href="/shop/orders" className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-600">
                <ClockIcon className="h-5 w-5" />
                <span>Order History</span>
              </Link>
              <Link href="/shop/cart" className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-600">
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Cart ({cartCount})</span>
              </Link>
              <Link href="/shop/profile" className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-600">
                <UserIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}