"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Hero() {
  const [mealsRescued, setMealsRescued] = useState(15842);
  const [co2Saved, setCo2Saved] = useState(21.3);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMealsRescued(prev => prev + 1);
      setCo2Saved(prev => +(prev + 0.001).toFixed(3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % 2);
    }, 8000);
    return () => clearInterval(messageInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-950 dark:via-gray-950 dark:to-amber-950">
      
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Floating food icons */}
        <div className="absolute top-20 left-[10%] animate-bounce delay-[2s]">
          <div className="text-4xl opacity-20">🥖</div>
        </div>
        <div className="absolute top-40 right-[15%] animate-bounce delay-[4s]">
          <div className="text-3xl opacity-20">🥗</div>
        </div>
        <div className="absolute bottom-40 left-[20%] animate-bounce delay-[1s]">
          <div className="text-3xl opacity-20">🍕</div>
        </div>
        <div className="absolute bottom-60 right-[25%] animate-bounce delay-[3s]">
          <div className="text-4xl opacity-20">🧁</div>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-gradient-to-r from-green-400/30 to-emerald-500/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -right-24 size-96 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-gradient-to-r from-green-300/20 to-emerald-400/20 blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          
          {/* Attention-grabbing badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-300">
            <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
            Restaurant Revenue Amplification • {mealsRescued.toLocaleString()} experiences created today
          </div>

          {/* Hero headline with cycling messages */}
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl transition-all duration-1000">
            {currentMessage === 0 ? (
              <>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
                  Maximize Restaurant Revenue
                </span>
                <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm mt-2">
                  During ALL Hours
                </span>
              </>
            ) : (
              <>
                <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
                  Turn Kitchen Surplus
                </span>
                <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm mt-2">
                  Into Pure Profit
                </span>
              </>
            )}
          </h1>

          {/* Cycling subheadlines */}
          <p className="mt-8 mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl transition-all duration-1000">
            {currentMessage === 0 ? (
              <>
                Peak hours + slow periods. Fresh experiences + surplus optimization. When your restaurant operates at full potential during every service, 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> your revenue grows 2-3x while fighting food waste.</span>
              </>
            ) : (
              <>
                Every plate you can&apos;t sell becomes profit instead of waste. Join thousands of restaurants 
                <span className="font-semibold text-green-600 dark:text-green-400"> transforming surplus into sustainable revenue streams</span> while helping our planet.
              </>
            )}
          </p>

          {/* Enhanced CTAs with urgency */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={siteConfig.primaryCta.href}>
              <Button size="xl" className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Amplify Your Revenue Today
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href={siteConfig.secondaryCta.href}>
              <Button variant="outline" size="xl" className="border-2 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20">
                📱 See Live Demo
              </Button>
            </Link>
          </div>

          {/* Social proof with real-time updates */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="rounded-3xl border border-green-200 bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-green-800 dark:bg-gray-900/80">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-Time Impact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Updated every few seconds</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent transition-transform group-hover:scale-110">
                    {mealsRescued.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Fresh + Surplus Orders</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">+1 every 3 seconds</div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent transition-transform group-hover:scale-110">
                    $3.2M
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Revenue Amplified</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Peak + slow optimization</div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent transition-transform group-hover:scale-110">
                    40%
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Peak Hour Orders</div>
                  <div className="text-xs text-orange-600 dark:text-orange-400">Fresh experiences</div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent transition-transform group-hover:scale-110">
                    4.9★
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Restaurant Growth</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">From 500+ partners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div className="size-2 rounded-full bg-green-500" />
              500+ Restaurants
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div className="size-2 rounded-full bg-blue-500" />
              50+ Cities
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div className="size-2 rounded-full bg-purple-500" />
              Zero Setup Fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
