"use client";

import { Button } from "@/components/ui/button";
import { SparklesIcon, VideoCameraIcon, BookOpenIcon, GiftIcon } from "@heroicons/react/24/solid";

interface ExperienceAddOnsProps {
  selectedAddOns: string[];
  setSelectedAddOns: (addons: string[]) => void;
}

export function ExperienceAddOns({ selectedAddOns, setSelectedAddOns }: ExperienceAddOnsProps) {
  const addOns = [
    {
      id: "wine-pairing",
      name: "Wine Pairing Experience",
      description: "Sommelier-selected wine to complement your pasta dish",
      price: 8.99,
      originalPrice: 18.99,
      icon: "🍷",
      popular: true,
      features: ["Professional wine selection", "Tasting notes card", "Food pairing guide"],
      availability: "Limited to 4 per session"
    },
    {
      id: "recipe-book", 
      name: "Chef's Recipe Collection",
      description: "Digital cookbook with 25 authentic Italian pasta recipes",
      price: 4.99,
      originalPrice: 12.99,
      icon: "📖",
      popular: false,
      features: ["Digital download", "Video tutorials", "Shopping lists included"],
      availability: "Instant access after pickup"
    },
    {
      id: "ingredient-kit",
      name: "Premium Ingredient Kit",
      description: "Take-home ingredients to recreate the dish at home",
      price: 12.99,
      originalPrice: 24.99,
      icon: "🛍️",
      popular: true,
      features: ["Fresh pasta ingredients", "Authentic Italian seasonings", "Portion for 2 meals"],
      availability: "Subject to ingredient availability"
    },
    {
      id: "video-recording",
      name: "Personal Cooking Video", 
      description: "Professional recording of your chef interaction",
      price: 6.99,
      originalPrice: 15.99,
      icon: "🎥",
      popular: false,
      features: ["10-minute highlight video", "HD quality recording", "Emailed within 24 hours"],
      availability: "Available during peak hours"
    }
  ];

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns(
      selectedAddOns.includes(addonId)
        ? selectedAddOns.filter(id => id !== addonId)
        : [...selectedAddOns, addonId]
    );
  };

  const isSelected = (addonId: string) => selectedAddOns.includes(addonId);

  const getTotalAddOnPrice = () => {
    return addOns
      .filter(addon => selectedAddOns.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold text-lg">Enhance Your Experience</h3>
          {selectedAddOns.length > 0 && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
              {selectedAddOns.length} selected
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Upgrade your fresh pasta experience with these premium add-ons. Each enhancement is specially curated to maximize your learning and enjoyment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOns.map((addon) => (
          <div 
            key={addon.id}
            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
              isSelected(addon.id)
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-md'
            }`}
            onClick={() => toggleAddOn(addon.id)}
          >
            {addon.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="text-3xl">{addon.icon}</div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {addon.name}
                  </h4>
                  <div className="text-right ml-2">
                    <div className={`text-lg font-bold ${isSelected(addon.id) ? 'text-purple-600' : 'text-green-600'}`}>
                      ${addon.price}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      ${addon.originalPrice}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {addon.description}
                </p>

                <div className="space-y-2 mb-3">
                  {addon.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-3">
                  {addon.availability}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isSelected(addon.id) ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    Save ${(addon.originalPrice - addon.price).toFixed(2)}
                  </span>
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected(addon.id)
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {isSelected(addon.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAddOns.length > 0 && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">
              Selected Add-ons
            </h4>
            <button
              onClick={() => setSelectedAddOns([])}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2 mb-3">
            {addOns.filter(addon => isSelected(addon.id)).map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {addon.icon} {addon.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">
                    ${addon.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAddOn(addon.id);
                    }}
                    className="text-purple-600 hover:text-purple-800 text-sm"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-purple-200 dark:border-purple-700">
            <span className="font-semibold text-purple-800 dark:text-purple-200">
              Add-ons Total:
            </span>
            <span className="text-lg font-bold text-purple-600">
              ${getTotalAddOnPrice().toFixed(2)}
            </span>
          </div>
          
          <div className="mt-3 text-xs text-purple-700 dark:text-purple-300">
            💡 <strong>Pro tip:</strong> Bundle savings! Get all 4 add-ons for just $24.99 (save $8.97)
          </div>
        </div>
      )}

      {/* Bundle offer */}
      <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200">
        <div className="flex items-center gap-3 mb-4">
          <GiftIcon className="h-6 w-6 text-orange-500" />
          <h4 className="font-semibold text-lg text-orange-800 dark:text-orange-200">
            Complete Experience Bundle
          </h4>
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            SAVE $8.97
          </span>
        </div>
        
        <p className="text-orange-700 dark:text-orange-300 mb-4">
          Get all 4 premium add-ons for the ultimate pasta-making experience. Perfect for food enthusiasts who want to master authentic Italian cooking.
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-orange-600">$24.99</div>
          <div className="text-right">
            <div className="text-sm text-gray-500 line-through">$32.96</div>
            <div className="text-sm font-medium text-green-600">Save 27%</div>
          </div>
        </div>
        
        <Button
          onClick={() => setSelectedAddOns(['wine-pairing', 'recipe-book', 'ingredient-kit', 'video-recording'])}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          Get Complete Bundle
        </Button>
      </div>
    </div>
  );
}