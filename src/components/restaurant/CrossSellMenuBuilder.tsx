"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusIcon,
  PhotoIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  XMarkIcon,
  SparklesIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";

interface CrossSellItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "side" | "drink" | "dessert" | "experience";
  prepTime: number; // minutes
  image: string;
  active: boolean;
  popularPairing: string;
}

export function CrossSellMenuBuilder() {
  const [crossSellItems, setCrossSellItems] = useState<CrossSellItem[]>([
    {
      id: "cs-1",
      name: "Garlic Bread",
      description: "Fresh-baked with herbs",
      price: 3.99,
      category: "side",
      prepTime: 5,
      image: "/api/placeholder/100/100",
      active: true,
      popularPairing: "Pasta dishes"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "side" as const,
    prepTime: 5,
    popularPairing: ""
  });

  const categories = [
    { id: "appetizer", label: "Appetizers", icon: "🥗", description: "Quick starters that pair well" },
    { id: "side", label: "Sides", icon: "🥖", description: "Perfect accompaniments" },
    { id: "drink", label: "Drinks", icon: "🥤", description: "Beverage pairings" },
    { id: "dessert", label: "Desserts", icon: "🍰", description: "Sweet endings" },
    { id: "experience", label: "Experiences", icon: "👨‍🍳", description: "Chef interactions & add-ons" }
  ];

  const suggestedItems = {
    italian: [
      { name: "Garlic Bread", category: "side", price: 3.99, pairing: "Pasta dishes" },
      { name: "Caesar Salad", category: "appetizer", price: 5.99, pairing: "Italian mains" },
      { name: "Wine Pairing", category: "drink", price: 8.99, pairing: "Dinner experiences" },
      { name: "Tiramisu", category: "dessert", price: 4.99, pairing: "Italian meals" },
      { name: "Chef's Table Chat", category: "experience", price: 2.99, pairing: "Peak hours" }
    ],
    sushi: [
      { name: "Miso Soup", category: "appetizer", price: 2.49, pairing: "Sushi orders" },
      { name: "Edamame", category: "side", price: 3.49, pairing: "All Japanese food" },
      { name: "Sake Flight", category: "drink", price: 12.99, pairing: "Premium experiences" },
      { name: "Mochi Ice Cream", category: "dessert", price: 4.99, pairing: "Sushi meals" }
    ]
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price > 0) {
      const item: CrossSellItem = {
        id: `cs-${Date.now()}`,
        ...newItem,
        image: "/api/placeholder/100/100",
        active: true
      };
      setCrossSellItems(prev => [...prev, item]);
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "side",
        prepTime: 5,
        popularPairing: ""
      });
      setIsAdding(false);
    }
  };

  const handleQuickAdd = (suggested: any) => {
    const item: CrossSellItem = {
      id: `cs-${Date.now()}`,
      name: suggested.name,
      description: `Popular ${suggested.category} option`,
      price: suggested.price,
      category: suggested.category as any,
      prepTime: 5,
      image: "/api/placeholder/100/100",
      active: true,
      popularPairing: suggested.pairing
    };
    setCrossSellItems(prev => [...prev, item]);
  };

  const toggleItemActive = (id: string) => {
    setCrossSellItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCrossSellItems(prev => prev.filter(item => item.id !== id));
  };

  const getRevenueProjection = () => {
    const avgCrossSellRate = 0.3; // 30% of customers add cross-sell items
    const avgMonthlyOrders = 200;
    const avgCrossSellValue = crossSellItems.reduce((sum, item) => sum + item.price, 0) / crossSellItems.length;
    
    return avgCrossSellRate * avgMonthlyOrders * avgCrossSellValue;
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Strategy */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-purple-600" />
            Cross-Sell Menu Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Curate 8-12 high-margin items that perfectly complement your surprise bags
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            +${getRevenueProjection().toFixed(0)}/month
          </div>
          <div className="text-sm text-gray-500">Projected additional revenue</div>
        </div>
      </div>

      {/* Strategy Tips */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <LightBulbIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Smart Cross-Sell Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-400">
                <div>
                  <strong>Best Performers:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Quick-prep items (≤10 min)</li>
                    <li>• High-margin add-ons (60%+ margin)</li>
                    <li>• Perfect pairings (bread + pasta)</li>
                  </ul>
                </div>
                <div>
                  <strong>Peak Opportunities:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Chef interactions during busy hours</li>
                    <li>• Premium drinks with experiences</li>
                    <li>• Desserts for complete meals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Cross-Sell Menu ({crossSellItems.length}/12)</h3>
          <Button 
            onClick={() => setIsAdding(true)}
            disabled={crossSellItems.length >= 12}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crossSellItems.map((item) => (
            <Card key={item.id} className={`transition-all ${item.active ? 'border-green-300 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 opacity-75'}`}>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  
                  {/* Item Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize">
                      {categories.find(c => c.id === item.category)?.icon} {item.category}
                    </span>
                    {item.prepTime <= 5 && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Quick Prep
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">${item.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4 text-blue-600" />
                      <span>{item.prepTime}min</span>
                    </div>
                  </div>

                  {/* Pairing Info */}
                  <div className="text-xs text-purple-600 dark:text-purple-400">
                    💡 Perfect with: {item.popularPairing}
                  </div>

                  {/* Toggle Active */}
                  <Button
                    size="sm"
                    variant={item.active ? "default" : "outline"}
                    onClick={() => toggleItemActive(item.id)}
                    className="w-full"
                  >
                    {item.active ? "Active" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Add Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add: Popular Cross-Sell Items</CardTitle>
          <CardDescription>Based on your restaurant type and successful pairings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(suggestedItems).map(([cuisine, items]) => (
              <div key={cuisine}>
                <h4 className="font-medium capitalize mb-2">{cuisine} Restaurant Suggestions:</h4>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAdd(item)}
                      disabled={crossSellItems.some(existing => existing.name === item.name)}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.pairing}</div>
                      </div>
                      <div className="text-sm font-semibold">${item.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Item Modal */}
      {isAdding && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Add Cross-Sell Item</CardTitle>
            <CardDescription>Add a high-margin item that pairs well with your surprise bags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Item Name</Label>
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Garlic Bread"
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="3.99"
                />
              </div>
            </div>
            
            <div>
              <Label>Description</Label>
              <Input
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Fresh-baked with herbs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Prep Time (min)</Label>
                <Input
                  type="number"
                  value={newItem.prepTime}
                  onChange={(e) => setNewItem(prev => ({ ...prev, prepTime: parseInt(e.target.value) || 5 }))}
                />
              </div>
              <div>
                <Label>Pairs With</Label>
                <Input
                  value={newItem.popularPairing}
                  onChange={(e) => setNewItem(prev => ({ ...prev, popularPairing: e.target.value }))}
                  placeholder="Pasta dishes"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddItem} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Add Item
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}