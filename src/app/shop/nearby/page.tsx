"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  distance: string;
  estimatedTime: string;
  address: string;
  image: string;
  status: "open" | "closing_soon" | "closed";
  availableBags: number;
  priceRange: string;
  peakHours: boolean;
  coordinates: { lat: number; lng: number };
}

export default function NearbyPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "availability">("distance");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "closing_soon">("all");

  // Mock data - in real app would come from API
  const mockRestaurants: Restaurant[] = [
    {
      id: "1",
      name: "Bella Vista Italian",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 342,
      distance: "0.3 km",
      estimatedTime: "3 min walk",
      address: "123 Main Street",
      image: "/api/placeholder/300/200",
      status: "open",
      availableBags: 8,
      priceRange: "$$",
      peakHours: true,
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: "2", 
      name: "Dragon Palace",
      cuisine: "Chinese",
      rating: 4.6,
      reviewCount: 218,
      distance: "0.5 km",
      estimatedTime: "6 min walk",
      address: "456 Oak Avenue",
      image: "/api/placeholder/300/200",
      status: "open",
      availableBags: 5,
      priceRange: "$",
      peakHours: false,
      coordinates: { lat: 37.7849, lng: -122.4094 }
    },
    {
      id: "3",
      name: "Green Garden Cafe",
      cuisine: "Healthy",
      rating: 4.7,
      reviewCount: 156,
      distance: "0.8 km", 
      estimatedTime: "10 min walk",
      address: "789 Pine Street",
      image: "/api/placeholder/300/200",
      status: "closing_soon",
      availableBags: 3,
      priceRange: "$$",
      peakHours: false,
      coordinates: { lat: 37.7649, lng: -122.4394 }
    }
  ];

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission("granted");
        },
        (error) => {
          console.error("Location access denied:", error);
          setLocationPermission("denied");
        }
      );
    }

    // Load restaurants
    setRestaurants(mockRestaurants);
  }, []);

  const filteredAndSortedRestaurants = restaurants
    .filter(restaurant => {
      if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filterStatus !== "all" && restaurant.status !== filterStatus) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "rating":
          return b.rating - a.rating;
        case "availability":
          return b.availableBags - a.availableBags;
        default:
          return 0;
      }
    });

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission("granted");
        },
        (error) => {
          setLocationPermission("denied");
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPinIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nearby Restaurants
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Discover fresh experiences and surplus surprises close to you
          </p>
        </div>

        {/* Location Status */}
        {locationPermission === "pending" && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Enable Location Access</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Get personalized recommendations based on your location
                </p>
              </div>
              <Button onClick={requestLocation} className="bg-blue-600 hover:bg-blue-700">
                Enable Location
              </Button>
            </div>
          </div>
        )}

        {locationPermission === "denied" && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Location Access Needed</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  Showing restaurants based on default location. Enable location for better results.
                </p>
              </div>
              <Button onClick={requestLocation} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {locationPermission === "granted" && userLocation && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-green-600" />
              <span className="text-green-800 dark:text-green-300 font-medium">
                📍 Location enabled - showing restaurants near you
              </span>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="availability">Sort by Availability</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Restaurants</option>
              <option value="open">Open Now</option>
              <option value="closing_soon">Closing Soon</option>
            </select>
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="mb-8 h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Interactive Map View</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {filteredAndSortedRestaurants.length} restaurants found nearby
            </p>
          </div>
        </div>

        {/* Restaurant List */}
        <div className="space-y-6">
          {filteredAndSortedRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No restaurants found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredAndSortedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  
                  {/* Restaurant Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-32 lg:h-40 rounded-xl overflow-hidden">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                          restaurant.status === 'open' 
                            ? 'bg-green-500' 
                            : restaurant.status === 'closing_soon' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }`}>
                          {restaurant.status === 'open' 
                            ? '🟢 Open' 
                            : restaurant.status === 'closing_soon' 
                            ? '🟡 Closing Soon' 
                            : '🔴 Closed'
                          }
                        </span>
                      </div>
                      {restaurant.peakHours && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-red-500">
                            🔥 Peak
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {restaurant.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{restaurant.rating}</span>
                        <span>({restaurant.reviewCount})</span>
                      </div>
                      <span>•</span>
                      <span>{restaurant.cuisine}</span>
                      <span>•</span>
                      <span>{restaurant.priceRange}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{restaurant.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{restaurant.estimatedTime}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {restaurant.address}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex flex-col justify-center">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        {restaurant.availableBags}
                      </div>
                      <div className="text-sm text-gray-500">bags available</div>
                    </div>
                    
                    <Link href={`/shop/restaurant/${restaurant.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        View Restaurant
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredAndSortedRestaurants.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Restaurants
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}