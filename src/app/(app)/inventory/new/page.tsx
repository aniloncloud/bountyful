"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Item name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  originalPrice: z.number().min(0.01, "Original price is required"),
  discountedPrice: z.number().min(0.01, "Sale price is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  availableUntil: z.string().min(1, "Availability time is required"),
  dietaryInfo: z.array(z.string()).optional(),
  allergenInfo: z.string().optional(),
  ingredients: z.string().optional(),
  pickupInstructions: z.string().optional(),
});

type ListingForm = z.infer<typeof schema>;

export default function NewListingPage() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  
  const { register, handleSubmit, formState, setValue, watch } = useForm<ListingForm>({ 
    resolver: zodResolver(schema) 
  });

  const categories = [
    "Magic Bag",
    "Appetizers", 
    "Main Dishes",
    "Sides",
    "Desserts",
    "Beverages",
    "Bakery Items",
    "Salads",
    "Soups",
    "Pizza",
    "Sandwiches",
    "Other"
  ];

  const dietaryOptions = [
    "Vegetarian", 
    "Vegan", 
    "Gluten-Free", 
    "Dairy-Free", 
    "Nut-Free", 
    "Low-Carb",
    "Keto-Friendly",
    "Halal",
    "Kosher"
  ];

  const originalPrice = watch("originalPrice");
  const discountedPrice = watch("discountedPrice");
  const savingsPercent = originalPrice && discountedPrice 
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  const handleDietaryChange = (option: string, checked: boolean) => {
    let updated = [...dietaryRestrictions];
    if (checked) {
      updated.push(option);
    } else {
      updated = updated.filter(item => item !== option);
    }
    setDietaryRestrictions(updated);
    setValue("dietaryInfo", updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: ListingForm) => {
    const listingData = {
      ...values,
      image: imagePreview,
      createdAt: new Date().toISOString(),
      status: "active"
    };
    console.log("New Listing:", listingData);
    alert(`Listing "${values.name}" created successfully! 🎉`);
    // Navigate back to listings page
    window.location.href = "/inventory/listings";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Listing</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Add your surplus items to start generating revenue
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Chef's Special Magic Bag" 
                  {...register("name")} 
                />
                {formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.name.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  placeholder="Describe what's included, freshness, and what makes this special..."
                  {...register("description")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                />
                {formState.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select 
                  id="category"
                  {...register("category")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>{cat}</option>
                  ))}
                </select>
                {formState.errors.category && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.category.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="quantity">Quantity Available *</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min={1}
                  placeholder="5" 
                  {...register("quantity", { valueAsNumber: true })} 
                />
                {formState.errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.quantity.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Pricing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="originalPrice">Original Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="originalPrice" 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    placeholder="12.99"
                    className="pl-8"
                    {...register("originalPrice", { valueAsNumber: true })} 
                  />
                </div>
                {formState.errors.originalPrice && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.originalPrice.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="discountedPrice">Sale Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="discountedPrice" 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    placeholder="4.99"
                    className="pl-8"
                    {...register("discountedPrice", { valueAsNumber: true })} 
                  />
                </div>
                {formState.errors.discountedPrice && (
                  <p className="mt-1 text-sm text-red-600">{formState.errors.discountedPrice.message}</p>
                )}
              </div>

              <div className="flex items-end">
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 w-full">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Savings</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {savingsPercent}% off
                  </div>
                  <div className="text-xs text-gray-500">
                    ${originalPrice && discountedPrice ? (originalPrice - discountedPrice).toFixed(2) : '0.00'} saved
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Availability
            </h2>
            
            <div>
              <Label htmlFor="availableUntil">Available Until *</Label>
              <Input 
                id="availableUntil" 
                type="datetime-local"
                {...register("availableUntil")} 
              />
              {formState.errors.availableUntil && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.availableUntil.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                When should this listing expire?
              </p>
            </div>
          </div>

          {/* Dietary Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Dietary & Allergen Information
            </h2>
            
            <div>
              <Label>Dietary Options (Check all that apply)</Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryOptions.map(option => (
                  <label key={option} className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      onChange={(e) => handleDietaryChange(option, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="allergenInfo">Allergen Information</Label>
              <Input 
                id="allergenInfo" 
                placeholder="Contains: nuts, dairy, gluten..." 
                {...register("allergenInfo")} 
              />
              <p className="mt-1 text-sm text-gray-500">
                List any allergens customers should be aware of
              </p>
            </div>

            <div>
              <Label htmlFor="ingredients">Main Ingredients</Label>
              <textarea
                id="ingredients"
                placeholder="Chicken, rice, vegetables, herbs..."
                {...register("ingredients")}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Photo
            </h2>
            
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <Label htmlFor="image">Upload Photo</Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add an appetizing photo of your item
                </p>
              </div>
              
              {imagePreview && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Pickup Instructions
            </h2>
            
            <div>
              <Label htmlFor="pickupInstructions">Special Instructions for Customers</Label>
              <textarea
                id="pickupInstructions"
                placeholder="Enter through main entrance, ask for Maria at the counter..."
                {...register("pickupInstructions")}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8"
            >
              Create Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
