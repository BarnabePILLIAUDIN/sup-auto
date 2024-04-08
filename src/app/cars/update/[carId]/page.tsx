import CarForm from "@/components/forms/CarForm"
import { api } from "@/trpc/server"

type Props = {
  params: {
    carId: string
  }
}

const Page = async ({ params: { carId } }: Props) => {
  const car = await api.cars.getById(carId)
  if (car) {
    return <CarForm car={car} isModifying />
  }

  return <div>Car not found</div>
}

export default Page
