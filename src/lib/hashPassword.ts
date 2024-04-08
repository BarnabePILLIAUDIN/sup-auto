import { pbkdf2, randomBytes } from "node:crypto"
import { promisify } from "node:util"

export const hashPassword = async (
  password: string,
  salt = randomBytes(128).toString("hex"),
) => {
  const pbkdf2Async = promisify(pbkdf2)
  const rawHash = await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")
  const hash = rawHash.toString("hex")

  return { hash, salt }
}
