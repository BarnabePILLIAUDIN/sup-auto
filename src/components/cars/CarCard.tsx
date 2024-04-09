import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card"
import formatPrice from "@/lib/formatPrice"
import { type Car } from "@/server/api/routers/cars"
import Image from "next/image"
import Link from "next/link"

type Props = {
  car: Car
}

const CarCard = ({ car }: Props) => (
  <Link href={`/cars/${car.id}`}>
    <Card className="transition-colors !duration-150 hover:bg-neutral-100">
      <CardHeader>
        <CardTitle>{car.name}</CardTitle>
        <CardDescription>{car.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={car.photoURL ?? "/car-big.png"}
          alt="The best car"
          width={400}
          height={100}
          className="w-96"
        />
      </CardContent>
      <CardFooter className="justify-end">
        <p className="text-xl font-bold">{formatPrice(car.price)}</p>
      </CardFooter>
    </Card>
  </Link>
)

export default CarCard
