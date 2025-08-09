"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FireIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/solid";

export function FlashCookingBanner() {
  const [timeLeft, setTimeLeft] = useState(27 * 60 + 34); // 27 minutes 34 seconds
  const [flashOffers] = useState([
    {
      restaurant: "Bella Vista Italian",
      offer: "Live Pasta Making - 30% off",
      spotsLeft: 3,
      deadline: "8:00 PM"
    },
    {
      restaurant: "Sakura Sushi", 
      offer: "Omakase Master Class - 40% off",
      spotsLeft: 2,
      deadline: "8:30 PM"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white overflow-hidden">
      <div className="relative">
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-pulse absolute top-2 left-[10%] text-2xl">🔥</div>
            <div className="animate-pulse absolute top-6 right-[15%] text-xl delay-500">⚡</div>
            <div className="animate-pulse absolute bottom-4 left-[20%] text-3xl delay-1000">👨‍🍳</div>
            <div className="animate-pulse absolute bottom-2 right-[25%] text-2xl delay-1500">✨</div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Main flash banner */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FireIcon className="h-8 w-8 animate-bounce" />
              <h2 className="text-2xl md:text-3xl font-bold">
                🚨 FLASH COOKING ALERT 🚨
              </h2>
              <FireIcon className="h-8 w-8 animate-bounce delay-500" />
            </div>
            
            <p className="text-lg md:text-xl mb-4">
              Peak kitchen capacity detected! Limited-time experiences available NOW
            </p>
            
            {/* Countdown timer */}
            <div className="inline-flex items-center gap-2 bg-black/20 rounded-full px-6 py-3">
              <ClockIcon className="h-5 w-5" />
              <span className="font-mono text-xl font-bold">
                {formatTime(timeLeft)}
              </span>
              <span className="text-sm">until next flash</span>
            </div>
          </div>

          {/* Flash offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {flashOffers.map((offer, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{offer.restaurant}</h3>
                    <p className="text-yellow-100">{offer.offer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Deadline</div>
                    <div className="font-bold">{offer.deadline}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span className={offer.spotsLeft <= 2 ? 'text-red-200 font-bold animate-pulse' : ''}>
                      Only {offer.spotsLeft} spots left!
                    </span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Live kitchen status */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>🍝 Bella Vista: 87% capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-500"></div>
              <span>🍣 Sakura: 94% capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
              <span>🔥 Fire & Smoke: 76% capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-1500"></div>
              <span>🥗 Green Garden: 91% capacity</span>
            </div>
          </div>
        </div>
        
        {/* Bottom wave animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" className="w-full h-6 fill-white dark:fill-gray-900">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"/>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"/>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}