import { env } from "@/env"

const config = {
  security: {
    expiresIn: "2d",
    cookie: {
      key: "sessionJsonWebToken",
      secure: env.NODE_ENV === "production",
    },
  },
}

export default config
