"use client"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { type RentCarInput, rentCarSchema } from "@/schemas/cars"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import DateRangePickerField from "@/components/forms/DateRangePickerField"

type Props = {
  carId: string
}

const RentButton = ({ carId }: Props) => {
  const { mutate } = api.cars.rent.useMutation()
  const form = useForm<RentCarInput>({
    resolver: zodResolver(rentCarSchema),
    defaultValues: {
      carId,
      from: new Date(),
    },
  })

  const handleSubmit: SubmitHandler<RentCarInput> = (values) => {
    console.log("values", values)

    mutate(values)
    toast.success("You rented a car!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rent mine</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Rent a car</DialogTitle>
              <DialogDescription>
                Are you sure you want to rent this car?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <DateRangePickerField label="Select a range" />
            </div>
            <DialogFooter>
              <Button type="submit">Rent</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RentButton
