"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, GlobeAltIcon, HeartIcon, ShareIcon, SparklesIcon, GiftIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BagSelector } from "@/components/customer/BagSelector";
import { ReviewsSection } from "@/components/customer/ReviewsSection";

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState("bags");
  const [restaurant] = useState({
    id: "1",
    name: "Bella Vista Italian",
    cuisine: "Italian",
    description: "Family-owned authentic Italian restaurant serving fresh pasta, wood-fired pizzas, and traditional recipes passed down through generations.",
    rating: 4.8,
    reviewCount: 342,
    priceRange: "$$",
    distance: "0.3 km",
    address: "123 Main Street, San Francisco, CA",
    phone: "+1 (555) 123-4567",
    website: "https://bellavista.com",
    hours: {
      monday: "5:00 PM - 10:00 PM",
      tuesday: "5:00 PM - 10:00 PM", 
      wednesday: "5:00 PM - 10:00 PM",
      thursday: "5:00 PM - 10:00 PM",
      friday: "5:00 PM - 11:00 PM",
      saturday: "4:00 PM - 11:00 PM",
      sunday: "4:00 PM - 10:00 PM"
    },
    images: ["/api/placeholder/800/600", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    peakHours: "6:00 PM - 9:00 PM",
    slowHours: "After 9:30 PM",
    status: "peak",
    freshBags: [
      {
        id: "fresh-1",
        type: "Fresh Experience",
        name: "Chef's Pasta Special",
        price: 12.99,
        originalPrice: 38.99,
        available: 5,
        timing: "Available 6-9pm",
        description: "Watch our head chef prepare fresh pasta with seasonal ingredients, learn traditional techniques, and take home a recipe card.",
        features: ["Chef interaction", "Cooking tips", "Recipe card", "Behind-the-scenes access"],
        dietaryInfo: ["Vegetarian options available", "Gluten-free pasta available"],
        estimatedPickup: "20-30 minutes"
      }
    ],
    surplusBags: [
      {
        id: "surplus-1",
        type: "Surplus Surprise", 
        name: "Italian Surprise Box",
        price: 4.99,
        originalPrice: 14.99,
        available: 12,
        timing: "Available after 9:30pm",
        description: "A mystery selection of our day's fresh Italian specialties. Could include pasta dishes, appetizers, desserts, and bread.",
        features: ["3x value guarantee", "End-of-day fresh items", "Variety of dishes"],
        dietaryInfo: ["Contains dairy", "May contain nuts", "Some vegetarian options"],
        estimatedPickup: "10-15 minutes"
      }
    ],
    sustainability: {
      co2Saved: 2.1,
      mealsRescued: 847,
      wastereduced: "89%"
    }
  });

  const tabs = [
    { id: "bags", label: "Bags", count: restaurant.freshBags.length + restaurant.surplusBags.length },
    { id: "about", label: "About", count: null },
    { id: "reviews", label: "Reviews", count: restaurant.reviewCount },
    { id: "photos", label: "Photos", count: restaurant.images.length }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to restaurants</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {isFavorite ? (
                  <HeartIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <ShareIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src={restaurant.images[0]}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  restaurant.status === 'peak' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {restaurant.status === 'peak' ? '🔥 Peak Hours' : '✅ Available Now'}
                </span>
              </div>
            </div>

            {/* Restaurant info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {restaurant.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span>({restaurant.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{restaurant.distance}</span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-500" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="h-4 w-4 text-gray-500" />
                  <a href={restaurant.website} className="text-green-600 hover:text-green-700">
                    Website
                  </a>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div>
              {selectedTab === "bags" && (
                <BagSelector 
                  freshBags={restaurant.freshBags}
                  surplusBags={restaurant.surplusBags}
                  restaurantId={restaurant.id}
                />
              )}

              {selectedTab === "about" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(restaurant.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                          <span className="capitalize font-medium">{day}</span>
                          <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Peak & Surplus Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <SparklesIcon className="h-5 w-5 text-red-500" />
                          <span className="font-medium text-red-700 dark:text-red-300">Peak Hours (Fresh Experiences)</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">{restaurant.peakHours}</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <GiftIcon className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-700 dark:text-green-300">Surplus Hours (Surprise Bags)</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">{restaurant.slowHours}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Sustainability Impact</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">{restaurant.sustainability.co2Saved}kg</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">{restaurant.sustainability.mealsRescued}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Meals Rescued</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">{restaurant.sustainability.wastereduced}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Waste Reduced</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "reviews" && (
                <ReviewsSection restaurantId={restaurant.id} />
              )}

              {selectedTab === "photos" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {restaurant.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${restaurant.name} photo ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Quick booking card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Book</h3>
                
                {restaurant.status === 'peak' && restaurant.freshBags.length > 0 && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <SparklesIcon className="h-5 w-5 text-purple-500" />
                      <span className="font-medium text-purple-700 dark:text-purple-300">Available Now</span>
                    </div>
                    <h4 className="font-medium mb-1">{restaurant.freshBags[0].name}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-purple-600">${restaurant.freshBags[0].price}</span>
                      <span className="text-sm text-gray-500 line-through">${restaurant.freshBags[0].originalPrice}</span>
                    </div>
                    <Link href={`/shop/restaurant/${restaurant.id}/bag/${restaurant.freshBags[0].id}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                        Book Experience
                      </Button>
                    </Link>
                  </div>
                )}

                {restaurant.surplusBags.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <GiftIcon className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-700 dark:text-green-300">Surprise Available</span>
                    </div>
                    <h4 className="font-medium mb-1">{restaurant.surplusBags[0].name}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">${restaurant.surplusBags[0].price}</span>
                      <span className="text-sm text-gray-500 line-through">${restaurant.surplusBags[0].originalPrice}</span>
                    </div>
                    <Link href={`/shop/restaurant/${restaurant.id}/bag/${restaurant.surplusBags[0].id}`}>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                        Get Surprise
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Location card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Map View</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{restaurant.address}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Directions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}