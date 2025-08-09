"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, GiftIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: {
    bagType: string;
    priceRange: string;
    timing: string;
    cuisine: string;
    distance: string;
  };
  setSelectedFilters: (filters: any) => void;
}

export function SearchFilters({ searchQuery, setSearchQuery, selectedFilters, setSelectedFilters }: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const bagTypes = [
    { id: "all", label: "All Bags", icon: "🍽️" },
    { id: "fresh", label: "Fresh Experience", icon: "✨", color: "from-purple-500 to-blue-500" },
    { id: "surplus", label: "Surplus Surprise", icon: "🎁", color: "from-green-500 to-emerald-500" },
    { id: "experience", label: "Premium Experience", icon: "👨‍🍳", color: "from-orange-500 to-red-500" }
  ];

  const priceRanges = [
    { id: "all", label: "Any Price" },
    { id: "under-5", label: "Under $5" },
    { id: "5-10", label: "$5 - $10" },
    { id: "10-15", label: "$10 - $15" },
    { id: "15-plus", label: "$15+" }
  ];

  const timings = [
    { id: "all", label: "All Times", icon: "🕐" },
    { id: "now", label: "Available Now", icon: "⚡" },
    { id: "peak", label: "Peak Hours (Fresh)", icon: "🔥" },
    { id: "slow", label: "Slow Hours (Surplus)", icon: "🌙" }
  ];

  const cuisines = [
    { id: "all", label: "All Cuisines" },
    { id: "italian", label: "Italian" },
    { id: "asian", label: "Asian" },
    { id: "american", label: "American" },
    { id: "mexican", label: "Mexican" },
    { id: "indian", label: "Indian" },
    { id: "mediterranean", label: "Mediterranean" }
  ];

  const distances = [
    { id: "1km", label: "1km" },
    { id: "5km", label: "5km" },
    { id: "10km", label: "10km" },
    { id: "25km", label: "25km" }
  ];

  const updateFilter = (key: string, value: string) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
  };

  const clearFilters = () => {
    setSelectedFilters({
      bagType: "all",
      priceRange: "all", 
      timing: "all",
      cuisine: "all",
      distance: "5km"
    });
  };

  const getActiveFilterCount = () => {
    return Object.entries(selectedFilters).filter(([key, value]) => 
      key !== 'distance' && value !== 'all'
    ).length;
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search restaurants, cuisines, or dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Filter toggle */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          
          {/* Bag Types */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-purple-500" />
              Bag Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {bagTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateFilter('bagType', type.id)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedFilters.bagType === type.id
                      ? type.color 
                        ? `bg-gradient-to-r ${type.color} text-white border-transparent`
                        : 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-xs">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => updateFilter('priceRange', range.id)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedFilters.priceRange === range.id
                      ? 'bg-green-500 text-white border-green-500'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timing */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-blue-500" />
              Availability
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {timings.map((timing) => (
                <button
                  key={timing.id}
                  onClick={() => updateFilter('timing', timing.id)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                    selectedFilters.timing === timing.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{timing.icon}</span>
                    <span className="text-xs text-center">{timing.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cuisine */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cuisine</h3>
              <select
                value={selectedFilters.cuisine}
                onChange={(e) => updateFilter('cuisine', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine.id} value={cuisine.id}>
                    {cuisine.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Distance */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-green-500" />
                Distance
              </h3>
              <div className="grid grid-cols-4 gap-1">
                {distances.map((distance) => (
                  <button
                    key={distance.id}
                    onClick={() => updateFilter('distance', distance.id)}
                    className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedFilters.distance === distance.id
                        ? 'bg-green-500 text-white border-green-500'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {distance.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}