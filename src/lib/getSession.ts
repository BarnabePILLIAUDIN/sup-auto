import config from "@/server/config"
import { cookies } from "next/headers"
import jsonwebtoken from "jsonwebtoken"
import { type RawCookie, type RawJwt } from "@/types/auth"

const getSession = async () => {
  const sessionCookie = cookies().get(config.security.cookie.key)

  if (!sessionCookie) return null

  const { payload: cookiePayload } = jsonwebtoken.decode(sessionCookie.value, {
    json: true,
  }) as RawCookie
  const { payload: session } = jsonwebtoken.decode(cookiePayload, {
    json: true,
  }) as RawJwt

  return session
}

export default getSession
