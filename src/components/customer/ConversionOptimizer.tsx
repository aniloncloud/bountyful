"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XMarkIcon, SparklesIcon, GiftIcon, FireIcon } from "@heroicons/react/24/solid";
import { analytics } from "./AnalyticsTracker";

interface ConversionModal {
  id: string;
  type: "exit_intent" | "time_based" | "scroll_based" | "cart_abandonment";
  title: string;
  description: string;
  offer: string;
  cta: string;
  urgency?: string;
  icon: string;
  color: string;
}

export function ConversionOptimizer() {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<ConversionModal | null>(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const pathname = usePathname();

  const modals: ConversionModal[] = [
    {
      id: "first_visit",
      type: "time_based",
      title: "Welcome to Bountyful! 🎉",
      description: "New to fresh experiences and surplus surprises?",
      offer: "Get 20% off your first order",
      cta: "Claim Welcome Offer",
      icon: "✨",
      color: "from-purple-500 to-blue-500"
    },
    {
      id: "peak_alert",
      type: "time_based", 
      title: "🔥 Peak Kitchen Alert!",
      description: "High kitchen capacity detected nearby",
      offer: "Fresh experiences available now - Limited spots",
      cta: "View Peak Experiences",
      urgency: "Only 15 minutes left at peak capacity",
      icon: "🔥",
      color: "from-red-500 to-orange-500"
    },
    {
      id: "cart_recovery",
      type: "cart_abandonment",
      title: "Don't Miss Out! 🛍️",
      description: "You have items waiting in your cart",
      offer: "Complete your order and save big on food waste",
      cta: "Complete Order",
      urgency: "Your reserved spots expire in 10 minutes",
      icon: "⏰",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "browse_motivation",
      type: "scroll_based",
      title: "So Many Amazing Options! 🤔",
      description: "Need help finding the perfect experience?",
      offer: "Answer 3 quick questions for personalized recommendations",
      cta: "Get Recommendations",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset modal state on page change
    setHasShownModal(false);
    setShowModal(false);
    setTimeOnPage(0);
  }, [pathname]);

  useEffect(() => {
    // Time-based triggers
    if (timeOnPage === 30 && !hasShownModal) { // 30 seconds
      if (pathname === "/customer" && !localStorage.getItem("welcome_shown")) {
        showConversionModal(modals[0]);
        localStorage.setItem("welcome_shown", "true");
      }
    }

    if (timeOnPage === 45 && !hasShownModal) { // 45 seconds
      // Simulate peak kitchen detection
      const isPeakHours = new Date().getHours() >= 18 && new Date().getHours() <= 21;
      if (isPeakHours && Math.random() > 0.7) { // 30% chance during peak
        showConversionModal(modals[1]);
      }
    }
  }, [timeOnPage, hasShownModal, pathname]);

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownModal) {
        const cartItems = localStorage.getItem("cart_items");
        if (cartItems && JSON.parse(cartItems).length > 0) {
          showConversionModal(modals[2]);
        } else {
          showConversionModal(modals[3]);
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownModal]);

  // Cart abandonment trigger
  useEffect(() => {
    const cartCheckInterval = setInterval(() => {
      const cartItems = localStorage.getItem("cart_items");
      const lastCartUpdate = localStorage.getItem("last_cart_update");
      
      if (cartItems && lastCartUpdate) {
        const items = JSON.parse(cartItems);
        const lastUpdate = parseInt(lastCartUpdate);
        const timeSinceUpdate = Date.now() - lastUpdate;
        
        // If items in cart for more than 10 minutes without checkout
        if (items.length > 0 && timeSinceUpdate > 600000 && !hasShownModal) {
          showConversionModal(modals[2]);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(cartCheckInterval);
  }, [hasShownModal]);

  const showConversionModal = (modal: ConversionModal) => {
    setCurrentModal(modal);
    setShowModal(true);
    setHasShownModal(true);

    // Track modal display
    analytics.track('conversion_modal_shown', {
      modal_id: modal.id,
      modal_type: modal.type,
      page: pathname,
      time_on_page: timeOnPage
    });
  };

  const handleModalClick = () => {
    if (!currentModal) return;

    analytics.track('conversion_modal_clicked', {
      modal_id: currentModal.id,
      modal_type: currentModal.type,
      cta_text: currentModal.cta
    });

    // Handle different modal actions
    switch (currentModal.id) {
      case "first_visit":
        window.location.href = "/shop?welcome=true";
        break;
      case "peak_alert":
        window.location.href = "/shop/peak-experiences";
        break;
      case "cart_recovery":
        window.location.href = "/shop/cart";
        break;
      case "browse_motivation":
        // Could open a recommendation wizard
        window.location.href = "/shop?recommendations=true";
        break;
    }

    setShowModal(false);
  };

  const handleModalClose = () => {
    if (!currentModal) return;

    analytics.track('conversion_modal_closed', {
      modal_id: currentModal.id,
      modal_type: currentModal.type,
      time_displayed: Date.now() - timeOnPage * 1000
    });

    setShowModal(false);
  };

  if (!showModal || !currentModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`relative max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 ${showModal ? 'scale-100' : 'scale-95'}`}>
        
        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <div className="text-center">
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${currentModal.color} text-white text-2xl mb-6`}>
              {currentModal.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentModal.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentModal.description}
            </p>

            {/* Offer */}
            <div className={`p-4 rounded-xl bg-gradient-to-r ${currentModal.color} text-white mb-6`}>
              <p className="font-semibold text-lg">
                {currentModal.offer}
              </p>
              {currentModal.urgency && (
                <p className="text-sm mt-2 opacity-90">
                  ⏰ {currentModal.urgency}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleModalClick}
                className={`w-full bg-gradient-to-r ${currentModal.color} hover:opacity-90 text-white`}
                size="lg"
              >
                {currentModal.cta}
              </Button>
              
              <button
                onClick={handleModalClose}
                className="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator for urgency */}
        {currentModal.urgency && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-2xl overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${currentModal.color} animate-pulse`} style={{ width: "75%" }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for tracking conversion events in components
export function useConversionTracking() {
  return {
    trackAddToCart: (bagId: string, source: "main" | "cross_sell" | "recommendation") => {
      analytics.track('conversion_add_to_cart', {
        bag_id: bagId,
        source,
        is_cross_sell: source === 'cross_sell'
      });
    },

    trackCheckoutStart: (value: number, items: any[]) => {
      analytics.track('conversion_checkout_start', {
        order_value: value,
        item_count: items.length,
        has_fresh_experiences: items.some((item: any) => item.type.includes('Fresh'))
      });
    },

    trackPurchaseComplete: (orderId: string, value: number, items: any[]) => {
      analytics.track('conversion_purchase', {
        order_id: orderId,
        order_value: value,
        item_count: items.length,
        conversion_funnel: 'completed'
      });
    },

    trackCrossSellClick: (originalBag: any, recommendedBag: any, position: number) => {
      analytics.track('conversion_cross_sell', {
        original_bag_id: originalBag.id,
        recommended_bag_id: recommendedBag.id,
        position,
        price_difference: recommendedBag.price - originalBag.price
      });
    }
  };
}