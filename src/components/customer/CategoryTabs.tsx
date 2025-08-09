"use client";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  const categories = [
    { id: "all", label: "All Restaurants", icon: "🍽️", count: 247 },
    { id: "fresh-experience", label: "Fresh Experiences", icon: "✨", count: 89, color: "purple" },
    { id: "surplus-deals", label: "Surplus Deals", icon: "🎁", count: 156, color: "green" },
    { id: "peak-available", label: "Peak Available", icon: "🔥", count: 34, color: "red" },
    { id: "chef-special", label: "Chef Specials", icon: "👨‍🍳", count: 12, color: "orange" },
    { id: "near-you", label: "Near You", icon: "📍", count: 67, color: "blue" }
  ];

  const getColorClasses = (color: string | undefined, isActive: boolean) => {
    if (!color) {
      return isActive 
        ? "bg-gray-900 text-white border-gray-900" 
        : "border-gray-200 hover:border-gray-300";
    }

    const colorMap = {
      purple: isActive 
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent" 
        : "border-purple-200 hover:border-purple-300 text-purple-700",
      green: isActive 
        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent" 
        : "border-green-200 hover:border-green-300 text-green-700",
      red: isActive 
        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent" 
        : "border-red-200 hover:border-red-300 text-red-700",
      orange: isActive 
        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent" 
        : "border-orange-200 hover:border-orange-300 text-orange-700",
      blue: isActive 
        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent" 
        : "border-blue-200 hover:border-blue-300 text-blue-700"
    };

    return colorMap[color as keyof typeof colorMap] || "";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Categories</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {categories.find(c => c.id === selectedCategory)?.count || 0} restaurants available
        </div>
      </div>

      {/* Desktop tabs */}
      <div className="hidden md:flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all transform hover:scale-105 ${
              getColorClasses(category.color, selectedCategory === category.id)
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              selectedCategory === category.id 
                ? "bg-white/20 text-white" 
                : "bg-gray-100 text-gray-600"
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.label} ({category.count})
            </option>
          ))}
        </select>
      </div>

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">89</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Fresh Experiences Available</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Surplus Deals Ready</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">34</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Peak Hours Active</div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">12</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Chef Specials Today</div>
        </div>
      </div>
    </div>
  );
}