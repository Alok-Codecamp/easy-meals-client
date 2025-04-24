import { z } from 'zod';


export const cuisineSpecialtySchema = z.object({
    value: z.string().min(1, "Cuisine value is required"),
});
export const createProviderProfileformValidationSchema = z.object({
    cuisineSpecialties: z.array(cuisineSpecialtySchema).min(1, "At least one cuisine is required"),
    availableMealOptions: z.array(z.string({ required_error: 'Please Select at least one Available meal options' })).min(1, { message: 'select at least one option' }),
    availability: z.array(z.string({ required_error: 'Please Select at least one Availability options' })).min(1, { message: 'select at least one option' }),
    pricing: z.object({
        min: z.string().min(1, "Min price must be 0 or more"),
        max: z.string().min(1, "Max price must be 0 or more"),
    }),
    experience: z.string({ required_error: 'Meal provider exprience is required' }).min(1, { message: 'At least 1 year of relevant experience required.' }),


})
