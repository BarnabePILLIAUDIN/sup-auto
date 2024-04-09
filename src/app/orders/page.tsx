"use client"

import CarCard from "@/components/cars/CarCard"
import useSession from "@/hooks/useSession"
import { api } from "@/trpc/react"

const Page = () => {
  const { session } = useSession()
  const { data: orders } = api.orders.getOrdersOfClient.useQuery({
    userId: session?.user.id ?? "",
  })

  const { data: rents } = api.rents.getRentsOfClient.useQuery({
    userId: session?.user.id ?? "",
  })

  if (!session) {
    return <h1>You must be logged to see this page</h1>
  }

  return (
    <>
      <h1 className="mb-4 mt-5 text-center text-4xl font-bold">My orders</h1>
      {orders?.length === 0 && rents?.length === 0 && (
        <h2>You do not have any orders yet </h2>
      )}
      {orders?.map(({ car }, id) => <CarCard car={car} key={id} />)}
      {rents?.map(({ car, from, to }, id) => (
        <CarCard car={car} key={id} dates={[from, to]} />
      ))}
    </>
  )
}

export default Page
