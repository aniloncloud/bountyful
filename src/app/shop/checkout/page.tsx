"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CreditCardIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const orderSummary = {
    items: [
      {
        id: "1",
        name: "Chef's Pasta Special",
        restaurant: "Bella Vista Italian", 
        type: "Fresh Experience",
        price: 12.99,
        quantity: 1,
        addOns: [{ name: "Wine Pairing Experience", price: 8.99 }],
        pickupTime: "Today, 7:30 PM"
      },
      {
        id: "2", 
        name: "Sushi Selection Box",
        restaurant: "Sakura Sushi",
        type: "Surplus Surprise", 
        price: 6.99,
        quantity: 2,
        addOns: [],
        pickupTime: "Today, 10:15 PM"
      }
    ],
    subtotal: 34.96,
    serviceFee: 1.75,
    total: 36.71,
    savings: 58.28
  };

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed! 🎉
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your food experiences are reserved and ready for pickup
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.restaurant}</div>
                      <div className="text-sm text-green-600">{item.pickupTime}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${(item.price + item.addOns.reduce((sum, addon) => sum + addon.price, 0)) * item.quantity}</div>
                      <div className="text-sm text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Total: ${orderSummary.total}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                You saved: ${orderSummary.savings}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <ClockIcon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Next Pickup</h3>
              <p className="text-blue-600 font-medium">Today, 7:30 PM</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bella Vista Italian</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <MapPinIcon className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">SMS Notifications</h3>
              <p className="text-green-600 font-medium">Enabled</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pickup reminders sent</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/shop/orders">
              <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                View Order Details
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to cart</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                <span className="text-sm">Details</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <span className="text-sm">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-8">
            
            {step === 1 && (
              <>
                {/* Contact information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                          defaultValue="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                          defaultValue="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                        defaultValue="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                        defaultValue="+1 (555) 123-4567"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll send pickup notifications to this number
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pickup preferences */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Pickup Preferences</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <div>
                          <div className="font-medium">SMS notifications</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Get pickup reminders and order updates
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <div>
                          <div className="font-medium">Early pickup notifications</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Get notified if your order is ready early
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  Continue to Payment
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Payment methods */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                        paymentMethod === "card" 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="h-6 w-6 text-gray-600" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Visa, Mastercard, American Express</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("apple")}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                        paymentMethod === "apple" 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
                          
                        </div>
                        <div>
                          <div className="font-medium">Apple Pay</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Pay with Touch ID or Face ID</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("google")}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                        paymentMethod === "google" 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">
                          G
                        </div>
                        <div>
                          <div className="font-medium">Google Pay</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Quick and secure checkout</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                        Secure Payment
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  {processing ? "Processing..." : `Complete Order - $${orderSummary.total}`}
                </Button>
              </>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.restaurant}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ClockIcon className="h-3 w-3" />
                        <span>{item.pickupTime}</span>
                      </div>
                      {item.addOns.length > 0 && (
                        <div className="text-xs text-purple-600 mt-1">
                          + {item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${((item.price + item.addOns.reduce((sum, addon) => sum + addon.price, 0)) * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                  <span>${orderSummary.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You save</span>
                  <span>-${orderSummary.savings.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-green-600">
                      ${orderSummary.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">
                  ${orderSummary.savings.toFixed(2)} saved
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  63% off original prices
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}