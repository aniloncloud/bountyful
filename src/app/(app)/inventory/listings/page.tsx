"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PhotoIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "surplus" | "fresh";
  currentPrice: number;
  originalPrice: number;
  aiSuggestedPrice?: number;
  quantity: number;
  originalQuantity: number;
  status: "active" | "paused" | "draft" | "expired" | "sold_out";
  createdAt: Date;
  expiresAt: Date;
  image: string;
  
  // Performance metrics
  views: number;
  addToCarts: number;
  sales: number;
  conversionRate: number;
  revenue: number;
  
  // AI pricing data
  lastPriceUpdate: Date;
  priceHistory: Array<{ time: Date; price: number; reason: string }>;
  aiConfidence?: number;
  
  // Additional data
  dietaryInfo?: string[];
  allergenInfo?: string;
  pickupInstructions?: string;
}

export default function InventoryListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Mock comprehensive inventory data
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "inv-001",
      name: "Chef's Pasta Special Magic Bag",
      description: "A delightful mix of our signature pasta dishes, fresh bread, and seasonal vegetables",
      category: "magic-bag",
      type: "surplus",
      currentPrice: 12.99,
      originalPrice: 38.99,
      aiSuggestedPrice: 9.99,
      quantity: 8,
      originalQuantity: 20,
      status: "active",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 45 * 60 * 1000),
      image: "/api/placeholder/80/80",
      views: 156,
      addToCarts: 23,
      sales: 12,
      conversionRate: 14.7,
      revenue: 155.88,
      lastPriceUpdate: new Date(Date.now() - 30 * 60 * 1000),
      priceHistory: [
        { time: new Date(Date.now() - 120 * 60 * 1000), price: 15.99, reason: "Initial pricing" },
        { time: new Date(Date.now() - 60 * 60 * 1000), price: 12.99, reason: "AI volume adjustment" },
        { time: new Date(Date.now() - 30 * 60 * 1000), price: 9.99, reason: "Urgency boost pending" }
      ],
      aiConfidence: 87,
      dietaryInfo: ["vegetarian-option"],
      allergenInfo: "Contains gluten, dairy",
      pickupInstructions: "Ask for Maria at the front counter"
    },
    {
      id: "inv-002", 
      name: "Italian Surprise Box",
      description: "Fresh made-to-order Italian specialties featuring our daily chef's selection",
      category: "magic-bag",
      type: "surplus",
      currentPrice: 4.99,
      originalPrice: 14.99,
      aiSuggestedPrice: 6.99,
      quantity: 12,
      originalQuantity: 25,
      status: "active",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 120 * 60 * 1000),
      image: "/api/placeholder/80/80",
      views: 89,
      addToCarts: 15,
      sales: 13,
      conversionRate: 16.9,
      revenue: 64.87,
      lastPriceUpdate: new Date(Date.now() - 10 * 60 * 1000),
      priceHistory: [
        { time: new Date(Date.now() - 180 * 60 * 1000), price: 8.99, reason: "Initial AI pricing" },
        { time: new Date(Date.now() - 90 * 60 * 1000), price: 6.99, reason: "Engagement-based increase" },
        { time: new Date(Date.now() - 10 * 60 * 1000), price: 4.99, reason: "Manual override" }
      ],
      aiConfidence: 92,
      dietaryInfo: ["gluten-free-option"],
      pickupInstructions: "Ring bell at side entrance"
    },
    {
      id: "inv-003",
      name: "Premium Fresh Experience",
      description: "Made-to-order gourmet experience with premium ingredients and chef interaction",
      category: "fresh-experience",
      type: "fresh",
      currentPrice: 24.99,
      originalPrice: 24.99,
      quantity: 6,
      originalQuantity: 10,
      status: "active",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
      image: "/api/placeholder/80/80",
      views: 67,
      addToCarts: 12,
      sales: 4,
      conversionRate: 17.9,
      revenue: 99.96,
      lastPriceUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priceHistory: [
        { time: new Date(Date.now() - 4 * 60 * 60 * 1000), price: 24.99, reason: "Fixed fresh experience pricing" }
      ],
      dietaryInfo: ["dairy-free", "nut-free"],
      pickupInstructions: "Chef interaction required - allow 15 minutes"
    },
    {
      id: "inv-004",
      name: "Morning Pastry Selection",
      description: "Fresh baked pastries and coffee pairing from this morning's batch",
      category: "bakery",
      type: "surplus",
      currentPrice: 3.99,
      originalPrice: 12.99,
      aiSuggestedPrice: 2.99,
      quantity: 0,
      originalQuantity: 15,
      status: "sold_out",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      image: "/api/placeholder/80/80",
      views: 234,
      addToCarts: 35,
      sales: 15,
      conversionRate: 15.0,
      revenue: 59.85,
      lastPriceUpdate: new Date(Date.now() - 3 * 60 * 60 * 1000),
      priceHistory: [
        { time: new Date(Date.now() - 8 * 60 * 60 * 1000), price: 6.99, reason: "Morning pricing" },
        { time: new Date(Date.now() - 4 * 60 * 60 * 1000), price: 3.99, reason: "AI clearance pricing" },
        { time: new Date(Date.now() - 3 * 60 * 60 * 1000), price: 2.99, reason: "Final clearance" }
      ],
      aiConfidence: 95,
      allergenInfo: "Contains gluten, eggs, dairy"
    },
    {
      id: "inv-005",
      name: "Seasonal Soup & Salad Combo",
      description: "Today's soup special with fresh garden salad and artisan bread",
      category: "combo",
      type: "surplus",
      currentPrice: 7.99,
      originalPrice: 16.99,
      quantity: 5,
      originalQuantity: 18,
      status: "paused",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      image: "/api/placeholder/80/80",
      views: 45,
      addToCarts: 8,
      sales: 13,
      conversionRate: 17.8,
      revenue: 103.87,
      lastPriceUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priceHistory: [
        { time: new Date(Date.now() - 4 * 60 * 60 * 1000), price: 9.99, reason: "Initial pricing" },
        { time: new Date(Date.now() - 2 * 60 * 60 * 1000), price: 7.99, reason: "Time-based discount" }
      ],
      dietaryInfo: ["vegetarian", "dairy-free-option"],
      allergenInfo: "May contain nuts"
    }
  ]);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "magic-bag", label: "Magic Bags" },
    { id: "fresh-experience", label: "Fresh Experiences" },
    { id: "bakery", label: "Bakery Items" },
    { id: "combo", label: "Combos" },
    { id: "appetizers", label: "Appetizers" },
    { id: "main-dishes", label: "Main Dishes" },
    { id: "desserts", label: "Desserts" }
  ];

  const statusOptions = [
    { id: "all", label: "All Status" },
    { id: "active", label: "Active" },
    { id: "paused", label: "Paused" },
    { id: "draft", label: "Draft" },
    { id: "sold_out", label: "Sold Out" },
    { id: "expired", label: "Expired" }
  ];

  // Filter and sort logic
  const filteredItems = inventoryItems
    .filter(item => {
      if (activeTab !== "all") {
        const tabFilters = {
          active: (item: InventoryItem) => item.status === "active",
          performance: (item: InventoryItem) => item.sales > 0,
          ai_pricing: (item: InventoryItem) => !!item.aiSuggestedPrice,
          expiring: (item: InventoryItem) => {
            const hoursUntilExpiry = (item.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60);
            return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0;
          }
        };
        if (!tabFilters[activeTab as keyof typeof tabFilters]?.(item)) return false;
      }
      
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (selectedStatus !== "all" && item.status !== selectedStatus) return false;
      if (selectedType !== "all" && item.type !== selectedType) return false;
      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "name": aVal = a.name; bVal = b.name; break;
        case "price": aVal = a.currentPrice; bVal = b.currentPrice; break;
        case "revenue": aVal = a.revenue; bVal = b.revenue; break;
        case "conversion": aVal = a.conversionRate; bVal = b.conversionRate; break;
        case "expires": aVal = a.expiresAt.getTime(); bVal = b.expiresAt.getTime(); break;
        default: aVal = a.createdAt.getTime(); bVal = b.createdAt.getTime();
      }
      
      if (typeof aVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      return sortOrder === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  // Summary stats
  const totalRevenue = inventoryItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalViews = inventoryItems.reduce((sum, item) => sum + item.views, 0);
  const totalSales = inventoryItems.reduce((sum, item) => sum + item.sales, 0);
  const avgConversion = totalViews > 0 ? (totalSales / totalViews) * 100 : 0;
  const activeItemsCount = inventoryItems.filter(item => item.status === "active").length;
  const expiringCount = inventoryItems.filter(item => {
    const hoursUntilExpiry = (item.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0;
  }).length;

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
      expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      sold_out: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getUrgencyIndicator = (expiresAt: Date) => {
    const hoursLeft = (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursLeft <= 0) return { color: "text-red-600", label: "Expired" };
    if (hoursLeft <= 1) return { color: "text-red-600", label: `${Math.round(hoursLeft * 60)}m left` };
    if (hoursLeft <= 2) return { color: "text-orange-600", label: `${Math.round(hoursLeft)}h left` };
    return { color: "text-gray-600", label: `${Math.round(hoursLeft)}h left` };
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    // In real app, would call API
    setSelectedItems([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Listings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your surplus bags and fresh experiences with AI-powered optimization
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
          <Link href="/inventory/new">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <div className="text-2xl font-bold text-blue-600">{activeItemsCount}</div>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <div className="text-2xl font-bold text-purple-600">{totalViews}</div>
              </div>
              <EyeIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <div className="text-2xl font-bold text-orange-600">{avgConversion.toFixed(1)}%</div>
              </div>
              <ChartBarIcon className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <div className="text-2xl font-bold text-red-600">{expiringCount}</div>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Items ({inventoryItems.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeItemsCount})</TabsTrigger>
          <TabsTrigger value="performance">Top Performance</TabsTrigger>
          <TabsTrigger value="ai_pricing">AI Pricing</TabsTrigger>
          <TabsTrigger value="expiring">Expiring ({expiringCount})</TabsTrigger>
        </TabsList>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            {statusOptions.map(status => (
              <option key={status.id} value={status.id}>{status.label}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Types</option>
            <option value="surplus">Surplus</option>
            <option value="fresh">Fresh Experience</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="created">Created Date</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="revenue">Revenue</option>
            <option value="conversion">Conversion</option>
            <option value="expires">Expires</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <ArrowTrendingUpIcon className="h-4 w-4" /> : <ArrowTrendingDownIcon className="h-4 w-4" />}
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium">
                {selectedItems.length} items selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("pause")}>
                  <PauseIcon className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("activate")}>
                  <PlayIcon className="h-4 w-4 mr-1" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("delete")}>
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Items Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(filteredItems.map(item => item.id));
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                          checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Item</th>
                      <th className="px-4 py-3 text-left font-medium">Type</th>
                      <th className="px-4 py-3 text-left font-medium">Pricing</th>
                      <th className="px-4 py-3 text-left font-medium">Stock</th>
                      <th className="px-4 py-3 text-left font-medium">Performance</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Expires</th>
                      <th className="px-4 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredItems.map((item) => {
                      const urgency = getUrgencyIndicator(item.expiresAt);
                      return (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <PhotoIcon className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                  {item.description}
                                </div>
                                <div className="text-xs text-gray-500">{item.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === "fresh" 
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            }`}>
                              {item.type === "fresh" ? "Fresh" : "Surplus"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">${item.currentPrice}</div>
                              {item.originalPrice !== item.currentPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${item.originalPrice}
                                </div>
                              )}
                              {item.aiSuggestedPrice && item.aiSuggestedPrice !== item.currentPrice && (
                                <div className="text-sm text-blue-600">
                                  AI: ${item.aiSuggestedPrice}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">
                                {item.quantity}/{item.originalQuantity}
                              </div>
                              <div className="text-xs text-gray-500">
                                {Math.round((1 - item.quantity/item.originalQuantity) * 100)}% sold
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-medium">{item.views}</span> views
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{item.sales}</span> sales
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.conversionRate.toFixed(1)}% conversion
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`text-sm ${urgency.color}`}>
                              <ClockIcon className="h-4 w-4 inline mr-1" />
                              {urgency.label}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or create your first listing.
                </p>
                <Link href="/inventory/new">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create New Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}


