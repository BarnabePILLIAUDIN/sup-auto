"use client"

import { Form } from "@/components/ui/Form"
import { api } from "../../trpc/react"
import { type Car } from "@/server/api/routers/cars"
import { useForm } from "react-hook-form"
import GenericField from "@/components/forms/GenericField"

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
    name: "currentYear",
    label: "Current Year",
    type: "number",
  },
]

const Page = () => {
  const { mutateAsync } = api.cars.add.useMutation()

  const form = useForm<Car>()

  const handleSubmit = () => async (values: Car) => {
    await mutateAsync(values)
  }

  return (
    <div>
      <h1>Cars</h1>
      <section>
        <h2>Add</h2>
        <Form {...form}>
          {formFields.map((field) => (
            <GenericField key={field.name} {...field} />
          ))}
          <button type="submit">Add</button>
        </Form>
      </section>
    </div>
  )
}

export default Page
