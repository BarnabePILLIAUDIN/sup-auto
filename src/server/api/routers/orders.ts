import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { buySchema } from "@/schemas/orders"

export const ordersRouter = createTRPCRouter({
  buy: protectedProcedure.input(buySchema).mutation(
    async ({ ctx, input }) =>
      await ctx.db.order.create({
        data: {
          carId: input.carId,
          userId: ctx.session.user.id,
        },
      }),
  ),
})
