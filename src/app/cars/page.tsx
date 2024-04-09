import { api } from "@/trpc/server"
import OurCars from "../../components/cars/OurCars"
const Page = async () => {
  const cars = await api.cars.getAll()

  return (
    <div className="">
      <h1 className="py-8 text-center text-4xl font-extrabold">Cars</h1>
      <OurCars cars={cars ?? []} />
    </div>
  )
}

export default Page
