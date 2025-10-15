"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChartBarIcon,
  CpuChipIcon,
  ClockIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

interface PricingDecision {
  id: string;
  itemName: string;
  originalPrice: number;
  currentPrice: number;
  suggestedPrice: number;
  discountPercent: number;
  reasoning: string[];
  factors: {
    surplusVolume: number;
    pickupUrgency: number; // minutes until pickup deadline
    userEngagement: number; // views/clicks in last hour
    demandScore: number;
    weatherFactor: number;
    competitionPrice?: number;
  };
  performance: {
    viewsIncrease: number;
    addToCartRate: number;
    conversionRate: number;
    revenueImpact: number;
  };
  timestamp: Date;
  status: 'active' | 'manual_override' | 'pending_approval';
  aiConfidence: number; // 0-100
}

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  originalStock: number;
  expiresAt: Date;
  currentPrice: number;
  originalPrice: number;
  views: number;
  addToCarts: number;
  sales: number;
  aiSuggestedPrice: number;
  priceHistory: Array<{ time: Date; price: number; reason: string }>;
}

export default function DynamicPricingPage() {
  const [aiPricingEnabled, setAiPricingEnabled] = useState(true);
  const [autoApproveEnabled, setAutoApproveEnabled] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [activeTab, setActiveTab] = useState("realtime");

  // Mock data - in real app would come from AI pricing service
  const [pricingDecisions] = useState<PricingDecision[]>([
    {
      id: "pd-001",
      itemName: "Chef's Pasta Special",
      originalPrice: 38.99,
      currentPrice: 12.99,
      suggestedPrice: 9.99,
      discountPercent: 74,
      reasoning: [
        "High surplus volume (8 units remaining)",
        "Pickup deadline in 45 minutes (urgent)",
        "Low engagement (3 views in last hour)",
        "Rainy weather detected (+10% discount boost)"
      ],
      factors: {
        surplusVolume: 8,
        pickupUrgency: 45,
        userEngagement: 3,
        demandScore: 0.3,
        weatherFactor: 1.1,
        competitionPrice: 11.50
      },
      performance: {
        viewsIncrease: 150,
        addToCartRate: 0.12,
        conversionRate: 0.08,
        revenueImpact: 23.50
      },
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'active',
      aiConfidence: 87
    },
    {
      id: "pd-002", 
      itemName: "Italian Surprise Box",
      originalPrice: 14.99,
      currentPrice: 4.99,
      suggestedPrice: 6.99,
      discountPercent: 53,
      reasoning: [
        "Moderate surplus (12 units)",
        "Good engagement (15 views/hour)",
        "Peak pickup window approaching",
        "Price testing indicates higher acceptance at $6.99"
      ],
      factors: {
        surplusVolume: 12,
        pickupUrgency: 120,
        userEngagement: 15,
        demandScore: 0.7,
        weatherFactor: 1.0
      },
      performance: {
        viewsIncrease: 80,
        addToCartRate: 0.18,
        conversionRate: 0.15,
        revenueImpact: 45.20
      },
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'pending_approval',
      aiConfidence: 92
    }
  ]);

  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "inv-001",
      name: "Chef's Pasta Special",
      currentStock: 8,
      originalStock: 20,
      expiresAt: new Date(Date.now() + 45 * 60 * 1000),
      currentPrice: 12.99,
      originalPrice: 38.99,
      views: 23,
      addToCarts: 3,
      sales: 12,
      aiSuggestedPrice: 9.99,
      priceHistory: [
        { time: new Date(Date.now() - 60 * 60 * 1000), price: 15.99, reason: "Initial AI pricing" },
        { time: new Date(Date.now() - 30 * 60 * 1000), price: 12.99, reason: "Volume-based reduction" },
        { time: new Date(), price: 9.99, reason: "Urgency + weather boost" }
      ]
    },
    {
      id: "inv-002",
      name: "Italian Surprise Box", 
      currentStock: 12,
      originalStock: 25,
      expiresAt: new Date(Date.now() + 120 * 60 * 1000),
      currentPrice: 4.99,
      originalPrice: 14.99,
      views: 45,
      addToCarts: 8,
      sales: 13,
      aiSuggestedPrice: 6.99,
      priceHistory: [
        { time: new Date(Date.now() - 120 * 60 * 1000), price: 8.99, reason: "Smart initial pricing" },
        { time: new Date(Date.now() - 60 * 60 * 1000), price: 6.99, reason: "Engagement-based increase" },
        { time: new Date(Date.now() - 10 * 60 * 1000), price: 4.99, reason: "Manual override by staff" }
      ]
    }
  ]);

  // Performance data over time
  const performanceData = [
    { time: "10:00", aiRevenue: 245, manualRevenue: 180, clearanceRate: 65, engagement: 120 },
    { time: "11:00", aiRevenue: 320, manualRevenue: 210, clearanceRate: 78, engagement: 150 },
    { time: "12:00", aiRevenue: 450, manualRevenue: 290, clearanceRate: 82, engagement: 200 },
    { time: "13:00", aiRevenue: 380, manualRevenue: 250, clearanceRate: 75, engagement: 180 },
    { time: "14:00", aiRevenue: 520, manualRevenue: 320, clearanceRate: 88, engagement: 240 },
    { time: "15:00", aiRevenue: 680, manualRevenue: 380, clearanceRate: 92, engagement: 280 },
  ];

  const approvePricingDecision = (decisionId: string) => {
    // In real app, would call API to apply the AI-suggested price
    console.log("Approving pricing decision:", decisionId);
  };

  const overridePricingDecision = (decisionId: string, newPrice: number) => {
    // In real app, would call API to override with manual price
    console.log("Overriding pricing decision:", decisionId, "with price:", newPrice);
  };

  const getUrgencyColor = (minutes: number) => {
    if (minutes < 30) return "text-red-600 bg-red-50";
    if (minutes < 60) return "text-orange-600 bg-orange-50"; 
    return "text-gray-600 bg-gray-50";
  };

  const getEngagementColor = (score: number) => {
    if (score > 0.7) return "text-green-600";
    if (score > 0.4) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CpuChipIcon className="h-8 w-8 text-blue-600" />
            AI Dynamic Pricing
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Real-time AI optimization to clear more inventory at optimal prices
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={aiPricingEnabled}
              onChange={setAiPricingEnabled}
            />
            <span className="text-sm font-medium">AI Pricing {aiPricingEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={autoApproveEnabled}
              onChange={setAutoApproveEnabled}
            />
            <span className="text-sm font-medium">Auto-Approve</span>
          </div>
          
          <Button variant="outline" size="sm">
            <Cog6ToothIcon className="h-4 w-4 mr-2" />
            Pricing Settings
          </Button>
        </div>
      </div>

      {/* AI Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Decisions</p>
                <div className="text-2xl font-bold text-blue-600">
                  {pricingDecisions.filter(d => d.status === 'active').length}
                </div>
              </div>
              <CpuChipIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <div className="text-2xl font-bold text-orange-600">
                  {pricingDecisions.filter(d => d.status === 'pending_approval').length}
                </div>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Uplift</p>
                <div className="text-2xl font-bold text-green-600">+47.3%</div>
              </div>
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clearance Rate</p>
                <div className="text-2xl font-bold text-purple-600">92%</div>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-Time Decisions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Optimization</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="algorithms">AI Algorithms</TabsTrigger>
        </TabsList>

        {/* Real-Time Decisions */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="space-y-4">
            {pricingDecisions.map((decision) => (
              <Card key={decision.id} className={`border-l-4 ${
                decision.status === 'active' ? 'border-l-green-500' :
                decision.status === 'pending_approval' ? 'border-l-orange-500' :
                'border-l-gray-500'
              }`}>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Decision Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{decision.itemName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          decision.status === 'active' ? 'bg-green-100 text-green-800' :
                          decision.status === 'pending_approval' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {decision.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Original</p>
                          <p className="font-medium line-through">${decision.originalPrice}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Current</p>
                          <p className="font-medium">${decision.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">AI Suggests</p>
                          <p className="font-bold text-blue-600">${decision.suggestedPrice}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">AI Confidence:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${decision.aiConfidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{decision.aiConfidence}%</span>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">AI Reasoning:</h4>
                      <ul className="space-y-1 text-sm">
                        {decision.reasoning.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Key Factors */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className={`p-2 rounded text-xs ${getUrgencyColor(decision.factors.pickupUrgency)}`}>
                          <div className="font-medium">Urgency</div>
                          <div>{decision.factors.pickupUrgency} min left</div>
                        </div>
                        <div className="p-2 rounded text-xs bg-gray-50">
                          <div className="font-medium">Surplus</div>
                          <div>{decision.factors.surplusVolume} units</div>
                        </div>
                        <div className="p-2 rounded text-xs bg-gray-50">
                          <div className="font-medium">Views/Hour</div>
                          <div>{decision.factors.userEngagement}</div>
                        </div>
                        <div className="p-2 rounded text-xs bg-gray-50">
                          <div className="font-medium">Demand</div>
                          <div className={getEngagementColor(decision.factors.demandScore)}>
                            {(decision.factors.demandScore * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance & Actions */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Expected Performance:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Views Increase:</span>
                          <span className="text-green-600">+{decision.performance.viewsIncrease}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversion Rate:</span>
                          <span className="text-green-600">{(decision.performance.conversionRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue Impact:</span>
                          <span className="text-green-600">+${decision.performance.revenueImpact}</span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="space-y-2 mt-4">
                        {decision.status === 'pending_approval' && (
                          <>
                            <Button
                              onClick={() => approvePricingDecision(decision.id)}
                              className="w-full bg-green-600 hover:bg-green-700"
                              size="sm"
                            >
                              Approve ${decision.suggestedPrice}
                            </Button>
                            <Button
                              onClick={() => overridePricingDecision(decision.id, decision.currentPrice)}
                              variant="outline"
                              className="w-full"
                              size="sm"
                            >
                              Keep Current Price
                            </Button>
                          </>
                        )}
                        
                        {decision.status === 'active' && (
                          <div className="text-xs text-gray-500 text-center">
                            Applied {Math.floor((Date.now() - decision.timestamp.getTime()) / (1000 * 60))} min ago
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inventory Optimization */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Clearance Optimization</CardTitle>
              <CardDescription>
                AI-powered pricing to maximize clearance while optimizing revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inventoryItems.map((item) => {
                  const timeUntilExpiry = item.expiresAt.getTime() - Date.now();
                  const minutesLeft = Math.floor(timeUntilExpiry / (1000 * 60));
                  const clearanceRate = ((item.originalStock - item.currentStock) / item.originalStock) * 100;
                  
                  return (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        
                        {/* Item Info */}
                        <div>
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Stock:</span>
                              <span>{item.currentStock}/{item.originalStock}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Clearance:</span>
                              <span className={clearanceRate > 70 ? "text-green-600" : clearanceRate > 40 ? "text-yellow-600" : "text-red-600"}>
                                {clearanceRate.toFixed(0)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time Left:</span>
                              <span className={minutesLeft < 60 ? "text-red-600" : minutesLeft < 120 ? "text-orange-600" : "text-gray-600"}>
                                {minutesLeft < 60 ? `${minutesLeft}m` : `${Math.floor(minutesLeft/60)}h ${minutesLeft%60}m`}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Pricing */}
                        <div>
                          <h4 className="font-medium mb-2">Pricing</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Original:</span>
                              <span className="line-through">${item.originalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current:</span>
                              <span className="font-medium">${item.currentPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>AI Suggests:</span>
                              <span className="font-bold text-blue-600">${item.aiSuggestedPrice}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Engagement */}
                        <div>
                          <h4 className="font-medium mb-2">Engagement</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Views:</span>
                              <span>{item.views}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Add to Cart:</span>
                              <span>{item.addToCarts}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Conversion:</span>
                              <span>{item.views > 0 ? ((item.addToCarts/item.views) * 100).toFixed(1) : 0}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => approvePricingDecision(`ai-${item.id}`)}
                          >
                            Apply AI Price
                          </Button>
                          <Button variant="outline" size="sm">
                            Manual Override
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Revenue Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>AI vs Manual Pricing Revenue</CardTitle>
                <CardDescription>Real-time performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="aiRevenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} name="AI Pricing" />
                      <Area type="monotone" dataKey="manualRevenue" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Manual Pricing" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Clearance Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Clearance Rate</CardTitle>
                <CardDescription>How effectively AI pricing clears surplus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="clearanceRate" stroke="#10b981" strokeWidth={3} name="Clearance Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Today's AI Pricing Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+47.3%</div>
                  <p className="text-sm text-gray-600">Revenue Increase</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <p className="text-sm text-gray-600">Clearance Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <p className="text-sm text-gray-600">Price Adjustments</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$1,247</div>
                  <p className="text-sm text-gray-600">Extra Revenue</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">89%</div>
                  <p className="text-sm text-gray-600">Waste Reduction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Algorithms */}
        <TabsContent value="algorithms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Pricing Algorithm Insights</CardTitle>
              <CardDescription>
                How our AI makes intelligent pricing decisions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Algorithm Factors */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-orange-500" />
                    Pickup Urgency Algorithm
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{"<30 min"}</span>
                      <span className="text-red-600">Max discount boost (+20%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>30-60 min</span>
                      <span className="text-orange-600">Medium boost (+10%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{"60+ min"}</span>
                      <span className="text-gray-600">Standard pricing</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ChartBarIcon className="h-5 w-5 text-blue-500" />
                    Surplus Volume Impact
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{"<25% left"}</span>
                      <span className="text-red-600">Aggressive pricing (-15%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-50% left</span>
                      <span className="text-orange-600">Moderate pricing (-8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{">50% left"}</span>
                      <span className="text-gray-600">Conservative pricing</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <EyeIcon className="h-5 w-5 text-green-500" />
                    User Engagement Factor
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>High engagement</span>
                      <span className="text-green-600">Price increase (+$1-2)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low engagement</span>
                      <span className="text-red-600">Price decrease (-$1-3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>No engagement</span>
                      <span className="text-red-600">Max discount</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-purple-500" />
                    Demand Prediction
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peak hours</span>
                      <span className="text-green-600">Premium pricing (+10%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weather impact</span>
                      <span className="text-blue-600">Dynamic adjustment</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Historical data</span>
                      <span className="text-purple-600">Pattern-based pricing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Algorithm Performance */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Algorithm Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <p className="text-sm text-gray-600">Prediction Accuracy</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">89ms</div>
                    <p className="text-sm text-gray-600">Decision Speed</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">97.1%</div>
                    <p className="text-sm text-gray-600">Approval Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}