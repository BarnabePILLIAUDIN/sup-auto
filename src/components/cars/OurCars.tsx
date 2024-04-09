import CarCard from "@/components/cars/CarCard"
import { type Car } from "@/schemas/car"

type Props = {
  cars: Car[]
}

const OurCars = ({ cars }: Props) => (
  <div className="flex flex-col gap-7">
    {cars.map((car) => (
      <CarCard car={car} key={car.id} />
    ))}
  </div>
)

export default OurCars
