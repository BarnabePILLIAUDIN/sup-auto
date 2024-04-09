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
import { DateTime } from "luxon"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

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
      to: DateTime.now().plus({ days: 7 }).toJSDate(),
    },
  })

  const handleSubmit: SubmitHandler<RentCarInput> = (values) => {
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
            <DialogFooter>
              <Button type="submit" variant="secondary">
                Rent
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RentButton
