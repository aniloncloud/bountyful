"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface ReviewsSectionProps {
  restaurantId: string;
}

export function ReviewsSection({ restaurantId }: ReviewsSectionProps) {
  const [filter, setFilter] = useState("all");
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      bagType: "Fresh Experience",
      comment: "Amazing experience! The chef showed me how to make fresh pasta and I got to take home a delicious meal plus the recipe. Totally worth the premium price.",
      helpful: 12,
      verified: true
    },
    {
      id: "2", 
      author: "Mike R.",
      rating: 4,
      date: "2024-01-14",
      bagType: "Surplus Surprise",
      comment: "Great value for money. Got a variety of Italian dishes for under $5. The tiramisu alone was worth it!",
      helpful: 8,
      verified: true
    },
    {
      id: "3",
      author: "Jennifer L.",
      rating: 5,
      date: "2024-01-12", 
      bagType: "Fresh Experience",
      comment: "The chef interaction was fantastic. Learned so much about authentic Italian cooking techniques. The food was restaurant quality and the price was very reasonable.",
      helpful: 15,
      verified: true
    },
    {
      id: "4",
      author: "David K.",
      rating: 4,
      date: "2024-01-10",
      bagType: "Surplus Surprise", 
      comment: "Perfect for trying new dishes. Got pasta, antipasto, and dessert. Everything was fresh despite being 'surplus'.",
      helpful: 6,
      verified: true
    }
  ];

  const filterOptions = [
    { id: "all", label: "All Reviews", count: reviews.length },
    { id: "fresh", label: "Fresh Experience", count: reviews.filter(r => r.bagType === "Fresh Experience").length },
    { id: "surplus", label: "Surplus Surprise", count: reviews.filter(r => r.bagType === "Surplus Surprise").length },
    { id: "5", label: "5 Stars", count: reviews.filter(r => r.rating === 5).length },
    { id: "4", label: "4 Stars", count: reviews.filter(r => r.rating === 4).length }
  ];

  const filteredReviews = reviews.filter(review => {
    switch (filter) {
      case "fresh":
        return review.bagType === "Fresh Experience";
      case "surplus":
        return review.bagType === "Surplus Surprise";
      case "5":
        return review.rating === 5;
      case "4":
        return review.rating === 4;
      default:
        return true;
    }
  });

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const RatingStars = ({ rating, size = "small" }: { rating: number; size?: "small" | "large" }) => {
    const starSize = size === "large" ? "h-6 w-6" : "h-4 w-4";
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <StarIcon key={star} className={`${starSize} text-yellow-400`} />
          ) : (
            <StarOutlineIcon key={star} className={`${starSize} text-gray-300`} />
          )
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Rating summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {avgRating.toFixed(1)}
            </div>
            <RatingStars rating={Math.round(avgRating)} size="large" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Based on {reviews.length} reviews
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-lg font-bold text-green-600">{reviews.filter(r => r.bagType === "Fresh Experience").length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Fresh Experience Reviews</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-lg font-bold text-blue-600">{reviews.filter(r => r.bagType === "Surplus Surprise").length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Surplus Surprise Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setFilter(option.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === option.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Write review button */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Customer Reviews ({filteredReviews.length})</h3>
        <Button
          variant="outline"
          onClick={() => setShowWriteReview(true)}
          className="flex items-center gap-2"
        >
          ✍️ Write a Review
        </Button>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={review.rating} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                review.bagType === "Fresh Experience"
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              }`}>
                {review.bagType}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {review.comment}
            </p>

            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                👍 Helpful ({review.helpful})
              </button>
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No reviews match your filter
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different filter to see more reviews.
          </p>
        </div>
      )}

      {/* Write review modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Review form would go here */}
              <div className="text-center py-8 text-gray-500">
                Review form component would be implemented here
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}