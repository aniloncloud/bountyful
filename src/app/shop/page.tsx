"use client";

import { useState, useEffect } from "react";
import { CustomerHero } from "@/components/customer/CustomerHero";
import { RestaurantGrid } from "@/components/customer/RestaurantGrid";
import { SearchFilters } from "@/components/customer/SearchFilters";
import { CategoryTabs } from "@/components/customer/CategoryTabs";

export default function CustomerHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState({
    bagType: "all", // all, surplus, fresh, experience
    priceRange: "all", // all, under-5, 5-10, 10-15, 15-plus
    timing: "all", // all, now, peak, slow
    cuisine: "all",
    distance: "5km"
  });

  return (
    <div className="space-y-8">
      <CustomerHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        
        <CategoryTabs 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <RestaurantGrid 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
}