"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserIcon,
  MapPinIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckSolid, XCircleIcon } from "@heroicons/react/24/solid";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    type: "surplus" | "fresh";
    quantity: number;
    specialInstructions?: string;
  }>;
  totalAmount: number;
  orderTime: Date;
  pickupTime: Date;
  status: "new" | "confirmed" | "preparing" | "ready" | "arrived" | "completed" | "expired" | "no_show";
  paymentStatus: "pending" | "paid" | "refunded";
  customerNotes?: string;
  estimatedPrepTime: number;
  qrCode: string;
  priority: "normal" | "urgent" | "vip";
  rating?: number;
  feedback?: string;
  distance?: string;
  isFirstTime: boolean;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const now = new Date();

  // Mock orders data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-2024-001",
        customerName: "Sarah Chen",
        customerPhone: "+1 (415) 555-0123",
        items: [
          { name: "Chef's Pasta Special", type: "fresh", quantity: 1, specialInstructions: "Extra herbs please" },
          { name: "Italian Surprise Box", type: "surplus", quantity: 1 }
        ],
        totalAmount: 17.98,
        orderTime: new Date(now.getTime() - 45 * 60 * 1000),
        pickupTime: new Date(now.getTime() + 15 * 60 * 1000),
        status: "preparing",
        paymentStatus: "paid",
        customerNotes: "Running a bit late, please hold until 7:20 PM",
        estimatedPrepTime: 20,
        qrCode: "QR8XY2",
        priority: "normal",
        distance: "0.3 mi",
        isFirstTime: false
      },
      {
        id: "ORD-2024-002", 
        customerName: "Michael Rodriguez",
        customerPhone: "+1 (415) 555-0456",
        items: [
          { name: "Fresh Experience Bag", type: "fresh", quantity: 2 }
        ],
        totalAmount: 25.98,
        orderTime: new Date(now.getTime() - 30 * 60 * 1000),
        pickupTime: new Date(now.getTime() + 30 * 60 * 1000),
        status: "confirmed",
        paymentStatus: "paid",
        estimatedPrepTime: 25,
        qrCode: "QR9HZ1",
        priority: "vip",
        distance: "0.8 mi",
        isFirstTime: true
      },
      {
        id: "ORD-2024-003",
        customerName: "Emma Thompson",
        customerPhone: "+1 (415) 555-0789",
        items: [
          { name: "Surplus Surprise", type: "surplus", quantity: 3 }
        ],
        totalAmount: 14.97,
        orderTime: new Date(now.getTime() - 10 * 60 * 1000),
        pickupTime: new Date(now.getTime() + 45 * 60 * 1000),
        status: "new",
        paymentStatus: "paid",
        estimatedPrepTime: 10,
        qrCode: "QR2JK7",
        priority: "normal",
        distance: "1.2 mi",
        isFirstTime: false
      },
      {
        id: "ORD-2024-004",
        customerName: "David Kim",
        customerPhone: "+1 (415) 555-0321",
        items: [
          { name: "Italian Surprise Box", type: "surplus", quantity: 1 }
        ],
        totalAmount: 4.99,
        orderTime: new Date(now.getTime() - 5 * 60 * 1000),
        pickupTime: new Date(now.getTime() + 60 * 60 * 1000),
        status: "arrived",
        paymentStatus: "paid",
        estimatedPrepTime: 5,
        qrCode: "QR5LM3",
        priority: "urgent",
        distance: "0.1 mi",
        isFirstTime: false
      }
    ];
    
    setOrders(mockOrders);
  }, []);

  const statusConfig = {
    new: { color: "bg-blue-500/15 text-blue-700 dark:text-blue-300", label: "New Order", icon: "🆕" },
    confirmed: { color: "bg-green-500/15 text-green-700 dark:text-green-300", label: "Confirmed", icon: "✅" },
    preparing: { color: "bg-orange-500/15 text-orange-700 dark:text-orange-300", label: "Preparing", icon: "👨‍🍳" },
    ready: { color: "bg-purple-500/15 text-purple-700 dark:text-purple-300", label: "Ready", icon: "📦" },
    arrived: { color: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300", label: "Customer Here", icon: "🚗" },
    completed: { color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", label: "Completed", icon: "🎉" },
    expired: { color: "bg-red-500/15 text-red-700 dark:text-red-300", label: "Expired", icon: "⏰" },
    no_show: { color: "bg-gray-500/15 text-gray-700 dark:text-gray-300", label: "No Show", icon: "❌" }
  };

  const activeOrders = orders.filter(order => 
    ["new", "confirmed", "preparing", "ready", "arrived"].includes(order.status)
  );
  
  const completedOrders = orders.filter(order => 
    ["completed", "expired", "no_show"].includes(order.status)
  );

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getTimeUntilPickup = (pickupTime: Date) => {
    const diff = pickupTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 0) return { text: `${Math.abs(minutes)} min late`, isLate: true };
    if (minutes === 0) return { text: "Now", isUrgent: true };
    return { text: `${minutes} min`, isLate: false, isUrgent: minutes <= 5 };
  };

  const refreshOrders = () => {
    setLastRefresh(new Date());
    // In real app, would fetch fresh data from API
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Board</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage orders and optimize pickup flow for better customer experience
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button onClick={refreshOrders} variant="outline" size="sm">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{activeOrders.length}</div>
            <p className="text-sm text-gray-600">Active Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-orange-600">
              {activeOrders.filter(o => getTimeUntilPickup(o.pickupTime).isUrgent).length}
            </div>
            <p className="text-sm text-gray-600">Ready Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-cyan-600">
              {orders.filter(o => o.status === "arrived").length}
            </div>
            <p className="text-sm text-gray-600">Customers Here</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">
              ${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
        </TabsList>

        {/* Active Orders */}
        <TabsContent value="active" className="space-y-4">
          {activeOrders.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">All caught up!</h3>
                  <p className="text-gray-600 dark:text-gray-400">No active orders at the moment.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeOrders.map((order) => {
                const timeInfo = getTimeUntilPickup(order.pickupTime);
                const config = statusConfig[order.status];
                
                return (
                  <Card 
                    key={order.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      order.priority === "urgent" ? "ring-2 ring-red-500" :
                      order.priority === "vip" ? "ring-2 ring-purple-500" : ""
                    } ${timeInfo.isLate ? "bg-red-50 dark:bg-red-900/10" : ""}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{order.customerName}</h3>
                            {order.isFirstTime && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                First Time
                              </span>
                            )}
                            {order.priority === "vip" && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                VIP
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p>Order #{order.id.split('-').pop()}</p>
                            <p className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4" />
                              Pickup: {order.pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              <span className={`font-medium ${
                                timeInfo.isLate ? "text-red-600" : 
                                timeInfo.isUrgent ? "text-orange-600" : "text-gray-600"
                              }`}>
                                ({timeInfo.text})
                              </span>
                            </p>
                            <p>${order.totalAmount.toFixed(2)} • {order.items.length} items</p>
                          </div>
                          
                          {/* Items Summary */}
                          <div className="mt-2">
                            {order.items.map((item, idx) => (
                              <span 
                                key={idx}
                                className={`inline-block mr-2 mb-1 px-2 py-1 text-xs rounded ${
                                  item.type === "fresh" 
                                    ? "bg-purple-100 text-purple-800" 
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.quantity}x {item.name}
                              </span>
                            ))}
                          </div>
                          
                          {/* Customer Notes */}
                          {order.customerNotes && (
                            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                              💬 {order.customerNotes}
                            </div>
                          )}
                        </div>
                        
                        {/* Status & Actions */}
                        <div className="text-right space-y-3">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${config.color}`}>
                            <span>{config.icon}</span>
                            {config.label}
                          </span>
                          
                          <div className="space-y-2">
                            {order.status === "new" && (
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "confirmed");
                                }}
                                className="w-full"
                              >
                                <CheckSolid className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            )}
                            
                            {order.status === "confirmed" && (
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "preparing");
                                }}
                                className="w-full bg-orange-600 hover:bg-orange-700"
                              >
                                Start Prep
                              </Button>
                            )}
                            
                            {order.status === "preparing" && (
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "ready");
                                }}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                              >
                                Mark Ready
                              </Button>
                            )}
                            
                            {order.status === "ready" && (
                              <div className="space-y-1">
                                <Button 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateOrderStatus(order.id, "arrived");
                                  }}
                                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                                >
                                  Customer Here
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Call customer
                                    window.open(`tel:${order.customerPhone}`);
                                  }}
                                  className="w-full"
                                >
                                  <PhoneIcon className="h-4 w-4 mr-1" />
                                  Call
                                </Button>
                              </div>
                            )}
                            
                            {order.status === "arrived" && (
                              <div className="space-y-1">
                                <Button 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateOrderStatus(order.id, "completed");
                                  }}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                >
                                  Complete Order
                                </Button>
                                <div className="text-xs text-cyan-600 font-medium">
                                  QR: {order.qrCode}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Completed Orders */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedOrders.map((order) => {
              const config = statusConfig[order.status];
              
              return (
                <Card key={order.id} className="opacity-75">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{order.customerName}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Order #{order.id.split('-').pop()} • ${order.totalAmount.toFixed(2)}</p>
                          <p>Completed: {order.pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${config.color}`}>
                          <span>{config.icon}</span>
                          {config.label}
                        </span>
                        
                        {order.rating && (
                          <div className="flex items-center gap-1 justify-end">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{order.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal - Would be a proper modal in real app */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Details - {selectedOrder.customerName}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  ✕ Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Name:</strong> {selectedOrder.customerName}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedOrder.customerPhone}
                  </div>
                  <div>
                    <strong>Distance:</strong> {selectedOrder.distance}
                  </div>
                  <div>
                    <strong>Customer Type:</strong> {selectedOrder.isFirstTime ? "First Time" : "Returning"}
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <div className="font-medium">{item.quantity}x {item.name}</div>
                        <div className="text-sm text-gray-600">
                          Type: {item.type === "fresh" ? "Fresh Experience" : "Surplus Bag"}
                        </div>
                        {item.specialInstructions && (
                          <div className="text-sm text-blue-600 mt-1">
                            Note: {item.specialInstructions}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Timing */}
              <div>
                <h3 className="font-semibold mb-2">Timing</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Order Time:</strong><br />
                    {selectedOrder.orderTime.toLocaleString()}
                  </div>
                  <div>
                    <strong>Pickup Time:</strong><br />
                    {selectedOrder.pickupTime.toLocaleString()}
                  </div>
                  <div>
                    <strong>Prep Time:</strong> {selectedOrder.estimatedPrepTime} min
                  </div>
                  <div>
                    <strong>QR Code:</strong> {selectedOrder.qrCode}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => window.open(`tel:${selectedOrder.customerPhone}`)}
                  className="flex-1"
                  variant="outline"
                >
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button 
                  onClick={() => window.open(`sms:${selectedOrder.customerPhone}`)}
                  className="flex-1"
                  variant="outline"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
