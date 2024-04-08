import OurCars from "@/components/cars/OurCars"
import CarForm from "../../components/forms/CarForm"

const Page = () => {
  return (
    <div>
      <h1 className="py-8 text-center text-4xl font-extrabold">Cars</h1>
      <CarForm isModifying={false} car={null} />
      <OurCars />
    </div>
  )
}

export default Page
