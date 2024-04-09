import carsRouter from "@/server/api/routers/cars"
import { ordersRouter } from "@/server/api/routers/orders"
import { postRouter } from "@/server/api/routers/post"
import usersRouter from "@/server/api/routers/users"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  cars: carsRouter,
  users: usersRouter,
  orders: ordersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
