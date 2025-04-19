import { z } from "zod";

// Schema for a single meal
export const mealSchema = z.object({
    mealTitle: z.string().min(1, "Meal title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    image: z.string().min(1, "Price is required"),
});

// Schema for a single customer review
export const customerReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    review: z.string().min(1, "Review is required"),
    reviewer: z.string().min(1, "Reviewer name is required"),
});

// Schema for a single cuisine specialty
export const cuisineSpecialtySchema = z.object({
    value: z.string().min(1, "Cuisine value is required"),
});

// Main schema for the meal provider
export const mealProviderSchema = z.object({
    title: z.string().min(1, "Title is required"),
    cuisineSpecialties: z.array(cuisineSpecialtySchema).min(1, "At least one cuisine is required"),
    availableMeals: z.array(mealSchema).min(1, "At least one meal is required"),
    pricing: z.object({
        min: z.string().min(1, "Min price must be 0 or more"),
        max: z.string().min(1, "Max price must be 0 or more"),
    }),
    experience: z.string().min(1, "Experience must be a non-negative number"),
});
