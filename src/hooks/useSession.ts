"use client"

import config from "@/config"
import { api } from "@/trpc/react"
import { type JwtPayload, type RawJwt } from "@/types/auth"
import jsonwebtoken from "jsonwebtoken"
import { useCallback, useEffect, useState } from "react"

const useSession = () => {
  const [session, setSession] = useState<JwtPayload | null>(null)
  const { mutateAsync } = api.users.signOut.useMutation()

  const signIn = (jwt: string) => {
    localStorage.setItem(config.security.localStorageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }
  const signOut = useCallback(async () => {
    await mutateAsync()
    localStorage.removeItem(config.security.localStorageKey)

    setSession(null)
  }, [mutateAsync, setSession])

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.localStorageKey)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt
    setSession(payload)
  }, [setSession])

  return { session, signIn, signOut }
}

export default useSession
