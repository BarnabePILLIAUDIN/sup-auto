import BuyButton from "@/components/forms/BuyButton"
import RentButton from "@/components/forms/RentButton"
import formatPrice from "@/lib/formatPrice"
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
      <img
        src={car.photoURL ?? "/car-big.png"}
        alt="the best supotomobile"
        className="mx-auto w-4/5 rounded-lg border border-black"
        width={1000}
        height={50}
      />

      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-center text-4xl font-extrabold">{car.name}</h2>
        <h3 className="text-2xl font-bold ">{formatPrice(car.price)}</h3>
      </div>
      <p className="mt-5 font-semibold">{car.description}</p>
      <div className="mt-5">
        {session?.user.roles === "USER" && <BuyButton carId={carId} />}
        {session?.user.roles === "ENTERPRISE" && <RentButton carId={carId} />}
      </div>
    </div>
  )
}

export default Page
