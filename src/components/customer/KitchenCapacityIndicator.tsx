"use client";

interface KitchenCapacityIndicatorProps {
  capacity: number; // 0-100
  size?: "small" | "large";
  showText?: boolean;
}

export function KitchenCapacityIndicator({ 
  capacity, 
  size = "small", 
  showText = true 
}: KitchenCapacityIndicatorProps) {
  
  const getColor = (capacity: number) => {
    if (capacity >= 90) return { bg: "bg-red-500", text: "text-red-500", ring: "ring-red-500/20" };
    if (capacity >= 80) return { bg: "bg-orange-500", text: "text-orange-500", ring: "ring-orange-500/20" };
    if (capacity >= 70) return { bg: "bg-yellow-500", text: "text-yellow-500", ring: "ring-yellow-500/20" };
    if (capacity >= 50) return { bg: "bg-green-500", text: "text-green-500", ring: "ring-green-500/20" };
    return { bg: "bg-gray-500", text: "text-gray-500", ring: "ring-gray-500/20" };
  };

  const getStatus = (capacity: number) => {
    if (capacity >= 90) return "PEAK";
    if (capacity >= 80) return "BUSY"; 
    if (capacity >= 70) return "ACTIVE";
    if (capacity >= 50) return "STEADY";
    return "SLOW";
  };

  const colors = getColor(capacity);
  const status = getStatus(capacity);
  const isLarge = size === "large";

  if (isLarge) {
    return (
      <div className={`inline-flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg`}>
        <div className="relative">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200 dark:text-gray-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
            />
            <path
              className={colors.text}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${capacity * 0.975}, 100`}
              d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold">{capacity}%</span>
          </div>
          {capacity >= 90 && (
            <div className={`absolute -top-1 -right-1 w-4 h-4 ${colors.bg} rounded-full animate-pulse`}></div>
          )}
        </div>
        
        {showText && (
          <div>
            <div className={`text-sm font-semibold ${colors.text}`}>
              {status}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Kitchen Capacity
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ${colors.ring} ring-2`}>
      <div className="relative">
        <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200 dark:text-gray-700"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
          />
          <path
            className={colors.text}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${capacity * 0.975}, 100`}
            d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
          />
        </svg>
        {capacity >= 90 && (
          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 ${colors.bg} rounded-full animate-pulse`}></div>
        )}
      </div>
      
      {showText && (
        <span className={`text-xs font-semibold ${colors.text}`}>
          {capacity}%
        </span>
      )}
    </div>
  );
}