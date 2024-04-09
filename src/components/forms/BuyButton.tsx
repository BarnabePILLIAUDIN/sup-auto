"use client"

import { Button } from "@/components/ui/Button"
import useSession from "@/hooks/useSession"

const BuyButton = () => {
  const { session } = useSession()

  return (
    <Button className="mt-4 px-8 py-4 text-2xl uppercase">
      {session?.user.roles === "ENTERPRISE" ? "Rent" : "Buy"} mine
    </Button>
  )
}

export default BuyButton
