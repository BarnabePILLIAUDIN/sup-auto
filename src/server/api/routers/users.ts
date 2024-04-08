import { hashPassword } from "@/lib/hashPassword"
import { signUpSchema } from "@/schemas/users"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"

const usersRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const exisitingUser = await ctx.db.user.findFirst({
        where: { email: input.email },
      })

      if (exisitingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        })
      }

      const { hash, salt } = await hashPassword(input.password)

      await ctx.db.user.create({
        data: {
          email: input.email,
          passwordHash: hash,
          passwordSalt: salt,
          roles: "USER",
        },
      })

      return true
    }),
})

export default usersRouter
