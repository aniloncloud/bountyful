"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  CheckCircleIcon, 
  XMarkIcon, 
  StarIcon,
  ClockIcon,
  UserIcon,
  PhotoIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  CheckCircleIcon as CheckCircleIconSolid,
  StarIcon as StarIconSolid
} from "@heroicons/react/24/solid";

interface PickupItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  specialNotes?: string;
}

interface QuickPickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    orderNumber: string;
    restaurant: {
      name: string;
      address: string;
    };
    items: PickupItem[];
    pickupTime: string;
    total: number;
  };
  onConfirmPickup: (confirmationData: {
    customerConfirmed: boolean;
    restaurantConfirmed: boolean;
    rating?: number;
    quickFeedback?: string;
  }) => void;
}

export function QuickPickupModal({ 
  isOpen, 
  onClose, 
  order, 
  onConfirmPickup 
}: QuickPickupModalProps) {
  const [step, setStep] = useState<'preview' | 'confirm' | 'feedback' | 'complete'>('preview');
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [restaurantConfirmed, setRestaurantConfirmed] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [quickFeedback, setQuickFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (step === 'preview') {
      setStep('confirm');
      return;
    }

    if (step === 'confirm') {
      setStep('feedback');
      return;
    }

    if (step === 'feedback') {
      setIsProcessing(true);
      
      await onConfirmPickup({
        customerConfirmed,
        restaurantConfirmed,
        rating: rating || undefined,
        quickFeedback: quickFeedback || undefined
      });

      setStep('complete');
      setIsProcessing(false);

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Quick Pickup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Order #{order.orderNumber}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Step 1: Order Preview (Show Before Arriving) */}
          {step === 'preview' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-semibold text-lg mb-2">Your Order Preview</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review what you're collecting - pickup takes just 30 seconds!
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <PhotoIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup Process */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h5 className="font-medium text-green-900 dark:text-green-300 mb-2">
                  ⚡ Super Quick Process:
                </h5>
                <div className="text-sm text-green-800 dark:text-green-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-200 dark:bg-green-800 rounded-full text-xs flex items-center justify-center font-bold">1</span>
                    Show this screen to staff
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-200 dark:bg-green-800 rounded-full text-xs flex items-center justify-center font-bold">2</span>
                    Both confirm pickup (5 seconds)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-200 dark:bg-green-800 rounded-full text-xs flex items-center justify-center font-bold">3</span>
                    Done! Report issues later if needed
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Quick Confirmation (At Restaurant) */}
          {step === 'confirm' && (
            <div className="space-y-6 text-center">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-semibold text-lg mb-2">Confirm Pickup</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Quick dual confirmation - no verification delays!
              </p>

              <div className="space-y-3">
                {/* Customer Confirmation */}
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">You</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => setCustomerConfirmed(!customerConfirmed)}
                    className={customerConfirmed ? 'bg-green-500 text-white' : 'bg-gray-300'}
                  >
                    {customerConfirmed ? (
                      <CheckCircleIconSolid className="h-4 w-4" />
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>

                {/* Restaurant Confirmation - Simulated */}
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Staff</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => setRestaurantConfirmed(!restaurantConfirmed)}
                    className={restaurantConfirmed ? 'bg-green-500 text-white' : 'bg-gray-300'}
                  >
                    {restaurantConfirmed ? (
                      <CheckCircleIconSolid className="h-4 w-4" />
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                  <ExclamationCircleIcon className="h-4 w-4" />
                  <span className="text-xs">
                    Questions about items? Ask staff quickly or report via app after pickup
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Optional Quick Feedback */}
          {step === 'feedback' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <h4 className="font-semibold text-lg mb-2">Quick Rating</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Optional 5-second feedback (helps restaurants improve!)
                </p>
              </div>

              {/* Quick Rating */}
              <div className="space-y-3">
                <label className="font-medium text-center block">How was the pickup?</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      {rating && star <= rating ? (
                        <StarIconSolid className="h-8 w-8 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-8 w-8 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Feedback Buttons */}
              <div className="space-y-2">
                <label className="font-medium text-sm">Quick feedback (optional):</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Great!', 'Fast service', 'Good value', 'Will return'].map((feedback) => (
                    <button
                      key={feedback}
                      onClick={() => setQuickFeedback(feedback)}
                      className={`p-2 text-xs rounded-lg border transition-colors ${
                        quickFeedback === feedback
                          ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {feedback}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && (
            <div className="space-y-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="font-semibold text-lg mb-2">Pickup Complete!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Digital receipt sent. Thanks for using Bountyful!
              </p>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                <div className="flex justify-between mb-1">
                  <span>Pickup Time:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{order.items.length} items</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Issues with your order? Report them in the app for quick resolution!
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'complete' && (
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            {step !== 'preview' && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (step === 'confirm') setStep('preview');
                  if (step === 'feedback') setStep('confirm');
                }}
                className="flex-1"
              >
                Back
              </Button>
            )}
            
            <Button 
              onClick={handleNext}
              disabled={
                isProcessing ||
                (step === 'confirm' && (!customerConfirmed || !restaurantConfirmed))
              }
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : step === 'preview' ? (
                <>
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Ready for Pickup
                </>
              ) : step === 'confirm' ? (
                'Confirm Pickup'
              ) : (
                'Complete'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}