"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CheckCircleIcon, 
  XMarkIcon, 
  StarIcon,
  PhotoIcon,
  ClockIcon
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
}

interface SimplePickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    orderNumber: string;
    restaurant: {
      name: string;
    };
    items: PickupItem[];
    total: number;
  };
  onConfirmPickup: (data: { rating?: number }) => void;
}

export function SimplePickupModal({ 
  isOpen, 
  onClose, 
  order, 
  onConfirmPickup 
}: SimplePickupModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handlePickupConfirm = async () => {
    setIsProcessing(true);
    
    // Instant pickup confirmation - no waiting for restaurant
    await onConfirmPickup({ rating: rating || undefined });
    
    setCompleted(true);
    setIsProcessing(false);
    
    // Quick optional rating
    if (!rating) {
      setShowRating(true);
      setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
    } else {
      setTimeout(() => {
        onClose();
      }, 1500); // Close faster if rated
    }
  };

  const handleRatingAndClose = (selectedRating?: number) => {
    if (selectedRating) {
      // Send rating update if provided
      console.log('Rating submitted:', selectedRating);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Pickup Confirmation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              #{order.orderNumber}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {!completed ? (
            <div className="space-y-6">
              {/* Quick Order Preview */}
              <div className="text-center">
                <div className="text-2xl mb-2">📦</div>
                <h4 className="font-semibold text-lg mb-2">Ready for Pickup!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Show this screen to {order.restaurant.name} staff
                </p>
              </div>

              {/* Minimal Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{order.items.length} items</span>
                  <span className="font-bold text-green-600">${order.total}</span>
                </div>
                
                {/* Top items only */}
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                        <PhotoIcon className="h-3 w-3 text-gray-400" />
                      </div>
                      <span>{item.name}</span>
                      <span className="text-gray-500">×{item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-xs text-gray-500 ml-8">
                      +{order.items.length - 2} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Super Simple Instructions */}
              <div className="text-center text-xs text-gray-500 space-y-1">
                <div>1. Show this screen to staff</div>
                <div>2. Receive your order</div>
                <div>3. Tap "Picked Up" below</div>
              </div>
            </div>
          ) : showRating ? (
            /* Optional Quick Rating */
            <div className="space-y-6 text-center">
              <div className="text-2xl mb-2">⭐</div>
              <h4 className="font-semibold text-lg mb-2">Quick Rating?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                (Optional - helps improve the experience)
              </p>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingAndClose(star)}
                    className="transition-colors"
                  >
                    <StarIcon className="h-8 w-8 text-gray-300 hover:text-yellow-500" />
                  </button>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRatingAndClose()}
                className="text-xs"
              >
                Skip
              </Button>
            </div>
          ) : (
            /* Completion */
            <div className="space-y-4 text-center">
              <div className="text-4xl mb-2">✅</div>
              <h4 className="font-semibold text-lg">Pickup Confirmed!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Digital receipt sent • Thanks for using Bountyful!
              </p>
            </div>
          )}
        </div>

        {/* Footer - Only show main button */}
        {!completed && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={handlePickupConfirm}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-lg py-3"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircleIconSolid className="h-5 w-5 mr-2" />
                  Picked Up
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-gray-500 mt-2">
              Issues? Report them later in the app
            </p>
          </div>
        )}
      </div>
    </div>
  );
}