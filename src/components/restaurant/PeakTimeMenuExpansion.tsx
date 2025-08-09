"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FireIcon, 
  ClockIcon, 
  ChartBarIcon,
  SparklesIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";

interface PeakMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  prepTime: number; // in minutes
  staffRequired: number;
  peakOnly: boolean;
  profitMargin: number;
  popularity: number;
  category: string;
}

interface PeakTimeMenuExpansionProps {
  currentCapacity: number; // 0-100%
  staffCount: number;
  currentHour: number;
  onCreateListing: (item: PeakMenuItem) => void;
}

export function PeakTimeMenuExpansion({
  currentCapacity,
  staffCount,
  currentHour,
  onCreateListing
}: PeakTimeMenuExpansionProps) {
  const [recommendedItems, setRecommendedItems] = useState<PeakMenuItem[]>([]);
  const [isPeakTime, setIsPeakTime] = useState(false);

  // Peak-only menu items that require full staffing
  const peakMenuDatabase: PeakMenuItem[] = [
    {
      id: "peak-1",
      name: "Live Pasta Making Experience",
      description: "Fresh pasta made to order with chef interaction",
      price: 18.99,
      prepTime: 15,
      staffRequired: 2,
      peakOnly: true,
      profitMargin: 65,
      popularity: 88,
      category: "Fresh Experience"
    },
    {
      id: "peak-2", 
      name: "Flash-Grilled Specials",
      description: "Made-to-order grilled items during peak capacity",
      price: 24.99,
      prepTime: 12,
      staffRequired: 1,
      peakOnly: true,
      profitMargin: 70,
      popularity: 92,
      category: "Fresh Cooking"
    },
    {
      id: "peak-3",
      name: "Chef's Table Interaction",
      description: "Brief cooking demonstration with your order",
      price: 8.99,
      prepTime: 5,
      staffRequired: 1,
      peakOnly: true,
      profitMargin: 85,
      popularity: 95,
      category: "Experience Add-on"
    },
    {
      id: "peak-4",
      name: "Premium Ingredient Upgrade",
      description: "Use premium ingredients only available during peak hours",
      price: 6.99,
      prepTime: 8,
      staffRequired: 1,
      peakOnly: true,
      profitMargin: 75,
      popularity: 78,
      category: "Upgrade"
    }
  ];

  useEffect(() => {
    checkPeakTimeAndRecommend();
  }, [currentCapacity, staffCount, currentHour]);

  const checkPeakTimeAndRecommend = () => {
    // Determine if it's peak time based on capacity and hour
    const isCurrentlyPeak = currentCapacity >= 75 && 
                           staffCount >= 3 && 
                           (currentHour >= 11 && currentHour <= 14 || currentHour >= 18 && currentHour <= 21);
    
    setIsPeakTime(isCurrentlyPeak);

    if (isCurrentlyPeak) {
      // Recommend items based on current capacity and staffing
      const suitable = peakMenuDatabase.filter(item => 
        item.staffRequired <= staffCount &&
        item.prepTime <= 20 // Don't overwhelm during peak
      ).sort((a, b) => b.popularity - a.popularity).slice(0, 3);
      
      setRecommendedItems(suitable);
    } else {
      setRecommendedItems([]);
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 85) return "text-red-600 bg-red-100";
    if (capacity >= 70) return "text-orange-600 bg-orange-100"; 
    return "text-green-600 bg-green-100";
  };

  const estimateAdditionalRevenue = () => {
    return recommendedItems.reduce((sum, item) => {
      // Estimate 2-5 sales per hour during peak
      const estimatedSales = Math.floor(item.popularity / 20);
      return sum + (item.price * estimatedSales);
    }, 0);
  };

  if (!isPeakTime) {
    return (
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <ClockIcon className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Peak Menu Expansion</h3>
            <p className="text-sm">Available when capacity ≥75% and staff ≥3</p>
            <div className="mt-3 text-xs">
              Current: {currentCapacity}% capacity, {staffCount} staff
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Peak Status Banner */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FireIcon className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Peak Performance Mode Active</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High capacity detected - maximize revenue with fresh offerings
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCapacityColor(currentCapacity)}`}>
                {currentCapacity}% Capacity
              </div>
              <div className="text-xs text-gray-500 mt-1">{staffCount} staff active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Opportunity */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
            Peak Revenue Opportunity
          </CardTitle>
          <CardDescription>
            Potential additional revenue: ${estimateAdditionalRevenue().toFixed(2)}/hour
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Recommended Peak Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <LightBulbIcon className="h-5 w-5 text-yellow-600" />
          Recommended Peak-Only Items
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {item.description}
                    </CardDescription>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Peak Only
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">${item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                    <span>{item.prepTime}min prep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="h-4 w-4 text-purple-600" />
                    <span>{item.staffRequired} staff req.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="h-4 w-4 text-orange-600" />
                    <span>{item.profitMargin}% margin</span>
                  </div>
                </div>

                {/* Popularity Indicator */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Popularity</span>
                    <span>{item.popularity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${item.popularity}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={() => onCreateListing(item)}
                >
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Create Peak Listing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Peak Performance Tips */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            💡 Peak Performance Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
            <li>• Peak items can command 40-60% higher prices</li>
            <li>• Chef interactions add premium value with minimal cost</li>
            <li>• Flash cooking utilizes full staff capacity for max ROI</li>
            <li>• Limited availability creates urgency and demand</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}