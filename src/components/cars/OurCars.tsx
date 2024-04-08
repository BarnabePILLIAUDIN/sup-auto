import CarCard from "@/components/cars/CarCard"
import { api } from "@/trpc/server"

const OurCars = async () => {
  const cars = await api.cars.getAll()

  return (
    <div className="mx-auto w-96">
      <h2 className="  mt-5  text-center text-4xl font-bold">Our Cars</h2>
      <div className="mt-7 flex flex-col gap-5">
        {cars.map((car) => (
          <CarCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  )
}

export default OurCars
