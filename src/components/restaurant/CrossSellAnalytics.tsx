"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  StarIcon,
  FireIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface CrossSellMetrics {
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  topPerformers: {
    name: string;
    addRate: number;
    revenue: number;
    category: string;
  }[];
  timeBasedPerformance: {
    hour: string;
    addRate: number;
    revenue: number;
  }[];
  categoryPerformance: {
    category: string;
    items: number;
    addRate: number;
    revenue: number;
  }[];
}

export function CrossSellAnalytics() {
  const [metrics, setMetrics] = useState<CrossSellMetrics>({
    totalRevenue: 1240,
    conversionRate: 32,
    averageOrderValue: 15.80,
    topPerformers: [
      { name: "Garlic Bread", addRate: 45, revenue: 520, category: "side" },
      { name: "Wine Pairing", addRate: 28, revenue: 380, category: "drink" },
      { name: "Chef's Table Chat", addRate: 35, revenue: 240, category: "experience" },
      { name: "Tiramisu", addRate: 22, revenue: 160, category: "dessert" }
    ],
    timeBasedPerformance: [
      { hour: "11-12", addRate: 18, revenue: 45 },
      { hour: "12-13", addRate: 38, revenue: 120 },
      { hour: "13-14", addRate: 42, revenue: 180 },
      { hour: "18-19", addRate: 48, revenue: 220 },
      { hour: "19-20", addRate: 52, revenue: 280 },
      { hour: "20-21", addRate: 45, revenue: 195 }
    ],
    categoryPerformance: [
      { category: "sides", items: 3, addRate: 38, revenue: 620 },
      { category: "drinks", items: 2, addRate: 25, revenue: 380 },
      { category: "experiences", items: 2, addRate: 32, revenue: 240 },
      { category: "desserts", items: 1, addRate: 22, revenue: 160 }
    ]
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "side":
      case "sides":
        return "🥖";
      case "drink":
      case "drinks":
        return "🥤";
      case "experience":
      case "experiences":
        return "👨‍🍳";
      case "dessert":
      case "desserts":
        return "🍰";
      default:
        return "🍽️";
    }
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 40) return "text-green-600 bg-green-100";
    if (rate >= 25) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
            Cross-Sell Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track performance and optimize your cross-sell strategy
          </p>
        </div>
        
        <select 
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Total Cross-Sell Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${metrics.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="h-3 w-3" />
                  +38% vs last period
                </p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  Cross-Sell Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {metrics.conversionRate}%
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Industry avg: 18%
                </p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  AOV Boost
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  +${metrics.averageOrderValue}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Average per order
                </p>
              </div>
              <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-600" />
            Top Performing Items
          </CardTitle>
          <CardDescription>
            Your best cross-sell items ranked by add rate and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.topPerformers.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-gray-400">#{idx + 1}</div>
                  <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-500">Add Rate</p>
                    <p className={`text-lg font-bold px-2 py-1 rounded-full ${getPerformanceColor(item.addRate)}`}>
                      {item.addRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-bold text-green-600">${item.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time-Based Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-orange-600" />
              Peak Hours Performance
            </CardTitle>
            <CardDescription>
              Cross-sell rates by time of day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.timeBasedPerformance.map((period) => (
                <div key={period.hour} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{period.hour}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(period.addRate / 60) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{period.addRate}%</span>
                    <span className="text-xs text-gray-500 ml-2">${period.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FireIcon className="h-5 w-5 text-red-600" />
              Category Breakdown
            </CardTitle>
            <CardDescription>
              Performance by item category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.categoryPerformance.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(category.category)}</span>
                      <span className="font-medium capitalize">{category.category}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {category.items} items
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{category.addRate}%</div>
                      <div className="text-xs text-gray-500">${category.revenue}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${(category.addRate / 60) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
        <CardHeader>
          <CardTitle className="text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
            💡 Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800 dark:text-yellow-400">
            <div>
              <strong>🔥 Hot Opportunities:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Your 7-8 PM slot shows 52% cross-sell rate - consider premium items</li>
                <li>• Sides category outperforming drinks 38% vs 25%</li>
                <li>• Experience add-ons have highest profit margins at 85%</li>
              </ul>
            </div>
            <div>
              <strong>📈 Growth Actions:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Add 2 more drink options to boost that category</li>
                <li>• Test premium experiences during 6-8 PM peak</li>
                <li>• Consider bundling sides with main dishes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}