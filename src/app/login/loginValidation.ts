
import z from 'zod';

export const loginValidationSchema = z.object({
    contact: z
        .string({ required_error: 'Email or Phone is required!!' })
        .min(5, 'Enter a valied email or phone!!'),
    password: z
        .string({ required_error: 'Password is required!!' })
        .min(4, 'Password should be min 4 !!'),
});
