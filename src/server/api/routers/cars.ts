import { addCarSchema, buyCarSchema, rentCarSchema } from "@/schemas/cars"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"

import { z } from "zod"

const idSchema = z.string()

const currentYear = new Date().getFullYear()

const carsRouter = createTRPCRouter({
  add: publicProcedure.input(addCarSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.car.create({
      data: {
        name: input.name,
        yearOfCreation: input.yearOfCreation ?? currentYear,
        price: input.price,
        description: input.description,
        photoURL: input.photoURL,
      },
    })
  }),

  update: publicProcedure
    .input(addCarSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.car.update({
        data: {
          name: input.name,
          yearOfCreation: input.yearOfCreation,
          price: input.price,
          description: input.description,
          photoURL: input.photoURL,
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

  buy: protectedProcedure.input(buyCarSchema).mutation(({ ctx, input }) =>
    ctx.db.order.create({
      data: {
        carId: input.carId,
        userId: ctx.session.user.id,
      },
    }),
  ),

  rent: protectedProcedure
    .input(rentCarSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.rent.create({ data: { ...input, userId: ctx.session.user.id } }),
    ),
})

export default carsRouter

export type Car = z.infer<typeof addCarSchema>
