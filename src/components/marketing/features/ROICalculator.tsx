"use client";

import { useState } from "react";

export function ROICalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(150);
  const [averageOrderValue, setAverageOrderValue] = useState(25);
  const [peakHours, setPeakHours] = useState(6);
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    // Base revenue
    const baseMonthlyRevenue = monthlyOrders * averageOrderValue;
    
    // Cross-sell impact (40% rate, +$8 average)
    const crossSellRevenue = monthlyOrders * 0.40 * 8;
    
    // Peak hour amplification (additional 25% orders during peak)
    const peakAmplification = (peakHours / 12) * baseMonthlyRevenue * 0.25;
    
    // AI pricing optimization (8% revenue increase)
    const pricingOptimization = baseMonthlyRevenue * 0.08;
    
    // Magic bag premium (20% of orders become premium +$12)
    const premiumUpgrades = monthlyOrders * 0.20 * 12;
    
    const totalIncrease = crossSellRevenue + peakAmplification + pricingOptimization + premiumUpgrades;
    const annualIncrease = totalIncrease * 12;
    
    setResults({
      baseRevenue: baseMonthlyRevenue,
      crossSellRevenue,
      peakAmplification,
      pricingOptimization,
      premiumUpgrades,
      totalMonthlyIncrease: totalIncrease,
      annualIncrease,
      percentageIncrease: ((totalIncrease / baseMonthlyRevenue) * 100).toFixed(1)
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.1)_1px,transparent_0)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-300 mb-6">
            💰 Revenue Calculator
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Calculate Your Revenue Boost
            </span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            See exactly how much additional revenue our platform can generate for your restaurant
          </p>
        </div>

        {/* Calculator */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Input form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Your Restaurant Details</h3>
            
            <div className="space-y-6">
              
              {/* Monthly orders */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Orders (Average)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50</span>
                    <span className="font-semibold text-blue-600">{monthlyOrders}</span>
                    <span>500+</span>
                  </div>
                </div>
              </div>

              {/* Average order value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Average Order Value ($)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$10</span>
                    <span className="font-semibold text-blue-600">${averageOrderValue}</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>

              {/* Peak hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peak Hours per Day
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={peakHours}
                    onChange={(e) => setPeakHours(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2h</span>
                    <span className="font-semibold text-blue-600">{peakHours}h</span>
                    <span>12h</span>
                  </div>
                </div>
              </div>

              {/* Calculate button */}
              <button
                onClick={calculateROI}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Calculate Revenue Boost 🚀
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800/50">
            
            {!results ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Revenue Projection
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adjust the sliders and click calculate to see your potential revenue increase
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Main result */}
                <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Monthly Increase</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    +${results.totalMonthlyIncrease.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{results.percentageIncrease}%</span> revenue increase
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    ${results.annualIncrease.toLocaleString()} annually
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Revenue Sources:</h4>
                  
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span className="text-sm font-medium">Cross-Selling</span>
                    </div>
                    <span className="font-semibold text-green-600">+${results.crossSellRevenue.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span>🔥</span>
                      <span className="text-sm font-medium">Peak Hour Boost</span>
                    </div>
                    <span className="font-semibold text-green-600">+${results.peakAmplification.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span>🤖</span>
                      <span className="text-sm font-medium">AI Pricing</span>
                    </div>
                    <span className="font-semibold text-green-600">+${results.pricingOptimization.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="text-sm font-medium">Premium Experiences</span>
                    </div>
                    <span className="font-semibold text-green-600">+${results.premiumUpgrades.toFixed(0)}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Get Started - Unlock This Revenue
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Implementation typically takes 24-48 hours</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Based on real data from 200+ restaurants using our platform
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium">Average Results:</div>
            <div className="text-sm">📈 +47% Revenue</div>
            <div className="text-sm">⭐ 4.9/5 Satisfaction</div>
            <div className="text-sm">🚀 85% Retention</div>
          </div>
        </div>
      </div>
    </section>
  );
}