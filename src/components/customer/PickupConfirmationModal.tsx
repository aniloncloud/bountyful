"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  CheckCircleIcon, 
  XMarkIcon, 
  CameraIcon, 
  StarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  PhotoIcon
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

interface PickupConfirmationModalProps {
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
    photos?: string[];
    rating?: number;
    feedback?: string;
    issues?: string[];
  }) => void;
}

export function PickupConfirmationModal({ 
  isOpen, 
  onClose, 
  order, 
  onConfirmPickup 
}: PickupConfirmationModalProps) {
  const [step, setStep] = useState<'verification' | 'confirmation' | 'feedback' | 'complete'>('verification');
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [restaurantConfirmed, setRestaurantConfirmed] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [reportedIssues, setReportedIssues] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleTakePhoto = () => {
    // In real app, would use camera API or file input
    const mockPhoto = `/api/placeholder/300/200?pickup=${Date.now()}`;
    setPhotos(prev => [...prev, mockPhoto]);
  };

  const handleIssueToggle = (issue: string) => {
    setReportedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleConfirmation = async () => {
    if (step === 'verification') {
      // Move to confirmation step
      setStep('confirmation');
      return;
    }

    if (step === 'confirmation') {
      // Move to feedback step
      setStep('feedback');
      return;
    }

    if (step === 'feedback') {
      setIsProcessing(true);
      
      // Process pickup confirmation
      await onConfirmPickup({
        customerConfirmed,
        restaurantConfirmed,
        photos,
        rating: rating || undefined,
        feedback: feedback || undefined,
        issues: reportedIssues.length > 0 ? reportedIssues : undefined
      });

      setStep('complete');
      setIsProcessing(false);

      // Auto-close after showing success
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const commonIssues = [
    "Missing items",
    "Wrong items received", 
    "Food quality issue",
    "Temperature issue",
    "Packaging problem",
    "Other"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Pickup Confirmation</h3>
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
          
          {/* Step 1: Verification */}
          {step === 'verification' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📦</div>
                <h4 className="font-semibold text-lg mb-2">Verify Your Order</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please confirm these items match what you received
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <PhotoIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </div>
                      {item.specialNotes && (
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          Note: {item.specialNotes}
                        </div>
                      )}
                    </div>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>

              {/* Photo Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Photos (Optional)</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleTakePhoto}
                  >
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <Image src={photo} alt="Pickup photo" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Issue Reporting */}
              <div className="space-y-3">
                <span className="font-medium">Any Issues?</span>
                <div className="grid grid-cols-2 gap-2">
                  {commonIssues.map((issue) => (
                    <button
                      key={issue}
                      onClick={() => handleIssueToggle(issue)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        reportedIssues.includes(issue)
                          ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6 text-center">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-semibold text-lg mb-2">Two-Way Confirmation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Both you and the restaurant staff need to confirm the pickup
              </p>

              <div className="space-y-4">
                {/* Customer Confirmation */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <span>You (Customer)</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => setCustomerConfirmed(!customerConfirmed)}
                    className={customerConfirmed ? 'bg-green-500' : 'bg-gray-300'}
                  >
                    {customerConfirmed ? (
                      <CheckCircleIconSolid className="h-4 w-4" />
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>

                {/* Restaurant Confirmation - Simulated */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-green-500" />
                    <span>Restaurant Staff</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => setRestaurantConfirmed(!restaurantConfirmed)}
                    className={restaurantConfirmed ? 'bg-green-500' : 'bg-gray-300'}
                  >
                    {restaurantConfirmed ? (
                      <CheckCircleIconSolid className="h-4 w-4" />
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                In production, restaurant staff would confirm on their device
              </div>
            </div>
          )}

          {/* Step 3: Feedback */}
          {step === 'feedback' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <h4 className="font-semibold text-lg mb-2">Quick Feedback</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help improve the experience (optional)
                </p>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="font-medium">Overall Rating</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      {rating && star <= rating ? (
                        <StarIconSolid className="h-6 w-6 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-6 w-6 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <label className="font-medium">Comments (Optional)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && (
            <div className="space-y-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="font-semibold text-lg mb-2">Pickup Confirmed!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Thank you for using Bountyful. Your pickup has been recorded and digital receipt sent.
              </p>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>Pickup Time:</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Items Received:</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Value:</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'complete' && (
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            {step !== 'verification' && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (step === 'confirmation') setStep('verification');
                  if (step === 'feedback') setStep('confirmation');
                }}
                className="flex-1"
              >
                Back
              </Button>
            )}
            
            <Button 
              onClick={handleConfirmation}
              disabled={
                isProcessing ||
                (step === 'confirmation' && (!customerConfirmed || !restaurantConfirmed))
              }
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : step === 'verification' ? (
                'Continue'
              ) : step === 'confirmation' ? (
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