import { carSchema } from "@/schemas/car"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

import { z } from "zod"


const idSchema = z.string()

const currentYear = new Date().getFullYear()

const carsRouter = createTRPCRouter({
  add: publicProcedure.input(carSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.car.create({
      data: {
        name: input.name,
        yearOfCreation: input.yearOfCreation ?? currentYear,
        price: input.price,
        description: input.description,
      },
    })
  }),
  update: publicProcedure.input(carSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.car.update({
      data: {
        name: input.name,
        yearOfCreation: input.yearOfCreation,
        price: input.price,
        description: input.description,
      },
      where: {
        id: input.id,
      },
    })
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.car.findMany()
  }),
  getById: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    return await ctx.db.car.findUnique({
      where: {
        id: input,
      },
    })
  }),
  delete: publicProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.car.delete({
      where: {
        id: input,
      },
    })
  }),
})

export default carsRouter

export type Car = z.infer<typeof carSchema>