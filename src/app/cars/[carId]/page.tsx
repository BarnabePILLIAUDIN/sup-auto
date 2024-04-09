import BuyButton from "@/components/forms/BuyButton"
import RentButton from "@/components/forms/RentButton"
import getSession from "@/lib/getSession"
import { api } from "@/trpc/server"
import Image from "next/image"

type Props = {
  params: {
    carId: string
  }
}

const Page = async ({ params: { carId } }: Props) => {
  const car = await api.cars.getById(carId)
  const session = await getSession()

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <div className="px-16 pb-5">
      <Image
        src="/car-big.png"
        alt="the best supotomobile"
        className="mx-auto w-4/5 rounded-lg border border-black"
        width={1000}
        height={50}
      />

      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-center text-4xl font-extrabold">{car.name}</h2>
        <h3 className="text-2xl font-bold ">{car.price} €</h3>
      </div>
      <p className="mt-5 font-semibold">{car.description}</p>
      {session?.user.role === "USER" && <BuyButton carId={carId} />}
      {session?.user.role === "ENTERPRISE" && <RentButton carId={carId} />}
    </div>
  )
}

export default Page
