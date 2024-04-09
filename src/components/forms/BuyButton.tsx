"use client"

import { Button } from "@/components/ui/Button"
import { api } from "@/trpc/react"
import { toast } from "sonner"

type Props = {
  carId: string
}

const BuyButton = (props: Props) => {
  const { mutate } = api.cars.buy.useMutation()

  const handleClick = () => {
    mutate(props)
    toast.success("You bought a car!")
  }

  return <Button onClick={handleClick}>Buy mine</Button>
}

export default BuyButton
