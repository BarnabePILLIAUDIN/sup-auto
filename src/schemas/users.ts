import { z } from "zod"

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signInSchema = signUpSchema

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
