"use client";

import { Button } from "@/components/ui/button";
import { DevicePhoneMobileIcon, ArrowDownTrayIcon, ClockIcon, BellIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

// ============================================================================
// ORDER TRACKING TEMPORARILY DISABLED
// Users should download the mobile app to view and track their orders
// ============================================================================
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { MapPinIcon, SparklesIcon, GiftIcon, StarIcon } from "@heroicons/react/24/solid";
// import { SimplePickupModal } from "@/components/customer/SimplePickupModal";
// import { PostPickupIssueButton } from "@/components/customer/PostPickupIssueButton";

export default function OrdersPage() {
  // ============================================================================
  // COMMENTED OUT: Order tracking functionality
  // Uncomment when ready to enable web-based order tracking
  // ============================================================================
  // const [filter, setFilter] = useState("all");
  // const [arrivedOrders, setArrivedOrders] = useState<{[key: string]: { arrived: boolean, eta?: number, notifying?: boolean }}>({});
  // const [pickupModalOpen, setPickupModalOpen] = useState(false);
  // const [selectedOrderForPickup, setSelectedOrderForPickup] = useState<string | null>(null);
  // const [completedPickups, setCompletedPickups] = useState<{[key: string]: boolean}>({});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your orders in the mobile app
          </p>
        </div>

        {/* App Download Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
            <DevicePhoneMobileIcon className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Download the Bountyful App
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            View your orders, track pickup times, and manage your account.
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

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Real-Time Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your order status from confirmed to ready for pickup
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                <BellIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Push Notifications
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when your order is ready for pickup
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Order History
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View all your past orders and track your savings
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
    </div>
  );

  // ============================================================================
  // COMMENTED OUT: Full order tracking page with order list
  // This includes all order management features: filtering, pickup confirmation,
  // location sharing, and order details. Uncomment when ready to enable web-based
  // order tracking. Note: The code below is preserved for future use.
  // ============================================================================
  /*
  const orders: Order[] = [
    // Sample order data (preserved for future use)
    // ... full order list would be here
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      case "preparing": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "ready": return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "completed": return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
      case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmed";
      case "preparing": return "Preparing";
      case "ready": return "Ready for Pickup";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return "📋";
      case "preparing": return "👨‍🍳";
      case "ready": return "✅";
      case "completed": return "🎉";
      case "cancelled": return "❌";
      default: return "📦";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Handle "I'm Here" functionality with location sharing
  const handleImHere = async (orderId: string, restaurantAddress: string) => {
    // Location sharing logic...
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    // Geolocation logic...
  };

  const calculateETA = (userLat: number, userLng: number, restaurantAddress: string): number => {
    // ETA calculation logic...
  };

  const notifyRestaurant = async (orderId: string, locationData: any): Promise<void> => {
    // Restaurant notification logic...
  };

  const handleStartPickup = (orderId: string) => {
    setSelectedOrderForPickup(orderId);
    setPickupModalOpen(true);
  };

  const handlePickupConfirmation = async (confirmationData: any) => {
    // Pickup confirmation logic...
  };

  const getSelectedOrder = () => {
    if (!selectedOrderForPickup) return null;
    return orders.find(order => order.id === selectedOrderForPickup);
  };

  const filters = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "ready", label: "Ready", count: orders.filter(o => o.status === "ready").length },
    { id: "preparing", label: "Preparing", count: orders.filter(o => o.status === "preparing").length },
    { id: "completed", label: "Completed", count: orders.filter(o => o.status === "completed").length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        // Full order list UI would be rendered here
        // Including: Header, Stats, Filters, Order cards, Pickup modal
      </div>
    </div>
  );
  */
}
