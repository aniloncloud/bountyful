"use client";

import { useState, useEffect } from "react";
import { SparklesIcon, GiftIcon } from "@heroicons/react/24/solid";

export function CustomerHero() {
  const [currentBagType, setCurrentBagType] = useState(0);

  const bagTypes = [
    {
      type: "Fresh Experience",
      icon: "✨",
      price: "$12.99",
      originalPrice: "$39.99",
      description: "Chef-crafted fresh dishes + cooking tips",
      gradient: "from-purple-500 to-blue-500",
      bgGradient: "from-purple-50 to-blue-50",
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
      timing: "Available during slow hours"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBagType(prev => (prev + 1) % bagTypes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bagTypes.length]);

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
                <span className="text-sm font-medium text-gray-500 italic">
                  Save {Math.round((1 - parseFloat(currentBag.price.replace('$', '')) / parseFloat(currentBag.originalPrice.replace('$', ''))) * 100)}% on every order
                </span>
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

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <SparklesIcon className="h-8 w-8 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Fresh Experiences</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Peak hours: Chef-crafted dishes with cooking tips and stories
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <GiftIcon className="h-8 w-8 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Surplus Surprises</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Slow hours: Mystery bags with 3x value from end-of-day surplus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
