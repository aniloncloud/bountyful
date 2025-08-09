"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  SparklesIcon, 
  CpuChipIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  CalendarIcon,
  BeakerIcon,
  GiftIcon,
  ArrowPathIcon,
  PlusIcon,
  EyeIcon,
  HeartIcon,
  StarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

interface MagicBagTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  timeSlot: string;
  averageValue: number;
  suggestedPrice: number;
  popularity: number;
  surpriseScore: number;
  ingredients: string[];
  allergenWarnings: string[];
  dietaryTags: string[];
  customerRating: number;
  totalSales: number;
  active: boolean;
}

interface CustomerPreference {
  category: string;
  preference: string;
  strength: number; // 0-100
  lastUpdated: Date;
  sampleSize: number;
}

interface AIContentSuggestion {
  itemName: string;
  reason: string;
  confidence: number;
  estimatedValue: number;
  allergens?: string[];
  matchScore: number;
}

export default function MagicBagsPage() {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [autoSchedulingEnabled, setAutoSchedulingEnabled] = useState(true);

  // Mock data for magic bag templates
  const [templates] = useState<MagicBagTemplate[]>([
    {
      id: "template-1",
      name: "Chef's Morning Surprise",
      description: "Fresh breakfast pastries, coffee pairing, and seasonal fruit selection",
      category: "breakfast",
      timeSlot: "06:00-11:00",
      averageValue: 18.50,
      suggestedPrice: 6.99,
      popularity: 87,
      surpriseScore: 92,
      ingredients: ["Fresh pastries", "Seasonal fruit", "Artisan coffee", "Yogurt parfait"],
      allergenWarnings: ["Contains gluten", "Contains dairy", "May contain nuts"],
      dietaryTags: ["Vegetarian options available"],
      customerRating: 4.8,
      totalSales: 342,
      active: true
    },
    {
      id: "template-2", 
      name: "Italian Lunch Adventure",
      description: "Authentic Italian dishes featuring pasta, seasonal vegetables, and artisan bread",
      category: "lunch",
      timeSlot: "11:00-15:00",
      averageValue: 28.75,
      suggestedPrice: 9.99,
      popularity: 94,
      surpriseScore: 85,
      ingredients: ["Fresh pasta", "Seasonal vegetables", "Artisan bread", "House salad"],
      allergenWarnings: ["Contains gluten", "Contains dairy"],
      dietaryTags: ["Vegetarian", "Vegan options"],
      customerRating: 4.9,
      totalSales: 567,
      active: true
    },
    {
      id: "template-3",
      name: "Sunset Comfort Box",
      description: "Hearty comfort foods perfect for dinner, featuring seasonal proteins and sides",
      category: "dinner",
      timeSlot: "16:00-21:00",
      averageValue: 35.20,
      suggestedPrice: 12.99,
      popularity: 76,
      surpriseScore: 88,
      ingredients: ["Seasonal protein", "Roasted vegetables", "Comfort sides", "Dessert treat"],
      allergenWarnings: ["Contains gluten", "May contain nuts", "Contains dairy"],
      dietaryTags: ["Gluten-free options"],
      customerRating: 4.7,
      totalSales: 423,
      active: true
    },
    {
      id: "template-4",
      name: "Healthy Green Box",
      description: "Plant-based selections with fresh salads, grain bowls, and green smoothies",
      category: "healthy",
      timeSlot: "09:00-20:00",
      averageValue: 22.40,
      suggestedPrice: 8.99,
      popularity: 82,
      surpriseScore: 78,
      ingredients: ["Fresh greens", "Ancient grains", "Plant proteins", "Green smoothie"],
      allergenWarnings: ["May contain nuts", "Contains sesame"],
      dietaryTags: ["Vegan", "Gluten-free", "Dairy-free"],
      customerRating: 4.6,
      totalSales: 298,
      active: true
    }
  ]);

  // Customer preference insights
  const [customerPreferences] = useState<CustomerPreference[]>([
    { category: "Cuisine", preference: "Italian", strength: 73, lastUpdated: new Date(), sampleSize: 1250 },
    { category: "Dietary", preference: "Vegetarian-friendly", strength: 68, lastUpdated: new Date(), sampleSize: 890 },
    { category: "Time", preference: "Lunch (11-15h)", strength: 82, lastUpdated: new Date(), sampleSize: 2100 },
    { category: "Value", preference: "Premium ($10-15)", strength: 59, lastUpdated: new Date(), sampleSize: 1680 },
    { category: "Surprise", preference: "High variety", strength: 91, lastUpdated: new Date(), sampleSize: 1420 }
  ]);

  // AI content suggestions
  const [aiSuggestions] = useState<AIContentSuggestion[]>([
    {
      itemName: "Handmade Ravioli (4 pieces)",
      reason: "High surplus volume, matches Italian preference",
      confidence: 94,
      estimatedValue: 8.50,
      allergens: ["gluten", "dairy"],
      matchScore: 87
    },
    {
      itemName: "Seasonal Vegetable Medley",
      reason: "Customer preference for vegetables, expiring today",
      confidence: 89,
      estimatedValue: 6.20,
      matchScore: 82
    },
    {
      itemName: "Artisan Focaccia Bread",
      reason: "Complements Italian theme, freshly made",
      confidence: 91,
      estimatedValue: 4.50,
      allergens: ["gluten"],
      matchScore: 85
    },
    {
      itemName: "Tiramisu Cup",
      reason: "Premium dessert, high surprise factor",
      confidence: 86,
      estimatedValue: 7.80,
      allergens: ["dairy", "eggs"],
      matchScore: 79
    }
  ]);

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      lunch: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      dinner: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      healthy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getSurpriseScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const createMagicBagFromTemplate = (templateId: string) => {
    console.log("Creating magic bag from template:", templateId);
    // In real app, would call API to create new listing
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SparklesIcon className="h-8 w-8 text-purple-600" />
            {advancedMode ? "AI Magic Bag Studio" : "Magic Bag Creator"}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {advancedMode 
              ? "Create surprise bags with AI-powered content curation and customer preference learning"
              : "Create surprise bags quickly using smart templates and AI suggestions"
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {!advancedMode && (
            <div className="flex items-center gap-2">
              <Switch
                checked={aiSuggestionsEnabled}
                onCheckedChange={setAiSuggestionsEnabled}
              />
              <span className="text-sm font-medium">AI Suggestions</span>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAdvancedMode(!advancedMode)}
            className="flex items-center gap-2"
          >
            {advancedMode ? (
              <>
                <BoltIcon className="h-4 w-4" />
                Simple Mode
              </>
            ) : (
              <>
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                Advanced Mode
              </>
            )}
          </Button>
          
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <GiftIcon className="h-4 w-4 mr-2" />
            Create Custom Bag
          </Button>
        </div>
      </div>

      {/* Simple Mode Layout */}
      {!advancedMode ? (
        <div className="space-y-6">
          
          {/* Quick Templates - Simplified */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BeakerIcon className="h-5 w-5 text-purple-600" />
              Quick Templates
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">{template.customerRating}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{template.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-green-600">${template.suggestedPrice}</div>
                        <div className="text-xs text-gray-500">{template.timeSlot}</div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => createMagicBagFromTemplate(template.id)}
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Create Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Suggestions - Simplified */}
          {aiSuggestionsEnabled && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CpuChipIcon className="h-5 w-5 text-blue-600" />
                AI Suggestions for Today
              </h2>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-4">
                      Based on your current inventory and customer preferences
                    </div>
                    {aiSuggestions.slice(0, 3).map((suggestion, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{suggestion.itemName}</div>
                          <div className="text-xs text-gray-600">{suggestion.reason}</div>
                          <div className="text-xs text-green-600 font-medium">Est. Value: ${suggestion.estimatedValue}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-medium text-blue-600">
                            {suggestion.confidence}% match
                          </div>
                          <Button size="sm" variant="outline">
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <Card className="border-dashed border-2 border-gray-300 hover:border-purple-500 transition-colors">
            <CardContent className="pt-6">
              <div className="text-center">
                <GiftIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Need something specific?
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Create a custom magic bag with your own selection
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Build Custom Bag
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Advanced Mode - Full Interface */
        <div className="space-y-6">
          {/* AI Insights Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Templates</p>
                    <div className="text-2xl font-bold text-purple-600">
                      {templates.filter(t => t.active).length}
                    </div>
                  </div>
                  <BeakerIcon className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Surprise Score</p>
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(templates.reduce((sum, t) => sum + t.surpriseScore, 0) / templates.length)}
                    </div>
                  </div>
                  <BoltIcon className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <div className="text-2xl font-bold text-blue-600">
                      {templates.reduce((sum, t) => sum + t.totalSales, 0)}
                    </div>
                  </div>
                  <ChartBarIcon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Confidence</p>
                    <div className="text-2xl font-bold text-orange-600">94%</div>
                  </div>
                  <CpuChipIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Mode Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <BeakerIcon className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="ai-curation" className="flex items-center gap-2">
                <CpuChipIcon className="h-4 w-4" />
                AI Curation
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <UserGroupIcon className="h-4 w-4" />
                Customer Insights
              </TabsTrigger>
              <TabsTrigger value="scheduling" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Auto Scheduling
              </TabsTrigger>
            </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {template.name}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Switch checked={template.active} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">${template.suggestedPrice}</div>
                      <div className="text-xs text-gray-500">Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{template.popularity}%</div>
                      <div className="text-xs text-gray-500">Popularity</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getSurpriseScoreColor(template.surpriseScore)}`}>
                        {template.surpriseScore}
                      </div>
                      <div className="text-xs text-gray-500">Surprise Score</div>
                    </div>
                  </div>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span>{template.customerRating}</span>
                      <span className="text-gray-500">({template.totalSales} sold)</span>
                    </div>
                    <div className="text-gray-500">{template.timeSlot}</div>
                  </div>

                  {/* Ingredients Preview */}
                  <div>
                    <div className="text-sm font-medium mb-2">Typical Contents:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded">
                          {ingredient}
                        </span>
                      ))}
                      {template.ingredients.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded">
                          +{template.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => createMagicBagFromTemplate(template.id)}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Create Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />
                      Customize
                    </Button>
                    <Button size="sm" variant="outline">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Curation Tab */}
        <TabsContent value="ai-curation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CpuChipIcon className="h-5 w-5 text-blue-600" />
                AI Content Suggestions for Today's Italian Lunch Adventure
              </CardTitle>
              <CardDescription>
                Based on current surplus inventory, customer preferences, and surprise optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{suggestion.itemName}</div>
                      <div className="text-sm text-gray-600">{suggestion.reason}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Est. Value: ${suggestion.estimatedValue} • Match: {suggestion.matchScore}%
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          AI: {suggestion.confidence}%
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all" 
                            style={{ width: `${suggestion.confidence}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Optimization Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization Settings</CardTitle>
              <CardDescription>
                Configure how AI selects and optimizes magic bag contents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Surprise Factor Priority</Label>
                  <p className="text-sm text-gray-600">Balance predictability vs surprise elements</p>
                </div>
                <div className="w-32">
                  <Input type="range" min="0" max="100" defaultValue="85" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Value Optimization</Label>
                  <p className="text-sm text-gray-600">Prioritize higher-value items in suggestions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Dietary Preference Matching</Label>
                  <p className="text-sm text-gray-600">Match customer dietary preferences when possible</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Expiry Urgency Weight</Label>
                  <p className="text-sm text-gray-600">How much to prioritize items expiring soon</p>
                </div>
                <div className="w-32">
                  <Input type="range" min="0" max="100" defaultValue="70" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Insights Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-green-600" />
                Customer Preference Analytics
              </CardTitle>
              <CardDescription>
                Insights learned from customer behavior and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerPreferences.map((pref, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{pref.category}:</span>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{pref.preference}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {pref.sampleSize} customers
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            pref.strength >= 80 ? 'bg-green-500' :
                            pref.strength >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${pref.strength}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{pref.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preference Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Trending Preferences</CardTitle>
              <CardDescription>What customers are loving this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUpIcon className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Rising</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• Plant-based options (+23%)</li>
                    <li>• Artisan breads (+18%)</li>
                    <li>• Seasonal vegetables (+15%)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartIcon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Most Loved</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• Italian specialties (4.9★)</li>
                    <li>• Fresh desserts (4.8★)</li>
                    <li>• Comfort foods (4.7★)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Surprise Hits</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• Fusion experiments (+31%)</li>
                    <li>• Mystery ingredients (+27%)</li>
                    <li>• Chef's wild cards (+24%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduling Tab */}
        <TabsContent value="scheduling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-orange-600" />
                Automated Magic Bag Scheduling
              </CardTitle>
              <CardDescription>
                Set up recurring magic bags based on your restaurant's patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto-Create Daily Bags</Label>
                  <p className="text-sm text-gray-600">Automatically create magic bags based on surplus predictions</p>
                </div>
                <Switch 
                  checked={autoSchedulingEnabled}
                  onCheckedChange={setAutoSchedulingEnabled}
                />
              </div>

              {autoSchedulingEnabled && (
                <div className="space-y-4 pl-4 border-l-2 border-orange-200">
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Morning Bags (6-11 AM)</Label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                        <option>Chef's Morning Surprise</option>
                        <option>Healthy Breakfast Box</option>
                        <option>Pastry & Coffee Combo</option>
                        <option>Custom...</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>Lunch Bags (11 AM-3 PM)</Label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                        <option>Italian Lunch Adventure</option>
                        <option>Healthy Green Box</option>
                        <option>Comfort Lunch Special</option>
                        <option>Custom...</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>Dinner Bags (4-9 PM)</Label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                        <option>Sunset Comfort Box</option>
                        <option>Family Style Surprise</option>
                        <option>Gourmet Experience</option>
                        <option>Custom...</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Minimum Surplus Threshold</Label>
                      <Input type="number" placeholder="5" defaultValue="3" />
                      <p className="text-xs text-gray-500 mt-1">Create bag when this many surplus items available</p>
                    </div>
                    
                    <div>
                      <Label>Auto-Publish Timing</Label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option>2 hours before service</option>
                        <option>1 hour before service</option>
                        <option>30 minutes before service</option>
                        <option>Immediately when created</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule Preview */}
          <Card>
            <CardHeader>
              <CardTitle>This Week's Schedule</CardTitle>
              <CardDescription>Preview of automatically scheduled magic bags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "Today", bags: ["Chef's Morning Surprise (6 AM)", "Italian Lunch Adventure (11 AM)", "Sunset Comfort Box (4 PM)"] },
                  { day: "Tomorrow", bags: ["Healthy Breakfast Box (6 AM)", "Green Lunch Special (11 AM)", "Family Dinner Box (4 PM)"] },
                  { day: "Friday", bags: ["Weekend Breakfast (7 AM)", "Italian Adventure (11 AM)", "Comfort Weekend Box (4 PM)"] }
                ].map((schedule, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">{schedule.day}</div>
                    <div className="space-y-1">
                      {schedule.bags.map((bag, bagIdx) => (
                        <div key={bagIdx} className="text-sm text-gray-600 flex items-center gap-2">
                          <ArrowPathIcon className="h-3 w-3" />
                          {bag}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      )}
    </div>
  );
}
