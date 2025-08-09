"use client";
import { useState, useEffect, useRef } from "react";

export function Impact() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    meals: 0,
    co2: 0,
    venues: 0,
    revenue: 0,
  });
  
  const sectionRef = useRef(null);

  const finalCounts = {
    meals: 15842,
    co2: 21300, // in kg for easier animation
    venues: 128,
    revenue: 2100000, // in dollars
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        meals: Math.floor(finalCounts.meals * easeOut),
        co2: Math.floor(finalCounts.co2 * easeOut),
        venues: Math.floor(finalCounts.venues * easeOut),
        revenue: Math.floor(finalCounts.revenue * easeOut),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, finalCounts.meals, finalCounts.co2, finalCounts.venues, finalCounts.revenue]);

  const impactStats = [
    {
      icon: "🍽️",
      value: counts.meals.toLocaleString(),
      label: "Meals Rescued",
      subtext: "From going to landfill",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    },
    {
      icon: "🌱",
      value: `${(counts.co2 / 1000).toFixed(1)}t`,
      label: "CO₂ Prevented",
      subtext: "Equivalent to 156 trees planted",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    },
    {
      icon: "🏪",
      value: counts.venues.toString(),
      label: "Partner Restaurants",
      subtext: "Across 50+ cities",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
    },
    {
      icon: "💰",
      value: `$${(counts.revenue / 1000000).toFixed(1)}M`,
      label: "Revenue Generated",
      subtext: "From surplus food sales",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl animate-pulse dark:bg-green-800/30" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000 dark:bg-blue-800/30" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-2000 dark:bg-purple-800/30" />
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-orange-200/30 rounded-full blur-xl animate-pulse delay-500 dark:bg-orange-800/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 text-sm font-medium text-green-800 shadow-sm dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-300 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Global Impact
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-1000" />
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-green-700 to-emerald-600 bg-clip-text text-transparent dark:from-white dark:via-green-300 dark:to-emerald-400">
              Making a Real Difference
            </span>
          </h2>
          
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Every meal saved, every pound of CO₂ prevented, every dollar earned from surplus food. 
            This is the power of our community working together.
          </p>
        </div>

        {/* Impact grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {impactStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.bgColor} p-8 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_50%)]" />
              
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              
              {/* Value */}
              <div className={`text-4xl font-extrabold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {stat.label}
              </div>
              
              {/* Subtext */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.subtext}
              </div>
              
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
            </div>
          ))}
        </div>

        {/* Bottom section with environmental context */}
        <div className="text-center">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-12 shadow-2xl text-white">
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-3xl font-bold mb-4">
              Together, We&apos;re Healing the Planet
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Food waste is responsible for 10% of global greenhouse gas emissions. 
              By rescuing surplus food, we&apos;re not just helping restaurants—we&apos;re fighting climate change, one meal at a time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">1/3</div>
                <div className="text-sm opacity-80">of all food is wasted globally</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10%</div>
                <div className="text-sm opacity-80">of greenhouse gases from food waste</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$1T</div>
                <div className="text-sm opacity-80">lost annually to food waste</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}


