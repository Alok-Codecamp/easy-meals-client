import { z } from 'zod';

const resetPasswordValidation = z
    .object({
        email: z
            .string().nullable().optional(),
        token: z
            .string().nullable().optional(),
        newPassword: z
            .string({ required_error: 'New Password is required!' })
            .min(4, { message: 'Password must be at least 4 characters long' }),

        confirmPassword: z
            .string({ required_error: 'Confirm Password is required!' })
            .min(4, { message: 'Password must be at least 4 characters long' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export default resetPasswordValidation;