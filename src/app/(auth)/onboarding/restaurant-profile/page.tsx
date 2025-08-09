"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  cuisineType: z.string().min(1, "Please select a cuisine type"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code required"),
  businessHours: z.object({
    openTime: z.string().min(1, "Opening time required"),
    closeTime: z.string().min(1, "Closing time required"),
  }),
  description: z.string().optional(),
  // Smart Pricing Configuration
  pricingRules: z.object({
    enableTimeBased: z.boolean().default(true),
    maxDiscount: z.number().min(10).max(80).default(50),
    weatherAdjustments: z.boolean().default(true),
  }),
  // Customer Loyalty Setup
  loyaltyProgram: z.object({
    enableLoyalty: z.boolean().default(true),
    pointsPerDollar: z.number().min(1).max(10).default(1),
    welcomeBonus: z.number().min(0).max(500).default(100),
  }),
  // Restaurant Intelligence Preferences
  intelligenceSettings: z.object({
    enableWasteReports: z.boolean().default(true),
    shareBestPractices: z.boolean().default(true),
    receiveInsights: z.boolean().default(true),
  }),
  // Sustainability Tracking
  sustainabilityGoals: z.object({
    trackCO2Savings: z.boolean().default(true),
    publicImpactDisplay: z.boolean().default(true),
    sustainabilityScore: z.boolean().default(true),
  }),
  // Event & Party Orders
  eventServices: z.object({
    acceptBulkOrders: z.boolean().default(false),
    minimumBulkOrder: z.number().min(10).max(100).default(20),
    cateringServices: z.boolean().default(false),
  }),
});

type RestaurantProfile = z.infer<typeof schema>;

