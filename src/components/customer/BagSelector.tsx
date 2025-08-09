"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon, GiftIcon, ClockIcon, CheckIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

interface Bag {
  id: string;
  type: string;
  name: string;
  price: number;
  originalPrice: number;
  available: number;
  timing: string;
  description: string;
  features: string[];
  dietaryInfo: string[];
  estimatedPickup: string;
}

interface BagSelectorProps {
  freshBags: Bag[];
  surplusBags: Bag[];
  restaurantId: string;
}

export function BagSelector({ freshBags, surplusBags, restaurantId }: BagSelectorProps) {
  const [expandedBag, setExpandedBag] = useState<string | null>(null);

  const toggleExpanded = (bagId: string) => {
    setExpandedBag(expandedBag === bagId ? null : bagId);
  };

  const BagCard = ({ bag }: { bag: Bag }) => {
    const isExpanded = expandedBag === bag.id;
    const isFresh = bag.type.includes("Fresh") || bag.type.includes("Premium");
    
    return (
      <div className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
        isFresh 
          ? 'border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
          : 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
      } ${isExpanded ? 'shadow-xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'}`}>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {isFresh ? (
                <SparklesIcon className="h-6 w-6 text-purple-500" />
              ) : (
                <GiftIcon className="h-6 w-6 text-green-500" />
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{bag.name}</h3>
                <span className={`text-sm font-medium ${
                  isFresh ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {bag.type}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                isFresh ? 'text-purple-600' : 'text-green-600'
              }`}>
                ${bag.price}
              </div>
              <div className="text-sm text-gray-500 line-through">
                ${bag.originalPrice}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round((1 - bag.price / bag.originalPrice) * 100)}% off
              </div>
            </div>
          </div>

          {/* Availability and timing */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{bag.timing}</span>
            </div>
            <span>•</span>
            <span className={`font-medium ${bag.available > 5 ? 'text-green-600' : 'text-orange-600'}`}>
              {bag.available} available
            </span>
            <span>•</span>
            <span>Pickup: {bag.estimatedPickup}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {bag.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Includes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {bag.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon className={`h-4 w-4 ${isFresh ? 'text-purple-500' : 'text-green-500'}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary info */}
          {bag.dietaryInfo.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <InformationCircleIcon className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Dietary Information:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {bag.dietaryInfo.map((info, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    {info}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link href={`/shop/restaurant/${restaurantId}/bag/${bag.id}`} className="flex-1">
              <Button 
                size="lg" 
                className={`w-full ${
                  isFresh 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                {isFresh ? 'Book Experience' : 'Get Surprise'} - ${bag.price}
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleExpanded(bag.id)}
              className="px-4"
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Experience timeline */}
                {isFresh && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Experience Timeline:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <div className="font-medium text-sm">Arrival & Welcome</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Check in with kitchen staff</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <div className="font-medium text-sm">Chef Interaction</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Watch preparation & ask questions</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <div className="font-medium text-sm">Take & Learn</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Receive food + recipe card</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sustainability impact */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Environmental Impact:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">CO₂ Prevented:</span>
                      <span className="font-medium text-green-600">2.3 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Water Saved:</span>
                      <span className="font-medium text-blue-600">15 L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Waste Prevented:</span>
                      <span className="font-medium text-purple-600">0.8 kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Good to Know:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Please arrive on time for the best experience</li>
                  <li>• Bring a reusable bag or container</li>
                  <li>• Payment is processed when you place the order</li>
                  <li>• Cancellation allowed up to 1 hour before pickup</li>
                  {isFresh && <li>• Chef interactions depend on kitchen availability</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Fresh Experience Bags */}
      {freshBags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fresh Experience Bags</h2>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
              Peak Hours
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Premium experiences with chef interactions, cooking tips, and fresh-made dishes during our busiest hours.
          </p>
          <div className="space-y-4">
            {freshBags.map((bag) => (
              <BagCard key={bag.id} bag={bag} />
            ))}
          </div>
        </div>
      )}

      {/* Surplus Surprise Bags */}
      {surplusBags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GiftIcon className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Surplus Surprise Bags</h2>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
              End of Day
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mystery selections of our day's fresh specialties at incredible savings. Help us reduce waste while enjoying amazing food.
          </p>
          <div className="space-y-4">
            {surplusBags.map((bag) => (
              <BagCard key={bag.id} bag={bag} />
            ))}
          </div>
        </div>
      )}

      {freshBags.length === 0 && surplusBags.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bags available right now
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Check back during peak hours (6-9 PM) for fresh experiences or after 9:30 PM for surplus surprises.
          </p>
          <Button variant="outline">
            Notify me when available
          </Button>
        </div>
      )}
    </div>
  );
}