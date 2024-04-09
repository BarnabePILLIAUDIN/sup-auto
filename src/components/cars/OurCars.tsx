import CarCard from "@/components/cars/CarCard"
import { type Car } from "@/schemas/cars"

type Props = {
  cars: Car[]
}

const OurCars = ({ cars }: Props) => (
  <div className="flex flex-col gap-6">
    {cars.map((car) => (
      <CarCard car={car} key={car.id} dates={[]} />
    ))}
  </div>
)

export default OurCars
