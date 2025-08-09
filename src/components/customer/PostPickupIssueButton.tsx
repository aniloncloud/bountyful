"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon, CameraIcon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface PostPickupIssueButtonProps {
  orderId: string;
  orderNumber: string;
}

export function PostPickupIssueButton({ orderId, orderNumber }: PostPickupIssueButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const commonIssues = [
    "Missing items",
    "Wrong items received",
    "Food quality issue", 
    "Temperature issue",
    "Packaging problem",
    "Portion size smaller than expected",
    "Items didn't match description",
    "Other"
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleTakePhoto = () => {
    // Mock photo capture
    const mockPhoto = `/api/placeholder/200/200?issue=${Date.now()}`;
    setPhotos(prev => [...prev, mockPhoto]);
  };

  const handleSubmit = async () => {
    if (selectedIssues.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to submit issue
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Issue reported:', {
      orderId,
      issues: selectedIssues,
      description,
      photos,
      timestamp: new Date().toISOString()
    });
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Auto close after success
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setSelectedIssues([]);
      setDescription('');
      setPhotos([]);
    }, 3000);
  };

  if (!showModal) {
    return (
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => setShowModal(true)}
        className="text-orange-600 border-orange-300 hover:bg-orange-50"
      >
        <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
        Report Issue
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Report Issue</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Order #{orderNumber}
            </p>
          </div>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-2xl mb-2">⚠️</div>
                <h4 className="font-semibold text-lg mb-2">What went wrong?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We'll investigate and get this resolved quickly
                </p>
              </div>

              {/* Issue Selection */}
              <div className="space-y-3">
                <label className="font-medium">Select issues:</label>
                <div className="grid grid-cols-2 gap-2">
                  {commonIssues.map((issue) => (
                    <button
                      key={issue}
                      onClick={() => handleIssueToggle(issue)}
                      className={`p-3 text-sm rounded-lg border transition-colors text-left ${
                        selectedIssues.includes(issue)
                          ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="font-medium">Additional details (optional):</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about the issue..."
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none"
                  rows={3}
                />
              </div>

              {/* Photo Evidence */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Photos (helpful for resolution):</label>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleTakePhoto}
                  >
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src={photo} alt={`Issue evidence ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-2">What happens next:</h5>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                  <li>• We'll review your report within 1 hour</li>
                  <li>• Restaurant will be notified for improvement</li>
                  <li>• You'll receive updates via app notifications</li>
                  <li>• Refunds/credits processed if applicable</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="font-semibold text-lg mb-2">Issue Reported!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Thanks for the feedback. We'll investigate and follow up soon.
              </p>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium mb-1">Report #{orderId.slice(-6).toUpperCase()}</div>
                  <div className="text-green-700 dark:text-green-300">
                    Expected resolution: Within 24 hours
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button 
              onClick={handleSubmit}
              disabled={selectedIssues.length === 0 || isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Reporting...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}