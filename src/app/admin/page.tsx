"use client"

import OurCarsAdmin from "@/components/cars/OurCarsAdmin"
import CarForm from "@/components/forms/CarForm"
import useSession from "@/hooks/useSession"

const Page = () => {
  const { session } = useSession()

  if (!(session?.user?.role === "ADMIN")) {
    return (
      <div className="text-center text-3xl font-bold text-red-500">
        You must be an admin to see this page
      </div>
    )
  }

  return (
    <div>
      <h1 className="py-8 text-center text-4xl font-extrabold">
        Administration
      </h1>
      <CarForm isModifying={false} car={null} />
      <OurCarsAdmin />
    </div>
  )
}

export default Page
