import { z } from 'zod';

export const registerValidationSchema = z.object({
    name: z
        .string({ required_error: 'Name is required!' })
        .min(1, { message: 'Name should be at least 1 character long.' }),

    email: z
        .string({ required_error: 'Email is required!' })
        .email({ message: 'Please enter a valid email address.' }),

    phone: z.string().optional(),

    role: z.enum(['customer', 'mealProvider'], {
        required_error: 'Please select a role.',
    }),

    password: z
        .string({ required_error: 'Password is required!' })
        .min(4, {
            message: 'Password should be at least 4 characters long.',
        }),
});
