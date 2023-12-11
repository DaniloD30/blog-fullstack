import { z } from 'zod'

export const SignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    pass: z.string().min(6)
})

export const LoginSchema = z.object({
    email: z.string().email(),
    pass: z.string().min(6)
})