"use client";
import { useState } from "react";

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { 
      icon: "🚀",
      title: "Peak Hour Amplification", 
      desc: "Flash fresh cooking during busy periods with full staff capacity",
      benefit: "$1,200+ extra revenue per month",
      details: "Fresh chef specials, kitchen capacity optimization",
      color: "from-blue-500 to-purple-500"
    },
    { 
      icon: "🎁",
      title: "Hybrid Experience Bags", 
      desc: "Fresh premium bags + surprise surplus bags for all hours",
      benefit: "$15-50 premium vs $5 surplus",
      details: "Chef interactions, cooking tips, collaborative options",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: "🤝",
      title: "Restaurant Collaboration", 
      desc: "Partner with nearby restaurants for unique neighborhood experiences",
      benefit: "300% higher customer discovery",
      details: "Multi-restaurant bags, taste tours, shared promotions",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: "🧠",
      title: "Smart Timing Intelligence", 
      desc: "Learn each restaurant's unique peak/slow patterns",
      benefit: "40% orders during peak hours",
      details: "Restaurant-specific optimization, bi-directional pricing",
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184,0.1)_1px,transparent_0)]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-300 mb-6">
            ✨ Everything You Need
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Revenue Amplification Tools
            </span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Beyond waste reduction. Innovative features that maximize revenue during peak AND slow periods.
          </p>
        </div>

        {/* Interactive feature showcase */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Feature list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-white shadow-2xl shadow-gray-200/50 scale-[1.02] dark:bg-gray-800 dark:shadow-gray-700/50' 
                    : 'bg-white/50 shadow-sm hover:shadow-lg hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 text-4xl transition-transform duration-300 ${
                    activeFeature === index ? 'scale-110' : ''
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {feature.desc}
                    </p>
                    <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${feature.color} px-3 py-1 text-sm font-medium text-white`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {feature.benefit}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual showcase */}
          <div className="relative">
            <div className={`relative rounded-3xl bg-gradient-to-br ${features[activeFeature].color} p-1 shadow-2xl transition-all duration-500`}>
              <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 h-96 flex flex-col justify-center items-center text-center">
                <div className="text-6xl mb-6 animate-bounce">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xs">
                  {features[activeFeature].desc}
                </p>
                <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${features[activeFeature].color} px-6 py-3 text-white font-semibold shadow-lg`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {features[activeFeature].benefit}
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
              NEW
            </div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce delay-500" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to amplify your restaurant revenue during all hours?
          </p>
          <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40">
            Start Revenue Amplification
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            No credit card required • Peak + slow optimization • Fresh + surplus hybrid model
          </p>
        </div>
      </div>
    </section>
  );
}
