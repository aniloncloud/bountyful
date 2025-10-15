"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Analytics event types based on the business requirements
type AnalyticsEvent = 
  | "page_view"
  | "restaurant_view" 
  | "bag_view"
  | "bag_add_to_cart"
  | "cross_sell_view"
  | "cross_sell_click"
  | "addon_selected"
  | "checkout_started"
  | "payment_completed"
  | "peak_experience_view"
  | "flash_cooking_alert"
  | "search_performed"
  | "filter_applied"
  | "favorite_added"
  | "review_submitted"
  | "conversion_modal_shown"
  | "conversion_modal_clicked"
  | "conversion_modal_closed"
  | "conversion_add_to_cart"
  | "conversion_checkout_start"
  | "conversion_purchase"
  | "conversion_cross_sell";

interface AnalyticsData {
  event: AnalyticsEvent;
  properties?: Record<string, any>;
  timestamp?: number;
  sessionId?: string;
  userId?: string | null;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private sessionId: string;
  private userId: string | null = null;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  track(event: AnalyticsEvent, properties: Record<string, any> = {}) {
    const analyticsData: AnalyticsData = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsData);
    }

    // Send to analytics service (implement based on your provider)
    this.sendToAnalytics(analyticsData);
  }

  private async sendToAnalytics(data: AnalyticsData) {
    try {
      // Example implementation - replace with your analytics provider
      // Google Analytics 4
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', data.event, {
          ...data.properties,
          session_id: data.sessionId,
          user_id: data.userId
        });
      }

      // Custom analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).catch(() => {
        // Fail silently for analytics
      });

      // Mixpanel example
      if (typeof (window as any).mixpanel !== 'undefined') {
        (window as any).mixpanel.track(data.event, data.properties);
      }
    } catch (error) {
      // Fail silently for analytics
    }
  }

  // Conversion tracking methods
  trackRevenueEvent(orderId: string, revenue: number, items: any[]) {
    this.track('payment_completed', {
      order_id: orderId,
      revenue,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.bagId,
        item_name: item.bagName,
        item_category: item.bagType,
        price: item.price,
        quantity: item.quantity,
        restaurant: item.restaurant
      }))
    });
  }

  trackCrossSellSuccess(originalBag: any, recommendedBag: any, position: number) {
    this.track('cross_sell_click', {
      original_bag_id: originalBag.id,
      original_bag_price: originalBag.price,
      recommended_bag_id: recommendedBag.id,
      recommended_bag_price: recommendedBag.price,
      position,
      conversion: true
    });
  }

  trackPeakExperienceEngagement(restaurantId: string, capacity: number, experienceType: string) {
    this.track('peak_experience_view', {
      restaurant_id: restaurantId,
      kitchen_capacity: capacity,
      experience_type: experienceType,
      is_peak_hours: capacity >= 80
    });
  }
}

export const analytics = AnalyticsService.getInstance();

// React component for automatic page view tracking
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    analytics.track('page_view', {
      page: pathname,
      referrer: document.referrer
    });
  }, [pathname]);

  // Track user engagement
  useEffect(() => {
    let startTime = Date.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isVisible) {
          const timeSpent = Date.now() - startTime;
          analytics.track('page_view', {
            page: pathname,
            time_spent: timeSpent,
            engagement_type: 'time_on_page'
          });
          isVisible = false;
        }
      } else {
        startTime = Date.now();
        isVisible = true;
      }
    };

    const handleBeforeUnload = () => {
      if (isVisible) {
        const timeSpent = Date.now() - startTime;
        navigator.sendBeacon('/api/analytics', JSON.stringify({
          event: 'page_view',
          properties: {
            page: pathname,
            time_spent: timeSpent,
            engagement_type: 'page_exit'
          },
          timestamp: Date.now()
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

// Utility hooks for tracking specific events
export function useAnalytics() {
  return {
    trackRestaurantView: (restaurantId: string, bagTypes: string[]) => {
      analytics.track('restaurant_view', {
        restaurant_id: restaurantId,
        available_bag_types: bagTypes,
        bags_count: bagTypes.length
      });
    },

    trackBagView: (bagId: string, bagType: string, price: number, restaurant: string) => {
      analytics.track('bag_view', {
        bag_id: bagId,
        bag_type: bagType,
        price,
        restaurant,
        is_fresh_experience: bagType.includes('Fresh'),
        is_peak_hours: new Date().getHours() >= 18 && new Date().getHours() <= 21
      });
    },

    trackAddToCart: (bagId: string, price: number, addOns: any[] = []) => {
      const addOnValue = addOns.reduce((sum, addon) => sum + addon.price, 0);
      analytics.track('bag_add_to_cart', {
        bag_id: bagId,
        bag_price: price,
        addon_count: addOns.length,
        addon_value: addOnValue,
        total_value: price + addOnValue
      });
    },

    trackSearch: (query: string, resultsCount: number, filters: any) => {
      analytics.track('search_performed', {
        query,
        results_count: resultsCount,
        filters: filters,
        has_filters: Object.keys(filters).some(key => filters[key] !== 'all')
      });
    },

    trackCheckoutStart: (items: any[], totalValue: number) => {
      analytics.track('checkout_started', {
        item_count: items.length,
        total_value: totalValue,
        has_fresh_experiences: items.some(item => item.type.includes('Fresh')),
        has_addons: items.some(item => item.addOns && item.addOns.length > 0)
      });
    },

    trackFlashCookingAlert: (restaurantId: string, capacity: number, timeRemaining: number) => {
      analytics.track('flash_cooking_alert', {
        restaurant_id: restaurantId,
        kitchen_capacity: capacity,
        time_remaining: timeRemaining,
        alert_urgency: timeRemaining < 1800 ? 'high' : 'medium' // 30 minutes
      });
    }
  };
}