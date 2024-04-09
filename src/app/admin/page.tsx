import OurCarsAdmin from "@/components/cars/OurCarsAdmin"
import CarForm from "@/components/forms/CarForm"

const Page = () => (
  <div>
    <h1 className="py-8 text-center text-4xl font-extrabold">Administration</h1>
    <CarForm isModifying={false} car={null} />
    <OurCarsAdmin />
  </div>
)

export default Page
