import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const orderRouter = createTRPCRouter({
  getOrdersOfClient: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => { 
    return await ctx.db.order.findMany({
      where: {
        userId: input.userId
      },
      include: {
        car: true,
        user: true
      }
    })
  })
})

export default orderRouter;