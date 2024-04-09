import { z } from "zod"

export const addCarSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  yearOfCreation: z.coerce.number().optional(),
  price: z.coerce.number(),
  description: z.string(),
  photoURL: z.string(),
})

export const buyCarSchema = z.object({
  carId: z.string().cuid(),
})

export const rentCarSchema = z.object({
  carId: z.string().cuid(),
  from: z.coerce.date(),
  to: z.coerce.date(),
})

export type Car = z.infer<typeof addCarSchema>
