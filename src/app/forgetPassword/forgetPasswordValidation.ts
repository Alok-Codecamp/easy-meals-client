import z from 'zod'


export const forgetPasswordValidationSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Please enter a valied email' })
})