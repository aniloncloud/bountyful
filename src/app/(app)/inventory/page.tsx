import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon, PlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function InventoryIndex() {
  return (
    <div className="space-y-6">
      
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your surplus listings and cross-sell items
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/inventory/cross-sell">
            <Button variant="outline" className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4" />
              Cross-Sell Menu
            </Button>
          </Link>
          <Link href="/inventory/new">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">42</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Listings</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cross-Sell Items</div>
          <div className="text-xs text-green-600 mt-1">↑ 25% from last month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600">32%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cross-Sell Rate</div>
          <div className="text-xs text-green-600 mt-1">Industry avg: 18%</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600">+$1,240</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Cross-Sell Revenue</div>
          <div className="text-xs text-green-600 mt-1">+38% AOV boost</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Listings</h2>
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Performance tracking enabled</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6 flex flex-wrap gap-3">
            <input className="flex-1 min-w-64 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700" placeholder="Search by name or SKU" />
            <select className="rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700">
              <option>All Categories</option>
              <option>Magic Bag</option>
              <option>Fresh Experience</option>
              <option>Cross-Sell Item</option>
            </select>
            <select className="rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700">
              <option>Status: All</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Draft</option>
            </select>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Qty</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Price</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Performance</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {[
                  { name: "Chef's Pasta Special", cat: "Magic Bag", qty: 24, price: 12.99, performance: "156 views, 12 sold", status: "Active", crossSell: true },
                  { name: "Sushi Selection Box", cat: "Magic Bag", qty: 10, price: 6.99, performance: "89 views, 13 sold", status: "Active", crossSell: false },
                  { name: "Garlic Bread", cat: "Cross-Sell", qty: 999, price: 3.99, performance: "32% add rate", status: "Active", crossSell: true },
                  { name: "Premium Fresh Experience", cat: "Fresh Experience", qty: 6, price: 24.99, performance: "67 views, 4 sold", status: "Active", crossSell: false },
                  { name: "Wine Pairing", cat: "Cross-Sell", qty: 999, price: 8.99, performance: "18% add rate", status: "Active", crossSell: true },
                ].map((r, idx) => (
                  <tr key={r.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.cat === "Cross-Sell" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          : r.cat === "Magic Bag"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}>
                        {r.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.qty === 999 ? "∞" : r.qty}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">${r.price}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{r.performance}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 text-xs font-medium">{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {r.crossSell && (
                        <SparklesIcon className="h-4 w-4 text-purple-500 inline mr-2" title="Cross-sell enabled" />
                      )}
                      <Link href={`/inventory/${r.cat === "Cross-Sell" ? "cross-sell" : "listings"}`} className="rounded-md border border-gray-200 dark:border-gray-600 px-3 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-700">
                        {r.cat === "Cross-Sell" ? "Manage" : "Edit"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
