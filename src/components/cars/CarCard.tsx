"use client"

import { Button } from "@/components/ui/Button"
import { type Car } from "@/server/api/routers/cars"
import { api } from "@/trpc/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  car: Car
}

const CarCard = (props: Props) => {
  const {
    car: { id, name, description, price, yearOfCreation },
  } = props

  const { mutateAsync } = api.cars.delete.useMutation()

  const router = useRouter()

  const handleCarDelete = async () => {
    await mutateAsync(id ?? "")
    router.refresh()
  }

  return (
    <div key={id} className="w-96 rounded-md border-2 border-black px-4 py-2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-bold">{name}</h3>
        <p className="font-semibold">{price} €</p>
      </div>
      <p>{description}</p>
      <p>
        Year: <span className="ml-1 font-semibold">{yearOfCreation} </span>
      </p>
      <div className="mt-2 flex items-center justify-between">
        <Link
          href={`/cars/update/${id}`}
          className="rounded-md bg-blue-500 p-2 text-sm text-white"
        >
          <p>Update</p>
        </Link>
        <Button variant="destructive" onClick={handleCarDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default CarCard
