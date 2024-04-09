import { type Car } from "@/server/api/routers/cars"
import Image from "next/image"
import Link from "next/link"

type Props = {
  car: Car
}

const CarCard = ({ car }: Props) => {
  return (
    <div className="mx-auto flex w-1/2 rounded-xl border-2 border-black  p-5">
      <Image
        src="/car-big.png"
        alt="The best car"
        width={400}
        height={100}
        className="w-96"
      />
      <div className="w-full ">
        <div className="flex justify-between ">
          <h3 className="text-2xl font-extrabold">
            <Link href={`/cars/${car.id}`}> {car.name} </Link>
          </h3>
          <h4 className="text-xl font-semibold">{car.price} €</h4>
        </div>
        <p className="mt-5 font-medium">{car.description}</p>
      </div>
    </div>
  )
}

export default CarCard
