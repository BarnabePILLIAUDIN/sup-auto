"use client"
import useSession from "@/hooks/useSession"
import Link from "next/link"

const Navbar = () => {
  const { session, signOut } = useSession()

  return (
    <nav className="flex justify-between px-5 py-5">
      <h1 className="text-2xl font-bold">
        <Link href="/">SUPOTOMOBILE</Link>
      </h1>
      <ul className="flex flex-row gap-5 font-semibold">
        <li>
          <Link href="/cars">Cars</Link>
        </li>
        {!session ? (
          <>
            <li>
              <Link href="/auth/sign-in">Sign in</Link>
            </li>
            <li>
              <Link href="/auth/sign-up">Sign up</Link>
            </li>
          </>
        ) : (
          <>
            {session.user.roles === "ADMIN" && (
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            )}
            <li>
              <button onClick={signOut}>Sign out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
