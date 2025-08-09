"use client";

import { siteConfig } from "@/config/site";

export function CompetitiveComparison() {
  const features = [
    {
      category: "Revenue Optimization",
      items: [
        { feature: "Peak Hour Revenue Amplification", us: true, competitors: false, description: "Turn busy hours into premium revenue with fresh experiences" },
        { feature: "AI-Powered Cross-Selling", us: true, competitors: false, description: "40%+ order value increase through smart recommendations" },
        { feature: "Dynamic Pricing Intelligence", us: true, competitors: "basic", description: "Real-time price optimization based on demand" },
        { feature: "Hybrid Magic Bag System", us: true, competitors: false, description: "Premium + surplus experiences for all-day revenue" }
      ]
    },
    {
      category: "Customer Experience", 
      items: [
        { feature: "I'm Here Notifications", us: true, competitors: false, description: "Smart arrival notifications with ETA tracking" },
        { feature: "CSAT-Optimized Pickup", us: true, competitors: "basic", description: "Ultra-simple confirmation vs complex systems" },
        { feature: "Checkout Cross-Selling", us: true, competitors: false, description: "Perfect-timing upsells at payment moment" },
        { feature: "Peak Experience Discovery", us: true, competitors: false, description: "Find unique chef experiences during peak hours" }
      ]
    },
    {
      category: "Business Intelligence",
      items: [
        { feature: "Revenue Analytics Dashboard", us: true, competitors: "basic", description: "360° view of all revenue streams and optimization" },
        { feature: "Cross-Sell Performance Tracking", us: true, competitors: false, description: "Deep analytics on what drives additional revenue" },
        { feature: "Peak Hour Optimization", us: true, competitors: false, description: "Monitor and maximize busy period revenue" },
        { feature: "Customer Lifetime Value", us: true, competitors: "basic", description: "Track retention and repeat purchase patterns" }
      ]
    },
    {
      category: "AI & Automation",
      items: [
        { feature: "Smart Timing Intelligence", us: true, competitors: false, description: "Learn each restaurant's unique peak/slow patterns" },
        { feature: "Predictive Waste Analytics", us: true, competitors: "basic", description: "Forecast demand to prevent waste before it happens" },
        { feature: "AI Content Curation", us: true, competitors: false, description: "Automatically create perfect surprise bag combinations" },
        { feature: "Dynamic Menu Optimization", us: true, competitors: false, description: "Real-time menu adjustments based on capacity" }
      ]
    }
  ];

  const getStatusIcon = (status: boolean | string) => {
    if (status === true) {
      return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>;
    } else if (status === "basic") {
      return <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      </div>;
    } else {
      return <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>;
    }
  };

  const getStatusText = (status: boolean | string) => {
    if (status === true) return "Full Feature";
    if (status === "basic") return "Basic";
    return "Not Available";
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.1)_1px,transparent_0)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-medium text-orange-800 dark:from-orange-900/20 dark:to-red-900/20 dark:text-orange-300 mb-6">
            ⚡ Platform Comparison
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Why Choose Our Platform?
            </span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            See how we go beyond traditional food waste apps to become a complete revenue amplification platform
          </p>
        </div>

        {/* Comparison header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          
          {/* Platform headers */}
          <div className="grid grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Features</h3>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-4 py-3 mb-2">
                <div className="font-bold text-lg">{siteConfig.shortName}</div>
                <div className="text-xs opacity-90">Complete Platform</div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Revenue Amplification
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl px-4 py-3 mb-2">
                <div className="font-bold text-lg">Competitors</div>
                <div className="text-xs opacity-90">Traditional Apps</div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Waste Focus Only
              </div>
            </div>
          </div>

          {/* Feature comparison by category */}
          <div className="space-y-12">
            {features.map((category) => (
              <div key={category.category}>
                
                {/* Category header */}
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.category}
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Category features */}
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.feature} className="grid grid-cols-3 gap-8 items-center py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      
                      {/* Feature name */}
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.feature}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </div>
                      </div>

                      {/* Good2Go status */}
                      <div className="flex flex-col items-center">
                        {getStatusIcon(item.us)}
                        <div className="text-xs text-center mt-2 font-medium text-green-600">
                          {getStatusText(item.us)}
                        </div>
                      </div>

                      {/* Competitors status */}
                      <div className="flex flex-col items-center">
                        {getStatusIcon(item.competitors)}
                        <div className={`text-xs text-center mt-2 font-medium ${
                          item.competitors === true ? 'text-green-600' : 
                          item.competitors === 'basic' ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          {getStatusText(item.competitors)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key differentiators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Key Advantages
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">Peak Hour Revenue</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Only platform that amplifies revenue during BOTH peak and slow periods
                </p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">40%+ Cross-Sell Rate</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered recommendations that significantly increase order values
                </p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🤖</div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">Complete AI Suite</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From pricing to predictions, AI optimizes every aspect of your revenue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">The Clear Choice</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              While others focus on waste reduction, we transform your entire revenue model. 
              Get the only platform that amplifies earnings during ALL hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">12</div>
                <div className="text-lg opacity-90">Exclusive Features</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-300 mb-2">+47%</div>
                <div className="text-lg opacity-90">Average Revenue Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300 mb-2">24-48h</div>
                <div className="text-lg opacity-90">Implementation Time</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}