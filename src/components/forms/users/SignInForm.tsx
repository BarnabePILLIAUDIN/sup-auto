"use client"

import GenericField from "@/components/forms/GenericField"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useSession from "@/hooks/useSession"
import { signInSchema, type SignInInput } from "@/schemas/users"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

const SignInForm = () => {
  const { mutate } = api.users.signIn.useMutation()
  const { signIn } = useSession()
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<SignInInput> = async (values) => {
    mutate(values, {
      onSuccess: (data) => {
        signIn(data)
        toast.success("Logged in successfully")
        router.push("/")
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-end gap-6"
      >
        <GenericField name="email" label="Email" type="email" />
        <GenericField name="password" label="Password" type="password" />
        <Button type="submit" className="self-end">
          Sign In
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
