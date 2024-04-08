import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { api } from "../../trpc/react"
import { Car } from "@/server/api/routers/cars"
import { useForm } from "react-hook-form"

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
        <Form>
          {formFields.map(({ type, label, name }) => (
            <FormField
              control={form.control}
              name={name}
              key={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <input {...field} type={type} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <button type="submit">Add</button>
        </Form>
      </section>
    </div>
  )
}

export default Page
