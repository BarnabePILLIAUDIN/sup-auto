
import { z } from "zod";

export const carSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  yearOfCreation: z.coerce.number().optional(),
  price: z.coerce.number(),
  description: z.string(),
  photoURL: z.string(),
})

export type Car = z.infer<typeof carSchema>