import { api } from "@/trpc/server"
import OurCars from "../../components/cars/OurCars"

const Page = async () => {
  const cars = await api.cars.getAll()

  return (
    <main className="space-y-8 p-8">
      <h1 className="text-center text-4xl font-extrabold">Cars</h1>
      <OurCars cars={cars} />
    </main>
  )
}

export default Page
