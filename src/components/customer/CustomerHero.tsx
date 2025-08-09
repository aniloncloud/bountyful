"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPinIcon, SparklesIcon, GiftIcon } from "@heroicons/react/24/solid";

export function CustomerHero() {
  const [currentBagType, setCurrentBagType] = useState(0);
  const [mealsAvailable, setMealsAvailable] = useState(1247);
  const [location, setLocation] = useState("San Francisco");

  const bagTypes = [
    {
      type: "Fresh Experience",
      icon: "✨",
      price: "$12.99",
      originalPrice: "$39.99",
      description: "Chef-crafted fresh dishes + cooking tips",
      gradient: "from-purple-500 to-blue-500",
      bgGradient: "from-purple-50 to-blue-50",
      available: "47 available near you",
      timing: "Available during peak hours"
    },
    {
      type: "Surplus Surprise",
      icon: "🎁", 
      price: "$4.99",
      originalPrice: "$14.99",
      description: "End-of-day surprises with 3x value",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      available: "89 available near you",
      timing: "Available during slow hours"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBagType(prev => (prev + 1) % bagTypes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bagTypes.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMealsAvailable(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentBag = bagTypes[currentBagType];

  return (
    <section className={`relative py-16 bg-gradient-to-br ${currentBag.bgGradient} dark:from-gray-900 dark:to-gray-800 transition-all duration-1000`}>
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-bounce delay-1000">
          <span className="text-3xl opacity-30">🍽️</span>
        </div>
        <div className="absolute top-32 right-[15%] animate-bounce delay-2000">
          <span className="text-3xl opacity-30">👨‍🍳</span>
        </div>
        <div className="absolute bottom-40 left-[20%] animate-bounce delay-500">
          <span className="text-3xl opacity-30">🥘</span>
        </div>
        <div className="absolute bottom-32 right-[25%] animate-bounce delay-3000">
          <span className="text-3xl opacity-30">✨</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-sm font-medium text-gray-700 shadow-sm mb-6">
            <MapPinIcon className="h-4 w-4 text-green-600" />
            <span>{mealsAvailable.toLocaleString()} meals available in {location}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-gray-900 dark:text-white">Fresh Experiences</span>
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              + Surplus Surprises
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get premium fresh dishes during peak hours OR surprise bags during slow periods. 
            <span className="font-semibold text-green-700 dark:text-green-400"> Your choice, your savings, your impact.</span>
          </p>
        </div>

        {/* Bag showcase */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className={`relative rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden transform transition-all duration-1000 ${currentBagType === 0 ? 'scale-105' : 'scale-100'}`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${currentBag.gradient} opacity-10`}></div>
            
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentBag.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentBag.type}</h3>
                    <p className="text-sm text-gray-600">{currentBag.timing}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${currentBag.gradient} bg-clip-text text-transparent`}>
                    {currentBag.price}
                  </div>
                  <div className="text-sm text-gray-500 line-through">{currentBag.originalPrice}</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{currentBag.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">{currentBag.available}</span>
                <Button className={`bg-gradient-to-r ${currentBag.gradient} text-white hover:opacity-90 transition-opacity`}>
                  {currentBagType === 0 ? (
                    <>
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Book Experience
                    </>
                  ) : (
                    <>
                      <GiftIcon className="h-4 w-4 mr-2" />
                      Get Surprise
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Type indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {bagTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBagType(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentBagType 
                    ? `bg-gradient-to-r ${bagTypes[index].gradient}` 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Fresh Experiences
          </Button>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
          >
            <GiftIcon className="h-5 w-5 mr-2" />
            Surplus Surprises
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white/50 text-gray-700 hover:bg-white/20"
          >
            <MapPinIcon className="h-5 w-5 mr-2" />
            Nearby
          </Button>
        </div>
      </div>
    </section>
  );
}