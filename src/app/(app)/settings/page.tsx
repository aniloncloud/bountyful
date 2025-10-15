"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  BuildingStorefrontIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

// Enhanced schema matching onboarding complexity
const settingsSchema = z.object({
  // Basic Profile
  restaurantName: z.string().min(2, "Restaurant name is required"),
  cuisineType: z.string().min(1, "Please select a cuisine type"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code required"),
  description: z.string().optional(),
  website: z.string().optional(),
  
  // Business Hours
  businessHours: z.object({
    monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
    sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean().optional() }),
  }),

  // Pricing Rules
  pricingRules: z.object({
    enableTimeBased: z.boolean().default(true),
    maxDiscount: z.number().min(10).max(80).default(50),
    weatherAdjustments: z.boolean().default(true),
    demandBasedPricing: z.boolean().default(true),
    peakHourPremium: z.number().min(0).max(50).default(10),
  }),

  // Bag Configuration
  bagSettings: z.object({
    enableSurplusBags: z.boolean().default(true),
    enableFreshExperiences: z.boolean().default(true),
    defaultSurplusDiscount: z.number().min(30).max(80).default(60),
    maxBagsPerOrder: z.number().min(1).max(20).default(5),
    advanceBookingDays: z.number().min(0).max(7).default(2),
  }),

  // Customer Loyalty
  loyaltyProgram: z.object({
    enableLoyalty: z.boolean().default(true),
    pointsPerDollar: z.number().min(1).max(10).default(1),
    welcomeBonus: z.number().min(0).max(500).default(100),
    tierBenefits: z.boolean().default(true),
  }),

  // Notifications
  notifications: z.object({
    orderNotifications: z.boolean().default(true),
    customerArrivals: z.boolean().default(true),
    lowInventoryAlerts: z.boolean().default(true),
    revenueReports: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
    smsNotifications: z.boolean().default(true),
  }),

  // Operations
  operations: z.object({
    autoAcceptOrders: z.boolean().default(false),
    prepTimeMinutes: z.number().min(5).max(60).default(15),
    pickupWindowMinutes: z.number().min(15).max(120).default(30),
    enableKitchenDisplay: z.boolean().default(true),
    requireCustomerRating: z.boolean().default(true),
  }),

  // Integrations
  integrations: z.object({
    posIntegration: z.string().optional(),
    paymentProcessor: z.string().default("stripe"),
    analyticsTracking: z.boolean().default(true),
    marketingPlatforms: z.array(z.string()).default([]),
  }),

  // Sustainability
  sustainabilityGoals: z.object({
    trackCO2Savings: z.boolean().default(true),
    publicImpactDisplay: z.boolean().default(true),
    sustainabilityScore: z.boolean().default(true),
    wasteReductionGoal: z.number().min(10).max(95).default(70),
  }),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [exportingData, setExportingData] = useState(false);

  const { register, handleSubmit, formState, watch, setValue } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: {
      // Load current settings - in real app would come from API
      restaurantName: "Bella Vista Italian",
      cuisineType: "italian",
      phoneNumber: "(415) 555-0123",
      address: "123 Main Street",
      city: "San Francisco", 
      state: "CA",
      zipCode: "94102",
      description: "Family-owned authentic Italian restaurant serving fresh pasta and traditional recipes.",
      website: "https://bellavista.com",
      businessHours: {
        monday: { open: "11:00", close: "22:00", closed: false },
        tuesday: { open: "11:00", close: "22:00", closed: false },
        wednesday: { open: "11:00", close: "22:00", closed: false },
        thursday: { open: "11:00", close: "22:00", closed: false },
        friday: { open: "11:00", close: "23:00", closed: false },
        saturday: { open: "10:00", close: "23:00", closed: false },
        sunday: { open: "10:00", close: "22:00", closed: false },
      },
      pricingRules: {
        enableTimeBased: true,
        maxDiscount: 60,
        weatherAdjustments: true,
        demandBasedPricing: true,
        peakHourPremium: 15,
      },
      bagSettings: {
        enableSurplusBags: true,
        enableFreshExperiences: true,
        defaultSurplusDiscount: 60,
        maxBagsPerOrder: 5,
        advanceBookingDays: 2,
      },
      loyaltyProgram: {
        enableLoyalty: true,
        pointsPerDollar: 1,
        welcomeBonus: 100,
        tierBenefits: true,
      },
      notifications: {
        orderNotifications: true,
        customerArrivals: true,
        lowInventoryAlerts: true,
        revenueReports: true,
        marketingEmails: false,
        smsNotifications: true,
      },
      operations: {
        autoAcceptOrders: false,
        prepTimeMinutes: 15,
        pickupWindowMinutes: 30,
        enableKitchenDisplay: true,
        requireCustomerRating: true,
      },
      integrations: {
        paymentProcessor: "stripe",
        analyticsTracking: true,
        marketingPlatforms: [],
      },
      sustainabilityGoals: {
        trackCO2Savings: true,
        publicImpactDisplay: true,
        sustainabilityScore: true,
        wasteReductionGoal: 70,
      },
    }
  });

  const cuisineTypes = [
    "american", "italian", "mexican", "chinese", "japanese", "thai", 
    "indian", "mediterranean", "french", "pizza", "burgers", "seafood",
    "vegetarian", "bakery", "cafe", "fast-food", "fine-dining", "other"
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  const onSubmit = async (values: SettingsForm) => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Updated Settings:", values);
      setSaving(false);
      alert("Settings saved successfully! 🎉");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your restaurant profile, operations, and preferences
          </p>
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <BuildingStorefrontIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Hours</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="bags" className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Bags</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Operations</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <GlobeAltIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="flex items-center gap-2">
            <UserGroupIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Loyalty</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <LockClosedIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BuildingStorefrontIcon className="h-5 w-5" />
                  Restaurant Profile
                </CardTitle>
                <CardDescription>
                  Update your basic restaurant information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="restaurantName">Restaurant Name *</Label>
                    <Input 
                      id="restaurantName" 
                      {...register("restaurantName")} 
                    />
                    {formState.errors.restaurantName && (
                      <p className="mt-1 text-sm text-red-600">{formState.errors.restaurantName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="cuisineType">Cuisine Type *</Label>
                    <select 
                      id="cuisineType"
                      {...register("cuisineType")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                    >
                      {cuisineTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input 
                      id="phoneNumber" 
                      {...register("phoneNumber")} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      type="url"
                      placeholder="https://your-restaurant.com"
                      {...register("website")} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Restaurant Description</Label>
                  <textarea
                    id="description"
                    placeholder="Tell customers what makes your restaurant special..."
                    {...register("description")}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                  
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input 
                      id="address" 
                      {...register("address")} 
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        {...register("city")} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input 
                        id="state" 
                        {...register("state")} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input 
                        id="zipCode" 
                        {...register("zipCode")} 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hours Tab */}
          <TabsContent value="hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  Business Hours
                </CardTitle>
                <CardDescription>
                  Set your operating hours for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20">
                      <Label className="capitalize font-medium">{day}</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={!watch(`businessHours.${day}.closed`)}
                        onChange={(checked) => {
                          setValue(`businessHours.${day}.closed`, !checked);
                        }}
                      />
                      <span className="text-sm text-gray-600">Open</span>
                    </div>

                    {!watch(`businessHours.${day}.closed`) && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          {...register(`businessHours.${day}.open`)}
                          className="w-32"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          {...register(`businessHours.${day}.close`)}
                          className="w-32"
                        />
                      </div>
                    )}

                    {watch(`businessHours.${day}.closed`) && (
                      <span className="text-gray-500 italic">Closed</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-5 w-5" />
                  Smart Pricing Rules
                </CardTitle>
                <CardDescription>
                  Configure automatic pricing to maximize revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Time-Based Pricing</Label>
                    <p className="text-sm text-gray-600">Increase discounts as pickup deadline approaches</p>
                  </div>
                  <Switch
                    checked={watch("pricingRules.enableTimeBased")}
                    onChange={(checked) => setValue("pricingRules.enableTimeBased", checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="maxDiscount">Maximum Discount Percentage: {watch("pricingRules.maxDiscount")}%</Label>
                  <Input
                    id="maxDiscount"
                    type="range"
                    min="10"
                    max="80"
                    {...register("pricingRules.maxDiscount", { valueAsNumber: true })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>80%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="peakHourPremium">Peak Hour Premium: {watch("pricingRules.peakHourPremium")}%</Label>
                  <Input
                    id="peakHourPremium"
                    type="range"
                    min="0"
                    max="50"
                    {...register("pricingRules.peakHourPremium", { valueAsNumber: true })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Add premium pricing during busy hours</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Weather-Based Adjustments</Label>
                    <p className="text-sm text-gray-600">Higher discounts on rainy days</p>
                  </div>
                  <Switch
                    checked={watch("pricingRules.weatherAdjustments")}
                    onChange={(checked) => setValue("pricingRules.weatherAdjustments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Demand-Based Pricing</Label>
                    <p className="text-sm text-gray-600">Adjust prices based on customer demand</p>
                  </div>
                  <Switch
                    checked={watch("pricingRules.demandBasedPricing")}
                    onChange={(checked) => setValue("pricingRules.demandBasedPricing", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5" />
                  Operations Settings
                </CardTitle>
                <CardDescription>
                  Configure how your restaurant handles orders and customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto-Accept Orders</Label>
                    <p className="text-sm text-gray-600">Automatically accept orders without manual approval</p>
                  </div>
                  <Switch
                    checked={watch("operations.autoAcceptOrders")}
                    onChange={(checked) => setValue("operations.autoAcceptOrders", checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prepTimeMinutes">Preparation Time (minutes)</Label>
                    <Input
                      id="prepTimeMinutes"
                      type="number"
                      min="5"
                      max="60"
                      {...register("operations.prepTimeMinutes", { valueAsNumber: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pickupWindowMinutes">Pickup Window (minutes)</Label>
                    <Input
                      id="pickupWindowMinutes"
                      type="number"
                      min="15"
                      max="120"
                      {...register("operations.pickupWindowMinutes", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Kitchen Display Integration</Label>
                    <p className="text-sm text-gray-600">Show orders on kitchen display system</p>
                  </div>
                  <Switch
                    checked={watch("operations.enableKitchenDisplay")}
                    onChange={(checked) => setValue("operations.enableKitchenDisplay", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Require Customer Ratings</Label>
                    <p className="text-sm text-gray-600">Ask customers to rate their experience</p>
                  </div>
                  <Switch
                    checked={watch("operations.requireCustomerRating")}
                    onChange={(checked) => setValue("operations.requireCustomerRating", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellIcon className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose when and how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Order Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when new orders come in</p>
                  </div>
                  <Switch
                    checked={watch("notifications.orderNotifications")}
                    onChange={(checked) => setValue("notifications.orderNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Customer Arrivals</Label>
                    <p className="text-sm text-gray-600">Alert when customers arrive for pickup</p>
                  </div>
                  <Switch
                    checked={watch("notifications.customerArrivals")}
                    onChange={(checked) => setValue("notifications.customerArrivals", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Low Inventory Alerts</Label>
                    <p className="text-sm text-gray-600">Warning when bag quantities run low</p>
                  </div>
                  <Switch
                    checked={watch("notifications.lowInventoryAlerts")}
                    onChange={(checked) => setValue("notifications.lowInventoryAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Revenue Reports</Label>
                    <p className="text-sm text-gray-600">Daily/weekly revenue summaries</p>
                  </div>
                  <Switch
                    checked={watch("notifications.revenueReports")}
                    onChange={(checked) => setValue("notifications.revenueReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive urgent alerts via text message</p>
                  </div>
                  <Switch
                    checked={watch("notifications.smsNotifications")}
                    onChange={(checked) => setValue("notifications.smsNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Data Tab */}
          <TabsContent value="privacy" className="space-y-6">
            {/* Data Export */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Download Your Data
                </CardTitle>
                <CardDescription>
                  Export a copy of your account data in JSON format (GDPR/CCPA compliance)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can download all your data including restaurant profile, orders, analytics, and settings.
                  The export will be delivered to your email within 48 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={exportingData}
                    onClick={() => {
                      setExportingData(true);
                      setTimeout(() => {
                        setExportingData(false);
                        alert("Data export requested! You'll receive an email with download link within 48 hours.");
                      }, 2000);
                    }}
                    className="flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    {exportingData ? "Requesting Export..." : "Request Data Export"}
                  </Button>
                  <a
                    href="/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    Learn more about data privacy →
                  </a>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p><strong>What's included:</strong></p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Restaurant profile and business information</li>
                    <li>Order history and transaction records</li>
                    <li>Menu items and pricing data</li>
                    <li>Analytics and performance metrics</li>
                    <li>Customer interaction logs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LockClosedIcon className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <a
                    href="/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Privacy Policy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Learn how we collect, use, and protect your data
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">→</span>
                  </a>

                  <a
                    href="/legal/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Terms of Service</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Review our user agreement and service terms
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">→</span>
                  </a>

                  <a
                    href="/legal/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Contact Support</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get help with privacy or data concerns
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">→</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Account Deletion */}
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <TrashIcon className="h-5 w-5" />
                  Delete Account
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-semibold mb-2">Warning: This action cannot be undone</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>All your restaurant data will be permanently deleted</li>
                        <li>Order history will be anonymized but retained for 7 years (legal requirement)</li>
                        <li>Pending orders must be completed or cancelled first</li>
                        <li>Account deletion takes up to 30 days to complete</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {!showDeleteConfirm ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Before deleting, consider downloading your data using the export feature above.
                      You can also{" "}
                      <a href="/legal/data-deletion" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                        read our account deletion policy
                      </a>.
                    </p>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 p-4 border-2 border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Confirm Account Deletion
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      To confirm deletion, please enter your password:
                    </p>
                    <div>
                      <Label htmlFor="deletePassword">Password</Label>
                      <Input
                        id="deletePassword"
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="Enter your password"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={!deletePassword}
                        onClick={() => {
                          if (deletePassword) {
                            // In real app, this would call API to delete account
                            alert(
                              "Account deletion initiated. You will receive a confirmation email. Your account will be permanently deleted within 30 days."
                            );
                            setShowDeleteConfirm(false);
                            setDeletePassword("");
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Permanently Delete Account
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </form>
      </Tabs>
    </div>
  );
}
