import z, { string } from 'zod';



export const registerValidationSchema = z.object({
    name: z.string({ required_error: 'Name is required!' }).min(1, { message: 'Name should be minimum 1 charecter' }),
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Please enter a valied email' }),
    phone: z.string().optional(),
    password: z.string({ required_error: 'Password is required!' }).min(4, { message: 'Password should be minimum 4 letter or number' })
})