"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClockIcon, MapPinIcon, CheckCircleIcon, SparklesIcon, GiftIcon, StarIcon, BellIcon } from "@heroicons/react/24/solid";
import { SimplePickupModal } from "@/components/customer/SimplePickupModal";
import { PostPickupIssueButton } from "@/components/customer/PostPickupIssueButton";

interface Order {
  id: string;
  orderNumber: string;
  status: "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
  orderDate: string;
  pickupDate: string;
  pickupTime: string;
  total: number;
  savings: number;
  items: Array<{
    id: string;
    name: string;
    restaurant: string;
    restaurantId: string;
    type: string;
    price: number;
    quantity: number;
    image: string;
    addOns: Array<{ name: string; price: number }>;
  }>;
  restaurant: {
    name: string;
    address: string;
    phone: string;
  };
}

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const [arrivedOrders, setArrivedOrders] = useState<{[key: string]: { arrived: boolean, eta?: number, notifying?: boolean }}>({});
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [selectedOrderForPickup, setSelectedOrderForPickup] = useState<string | null>(null);
  const [completedPickups, setCompletedPickups] = useState<{[key: string]: boolean}>({});

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "G2G-2024-001",
      status: "ready",
      orderDate: "2024-01-15",
      pickupDate: "Today",
      pickupTime: "7:30 PM",
      total: 36.71,
      savings: 58.28,
      items: [
        {
          id: "1",
          name: "Chef's Pasta Special",
          restaurant: "Bella Vista Italian",
          restaurantId: "1",
          type: "Fresh Experience",
          price: 12.99,
          quantity: 1,
          image: "/api/placeholder/300/200",
          addOns: [{ name: "Wine Pairing Experience", price: 8.99 }]
        }
      ],
      restaurant: {
        name: "Bella Vista Italian",
        address: "123 Main Street, San Francisco",
        phone: "+1 (555) 123-4567"
      }
    },
    {
      id: "2",
      orderNumber: "G2G-2024-002",
      status: "preparing",
      orderDate: "2024-01-15", 
      pickupDate: "Today",
      pickupTime: "10:15 PM",
      total: 13.98,
      savings: 25.98,
      items: [
        {
          id: "2",
          name: "Sushi Selection Box",
          restaurant: "Sakura Sushi", 
          restaurantId: "2",
          type: "Surplus Surprise",
          price: 6.99,
          quantity: 2,
          image: "/api/placeholder/300/200",
          addOns: []
        }
      ],
      restaurant: {
        name: "Sakura Sushi",
        address: "456 Oak Street, San Francisco", 
        phone: "+1 (555) 987-6543"
      }
    },
    {
      id: "3",
      orderNumber: "G2G-2024-003",
      status: "completed",
      orderDate: "2024-01-14",
      pickupDate: "Yesterday",
      pickupTime: "8:00 PM",
      total: 22.99,
      savings: 41.00,
      items: [
        {
          id: "3",
          name: "Farm-to-Table Experience",
          restaurant: "Green Garden Cafe",
          restaurantId: "3", 
          type: "Fresh Experience",
          price: 14.99,
          quantity: 1,
          image: "/api/placeholder/300/200",
          addOns: [{ name: "Recipe Collection", price: 4.99 }]
        }
      ],
      restaurant: {
        name: "Green Garden Cafe",
        address: "789 Pine Street, San Francisco",
        phone: "+1 (555) 456-7890"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      case "preparing": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "ready": return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "completed": return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
      case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmed";
      case "preparing": return "Preparing";
      case "ready": return "Ready for Pickup";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return "📋";
      case "preparing": return "👨‍🍳";
      case "ready": return "✅";
      case "completed": return "🎉";
      case "cancelled": return "❌";
      default: return "📦";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Handle "I'm Here" functionality
  const handleImHere = async (orderId: string, restaurantAddress: string) => {
    // Set loading state
    setArrivedOrders(prev => ({
      ...prev,
      [orderId]: { arrived: false, notifying: true }
    }));

    try {
      // Get user location
      const position = await getCurrentLocation();
      
      // Calculate ETA (simplified - in real app would use Google Maps API)
      const eta = calculateETA(position.coords.latitude, position.coords.longitude, restaurantAddress);
      
      // Simulate API call to notify restaurant
      await notifyRestaurant(orderId, {
        customerLat: position.coords.latitude,
        customerLng: position.coords.longitude,
        eta: eta,
        address: restaurantAddress
      });
      
      // Update state to show success
      setArrivedOrders(prev => ({
        ...prev,
        [orderId]: { arrived: true, eta: eta, notifying: false }
      }));
    } catch (error) {
      // Handle error - could be location denied or network issue
      console.error('Failed to notify restaurant:', error);
      
      // Fallback - still mark as notified but without precise ETA
      setArrivedOrders(prev => ({
        ...prev,
        [orderId]: { arrived: true, eta: 5, notifying: false } // Default 5 min ETA
      }));
    }
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const calculateETA = (userLat: number, userLng: number, restaurantAddress: string): number => {
    // Simplified ETA calculation - in real app would use Google Maps Distance Matrix API
    // For demo purposes, return random ETA between 3-15 minutes
    const minETA = 3;
    const maxETA = 15;
    return Math.floor(Math.random() * (maxETA - minETA + 1)) + minETA;
  };

  const notifyRestaurant = async (orderId: string, locationData: any): Promise<void> => {
    // Simulate API call to restaurant notification system
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Notified restaurant about customer arrival for order ${orderId}:`, locationData);
        resolve();
      }, 2000); // Simulate 2 second network delay
    });
  };

  const handleStartPickup = (orderId: string) => {
    setSelectedOrderForPickup(orderId);
    setPickupModalOpen(true);
  };

  const handlePickupConfirmation = async (confirmationData: any) => {
    if (!selectedOrderForPickup) return;
    
    console.log('Simple pickup confirmed:', {
      orderId: selectedOrderForPickup,
      timestamp: new Date().toISOString(),
      ...confirmationData
    });
    
    // Mark pickup as completed instantly - no waiting for restaurant
    setCompletedPickups(prev => ({
      ...prev,
      [selectedOrderForPickup]: true
    }));
    
    // In real app, would:
    // 1. Update order status to 'completed' immediately
    // 2. Update restaurant inventory in background
    // 3. Generate digital receipt instantly
    // 4. Send analytics data
    // 5. Notify restaurant of pickup (informational only)
    
    // Close modal
    setPickupModalOpen(false);
    setSelectedOrderForPickup(null);
  };

  const getSelectedOrder = () => {
    if (!selectedOrderForPickup) return null;
    return orders.find(order => order.id === selectedOrderForPickup);
  };

  const filters = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "ready", label: "Ready", count: orders.filter(o => o.status === "ready").length },
    { id: "preparing", label: "Preparing", count: orders.filter(o => o.status === "preparing").length },
    { id: "completed", label: "Completed", count: orders.filter(o => o.status === "completed").length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your fresh experiences and surprise bags
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{orders.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600">
              ${orders.reduce((sum, order) => sum + order.savings, 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Saved</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600">
              {orders.filter(o => o.status === "ready").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ready for Pickup</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                filter === filterOption.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              
              {/* Order header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Order #{order.orderNumber}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Placed on {order.orderDate}</span>
                      <span>•</span>
                      <span>{order.pickupDate} at {order.pickupTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      <span>{getStatusIcon(order.status)}</span>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                {/* Order progress */}
                {order.status !== "completed" && order.status !== "cancelled" && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        ["confirmed", "preparing", "ready"].includes(order.status) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        ✓
                      </div>
                      <div className={`flex-1 h-1 rounded ${
                        ["preparing", "ready"].includes(order.status) 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                      }`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        ["preparing", "ready"].includes(order.status) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        👨‍🍳
                      </div>
                      <div className={`flex-1 h-1 rounded ${
                        order.status === "ready" 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                      }`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        order.status === "ready" 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        📦
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order items */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => {
                    const isFresh = item.type.includes("Fresh") || item.type.includes("Premium");
                    
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1 left-1">
                            {isFresh ? (
                              <SparklesIcon className="h-4 w-4 text-purple-500" />
                            ) : (
                              <GiftIcon className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {item.restaurant} • {item.type}
                          </p>
                          
                          {item.addOns.length > 0 && (
                            <div className="text-sm text-purple-600 mb-2">
                              + {item.addOns.map(addon => addon.name).join(", ")}
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${(item.price + item.addOns.reduce((sum, addon) => sum + addon.price, 0)) * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Restaurant info and actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {order.restaurant.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.restaurant.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">
                        Saved ${order.savings.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {order.status === "ready" && (
                        <>
                          {!arrivedOrders[order.id]?.arrived ? (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-blue-500 to-purple-500"
                              onClick={() => handleImHere(order.id, order.restaurant.address)}
                              disabled={arrivedOrders[order.id]?.notifying}
                            >
                              {arrivedOrders[order.id]?.notifying ? (
                                <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                  Getting Location...
                                </>
                              ) : (
                                <>
                                  <BellIcon className="h-4 w-4 mr-1" />
                                  I'm Here
                                </>
                              )}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-green-500 to-emerald-500"
                              disabled
                            >
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Notified (ETA: {arrivedOrders[order.id]?.eta || 5}m)
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStartPickup(order.id)}
                            disabled={completedPickups[order.id]}
                          >
                            {completedPickups[order.id] ? (
                              <>
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Picked Up
                              </>
                            ) : (
                              <>
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                Confirm Pickup
                              </>
                            )}
                          </Button>
                        </>
                      )}
                      
                      {order.status === "completed" && (
                        <>
                          <Button size="sm" variant="outline">
                            <StarIcon className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <PostPickupIssueButton 
                            orderId={order.id} 
                            orderNumber={order.orderNumber} 
                          />
                        </>
                      )}
                      
                      {completedPickups[order.id] && order.status === "ready" && (
                        <PostPickupIssueButton 
                          orderId={order.id} 
                          orderNumber={order.orderNumber} 
                        />
                      )}

                      <Link href={`/customer/orders/${order.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              No orders found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {filter === "all" 
                ? "You haven't placed any orders yet. Start exploring amazing restaurants!"
                : `You don't have any ${filter} orders right now.`
              }
            </p>
            {filter === "all" && (
              <Link href="/shop">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500">
                  Browse Restaurants
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Simple Pickup Modal - CSAT Optimized */}
      {selectedOrderForPickup && (
        <SimplePickupModal
          isOpen={pickupModalOpen}
          onClose={() => {
            setPickupModalOpen(false);
            setSelectedOrderForPickup(null);
          }}
          order={{
            id: getSelectedOrder()?.id || '',
            orderNumber: getSelectedOrder()?.orderNumber || '',
            restaurant: {
              name: getSelectedOrder()?.restaurant.name || '',
              address: getSelectedOrder()?.restaurant.address || ''
            } as any,
            items: getSelectedOrder()?.items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              image: item.image,
              specialNotes: item.type === 'Fresh Experience' ? 'Chef interaction included' : undefined
            })) || [],
            pickupTime: getSelectedOrder()?.pickupTime || '',
            total: getSelectedOrder()?.total || 0
          } as any}
          onConfirmPickup={handlePickupConfirmation}
        />
      )}
    </div>
  );
}