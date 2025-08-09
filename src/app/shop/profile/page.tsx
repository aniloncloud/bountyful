"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  UserIcon, 
  BellIcon, 
  CreditCardIcon, 
  MapPinIcon, 
  HeartIcon, 
  TrophyIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GiftIcon
} from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState({
    pickupReminders: true,
    specialOffers: true,
    peakAlerts: true,
    kitchenUpdates: false
  });

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2024",
    favoriteRestaurants: 12,
    totalOrders: 47,
    totalSaved: 892.45,
    co2Prevented: 127.8,
    mealsRescued: 63,
    level: "Sustainability Champion",
    points: 2847,
    nextLevelPoints: 3000,
    badges: [
      { id: 1, name: "First Experience", icon: "✨", earned: "2024-01-15" },
      { id: 2, name: "Surplus Saver", icon: "🎁", earned: "2024-01-20" },
      { id: 3, name: "Peak Explorer", icon: "🔥", earned: "2024-01-25" },
      { id: 4, name: "Eco Warrior", icon: "🌱", earned: "2024-01-30" }
    ]
  };

  const recentActivity = [
    { date: "2024-01-15", action: "Completed", item: "Chef's Pasta Special", restaurant: "Bella Vista Italian", savings: 26.00 },
    { date: "2024-01-14", action: "Booked", item: "Sushi Master Class", restaurant: "Sakura Sushi", savings: 35.00 },
    { date: "2024-01-12", action: "Completed", item: "BBQ Experience", restaurant: "Fire & Smoke", savings: 18.50 }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: ChartBarIcon },
    { id: "settings", label: "Settings", icon: UserIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "payment", label: "Payment", icon: CreditCardIcon },
    { id: "achievements", label: "Achievements", icon: TrophyIcon }
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-1">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Member since {user.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{user.totalOrders}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">${user.totalSaved}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Saved</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{user.mealsRescued}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Meals Rescued</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{user.co2Prevented}kg</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Prevented</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content */}
          <div className="lg:col-span-2">
            
            {activeTab === "overview" && (
              <div className="space-y-8">
                
                {/* Recent activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {activity.action}: {activity.item}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.restaurant} • {activity.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">
                            ${activity.savings}
                          </div>
                          <div className="text-sm text-gray-500">saved</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability impact */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Your Environmental Impact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="text-4xl mb-3">🌍</div>
                      <div className="text-2xl font-bold text-green-600">{user.co2Prevented}kg</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Emissions Prevented</div>
                      <div className="text-xs text-green-600 mt-1">Equivalent to 847 km by car</div>
                    </div>
                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="text-4xl mb-3">💧</div>
                      <div className="text-2xl font-bold text-blue-600">428L</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
                      <div className="text-xs text-blue-600 mt-1">2.8 bathtubs worth</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <div className="text-4xl mb-3">🗑️</div>
                      <div className="text-2xl font-bold text-purple-600">18.6kg</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Food Waste Prevented</div>
                      <div className="text-xs text-purple-600 mt-1">63 meals rescued</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'pickupReminders' && 'Get notified when your order is ready for pickup'}
                          {key === 'specialOffers' && 'Receive notifications about special offers and discounts'}
                          {key === 'peakAlerts' && 'Get alerted when peak experiences become available'}
                          {key === 'kitchenUpdates' && 'Receive updates about kitchen capacity and flash cooking'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationToggle(key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6">Achievements & Badges</h2>
                
                {/* Level progress */}
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        {user.level}
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {user.points} / {user.nextLevelPoints} points
                      </p>
                    </div>
                    <TrophyIcon className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(user.points / user.nextLevelPoints) * 100}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                    {user.nextLevelPoints - user.points} points until next level
                  </p>
                </div>

                {/* Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user.badges.map((badge) => (
                    <div key={badge.id} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                        {badge.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Earned {badge.earned}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <HeartIcon className="h-4 w-4 mr-2" />
                  View Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheckIcon className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-lg mb-4">Experience Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Fresh Experiences</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiftIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Surplus Surprises</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Peak Experiences</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Enabled</span>
                </div>
              </div>
            </div>

            {/* Account status */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🌟</div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Premium Member
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Unlimited experiences & priority booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}