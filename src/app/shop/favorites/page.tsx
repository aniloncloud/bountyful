"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, StarIcon, GiftIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface FavoriteItem {
  id: string;
  type: "restaurant" | "bag";
  name: string;
  image: string;
  description: string;
  addedDate: string;
  restaurant?: {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    distance: string;
    totalBags: number;
    status: "open" | "closed";
  };
  bag?: {
    id: string;
    restaurantId: string;
    restaurantName: string;
    price: number;
    originalPrice: number;
    available: number;
    bagType: "surplus" | "fresh";
    timing: string;
  };
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "restaurant" | "bag">("all");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical" | "rating">("recent");

  // Mock data - in real app would come from user's saved favorites
  const mockFavorites: FavoriteItem[] = [
    {
      id: "fav-1",
      type: "restaurant",
      name: "Bella Vista Italian",
      image: "/api/placeholder/300/200",
      description: "Your go-to spot for authentic Italian experiences",
      addedDate: "2024-01-15",
      restaurant: {
        id: "1",
        name: "Bella Vista Italian",
        cuisine: "Italian",
        rating: 4.8,
        distance: "0.3 km",
        totalBags: 8,
        status: "open"
      }
    },
    {
      id: "fav-2",
      type: "bag",
      name: "Chef's Pasta Special",
      image: "/api/placeholder/300/200", 
      description: "Your favorite fresh experience with chef interactions",
      addedDate: "2024-01-20",
      bag: {
        id: "fresh-1",
        restaurantId: "1",
        restaurantName: "Bella Vista Italian",
        price: 12.99,
        originalPrice: 38.99,
        available: 3,
        bagType: "fresh",
        timing: "Available 6-9pm"
      }
    },
    {
      id: "fav-3",
      type: "restaurant",
      name: "Green Garden Cafe",
      image: "/api/placeholder/300/200",
      description: "Healthy options you love",
      addedDate: "2024-01-10",
      restaurant: {
        id: "3",
        name: "Green Garden Cafe",
        cuisine: "Healthy",
        rating: 4.7,
        distance: "0.8 km",
        totalBags: 5,
        status: "open"
      }
    },
    {
      id: "fav-4",
      type: "bag",
      name: "Asian Fusion Surprise",
      image: "/api/placeholder/300/200",
      description: "Your favorite surprise bag deal",
      addedDate: "2024-01-25",
      bag: {
        id: "surplus-2",
        restaurantId: "2",
        restaurantName: "Dragon Palace",
        price: 5.99,
        originalPrice: 18.99,
        available: 7,
        bagType: "surplus",
        timing: "Available after 9pm"
      }
    }
  ];

  useEffect(() => {
    setFavorites(mockFavorites);
  }, []);

  const filteredAndSortedFavorites = favorites
    .filter(item => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!item.name.toLowerCase().includes(searchLower) &&
            !item.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      if (filterType !== "all" && item.type !== filterType) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "rating":
          const aRating = a.restaurant?.rating || 0;
          const bRating = b.restaurant?.rating || 0;
          return bRating - aRating;
        default:
          return 0;
      }
    });

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const restaurantCount = favorites.filter(item => item.type === "restaurant").length;
  const bagCount = favorites.filter(item => item.type === "bag").length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HeartSolidIcon className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Favorites
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Quick access to your saved restaurants and favorite bags
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-500">{favorites.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Favorites</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-500">{restaurantCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Restaurants</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-500">{bagCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Specific Bags</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-500">💰</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Savings Tracked</div>
          </div>
        </div>

        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring restaurants and bags to build your collection of favorites. 
              Tap the heart icon on any restaurant or bag to save it here.
            </p>
            <Link href="/shop">
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusIcon className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                {/* Filter Type */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Favorites</option>
                  <option value="restaurant">Restaurants Only</option>
                  <option value="bag">Bags Only</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="recent">Recently Added</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="rating">By Rating</option>
                </select>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedFavorites.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  
                  {/* Image */}
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        item.type === "restaurant" ? "bg-blue-500" : 
                        item.bag?.bagType === "fresh" ? "bg-purple-500" : "bg-green-500"
                      }`}>
                        {item.type === "restaurant" ? "🏪 Restaurant" : 
                         item.bag?.bagType === "fresh" ? "✨ Fresh Experience" : "🎁 Surplus Surprise"}
                      </span>
                    </div>

                    {/* Remove favorite button */}
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <HeartSolidIcon className="h-5 w-5 text-red-500 hover:text-red-600" />
                    </button>

                    {/* Availability for bags */}
                    {item.bag && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                          {item.bag.available} available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>

                    {/* Restaurant info for restaurant favorites */}
                    {item.restaurant && (
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium">{item.restaurant.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{item.restaurant.cuisine}</span>
                        <span>•</span>
                        <span>{item.restaurant.distance}</span>
                      </div>
                    )}

                    {/* Bag info for bag favorites */}
                    {item.bag && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          from {item.bag.restaurantName}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-green-600">${item.bag.price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${item.bag.originalPrice}</span>
                          </div>
                          <span className="text-sm text-gray-600 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {Math.round(((item.bag.originalPrice - item.bag.price) / item.bag.originalPrice) * 100)}% off
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {item.description}
                    </p>

                    {/* Added date */}
                    <div className="text-xs text-gray-500 mb-4">
                      Added {formatDate(item.addedDate)}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      {item.restaurant && (
                        <Link href={`/shop/restaurant/${item.restaurant.id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            View Restaurant
                          </Button>
                        </Link>
                      )}
                      
                      {item.bag && (
                        <Link href={`/shop/restaurant/${item.bag.restaurantId}/bag/${item.bag.id}`}>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            {item.bag.available > 0 ? "Book Now" : "Notify When Available"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results */}
            {filteredAndSortedFavorites.length === 0 && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No favorites match your search
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </>
        )}

        {/* Discover More Section */}
        {favorites.length > 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Discover More
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Find new restaurants and bags to add to your favorites
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button variant="outline">
                  Browse All Restaurants
                </Button>
              </Link>
              <Link href="/shop/nearby">
                <Button variant="outline">
                  Find Nearby
                </Button>
              </Link>
              <Link href="/shop/peak-experiences">
                <Button variant="outline">
                  Peak Experiences
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}