export default function RestaurantProfilePage() {
  const [addressVerified, setAddressVerified] = useState(false);
  const [googleData, setGoogleData] = useState<{
    name: string;
    formatted_address: string;
    formatted_phone_number: string;
    opening_hours: { weekday_text: string[] };
    types: string[];
    rating: number;
    user_ratings_total: number;
    website: string;
  } | null>(null);
  const [searchingGoogle, setSearchingGoogle] = useState(false);
  const [googleSearchQuery, setGoogleSearchQuery] = useState("");
  
  const { register, handleSubmit, formState, watch, setValue } = useForm<RestaurantProfile>({ 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      pricingRules: { enableTimeBased: true, maxDiscount: 50, weatherAdjustments: true },
      loyaltyProgram: { enableLoyalty: true, pointsPerDollar: 1, welcomeBonus: 100 },
      intelligenceSettings: { enableWasteReports: true, shareBestPractices: true, receiveInsights: true },
      sustainabilityGoals: { trackCO2Savings: true, publicImpactDisplay: true, sustainabilityScore: true },
      eventServices: { acceptBulkOrders: false, minimumBulkOrder: 20, cateringServices: false },
    }
  });

  const cuisineTypes = [
    "American", "Italian", "Mexican", "Chinese", "Japanese", "Thai", 
    "Indian", "Mediterranean", "French", "Pizza", "Burgers", "Seafood",
    "Vegetarian", "Bakery", "Cafe", "Fast Food", "Fine Dining", "Other"
  ];

  // Mock Google Places API search
  const searchGooglePlaces = async () => {
    if (!googleSearchQuery.trim()) return;
    
    setSearchingGoogle(true);
    
    // Simulate Google Places API call
    setTimeout(() => {
      const mockGoogleData = {
        name: googleSearchQuery,
        formatted_address: "123 Main Street, San Francisco, CA 94102",
        formatted_phone_number: "(415) 555-0123",
        opening_hours: {
          weekday_text: [
            "Monday: 11:00 AM – 10:00 PM",
            "Tuesday: 11:00 AM – 10:00 PM", 
            "Wednesday: 11:00 AM – 10:00 PM",
            "Thursday: 11:00 AM – 10:00 PM",
            "Friday: 11:00 AM – 11:00 PM",
            "Saturday: 10:00 AM – 11:00 PM",
            "Sunday: 10:00 AM – 10:00 PM"
          ]
        },
        types: ["restaurant", "food", "establishment"],
        rating: 4.3,
        user_ratings_total: 127,
        website: "https://example-restaurant.com"
      };
      
      setGoogleData(mockGoogleData);
      setSearchingGoogle(false);
    }, 2000);
  };

  // Auto-fill from Google data
  const fillFromGoogle = () => {
    if (!googleData) return;
    
    const addressParts = googleData.formatted_address.split(", ");
    const streetAddress = addressParts[0];
    const city = addressParts[1];
    const stateZip = addressParts[2]?.split(" ");
    const state = stateZip?.[0];
    const zipCode = stateZip?.[1];

    setValue("restaurantName", googleData.name);
    setValue("phoneNumber", googleData.formatted_phone_number?.replace(/\D/g, '') || "");
    setValue("address", streetAddress);
    setValue("city", city);
    setValue("state", state);
    setValue("zipCode", zipCode);
    
    // Extract opening hours (simplified for demo)
    setValue("businessHours.openTime", "11:00");
    setValue("businessHours.closeTime", "22:00");
    
    setAddressVerified(true);
    alert("✅ Restaurant information imported from Google!");
  };

  // Mock address validation
  const validateAddress = async () => {
    const address = watch("address");
    const city = watch("city");
    const state = watch("state");
    const zipCode = watch("zipCode");
    
    if (address && city && state && zipCode) {
      setTimeout(() => {
        setAddressVerified(true);
      }, 1000);
    }
  };

  const onSubmit = (values: RestaurantProfile) => {
    console.log("Complete Restaurant Profile:", values);
    // Navigate to next step in onboarding
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-2xl px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900/20 dark:text-green-300 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Step 2 of 3: Complete Restaurant Setup
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Setup Your Good2Go Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Import from Google and configure features to start maximizing your surplus revenue
          </p>
        </div>

        {/* Google Import Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔍</div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Import from Google My Business
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Save time by importing your restaurant information from Google
              </p>
              
              <div className="flex gap-3">
                <Input
                  placeholder="Search for your restaurant..."
                  value={googleSearchQuery}
                  onChange={(e) => setGoogleSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button"
                  onClick={searchGooglePlaces}
                  disabled={searchingGoogle || !googleSearchQuery.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {searchingGoogle ? "Searching..." : "Search Google"}
                </Button>
              </div>
              
              {googleData && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{googleData.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{googleData.formatted_address}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{googleData.formatted_phone_number}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{googleData.rating} ({googleData.user_ratings_total} reviews)</span>
                      </div>
                    </div>
                    <Button onClick={fillFromGoogle} className="bg-green-600 hover:bg-green-700">
                      Import Data
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300" style={{width: '50%'}}></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                📍 Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurantName">Restaurant Name *</Label>
                  <Input 
                    id="restaurantName" 
                    placeholder="Mario's Italian Kitchen" 
                    {...register("restaurantName")} 
                  />
                  {formState.errors.restaurantName && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.restaurantName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="cuisineType">Cuisine Type *</Label>
                  <select 
                    id="cuisineType"
                    {...register("cuisineType")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="">Select cuisine type</option>
                    {cuisineTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formState.errors.cuisineType && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.cuisineType.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="(555) 123-4567" 
                  {...register("phoneNumber")} 
                />
                {formState.errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-600">{formState.errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  Location & Address
                  {addressVerified && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </h3>
                
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Main Street" 
                    {...register("address")} 
                    onBlur={validateAddress}
                  />
                  {formState.errors.address && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      placeholder="San Francisco" 
                      {...register("city")} 
                      onBlur={validateAddress}
                    />
                    {formState.errors.city && (
                      <p className="mt-1 text-xs text-red-600">{formState.errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      placeholder="CA" 
                      {...register("state")} 
                      onBlur={validateAddress}
                    />
                    {formState.errors.state && (
                      <p className="mt-1 text-xs text-red-600">{formState.errors.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input 
                      id="zipCode" 
                      placeholder="94102" 
                      {...register("zipCode")} 
                      onBlur={validateAddress}
                    />
                    {formState.errors.zipCode && (
                      <p className="mt-1 text-xs text-red-600">{formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openTime">Opening Time *</Label>
                    <Input 
                      id="openTime" 
                      type="time" 
                      {...register("businessHours.openTime")} 
                    />
                    {formState.errors.businessHours?.openTime && (
                      <p className="mt-1 text-xs text-red-600">{formState.errors.businessHours.openTime.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="closeTime">Closing Time *</Label>
                    <Input 
                      id="closeTime" 
                      type="time" 
                      {...register("businessHours.closeTime")} 
                    />
                    {formState.errors.businessHours?.closeTime && (
                      <p className="mt-1 text-xs text-red-600">{formState.errors.businessHours.closeTime.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Restaurant Description (Optional)</Label>
                <textarea
                  id="description"
                  placeholder="Tell customers what makes your restaurant special..."
                  {...register("description")}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>

            {/* Smart Pricing Configuration */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                💰 Smart Pricing Setup
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure automatic pricing adjustments to maximize revenue from surplus items
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("pricingRules.enableTimeBased")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Time-Based Pricing</span>
                    <p className="text-sm text-gray-500">Automatically increase discounts as pickup deadline approaches</p>
                  </div>
                </label>

                <div>
                  <Label htmlFor="maxDiscount">Maximum Discount Percentage</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="maxDiscount" 
                      type="range"
                      min="10"
                      max="80"
                      {...register("pricingRules.maxDiscount", { valueAsNumber: true })}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{watch("pricingRules.maxDiscount")}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Items can be discounted up to this amount</p>
                </div>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("pricingRules.weatherAdjustments")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Weather-Based Adjustments</span>
                    <p className="text-sm text-gray-500">Higher discounts on rainy days when pickup rates are lower</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Customer Loyalty Program */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                🎯 Customer Loyalty Program
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reward customers for choosing your surplus items and encourage repeat purchases
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("loyaltyProgram.enableLoyalty")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Enable Loyalty Rewards</span>
                    <p className="text-sm text-gray-500">Let customers earn points for sustainable choices</p>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pointsPerDollar">Points per Dollar Spent</Label>
                    <Input 
                      id="pointsPerDollar" 
                      type="number"
                      min="1"
                      max="10"
                      {...register("loyaltyProgram.pointsPerDollar", { valueAsNumber: true })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Standard is 1 point per $1</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="welcomeBonus">Welcome Bonus Points</Label>
                    <Input 
                      id="welcomeBonus" 
                      type="number"
                      min="0"
                      max="500"
                      {...register("loyaltyProgram.welcomeBonus", { valueAsNumber: true })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Points for first purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Intelligence */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                📊 Restaurant Intelligence
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get insights to reduce waste and optimize your operations
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("intelligenceSettings.enableWasteReports")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Waste Pattern Reports</span>
                    <p className="text-sm text-gray-500">Weekly insights on your surplus patterns to help reduce overproduction</p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("intelligenceSettings.shareBestPractices")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Share Best Practices</span>
                    <p className="text-sm text-gray-500">Learn from similar restaurants in your area (anonymized data)</p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("intelligenceSettings.receiveInsights")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Seasonal Insights</span>
                    <p className="text-sm text-gray-500">Get tips for upcoming seasons and local events</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Sustainability Tracking */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                🌱 Sustainability Impact
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track and showcase your environmental impact to attract eco-conscious customers
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("sustainabilityGoals.trackCO2Savings")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Track CO₂ Savings</span>
                    <p className="text-sm text-gray-500">Calculate environmental impact of rescued meals</p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("sustainabilityGoals.publicImpactDisplay")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Public Impact Display</span>
                    <p className="text-sm text-gray-500">Show your environmental impact on your customer-facing page</p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("sustainabilityGoals.sustainabilityScore")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Sustainability Scoring</span>
                    <p className="text-sm text-gray-500">Get ranked among eco-friendly restaurants in your area</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Event & Party Orders */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                🎉 Event & Catering Services
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Accept bulk orders for events using your available surplus inventory
              </p>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("eventServices.acceptBulkOrders")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Accept Bulk Orders</span>
                    <p className="text-sm text-gray-500">Allow customers to order large quantities for events</p>
                  </div>
                </label>

                <div>
                  <Label htmlFor="minimumBulkOrder">Minimum Bulk Order Size</Label>
                  <Input 
                    id="minimumBulkOrder" 
                    type="number"
                    min="10"
                    max="100"
                    {...register("eventServices.minimumBulkOrder", { valueAsNumber: true })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum items for bulk order pricing</p>
                </div>

                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    {...register("eventServices.cateringServices")}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Last-Minute Catering</span>
                    <p className="text-sm text-gray-500">Offer catering services using surplus inventory for events</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <Link href="/signup">
                <Button variant="outline">
                  ← Back
                </Button>
              </Link>
              
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8"
              >
                Complete Setup & Go to Dashboard →
              </Button>
            </div>
          </form>
        </div>

        {/* Help text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? <Link href="/support" className="text-green-600 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}