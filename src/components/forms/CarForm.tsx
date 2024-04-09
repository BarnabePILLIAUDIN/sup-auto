"use client"

import GenericField from "@/components/forms/GenericField"
import { carSchema } from "@/schemas/car"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Car } from "@prisma/client"
import { type HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/Form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"

const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "yearOfCreation",
    label: "Year of creation",
    type: "number",
  },
  {
    name: "photoURL",
    label: "Photo",
    type: "text",
  },
]

type Props = {
  car: Car | null
  isModifying: boolean
} & HTMLAttributes<HTMLElement>

const defaultCar = {
  name: "",
  price: 0,
  description: "",
  yearOfCreation: new Date().getFullYear(),
}

const CarForm = ({ car, isModifying, ...otherProps }: Props) => {
  const { mutateAsync } = isModifying
    ? api.cars.update.useMutation()
    : api.cars.add.useMutation()
  const router = useRouter()

  const form = useForm<Car>({
    resolver: zodResolver(carSchema),
    defaultValues: isModifying && car ? car : defaultCar,
  })
  void api.useUtils().cars.getAll.invalidate()
  void api.useUtils().cars.getById.invalidate()

  const handleSubmit = async (data: Car) => {
    await mutateAsync(data)

    if (isModifying) {
      router.push("/cars/")

      return
    }
    router.refresh()
  }

  return (
    <section {...otherProps} className="mx-auto w-96">
      <h2 className="font-bold">{isModifying ? "Modify" : "Add a new"} car</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {formFields.map((field) => (
            <GenericField key={field.name} {...field} />
          ))}
          <Button type="submit" variant="default" className="mt-5">
            {isModifying ? "Modify" : "Add"}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default CarForm
