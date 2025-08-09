"use client";

import { useState } from "react";

export function FeatureCategories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: "ai-intelligence",
      icon: "🤖",
      title: "AI & Intelligence",
      subtitle: "Smart automation for maximum efficiency",
      color: "from-blue-500 to-purple-500",
      features: [
        {
          name: "Dynamic AI Pricing",
          description: "Real-time price optimization based on demand, inventory, and customer behavior",
          benefit: "+15% revenue through smart pricing",
          details: ["Surge pricing during peak hours", "Clearance pricing for surplus", "Customer willingness-to-pay analysis", "Competitor price monitoring"]
        },
        {
          name: "Predictive Analytics",
          description: "Forecast demand, optimize inventory, and prevent waste before it happens",
          benefit: "68% waste reduction accuracy",
          details: ["7-day demand forecasting", "Weather impact analysis", "Event-based predictions", "Seasonal trend identification"]
        },
        {
          name: "Smart Timing Intelligence", 
          description: "Learn each restaurant's unique patterns for optimal revenue timing",
          benefit: "40% more peak hour orders",
          details: ["Restaurant-specific optimization", "Peak/slow period identification", "Staff capacity correlation", "Customer behavior learning"]
        }
      ]
    },
    {
      id: "revenue-optimization",
      icon: "💰",
      title: "Revenue Optimization",
      subtitle: "Transform every hour into profit",
      color: "from-green-500 to-emerald-500",
      features: [
        {
          name: "Intelligent Cross-Selling",
          description: "AI-powered recommendations that increase order value by suggesting perfect pairings",
          benefit: "+38% average order value",
          details: ["Perfect pairing algorithms", "Context-aware suggestions", "One-click add experience", "Performance analytics tracking"]
        },
        {
          name: "Peak-Time Menu Expansion",
          description: "Unlock premium fresh experiences during busy hours with full staff capacity",
          benefit: "$1,200+ extra monthly revenue",
          details: ["Live cooking experiences", "Chef interaction add-ons", "Premium ingredient upgrades", "Flash-made specials"]
        },
        {
          name: "Hybrid Magic Bags",
          description: "Fresh premium experiences + surprise surplus bags for all-day revenue",
          benefit: "$15-50 premium vs $5 surplus",
          details: ["AI-curated surprise bags", "Fresh cooking experiences", "Chef tips and interactions", "Premium ingredient options"]
        }
      ]
    },
    {
      id: "customer-experience", 
      icon: "🎯",
      title: "Customer Experience",
      subtitle: "Seamless interactions that drive loyalty",
      color: "from-purple-500 to-pink-500",
      features: [
        {
          name: "I'm Here Notifications",
          description: "Smart arrival notifications with ETA tracking for perfect timing",
          benefit: "95% on-time pickup rate",
          details: ["GPS-based arrival detection", "Real-time ETA updates", "Restaurant preparation alerts", "Customer notification system"]
        },
        {
          name: "CSAT-Optimized Pickup",
          description: "Ultra-simple pickup confirmation that beats competitor complexity",
          benefit: "4.8/5 pickup experience rating",
          details: ["Single-tap confirmation", "Optional quick ratings", "Photo verification", "Instant feedback collection"]
        },
        {
          name: "Smart Checkout Upsells",
          description: "Perfect-timing cross-sells at checkout moment for maximum conversion",
          benefit: "50-65% cross-sell success rate",
          details: ["AI-curated pairings", "Non-intrusive suggestions", "One-click additions", "Completion psychology"]
        },
        {
          name: "Peak Experience Discovery",
          description: "Help customers find unique fresh experiences during restaurant peak hours",
          benefit: "2.3x higher premium bookings",
          details: ["Live cooking showcases", "Chef availability indicators", "Peak hour exclusives", "Experience previews"]
        }
      ]
    },
    {
      id: "business-intelligence",
      icon: "📊", 
      title: "Business Intelligence",
      subtitle: "Data-driven insights for growth",
      color: "from-orange-500 to-red-500",
      features: [
        {
          name: "Revenue Analytics Dashboard",
          description: "Comprehensive insights into all revenue streams and optimization opportunities",
          benefit: "360° revenue visibility",
          details: ["Cross-sell performance tracking", "Peak hour utilization metrics", "Customer behavior analysis", "ROI by feature breakdown"]
        },
        {
          name: "Cross-Sell Performance Tracking",
          description: "Deep analytics on what items drive the most additional revenue",
          benefit: "78% of restaurants optimize pricing",
          details: ["Item-by-item performance", "Time-based conversion rates", "Category analysis", "Smart recommendations"]
        },
        {
          name: "Peak Hour Optimization",
          description: "Monitor and maximize revenue during your busiest periods",
          benefit: "85% peak capacity utilization",
          details: ["Staff capacity correlation", "Revenue per hour tracking", "Experience booking rates", "Efficiency optimization"]
        },
        {
          name: "Customer Lifetime Value",
          description: "Track customer retention, repeat purchases, and loyalty growth",
          benefit: "3.2x customer retention",
          details: ["Repeat purchase tracking", "Loyalty program integration", "Customer journey mapping", "Retention optimization"]
        }
      ]
    }
  ];

  const currentCategory = categories[activeCategory];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.1)_1px,transparent_0)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-800 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300 mb-6">
            🚀 Complete Feature Suite
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Everything You Need
            </span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Four integrated systems that work together to amplify your restaurant revenue
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`group flex items-center gap-3 rounded-2xl px-6 py-4 font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div className="font-bold">{category.title}</div>
                <div className={`text-sm ${activeCategory === index ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                  {category.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features showcase */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          
          {/* Category header */}
          <div className="flex items-center gap-4 mb-12">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center text-3xl`}>
              {currentCategory.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{currentCategory.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{currentCategory.subtitle}</p>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {currentCategory.features.map((feature, index) => (
              <div 
                key={feature.name}
                className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                
                {/* Feature header */}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {feature.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${currentCategory.color} px-4 py-2 text-sm font-semibold text-white`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {feature.benefit}
                  </div>
                </div>

                {/* Feature details */}
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Key Capabilities:
                  </h5>
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-3xl p-8 text-white dark:text-gray-900">
            <h3 className="text-2xl font-bold mb-4">Ready to Amplify Your Revenue?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get all these features working together to transform your restaurant into a revenue-generating machine
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white dark:text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}