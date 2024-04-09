import config from "@/server/config"
import { env } from "@/env"
import { hashPassword } from "@/lib/hashPassword"
import { signInSchema, signUpSchema } from "@/schemas/users"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { TRPCError } from "@trpc/server"
import jsonwebtoken from "jsonwebtoken"
import { cookies } from "next/headers"
import { pick } from "radash"
import ms from "ms"

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

  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      const exisitingUser = await ctx.db.user.findFirst({
        where: { email: input.email },
      })


      if (!exisitingUser) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const { hash } = await hashPassword(
        input.password,
        exisitingUser.passwordSalt,
      )

      if (hash !== exisitingUser.passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const jwt = jsonwebtoken.sign(
        { payload: { user: pick(exisitingUser, ["id", "email", "roles"]) } },
        env.JWT_SECRET,
        { expiresIn: config.security.expiresIn },
      )
      const cookieJwt = jsonwebtoken.sign({ payload: jwt }, env.JWT_SECRET, {
        expiresIn: config.security.expiresIn,
      })

      cookies().set(config.security.cookie.key, cookieJwt, {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        secure: config.security.cookie.secure,
        expires: Date.now() + ms(config.security.expiresIn),
      })

      return jwt
    }),

  signOut: publicProcedure.mutation(() => {
    cookies().delete(config.security.cookie.key)

    return true
  }),
})

export default usersRouter
