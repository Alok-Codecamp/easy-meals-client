import { z } from 'zod';


export const cuisineSpecialtySchema = z.object({
    value: z.string().min(1, "Cuisine value is required"),
});
export const createProviderProfileformValidationSchema = z.object({
    cuisineSpecialties: z.array(cuisineSpecialtySchema).min(1, "At least one cuisine is required"),
    availableMealOptions: z.array(z.object({ value: z.string({ required_error: 'At least one meal option is required!' }) })),
    availability: z.array(z.object({
        value: z.string({ required_error: 'availability is required!' })
    })),
    pricing: z.object({
        min: z.string().min(1, "Min price must be 0 or more"),
        max: z.string().min(1, "Max price must be 0 or more"),
    }),
    experience: z.string({ required_error: 'Meal provider exprience is required' }).min(1, { message: 'At least 1 year of relevant experience required.' }),


})
