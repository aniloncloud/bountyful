"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SparklesIcon, FireIcon, ClockIcon, UsersIcon, UserIcon as ChefHatIcon, StarIcon } from "@heroicons/react/24/solid";
import { FlashCookingBanner } from "@/components/customer/FlashCookingBanner";
import { KitchenCapacityIndicator } from "@/components/customer/KitchenCapacityIndicator";

interface PeakExperience {
  id: string;
  name: string;
  restaurant: string;
  restaurantId: string;
  chef: string;
  price: number;
  originalPrice: number;
  duration: string;
  maxParticipants: number;
  currentBookings: number;
  availableSlots: string[];
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  kitchenCapacity: number; // 0-100%
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  cuisine: string;
  specialRequirements?: string[];
}

export default function PeakExperiencesPage() {
  const [selectedTime, setSelectedTime] = useState("now");
  const [availableExperiences, setAvailableExperiences] = useState<PeakExperience[]>([]);
  const [kitchenStats, setKitchenStats] = useState({
    totalRestaurants: 47,
    activeKitchens: 34,
    avgCapacity: 78
  });

  const peakExperiences: PeakExperience[] = [
    {
      id: "peak-1",
      name: "Live Pasta Making Masterclass",
      restaurant: "Bella Vista Italian",
      restaurantId: "1",
      chef: "Chef Marco Rossi",
      price: 24.99,
      originalPrice: 75.00,
      duration: "45 minutes",
      maxParticipants: 6,
      currentBookings: 3,
      availableSlots: ["6:30 PM", "7:15 PM", "8:00 PM"],
      image: "/api/placeholder/400/300",
      description: "Learn the art of fresh pasta making during our busiest service. Watch our head chef create signature dishes while teaching traditional techniques.",
      features: [
        "Hands-on pasta shaping techniques",
        "Traditional sauce preparation",
        "Professional plating demonstration",
        "Take home recipe collection",
        "Taste 3 signature dishes",
        "Behind-the-scenes kitchen access"
      ],
      rating: 4.9,
      reviewCount: 127,
      kitchenCapacity: 85,
      difficulty: "Intermediate",
      cuisine: "Italian",
      specialRequirements: ["Closed-toe shoes required", "Hair tied back"]
    },
    {
      id: "peak-2", 
      name: "Omakase Flash Preparation",
      restaurant: "Sakura Sushi",
      restaurantId: "2",
      chef: "Chef Hiroshi Tanaka",
      price: 39.99,
      originalPrice: 120.00,
      duration: "60 minutes",
      maxParticipants: 4,
      currentBookings: 2,
      availableSlots: ["7:00 PM", "8:30 PM"],
      image: "/api/placeholder/400/300",
      description: "Experience the precision of omakase preparation during peak dinner rush. Learn knife techniques and rice mastery from our master chef.",
      features: [
        "Premium ingredient selection",
        "Knife technique demonstration", 
        "Sushi rice preparation secrets",
        "Fish quality assessment",
        "7-course tasting menu",
        "Sake pairing education"
      ],
      rating: 5.0,
      reviewCount: 89,
      kitchenCapacity: 92,
      difficulty: "Advanced",
      cuisine: "Japanese",
      specialRequirements: ["No fish allergies", "Comfortable standing for 60 minutes"]
    },
    {
      id: "peak-3",
      name: "Live Fire BBQ Experience",
      restaurant: "Fire & Smoke BBQ",
      restaurantId: "4", 
      chef: "Pitmaster Jake Williams",
      price: 29.99,
      originalPrice: 85.00,
      duration: "50 minutes",
      maxParticipants: 8,
      currentBookings: 5,
      availableSlots: ["6:00 PM", "7:30 PM"],
      image: "/api/placeholder/400/300",
      description: "Master the art of live-fire cooking during our peak dinner service. Learn smoking techniques and meat temperature mastery.",
      features: [
        "Live fire management",
        "Meat selection and preparation",
        "Smoking technique secrets", 
        "BBQ sauce creation",
        "Temperature control mastery",
        "Family-style tasting platter"
      ],
      rating: 4.8,
      reviewCount: 156,
      kitchenCapacity: 76,
      difficulty: "Beginner",
      cuisine: "American",
      specialRequirements: ["Heat-resistant clothing recommended"]
    }
  ];

  useEffect(() => {
    // Filter experiences based on selected time and kitchen capacity
    const filtered = peakExperiences.filter(exp => {
      if (selectedTime === "now") {
        return exp.kitchenCapacity >= 70; // High capacity restaurants
      } else if (selectedTime === "peak") {
        return exp.availableSlots.length > 0 && exp.kitchenCapacity >= 80;
      } else if (selectedTime === "flash") {
        return exp.currentBookings < exp.maxParticipants && exp.kitchenCapacity >= 85;
      }
      return true;
    });
    
    setAvailableExperiences(filtered);
  }, [selectedTime]);

  const timeFilters = [
    { id: "now", label: "Available Now", icon: "⚡", count: peakExperiences.filter(e => e.kitchenCapacity >= 70).length },
    { id: "peak", label: "Peak Hours", icon: "🔥", count: peakExperiences.filter(e => e.kitchenCapacity >= 80).length },
    { id: "flash", label: "Flash Cooking", icon: "✨", count: peakExperiences.filter(e => e.kitchenCapacity >= 85).length }
  ];

  const ExperienceCard = ({ experience }: { experience: PeakExperience }) => {
    const spotsLeft = experience.maxParticipants - experience.currentBookings;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <div className="relative h-48">
            <Image
              src={experience.image}
              alt={experience.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-red-500 to-orange-500">
                <FireIcon className="h-3 w-3" />
                LIVE NOW
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <KitchenCapacityIndicator capacity={experience.kitchenCapacity} />
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/70 rounded-lg p-2 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <ChefHatIcon className="h-4 w-4" />
                  <span className="font-medium">{experience.chef}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                {experience.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {experience.restaurant} • {experience.cuisine}
              </p>
            </div>
            <div className="text-right ml-2">
              <div className="text-2xl font-bold text-orange-600">
                ${experience.price}
              </div>
              <div className="text-sm text-gray-500 line-through">
                ${experience.originalPrice}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span>{experience.rating}</span>
              <span>({experience.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              <span className={spotsLeft <= 2 ? 'text-red-600 font-medium' : ''}>
                {spotsLeft} spots left
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {experience.description}
          </p>

          <div className="space-y-3 mb-4">
            <div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">Available Times:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {experience.availableSlots.map((slot, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                experience.difficulty === "Beginner" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : experience.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              }`}>
                {experience.difficulty}
              </span>
              
              <span className="text-xs text-gray-500">
                Save ${(experience.originalPrice - experience.price).toFixed(0)}
              </span>
            </div>
          </div>

          <Link href={`/shop/restaurant/${experience.restaurantId}/peak-experience/${experience.id}`}>
            <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              Book Live Experience
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/50 dark:from-orange-950/20 dark:via-gray-900 dark:to-red-950/20">
      
      {/* Flash cooking banner */}
      <FlashCookingBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-800 dark:text-red-200 text-sm font-medium mb-6">
            <FireIcon className="h-4 w-4" />
            <span>Peak Performance Amplification</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Live Kitchen Experiences
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the energy of peak service. Learn from master chefs during their busiest hours when creativity and skill reach their peak.
          </p>
          
          {/* Kitchen stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{kitchenStats.activeKitchens}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Live Kitchens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{kitchenStats.avgCapacity}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{availableExperiences.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available Now</div>
            </div>
          </div>
        </div>

        {/* Time filters */}
        <div className="flex justify-center gap-4 mb-12">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedTime(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                selectedTime === filter.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              <span>{filter.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                selectedTime === filter.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Experiences grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {availableExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {availableExperiences.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔥</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              No peak experiences available right now
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Peak experiences are only available when restaurants are operating at high capacity during their busiest hours.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setSelectedTime("now")}
                variant="outline"
              >
                View All Experiences
              </Button>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                  Browse All Restaurants
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Peak performance info */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
              Why Peak Hours Are Special
            </h2>
            <p className="text-red-700 dark:text-red-300">
              During peak service, restaurants operate at maximum efficiency with full staff, fresh ingredients, and intense energy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-3xl mb-3">👨‍🍳</div>
              <h3 className="font-semibold mb-2">Full Kitchen Staff</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Experience the kitchen at full capacity with all chefs working in perfect harmony.
              </p>
            </div>
            
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">High Energy Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Feel the adrenaline and precision of professional kitchens during their busiest moments.
              </p>
            </div>
            
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access to the freshest ingredients as kitchens prepare for high-volume service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}