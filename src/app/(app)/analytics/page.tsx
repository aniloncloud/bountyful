"use client";

import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar, AreaChart, Area } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowTrendingUpIcon as TrendingUpIcon, 
  ArrowTrendingDownIcon as TrendingDownIcon, 
  CalendarIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@heroicons/react/24/outline";

// Enhanced data for restaurant-specific metrics
const revenueData = [
  { name: "Mon", surplus: 280, fresh: 420, total: 700, orders: 24, avgOrder: 29.17 },
  { name: "Tue", surplus: 180, fresh: 380, total: 560, orders: 18, avgOrder: 31.11 },
  { name: "Wed", surplus: 450, fresh: 650, total: 1100, orders: 33, avgOrder: 33.33 },
  { name: "Thu", surplus: 320, fresh: 580, total: 900, orders: 28, avgOrder: 32.14 },
  { name: "Fri", surplus: 520, fresh: 880, total: 1400, orders: 50, avgOrder: 28.00 },
  { name: "Sat", surplus: 680, fresh: 1120, total: 1800, orders: 62, avgOrder: 29.03 },
  { name: "Sun", surplus: 380, fresh: 720, total: 1100, orders: 38, avgOrder: 28.95 },
];

const peakHoursData = [
  { hour: "11AM", capacity: 45, orders: 12, revenue: 340 },
  { hour: "12PM", capacity: 65, orders: 18, revenue: 520 },
  { hour: "1PM", capacity: 85, orders: 25, revenue: 750 },
  { hour: "2PM", capacity: 70, orders: 20, revenue: 580 },
  { hour: "6PM", capacity: 90, orders: 35, revenue: 980 },
  { hour: "7PM", capacity: 95, orders: 42, revenue: 1250 },
  { hour: "8PM", capacity: 88, orders: 38, revenue: 1080 },
  { hour: "9PM", capacity: 60, orders: 22, revenue: 640 },
];

const wasteReductionData = [
  { month: "Jan", foodSaved: 450, co2Saved: 67, wasteReduction: 72 },
  { month: "Feb", foodSaved: 520, co2Saved: 78, wasteReduction: 75 },
  { month: "Mar", foodSaved: 680, co2Saved: 102, wasteReduction: 78 },
  { month: "Apr", foodSaved: 590, co2Saved: 88, wasteReduction: 76 },
  { month: "May", foodSaved: 720, co2Saved: 108, wasteReduction: 82 },
  { month: "Jun", foodSaved: 850, co2Saved: 127, wasteReduction: 85 },
];

const customerInsights = [
  { segment: "Regular Customers", percentage: 35, revenue: 4200, orders: 145 },
  { segment: "New Customers", percentage: 40, revenue: 2800, orders: 95 },
  { segment: "Peak Hour Customers", percentage: 25, revenue: 3500, orders: 85 },
];

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate key metrics
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.total, 0);
  const totalOrders = revenueData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const surplusRevenue = revenueData.reduce((sum, day) => sum + day.surplus, 0);
  const freshRevenue = revenueData.reduce((sum, day) => sum + day.fresh, 0);
  const surplusPercentage = (surplusRevenue / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track performance, optimize revenue, and reduce waste
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="12m">Last 12 months</option>
          </select>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +12.5% vs last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${avgOrderValue.toFixed(2)}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +8.3% vs last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</div>
            <div className="flex items-center text-sm text-blue-600 mt-1">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +5.2% vs last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Surplus Revenue Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{surplusPercentage.toFixed(1)}%</div>
            <div className="flex items-center text-sm text-orange-600 mt-1">
              <ArrowDownIcon className="h-4 w-4 mr-1" />
              -2.1% vs last week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <UserGroupIcon className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            Impact
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Surplus vs Fresh Experience revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="surplus" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                      <Area type="monotone" dataKey="fresh" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Peak Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Hour Performance</CardTitle>
                <CardDescription>Kitchen capacity vs order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="capacity" fill="#06b6d4" name="Kitchen Capacity %" />
                      <Bar dataKey="orders" fill="#10b981" name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    🎯 Peak Hour Optimization
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    7-8 PM shows highest capacity (95%) and revenue. Consider increasing fresh experience pricing by 15% during this window.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    📈 AOV Growth Opportunity
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Your AOV is $30.14, 18% above industry average. Cross-selling recommendations could push this to $35+.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    🔄 Surplus Balance
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    Surplus revenue at 44% is healthy. Tuesday shows potential for more aggressive surplus pricing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Daily Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Trend</CardTitle>
                <CardDescription>Total revenue over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke="#059669" strokeWidth={3} />
                      <Line type="monotone" dataKey="surplus" stroke="#f59e0b" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="fresh" stroke="#8b5cf6" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Mix */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Source Mix</CardTitle>
                <CardDescription>Distribution of revenue by bag type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={[
                          { name: "Fresh Experiences", value: freshRevenue, color: "#8b5cf6" },
                          { name: "Surplus Bags", value: surplusRevenue, color: "#f59e0b" }
                        ]} 
                        dataKey="value" 
                        nameKey="name" 
                        outerRadius={100} 
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Capacity vs Order Volume</CardTitle>
              <CardDescription>Optimize kitchen efficiency and customer wait times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="capacity" 
                      stroke="#06b6d4" 
                      fill="#06b6d4" 
                      fillOpacity={0.6}
                      name="Kitchen Capacity %"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Orders"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Revenue contribution by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerInsights.map((segment) => (
                    <div key={segment.segment} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">{segment.segment}</h4>
                        <p className="text-sm text-gray-600">{segment.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${segment.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{segment.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Ratings and feedback trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-500">4.8</span>
                      <span className="text-sm text-gray-600">/5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-20">Food Quality</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm">4.6</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-20">Value</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                      <span className="text-sm">4.8</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-20">Service</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Track your sustainability metrics and food rescue impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wasteReductionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="foodSaved" stackId="1" stroke="#10b981" fill="#10b981" name="Food Saved (lbs)" />
                    <Area type="monotone" dataKey="co2Saved" stackId="2" stroke="#06b6d4" fill="#06b6d4" name="CO₂ Saved (lbs)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3,850</div>
                  <p className="text-sm text-gray-600">Pounds of Food Rescued</p>
                  <p className="text-xs text-gray-500 mt-1">Equivalent to 3,200 meals</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">570</div>
                  <p className="text-sm text-gray-600">lbs CO₂ Emissions Saved</p>
                  <p className="text-xs text-gray-500 mt-1">Equal to 1,200 miles driven</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">78%</div>
                  <p className="text-sm text-gray-600">Average Waste Reduction</p>
                  <p className="text-xs text-gray-500 mt-1">Above industry average of 65%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
