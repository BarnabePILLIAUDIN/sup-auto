import { z } from "zod"

export const buySchema = z.object({
  carId: z.string().cuid(),
})

export const rentSchema = z.object({
  carId: z.string().cuid(),
  from: z.coerce.date(),
  to: z.coerce.date(),
})
