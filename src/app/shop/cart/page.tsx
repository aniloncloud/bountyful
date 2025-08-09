"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrashIcon, MinusIcon, PlusIcon, SparklesIcon, GiftIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { IntelligentCrossSell } from "@/components/customer/IntelligentCrossSell";

interface CartItem {
  id: string;
  bagId: string;
  bagName: string;
  bagType: string;
  restaurant: string;
  restaurantId: string;
  price: number;
  originalPrice: number;
  quantity: number;
  timing: string;
  image: string;
  addOns: { id: string; name: string; price: number }[];
  pickupTime: string;
  distance: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-1",
      bagId: "fresh-1", 
      bagName: "Chef's Pasta Special",
      bagType: "Fresh Experience",
      restaurant: "Bella Vista Italian",
      restaurantId: "1",
      price: 12.99,
      originalPrice: 38.99,
      quantity: 1,
      timing: "Available 6-9pm",
      image: "/api/placeholder/400/300",
      addOns: [
        { id: "wine-pairing", name: "Wine Pairing Experience", price: 8.99 }
      ],
      pickupTime: "Today, 7:30 PM",
      distance: "0.3 km"
    },
    {
      id: "cart-2",
      bagId: "surplus-2",
      bagName: "Sushi Selection Box", 
      bagType: "Surplus Surprise",
      restaurant: "Sakura Sushi",
      restaurantId: "2",
      price: 6.99,
      originalPrice: 19.99,
      quantity: 2,
      timing: "Available after 10pm",
      image: "/api/placeholder/400/300",
      addOns: [],
      pickupTime: "Today, 10:15 PM", 
      distance: "0.7 km"
    }
  ]);
  
  const [showCrossSell, setShowCrossSell] = useState(true);
  const [currentTime] = useState<string>("peak"); // In real app, would determine based on actual time

  const handleCrossSellAdd = (crossSellItem: any) => {
    // Add cross-sell item as a new cart item
    const newCartItem: CartItem = {
      id: `cross-${Date.now()}`,
      bagId: crossSellItem.id,
      bagName: crossSellItem.name,
      bagType: crossSellItem.category,
      restaurant: cartItems[0]?.restaurant || "Restaurant",
      restaurantId: cartItems[0]?.restaurantId || "1",
      price: crossSellItem.price,
      originalPrice: crossSellItem.originalPrice || crossSellItem.price,
      quantity: 1,
      timing: crossSellItem.timeRestriction || "Available now",
      image: crossSellItem.image,
      addOns: [],
      pickupTime: cartItems[0]?.pickupTime || "Today",
      distance: cartItems[0]?.distance || "0.5 km"
    };
    
    setCartItems(prev => [...prev, newCartItem]);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const getItemTotal = (item: CartItem) => {
    const bagTotal = item.price * item.quantity;
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0) * item.quantity;
    return bagTotal + addOnsTotal;
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  };

  const getOriginalTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.originalPrice * item.quantity) + (item.addOns.reduce((addOnSum, addon) => addOnSum + addon.price * 2, 0) * item.quantity);
    }, 0);
  };

  const getTotalSavings = () => {
    return getOriginalTotal() - getSubtotal();
  };

  const getServiceFee = () => {
    return getSubtotal() * 0.05; // 5% service fee
  };

  const getDeliveryFee = () => {
    return 0; // Free pickup
  };

  const getTotal = () => {
    return getSubtotal() + getServiceFee() + getDeliveryFee();
  };

  const hasFreshExperiences = cartItems.some(item => 
    item.bagType.includes("Fresh") || item.bagType.includes("Premium")
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Continue shopping</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Cart ({cartItems.length} items)
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {cartItems.length === 0 ? (
          // Empty cart state
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Discover amazing fresh experiences and surplus surprises from local restaurants
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Peak hours warning */}
              {hasFreshExperiences && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                        Peak Hours Experience Notice
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Your cart contains fresh experiences. Please arrive on time for the best chef interaction experience. Peak hours fill up quickly!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Intelligent Cross-Sell Recommendations */}
              {cartItems.length > 0 && (
                <IntelligentCrossSell
                  cartItems={cartItems.map(item => ({
                    id: item.id,
                    name: item.bagName,
                    restaurant: item.restaurant,
                    restaurantId: item.restaurantId,
                    type: item.bagType,
                    price: item.price
                  }))}
                  restaurantId={cartItems[0]?.restaurantId || "1"}
                  currentTime={currentTime}
                  onAddToCart={handleCrossSellAdd}
                  isVisible={showCrossSell}
                  onClose={() => setShowCrossSell(false)}
                />
              )}

              {/* Cart items list */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const isFresh = item.bagType.includes("Fresh") || item.bagType.includes("Premium");
                  
                  return (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                      <div className="flex gap-4">
                        
                        {/* Item image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.bagName}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1 left-1">
                            {isFresh ? (
                              <SparklesIcon className="h-4 w-4 text-purple-500" />
                            ) : (
                              <GiftIcon className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>

                        {/* Item details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {item.bagName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.restaurant} • {item.bagType}
                              </p>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Timing and location */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              <span>{item.pickupTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-3 w-3" />
                              <span>{item.distance}</span>
                            </div>
                          </div>

                          {/* Add-ons */}
                          {item.addOns.length > 0 && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add-ons:</div>
                              {item.addOns.map((addon) => (
                                <div key={addon.id} className="text-xs text-gray-600 dark:text-gray-400">
                                  • {addon.name} (+${addon.price})
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Price and quantity */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                <MinusIcon className="h-4 w-4" />
                              </button>
                              
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                ${getItemTotal(item).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue shopping */}
              <div className="text-center pt-6">
                <Link href="/shop">
                  <Button variant="outline" size="lg">
                    Add More Items
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                
                {/* Summary card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service fee (5%)</span>
                      <span className="font-medium">${getServiceFee().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Pickup</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span className="font-medium">-${getTotalSavings().toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-xl text-green-600">
                          ${getTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/shop/checkout">
                    <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                    🔒 Secure checkout • 📱 SMS pickup notifications
                  </div>
                </div>

                {/* Savings highlight */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ${getTotalSavings().toFixed(2)}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                      Total Savings
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {Math.round((getTotalSavings() / getOriginalTotal()) * 100)}% off original prices
                    </div>
                  </div>
                </div>

                {/* Environmental impact */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    🌱 Your Environmental Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">4.2kg</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">CO₂ Prevented</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">1.5kg</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Waste Reduced</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}