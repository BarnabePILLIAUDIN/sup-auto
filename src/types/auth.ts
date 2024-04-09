import { type $Enums } from "@prisma/client"

export type JwtPayload = {
  user: {
    id: string
    email: string
    role: $Enums.Role
  }
}

export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}

export type RawCookie = {
  iat: number
  exp: number
  payload: string
}
