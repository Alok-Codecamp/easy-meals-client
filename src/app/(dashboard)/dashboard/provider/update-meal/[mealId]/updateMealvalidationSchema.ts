import { z } from "zod";

// Schema for a single meal
export const updateMealSchema = z.object({
    providerId: z.string().optional(),
    title: z.string().optional(),
    description: z.string().min(1, "Description is required").optional(),
    price: z.string().optional(),
    image: z.string().optional(),
    category: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    ingredients: z.array(z.string()).optional(),
    preparationTime: z.string({ required_error: 'preperation time is required !' }),
    portion: z.array(z.string()).optional(),
    isAvailable: z.enum(["Yes", "No"], {
        required_error: "Meal availability is required",
        invalid_type_error: "Ava ilability must be either 'Yes' or 'No'",
    }).optional(),
});


