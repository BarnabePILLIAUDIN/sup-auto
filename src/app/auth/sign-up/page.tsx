import SignUpForm from "@/components/forms/users/signUp/SignUpForm"
import Image from "next/image"

const Page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
          </div>
          <SignUpForm />
        </div>
      </div>
      <div className="hidden max-h-dvh bg-muted lg:block">
        <Image
          src="/login-background.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Page
