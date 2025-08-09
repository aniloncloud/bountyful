"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SparklesIcon, GiftIcon, StarIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Bag {
  id: string;
  type: string;
  name: string;
  price: number;
  originalPrice: number;
  restaurant: string;
  cuisine: string;
  rating: number;
  available: number;
  timing: string;
  image: string;
  distance: string;
}

interface CrossSellRecommendationsProps {
  currentBag: any;
  restaurantId: string;
}

export function CrossSellRecommendations({ currentBag, restaurantId }: CrossSellRecommendationsProps) {
  const [selectedTab, setSelectedTab] = useState("nearby");
  const [recommendations, setRecommendations] = useState<Bag[]>([]);

  // Intelligent cross-sell algorithm
  useEffect(() => {
    const generateRecommendations = () => {
      const mockBags: Bag[] = [
        {
          id: "rec-1",
          type: "Fresh Experience",
          name: "Sushi Master Class",
          price: 18.99,
          originalPrice: 55.99,
          restaurant: "Sakura Sushi",
          cuisine: "Japanese",
          rating: 4.9,
          available: 3,
          timing: "Available 7-8pm",
          image: "/api/placeholder/300/200",
          distance: "0.5 km"
        },
        {
          id: "rec-2", 
          type: "Surplus Surprise",
          name: "Italian Dessert Box",
          price: 5.99,
          originalPrice: 16.99,
          restaurant: "Bella Vista Italian",
          cuisine: "Italian",
          rating: 4.8,
          available: 8,
          timing: "Available after 9:30pm",
          image: "/api/placeholder/300/200",
          distance: "0.3 km"
        },
        {
          id: "rec-3",
          type: "Fresh Experience", 
          name: "Farm-to-Table Cooking",
          price: 14.99,
          originalPrice: 42.99,
          restaurant: "Green Garden Cafe",
          cuisine: "Healthy",
          rating: 4.6,
          available: 5,
          timing: "Available 6-8pm",
          image: "/api/placeholder/300/200", 
          distance: "1.2 km"
        },
        {
          id: "rec-4",
          type: "Premium Experience",
          name: "BBQ Pit Master Session",
          price: 22.99,
          originalPrice: 68.99,
          restaurant: "Fire & Smoke BBQ",
          cuisine: "American", 
          rating: 4.7,
          available: 4,
          timing: "Available 5-7pm",
          image: "/api/placeholder/300/200",
          distance: "0.9 km"
        },
        {
          id: "rec-5",
          type: "Surplus Surprise",
          name: "French Bakery Selection",
          price: 4.99,
          originalPrice: 13.99,
          restaurant: "Le Petit Four",
          cuisine: "French",
          rating: 4.5,
          available: 12,
          timing: "Available after 8pm",
          image: "/api/placeholder/300/200",
          distance: "0.8 km"
        }
      ];

      // Smart filtering based on current bag
      let filtered = mockBags;

      if (selectedTab === "nearby") {
        filtered = mockBags.filter(bag => parseFloat(bag.distance) <= 1.0).slice(0, 4);
      } else if (selectedTab === "similar") {
        const isFresh = currentBag.type.includes("Fresh");
        filtered = mockBags.filter(bag => 
          bag.type.includes(isFresh ? "Fresh" : "Surplus") || 
          bag.type.includes("Premium")
        ).slice(0, 4);
      } else if (selectedTab === "complementary") {
        // Show different cuisine types for variety
        filtered = mockBags.filter(bag => bag.cuisine !== "Italian").slice(0, 4);
      } else if (selectedTab === "trending") {
        filtered = mockBags.sort((a, b) => b.rating - a.rating).slice(0, 4);
      }

      setRecommendations(filtered);
    };

    generateRecommendations();
  }, [selectedTab, currentBag]);

  const tabs = [
    { 
      id: "nearby", 
      label: "Nearby", 
      description: "More experiences within 1km",
      count: 4 
    },
    { 
      id: "similar", 
      label: "Similar", 
      description: "More fresh experiences like this",
      count: 3 
    },
    { 
      id: "complementary", 
      label: "Perfect Pairs", 
      description: "Great combinations for tonight",
      count: 5 
    },
    { 
      id: "trending", 
      label: "Trending", 
      description: "Most popular right now",
      count: 6 
    }
  ];

  const BagCard = ({ bag }: { bag: Bag }) => {
    const isFresh = bag.type.includes("Fresh") || bag.type.includes("Premium");
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-40">
          <Image
            src={bag.image}
            alt={bag.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${
              isFresh 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}>
              {isFresh ? <SparklesIcon className="h-3 w-3" /> : <GiftIcon className="h-3 w-3" />}
              {bag.type}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full">
            <StarIcon className="h-3 w-3 text-yellow-400" />
            <span className="text-xs text-white font-medium">{bag.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                {bag.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {bag.restaurant} • {bag.cuisine}
              </p>
            </div>
            <div className="text-right ml-2">
              <div className={`text-lg font-bold ${isFresh ? 'text-purple-600' : 'text-green-600'}`}>
                ${bag.price}
              </div>
              <div className="text-xs text-gray-500 line-through">
                ${bag.originalPrice}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
            <ClockIcon className="h-3 w-3" />
            <span>{bag.timing}</span>
            <span>•</span>
            <span>{bag.available} left</span>
            <span>•</span>
            <span>{bag.distance}</span>
          </div>

          <Link href={`/shop/restaurant/${bag.restaurant.toLowerCase().replace(/\s+/g, '-')}/bag/${bag.id}`}>
            <Button
              size="sm" 
              className={`w-full text-xs ${
                isFresh 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              }`}
            >
              {isFresh ? 'Book Experience' : 'Get Surprise'}
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Food Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Based on your selection, here are more amazing experiences you might love
        </p>
      </div>

      {/* Intelligent recommendations tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              selectedTab === tab.id
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <div>{tab.label}</div>
              <div className={`text-xs ${selectedTab === tab.id ? 'text-green-100' : 'text-gray-500'}`}>
                {tab.count} options
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tabs.find(tab => tab.id === selectedTab)?.description}
        </p>
      </div>

      {/* Recommendations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((bag) => (
          <BagCard key={bag.id} bag={bag} />
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No recommendations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try a different category to see more options.
          </p>
        </div>
      )}

      {/* Smart upsell banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-200 mb-2">
              🎯 Smart Combo: Save More, Experience More
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              Add one more experience to your order and save 15% on your total. Perfect for trying multiple cuisines tonight!
            </p>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">
                Save 15%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                On total when you add 1+ experience
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Apply Smart Combo
            </Button>
          </div>
        </div>
      </div>

      {/* Cross-sell success metrics */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">73%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Customers add 2+ experiences</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">$8.50</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Average additional savings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">4.9★</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Multi-experience rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}