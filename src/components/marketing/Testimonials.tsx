"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Absolute game-changer! We're making $2,800 extra monthly from BOTH peak-time fresh experiences and surplus bags. Our revenue during slow hours jumped 300% and customers love our chef interaction moments.",
      author: "Maria Rodriguez",
      role: "Head Chef & Owner",
      restaurant: "Rosa's Kitchen",
      location: "Austin, TX",
      avatar: "👩‍🍳",
      rating: 5,
      metric: "$2,800 extra monthly revenue",
      bgColor: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
      accentColor: "from-rose-500 to-pink-500"
    },
    {
      quote: "The restaurant collaboration network is incredible! We partner with the bakery and coffee shop next door for neighborhood taste tours. Our customer discovery rate increased 400% and we're selling premium fresh bags during our busiest lunch rush.",
      author: "James Chen",
      role: "Restaurant Manager", 
      restaurant: "Bamboo Garden",
      location: "San Francisco, CA",
      avatar: "👨‍💼",
      rating: 5,
      metric: "400% customer discovery increase",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      accentColor: "from-green-500 to-emerald-500"
    },
    {
      quote: "Setup was literally 10 minutes. Now we're part of the solution instead of part of the problem. Our team feels proud knowing we're making a difference while boosting our bottom line.",
      author: "Sarah Thompson",
      role: "Operations Director",
      restaurant: "The Metropolitan",
      location: "Chicago, IL", 
      avatar: "👩‍💻",
      rating: 5,
      metric: "45% waste reduction",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      accentColor: "from-blue-500 to-cyan-500"
    },
    {
      quote: `${siteConfig.shortName} transformed how we think about surplus. Instead of a cost center, it's now a revenue stream. The real-time insights are incredible—we know exactly when to create magic bags for maximum impact.`,
      author: "Ahmed Hassan", 
      role: "Executive Chef",
      restaurant: "Spice Route",
      location: "New York, NY",
      avatar: "👨‍🍳",
      rating: 5,
      metric: "$2,100 monthly revenue",
      bgColor: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
      accentColor: "from-amber-500 to-orange-500"
    },
    {
      quote: "We reduced our food waste by 73% in just 2 months. What used to go in the bin now puts money in our pocket. Our customers love the surprise bags and it's brought so many new faces through our doors.",
      author: "Roberto Silva",
      role: "Owner & Chef",
      restaurant: "Luna's Bistro",
      location: "Portland, OR",
      avatar: "👨‍🍳",
      rating: 5,
      metric: "73% waste reduction",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
      accentColor: "from-emerald-500 to-teal-500"
    },
    {
      quote: "The environmental impact makes us feel great, but honestly, it's the extra $1,800/month that convinced our investors. Win-win for everyone—planet, profit, and customers getting amazing deals.",
      author: "Lisa Park",
      role: "General Manager",
      restaurant: "Greenhouse Café",
      location: "Seattle, WA",
      avatar: "👩‍💼",
      rating: 5,
      metric: "$1,800 extra monthly",
      bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
      accentColor: "from-indigo-500 to-purple-500"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse dark:from-purple-800/20 dark:to-pink-800/20" />
        <div className="absolute bottom-20 right-[15%] w-40 h-40 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-800/20 dark:to-cyan-800/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 text-sm font-medium text-purple-800 shadow-sm dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300 mb-8">
            ⭐ Trusted by 500+ Restaurants
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-pink-600 bg-clip-text text-transparent dark:from-white dark:via-purple-300 dark:to-pink-400">
              Stories That Inspire Us
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Real restaurants, real results, real impact on their communities and our planet.
          </p>
        </div>

        {/* Main testimonial showcase */}
        <div className={`mx-auto max-w-5xl rounded-3xl bg-gradient-to-br ${currentData.bgColor} p-12 shadow-2xl transition-all duration-700 ease-in-out`}>
          
          {/* Rating stars */}
          <div className="flex justify-center mb-8">
            {[...Array(currentData.rating)].map((_, i) => (
              <svg key={i} className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-center">
            <p className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed mb-8">
              &ldquo;{currentData.quote}&rdquo;
            </p>
          </blockquote>

          {/* Author info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{currentData.avatar}</div>
              <div className="text-left">
                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                  {currentData.author}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {currentData.role}
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {currentData.restaurant} • {currentData.location}
                </div>
              </div>
            </div>
            
            {/* Success metric */}
            <div className={`rounded-full bg-gradient-to-r ${currentData.accentColor} px-6 py-3 text-white font-bold shadow-lg`}>
              {currentData.metric}
            </div>
          </div>
        </div>

        {/* Testimonial navigation dots */}
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-purple-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Statistics grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Happy Restaurants</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Would Recommend</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-10 shadow-2xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join the Movement
            </h3>
            <p className="text-lg opacity-90 mb-8">
              Be part of the community that&apos;s transforming food waste into opportunity. 
              Your success story could be next.
            </p>
            <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Start Your Success Story
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="text-sm opacity-75 mt-4">
              Free setup • No long-term contracts • Results in 7 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


