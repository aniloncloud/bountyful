"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, SparklesIcon, GiftIcon, CheckIcon, ClockIcon, MapPinIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { CrossSellRecommendations } from "@/components/customer/CrossSellRecommendations";
import { ExperienceAddOns } from "@/components/customer/ExperienceAddOns";

interface BagDetailPageProps {
  params: Promise<{ id: string; bagId: string }>;
}

export default function BagDetailPage({ params }: BagDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Mock data - would come from API in real app
  const [bag] = useState({
    id: "fresh-1",
    type: "Fresh Experience",
    name: "Chef's Pasta Special",
    price: 12.99,
    originalPrice: 38.99,
    available: 5,
    timing: "Available 6-9pm",
    description: "Watch our head chef Marco prepare fresh pasta using traditional Italian techniques passed down through three generations. Learn the secrets of perfect al dente texture, authentic sauce preparation, and plating presentation.",
    features: [
      "30-minute chef interaction session",
      "Learn traditional pasta-making techniques", 
      "Take home printed recipe card with chef's notes",
      "Behind-the-scenes kitchen access",
      "Professional plating demonstration",
      "Small batch ingredients tasting"
    ],
    dietaryInfo: ["Vegetarian options available", "Gluten-free pasta available", "Contains dairy and eggs"],
    estimatedPickup: "20-30 minutes",
    images: ["/api/placeholder/600/400", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    restaurant: {
      name: "Bella Vista Italian",
      address: "123 Main Street, San Francisco",
      distance: "0.3 km"
    },
    sustainability: {
      co2Prevented: 2.3,
      waterSaved: 15,
      wastePrevented: 0.8
    },
    experience: {
      duration: "30-45 minutes",
      maxParticipants: 6,
      currentBookings: 3,
      chefName: "Chef Marco Rossi",
      chefBio: "Third-generation Italian chef specializing in regional pasta traditions from Emilia-Romagna."
    }
  });

  const isFreshExperience = bag.type.includes("Fresh") || bag.type.includes("Premium");

  useEffect(() => {
    const basePrice = bag.price * quantity;
    const addOnPrice = selectedAddOns.reduce((sum, addonId) => {
      // Mock addon prices - would come from API
      const addonPrices: {[key: string]: number} = {
        'wine-pairing': 8.99,
        'recipe-book': 4.99,
        'ingredient-kit': 12.99,
        'video-recording': 6.99
      };
      return sum + (addonPrices[addonId] || 0);
    }, 0);
    setTotalPrice(basePrice + addOnPrice);
  }, [quantity, selectedAddOns, bag.price]);

  const addToCart = () => {
    // Implementation for adding to cart
    console.log("Adding to cart:", {
      bagId: bag.id,
      quantity,
      addOns: selectedAddOns,
      totalPrice
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/shop/restaurant/1" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to {bag.restaurant.name}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={bag.images[0]}
                  alt={bag.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium ${
                    isFreshExperience 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                    {isFreshExperience ? <SparklesIcon className="h-4 w-4" /> : <GiftIcon className="h-4 w-4" />}
                    {bag.type}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {bag.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`${bag.name} ${index + 2}`}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bag details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {bag.name}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{bag.timing}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{bag.restaurant.distance}</span>
                </div>
                <span>•</span>
                <span className="font-medium text-green-600">
                  {bag.available} available
                </span>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {bag.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bag.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className={`h-5 w-5 mt-0.5 ${isFreshExperience ? 'text-purple-500' : 'text-green-500'} flex-shrink-0`} />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience details */}
              {isFreshExperience && (
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-purple-500" />
                    Experience Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Chef Information</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>{bag.experience.chefName}</strong>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bag.experience.chefBio}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{bag.experience.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Group Size:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {bag.experience.currentBookings}/{bag.experience.maxParticipants} booked
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Pickup Time:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{bag.estimatedPickup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dietary information */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <InformationCircleIcon className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Dietary Information</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bag.dietaryInfo.map((info, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                      {info}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sustainability impact */}
              <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200">
                <h3 className="font-semibold text-lg mb-4 text-green-800 dark:text-green-200">
                  🌱 Environmental Impact
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{bag.sustainability.co2Prevented}kg</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Prevented</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{bag.sustainability.waterSaved}L</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{bag.sustainability.wastePrevented}kg</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Waste Prevented</div>
                  </div>
                </div>
              </div>

              {/* Experience add-ons */}
              {isFreshExperience && (
                <ExperienceAddOns 
                  selectedAddOns={selectedAddOns}
                  setSelectedAddOns={setSelectedAddOns}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Booking card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className={`text-3xl font-bold ${isFreshExperience ? 'text-purple-600' : 'text-green-600'}`}>
                      ${bag.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">${bag.originalPrice}</div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(bag.originalPrice - bag.price).toFixed(2)} ({Math.round((1 - bag.price / bag.originalPrice) * 100)}% off)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
                    <div className="text-lg font-semibold">{bag.available} left</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(bag.available, quantity + 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add-ons:</div>
                      <div className="space-y-1">
                        {selectedAddOns.map((addonId) => (
                          <div key={addonId} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{addonId}</span>
                            <span>+$8.99</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className={`w-full ${
                      isFreshExperience 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    }`}
                    onClick={addToCart}
                  >
                    {isFreshExperience ? 'Book Experience' : 'Get Surprise'} - ${totalPrice.toFixed(2)}
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    Add to Cart
                  </Button>
                </div>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  🔒 Secure payment • 📱 Pickup instructions via SMS
                </div>
              </div>

              {/* Restaurant info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-lg mb-4">Pickup Location</h3>
                <div className="space-y-3">
                  <div className="font-medium">{bag.restaurant.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{bag.restaurant.address}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="h-4 w-4 text-green-500" />
                    <span>{bag.restaurant.distance}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
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

        {/* Cross-sell recommendations */}
        <div className="mt-16">
          <CrossSellRecommendations 
            currentBag={bag}
            restaurantId={bag.restaurant.name}
          />
        </div>
      </div>
    </div>
  );
}