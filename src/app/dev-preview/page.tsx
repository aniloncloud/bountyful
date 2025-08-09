"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function DevPreviewPage() {
  const features = [
    {
      category: "🏠 Landing & Marketing",
      items: [
        { name: "Landing Page", href: "/", description: "Hero, features, testimonials with animations" },
        { name: "Features Page", href: "/features", description: "Comprehensive feature showcase with ROI calculator, case studies & competitive analysis" },
        { name: "Marketing Layout", href: "/", description: "Navbar, footer with newsletter signup" },
      ]
    },
    {
      category: "👤 Authentication Flow", 
      items: [
        { name: "Sign Up", href: "/signup", description: "Basic account creation" },
        { name: "Login", href: "/login", description: "User authentication" },
        { name: "Password Reset", href: "/reset", description: "Password recovery flow" },
      ]
    },
    {
      category: "🚀 Onboarding Process",
      items: [
        { name: "Restaurant Profile Setup", href: "/onboarding/restaurant-profile", description: "Complete restaurant details with address validation" },
      ]
    },
    {
      category: "📊 Restaurant Dashboard",
      items: [
        { name: "Dashboard Home", href: "/dashboard", description: "Overview, stats, quick actions" },
        { name: "AI Dynamic Pricing", href: "/pricing", description: "Real-time price optimization with surge, clearance & engagement algorithms" },
        { name: "Advanced Analytics", href: "/analytics", description: "AI-powered insights, revenue tracking, environmental impact" },
        { name: "Settings", href: "/settings", description: "Account and preferences" },
      ]
    },
    {
      category: "📦 Inventory Management",
      items: [
        { name: "Smart Inventory Listings", href: "/inventory/listings", description: "AI-powered inventory with dynamic pricing, analytics & performance metrics" },
        { name: "Cross-Sell Management", href: "/inventory/cross-sell", description: "Intelligent cross-selling engine with 25-40% AOV boost analytics" },
        { name: "Add New Listing", href: "/inventory/new", description: "Comprehensive item creation form" },
        { name: "AI Magic Bag Studio", href: "/inventory/magic-bag", description: "AI-curated surprise bags with Simple/Advanced modes & customer insights" },
        { name: "Inventory Overview", href: "/inventory", description: "Main inventory dashboard" },
      ]
    },
    {
      category: "📋 Order Management",
      items: [
        { name: "All Orders", href: "/orders", description: "Order queue and management" },
        { name: "Order Details", href: "/orders/1", description: "Individual order view" },
      ]
    },
    {
      category: "🏪 Customer Shopping Experience",
      items: [
        { name: "Customer Homepage", href: "/shop", description: "Hybrid bag showcase with search and filters" },
        { name: "Nearby Restaurants", href: "/shop/nearby", description: "Location-based restaurant discovery with GPS" },
        { name: "Favorites", href: "/shop/favorites", description: "Saved restaurants and bags with quick access" },
        { name: "Restaurant Profile", href: "/shop/restaurant/1", description: "Individual restaurant with bag options" },
        { name: "Peak Experiences", href: "/shop/peak-experiences", description: "Flash cooking and high-capacity kitchen features" },
        { name: "Shopping Cart", href: "/shop/cart", description: "Cart with intelligent cross-selling" },
        { name: "Checkout Flow", href: "/shop/checkout", description: "Conversion-optimized checkout with Domino's-style cross-sell enhancement" },
        { name: "Order Tracking & Pickup", href: "/shop/orders", description: "'I'm Here' notifications, enhanced pickup confirmation & issue reporting" },
        { name: "User Profile", href: "/shop/profile", description: "Customer profile with achievements" },
      ]
    },
    {
      category: "🏪 Legacy Storefront", 
      items: [
        { name: "Restaurant Storefront", href: "/storefront/demo-restaurant", description: "Original customer-facing restaurant page" },
      ]
    }
  ];

  const devTools = [
    {
      name: "🔧 Component Library",
      description: "All UI components used throughout the app",
      action: "View Components",
      onClick: () => {
        alert("Components:\n- Button (/src/components/ui/button.tsx)\n- Input (/src/components/ui/input.tsx)\n- Card (/src/components/ui/card.tsx)\n- Select (/src/components/ui/select.tsx)\n- Tabs (/src/components/ui/tabs.tsx)\n- Switch (/src/components/ui/switch.tsx)\n- Label (/src/components/ui/label.tsx)");
      }
    },
    {
      name: "⚙️ Configuration",
      description: "App configuration and navigation setup",
      action: "View Config",
      onClick: () => {
        alert("Config Files:\n- Site config (/src/config/site.ts)\n- Navigation (/src/config/nav.ts)\n- Forms (/src/config/forms.ts)");
      }
    },
    {
      name: "🎨 Design System",
      description: "Colors, typography, and design tokens",
      action: "View Styles",
      onClick: () => {
        alert("Styles:\n- Global CSS (/src/app/globals.css)\n- Tailwind configured\n- Dark mode support\n- Green/emerald theme");
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Developer Preview Mode
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 {siteConfig.name} App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete restaurant revenue amplification platform with AI-powered features, enhanced pickup system, and superior customer experience
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-300">✨ AI Magic Bags</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-300">📍 "I'm Here" Pickup</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900/30 dark:text-purple-300">💰 Dynamic Pricing</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full dark:bg-orange-900/30 dark:text-orange-300">🛒 Smart Cross-Sell</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full dark:bg-pink-900/30 dark:text-pink-300">🚀 Features Page</span>
          </div>
        </div>

        {/* Quick Stats */}
        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">30+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pages Built</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">40+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Components</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600">🤖</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">AI Features</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600">📱</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Mobile-First</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">🔔</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Real-time</div>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="space-y-8">
          {features.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600">
                        {item.name}
                      </h3>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Developer Tools */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devTools.map((tool, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{tool.description}</p>
                <button
                  onClick={tool.onClick}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {tool.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Feature Highlights */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🚀 What Makes {siteConfig.shortName} Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">vs Competitors</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Peak hour revenue amplification</li>
                <li>• AI cross-selling with 38%+ AOV boost</li>
                <li>• Checkout moment upsells</li>
                <li>• Revenue-first approach</li>
              </ul>
            </div>
            <div className="text-center p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Restaurants</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 30-second pickup process</li>
                <li>• No operational disruption</li>
                <li>• Advanced analytics dashboard</li>
                <li>• Dynamic pricing optimization</li>
              </ul>
            </div>
            <div className="text-center p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Customers</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• "I'm Here" arrival notifications</li>
                <li>• Post-pickup issue resolution</li>
                <li>• AI-curated surprise experiences</li>
                <li>• Digital receipts & tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔧 Technical Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl">⚛️</div>
              <div className="text-sm font-medium">React 19</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">▲</div>
              <div className="text-sm font-medium">Next.js 15</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📘</div>
              <div className="text-sm font-medium">TypeScript</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🎨</div>
              <div className="text-sm font-medium">Tailwind CSS</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📝</div>
              <div className="text-sm font-medium">React Hook Form</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">✅</div>
              <div className="text-sm font-medium">Zod Validation</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🤖</div>
              <div className="text-sm font-medium">AI Integration</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📍</div>
              <div className="text-sm font-medium">Geolocation</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🚀 Quick Start
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Landing Page
            </Link>
            <Link href="/shop" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              🛒 Customer Experience
            </Link>
            <Link href="/shop/orders" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              📍 "I'm Here" Pickup
            </Link>
            <Link href="/inventory/magic-bag" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              ✨ AI Magic Bags
            </Link>
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Dashboard
            </Link>
            <Link href="/features" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              🚀 Features Page
            </Link>
            <Link href="/pricing" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              💰 AI Pricing
            </Link>
            <Link href="/onboarding/restaurant-profile" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Onboarding
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Full-featured platform with AI-powered inventory management, enhanced pickup flows & restaurant revenue amplification
          </p>
        </div>
      </div>
    </div>
  );
}