"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StarIcon, MapPinIcon, ClockIcon, HeartIcon, SparklesIcon, GiftIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

interface RestaurantGridProps {
  searchQuery: string;
  selectedCategory: string;
  selectedFilters: {
    bagType: string;
    priceRange: string;
    timing: string;
    cuisine: string;
    distance: string;
  };
}

export function RestaurantGrid({ searchQuery, selectedCategory, selectedFilters }: RestaurantGridProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Mock restaurant data - in real app this would come from API
  const restaurants = [
    {
      id: "1",
      name: "Bella Vista Italian",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 342,
      distance: "0.3 km",
      image: "/api/placeholder/400/300",
      freshBags: [
        {
          id: "fresh-1",
          type: "Fresh Experience",
          name: "Chef's Pasta Special",
          price: 12.99,
          originalPrice: 38.99,
          available: 5,
          timing: "Available 6-9pm",
          features: ["Chef interaction", "Cooking tips", "Recipe card"]
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
          features: ["3x value guarantee", "End-of-day fresh items"]
        }
      ],
      peakHours: "6pm-9pm",
      slowHours: "After 9:30pm",
      status: "peak" // peak, slow, closed
    },
    {
      id: "2",
      name: "Sakura Sushi",
      cuisine: "Japanese",
      rating: 4.9,
      reviewCount: 567,
      distance: "0.7 km",
      image: "/api/placeholder/400/300",
      freshBags: [
        {
          id: "fresh-2",
          type: "Premium Experience",
          name: "Omakase Tasting",
          price: 24.99,
          originalPrice: 75.00,
          available: 3,
          timing: "Available 7-8pm only",
          features: ["Master chef guidance", "Premium ingredients", "Technique tutorial"]
        }
      ],
      surplusBags: [
        {
          id: "surplus-2",
          type: "Surplus Surprise", 
          name: "Sushi Selection Box",
          price: 6.99,
          originalPrice: 19.99,
          available: 8,
          timing: "Available after 10pm",
          features: ["Fresh sushi & sashimi", "Guaranteed variety"]
        }
      ],
      peakHours: "7pm-9pm",
      slowHours: "After 10pm", 
      status: "peak"
    },
    {
      id: "3",
      name: "Green Garden Cafe",
      cuisine: "Healthy",
      rating: 4.6,
      reviewCount: 234,
      distance: "1.2 km",
      image: "/api/placeholder/400/300",
      freshBags: [],
      surplusBags: [
        {
          id: "surplus-3",
          type: "Surplus Surprise",
          name: "Healthy Bowl Mix",
          price: 3.99,
          originalPrice: 11.99,
          available: 15,
          timing: "Available now",
          features: ["Organic ingredients", "Nutritionist approved"]
        }
      ],
      peakHours: "12pm-2pm, 7pm-8pm",
      slowHours: "After 8pm",
      status: "slow"
    },
    {
      id: "4",
      name: "Fire & Smoke BBQ",
      cuisine: "American",
      rating: 4.7,
      reviewCount: 445,
      distance: "0.9 km", 
      image: "/api/placeholder/400/300",
      freshBags: [
        {
          id: "fresh-4",
          type: "Fresh Experience",
          name: "Pit Master's Choice",
          price: 16.99,
          originalPrice: 42.99,
          available: 7,
          timing: "Available 5-8pm",
          features: ["Smoking techniques", "Sauce recipes", "Behind-the-scenes tour"]
        }
      ],
      surplusBags: [
        {
          id: "surplus-4",
          type: "Surplus Surprise",
          name: "BBQ Family Pack", 
          price: 7.99,
          originalPrice: 22.99,
          available: 9,
          timing: "Available after 8:30pm",
          features: ["Mixed meats", "Sides included", "Feed 2-3 people"]
        }
      ],
      peakHours: "5pm-8pm",
      slowHours: "After 8:30pm",
      status: "peak"
    }
  ];

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      peak: { text: "Peak Hours", color: "bg-red-500", icon: "🔥" },
      slow: { text: "Available Now", color: "bg-green-500", icon: "✅" },
      closed: { text: "Closed", color: "bg-gray-500", icon: "🚫" }
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${badge.color}`}>
        <span>{badge.icon}</span>
        {badge.text}
      </span>
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!restaurant.name.toLowerCase().includes(query) &&
          !restaurant.cuisine.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Category filter  
    if (selectedCategory !== "all") {
      switch (selectedCategory) {
        case "fresh-experience":
          return restaurant.freshBags.length > 0;
        case "surplus-deals":
          return restaurant.surplusBags.length > 0;
        case "peak-available":
          return restaurant.status === "peak";
        case "chef-special":
          return restaurant.freshBags.some(bag => bag.type === "Premium Experience");
        case "near-you":
          return parseFloat(restaurant.distance) <= 1.0;
      }
    }

    // Bag type filter
    if (selectedFilters.bagType !== "all") {
      switch (selectedFilters.bagType) {
        case "fresh":
          return restaurant.freshBags.length > 0;
        case "surplus":
          return restaurant.surplusBags.length > 0;
        case "experience":
          return restaurant.freshBags.some(bag => bag.type === "Premium Experience");
      }
    }

    // Timing filter
    if (selectedFilters.timing !== "all") {
      switch (selectedFilters.timing) {
        case "now":
          return restaurant.status !== "closed";
        case "peak":
          return restaurant.status === "peak";
        case "slow":
          return restaurant.status === "slow";
      }
    }

    // Cuisine filter
    if (selectedFilters.cuisine !== "all") {
      return restaurant.cuisine.toLowerCase() === selectedFilters.cuisine;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredRestaurants.length} restaurants found
        </p>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700">
          <option>Sort by: Distance</option>
          <option>Sort by: Rating</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Availability</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            
            {/* Restaurant image and status */}
            <div className="relative h-48">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                {getStatusBadge(restaurant.status)}
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  {favorites.includes(restaurant.id) ? (
                    <HeartIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Restaurant info */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                    <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {restaurant.distance}
                  </span>
                  <span>•</span>
                  <span>{restaurant.cuisine}</span>
                </div>
              </div>

              {/* Bag options */}
              <div className="space-y-3">
                
                {/* Fresh Experience Bags */}
                {restaurant.freshBags.map((bag) => (
                  <div key={bag.id} className="border border-purple-200 rounded-xl p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <SparklesIcon className="h-5 w-5 text-purple-500" />
                        <span className="font-semibold text-purple-700 dark:text-purple-300">{bag.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">${bag.price}</div>
                        <div className="text-xs text-gray-500 line-through">${bag.originalPrice}</div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{bag.name}</h4>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <ClockIcon className="h-3 w-3" />
                      <span>{bag.timing}</span>
                      <span>•</span>
                      <span>{bag.available} available</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {bag.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/shop/restaurant/${restaurant.id}/bag/${bag.id}`}>
                      <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                        Book Experience
                      </Button>
                    </Link>
                  </div>
                ))}

                {/* Surplus Bags */}
                {restaurant.surplusBags.map((bag) => (
                  <div key={bag.id} className="border border-green-200 rounded-xl p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <GiftIcon className="h-5 w-5 text-green-500" />
                        <span className="font-semibold text-green-700 dark:text-green-300">{bag.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">${bag.price}</div>
                        <div className="text-xs text-gray-500 line-through">${bag.originalPrice}</div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{bag.name}</h4>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <ClockIcon className="h-3 w-3" />
                      <span>{bag.timing}</span>
                      <span>•</span>
                      <span>{bag.available} available</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {bag.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/shop/restaurant/${restaurant.id}/bag/${bag.id}`}>
                      <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90">
                        Get Surprise
                      </Button>
                    </Link>
                  </div>
                ))}
                
                {restaurant.freshBags.length === 0 && restaurant.surplusBags.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No bags currently available
                  </div>
                )}
              </div>

              {/* View restaurant */}
              <Link href={`/shop/restaurant/${restaurant.id}`} className="block mt-4">
                <Button variant="outline" className="w-full">
                  View Restaurant Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filters or search query
          </p>
          <Button variant="outline">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}