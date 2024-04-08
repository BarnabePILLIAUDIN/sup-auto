import { type $Enums } from "@prisma/client"

export type JwtPayload = {
  user: {
    id: string
    email: string
    roles: $Enums.Role
  }
}

export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}
