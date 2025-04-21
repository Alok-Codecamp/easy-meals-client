import { z } from "zod";

// Schema for a single meal
export const mealSchema = z.object({
    providerId: z.string().optional(),
    title: z.string().min(1, "Meal title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    image: z.string().min(1, "Price is required"),
    category: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one category.",
    }),
    tags: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one tag.",
    }),
    ingredients: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one tag.",
    }),
    preparationTime: z.string({ required_error: 'preperation time is required !' }),
    portion: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one tag.",
    }),
});

