"use client"

import CarCardAdmin from "@/components/cars/CarCardAdmin"
import { api } from "@/trpc/react"

const OurCarsAdmin = () => {
  const { data: cars } = api.cars.getAll.useQuery()

  return (
    <div className="mx-auto w-96">
      <h2 className="  mt-5  text-center text-4xl font-bold">Our Cars</h2>
      <div className="mt-7 flex flex-col gap-5">
        {cars?.map((car) => <CarCardAdmin car={car} key={car.id} />)}
      </div>
    </div>
  )
}

export default OurCarsAdmin
