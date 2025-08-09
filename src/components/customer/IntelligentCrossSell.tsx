"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  SparklesIcon, 
  PlusIcon, 
  XMarkIcon,
  ClockIcon,
  StarIcon,
  FireIcon
} from "@heroicons/react/24/outline";

interface CrossSellItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "appetizer" | "side" | "drink" | "dessert" | "experience";
  recommendationReason: string;
  timeRestriction?: string;
  rating?: number;
  quickPrep?: boolean;
}

interface IntelligentCrossSellProps {
  cartItems: Array<{
    id: string;
    name: string;
    restaurant: string;
    restaurantId: string;
    type: string;
    price: number;
  }>;
  restaurantId: string;
  currentTime: string; // e.g., "peak" | "slow" | "closing"
  onAddToCart: (item: CrossSellItem) => void;
  onClose?: () => void;
  isVisible?: boolean;
}

export function IntelligentCrossSell({
  cartItems,
  restaurantId,
  currentTime,
  onAddToCart,
  onClose,
  isVisible = true
}: IntelligentCrossSellProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentRecommendations, setCurrentRecommendations] = useState<CrossSellItem[]>([]);

  // Smart cross-sell recommendations based on context
  const crossSellDatabase: Record<string, CrossSellItem[]> = {
    "1": [ // Bella Vista Italian
      {
        id: "cs-1",
        name: "Garlic Bread Sticks",
        description: "Fresh-baked with herbs, perfect pasta pairing",
        price: 3.99,
        originalPrice: 5.99,
        image: "/api/placeholder/100/100",
        category: "side",
        recommendationReason: "Perfect with pasta dishes",
        rating: 4.7,
        quickPrep: true
      },
      {
        id: "cs-2", 
        name: "Chef's Wine Pairing",
        description: "Hand-selected wine to complement your meal",
        price: 8.99,
        image: "/api/placeholder/100/100",
        category: "drink",
        recommendationReason: "Enhances Italian flavors",
        timeRestriction: "Available during peak hours only",
        rating: 4.9
      },
      {
        id: "cs-3",
        name: "Live Pasta Making Demo",
        description: "Watch chef prepare fresh pasta + take home recipe",
        price: 4.99,
        originalPrice: 12.99,
        image: "/api/placeholder/100/100", 
        category: "experience",
        recommendationReason: "Peak hours special - chef interaction",
        timeRestriction: "Peak hours only (6-9 PM)",
        rating: 5.0
      },
      {
        id: "cs-4",
        name: "Tiramisu Cup",
        description: "House-made classic Italian dessert",
        price: 2.99,
        originalPrice: 6.99,
        image: "/api/placeholder/100/100",
        category: "dessert", 
        recommendationReason: "Complete your Italian experience",
        rating: 4.8
      }
    ],
    "2": [ // Sakura Sushi
      {
        id: "cs-5",
        name: "Miso Soup",
        description: "Traditional starter, perfect with sushi",
        price: 2.49,
        image: "/api/placeholder/100/100",
        category: "appetizer",
        recommendationReason: "Classic sushi pairing",
        quickPrep: true,
        rating: 4.6
      },
      {
        id: "cs-6",
        name: "Sake Tasting Flight",
        description: "3 premium sake samples with tasting notes",
        price: 12.99,
        image: "/api/placeholder/100/100",
        category: "drink",
        recommendationReason: "Enhance your omakase experience", 
        timeRestriction: "Available during dinner service",
        rating: 4.9
      }
    ]
  };

  useEffect(() => {
    generateRecommendations();
  }, [cartItems, currentTime, restaurantId]);

  const generateRecommendations = () => {
    const restaurantItems = crossSellDatabase[restaurantId] || [];
    let recommendations: CrossSellItem[] = [];

    // Algorithm 1: Complement analysis based on cart contents
    const hasMainDish = cartItems.some(item => item.type.includes("pasta") || item.type.includes("sushi"));
    const hasDrink = cartItems.some(item => item.name.toLowerCase().includes("drink") || item.name.toLowerCase().includes("wine"));
    
    // Algorithm 2: Time-based filtering
    const availableItems = restaurantItems.filter(item => {
      if (item.timeRestriction && currentTime === "slow") {
        return !item.timeRestriction.includes("peak");
      }
      return true;
    });

    // Algorithm 3: Smart pairing logic
    if (hasMainDish && !hasDrink) {
      // Prioritize drinks and sides
      recommendations.push(...availableItems.filter(item => 
        item.category === "drink" || item.category === "side"
      ));
    }

    // Algorithm 4: Experience upsells during peak hours
    if (currentTime === "peak") {
      recommendations.push(...availableItems.filter(item => 
        item.category === "experience"
      ));
    }

    // Algorithm 5: Dessert suggestions (always relevant)
    recommendations.push(...availableItems.filter(item => 
      item.category === "dessert" || item.category === "appetizer"
    ));

    // Algorithm 6: Remove duplicates and limit to top 3-4 recommendations
    const uniqueRecommendations = recommendations
      .filter((item, index, self) => self.findIndex(i => i.id === item.id) === index)
      .slice(0, 4);

    setCurrentRecommendations(uniqueRecommendations);
  };

  const handleAddItem = (item: CrossSellItem) => {
    setSelectedItems(prev => [...prev, item.id]);
    onAddToCart(item);
  };

  const calculateTotalSavings = () => {
    return currentRecommendations.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  if (!isVisible || currentRecommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Perfect Pairings
          </h3>
          {currentTime === "peak" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              <FireIcon className="h-3 w-3" />
              Peak Special
            </span>
          )}
        </div>
        
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Savings Banner */}
      {calculateTotalSavings() > 0 && (
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-green-800 dark:text-green-300 text-center">
            💰 Add all recommended items and save ${calculateTotalSavings().toFixed(2)}
          </div>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentRecommendations.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          
          return (
            <div 
              key={item.id} 
              className={`relative bg-white dark:bg-gray-800 rounded-lg p-4 border transition-all ${
                isSelected 
                  ? 'border-green-300 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-sm'
              }`}
            >
              
              {/* Quick Prep Badge */}
              {item.quickPrep && (
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  <ClockIcon className="h-3 w-3 inline mr-1" />
                  Quick
                </div>
              )}

              <div className="flex gap-3">
                {/* Item Image */}
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={64} 
                    height={64}
                    className="object-cover w-full h-full" 
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                  )}

                  {/* Recommendation Reason */}
                  <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
                    💡 {item.recommendationReason}
                  </div>

                  {/* Time Restriction */}
                  {item.timeRestriction && (
                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      ⏰ {item.timeRestriction}
                    </div>
                  )}

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAddItem(item)}
                      disabled={isSelected}
                      className={`${
                        isSelected 
                          ? 'bg-green-500 text-white cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      }`}
                    >
                      {isSelected ? (
                        '✓ Added'
                      ) : (
                        <>
                          <PlusIcon className="h-3 w-3 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Insights */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          🤖 Recommendations powered by AI • Based on popular pairings and current kitchen capacity
        </p>
      </div>
    </div>
  );
}