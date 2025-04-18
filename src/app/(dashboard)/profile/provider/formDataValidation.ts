import { z } from 'zod';

export const providerProfileformValidationSchema = z.object({

    name: z
        .string({ required_error: 'Name is required!' })
        .min(2, { message: 'Name must be at least 2 character long' }),

    email: z
        .string({ required_error: 'Email is required!' })
        .email({ message: 'Please enter a valid email address' }),

    phone: z
        .string({ required_error: 'Phone number is required!' })
        .min(6, { message: 'Phone number must be at least 6 digits' }),
});
