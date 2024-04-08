import Link from "next/link"

const Navbar = () => (
  <nav className="flex justify-between px-5 py-5 ">
    <h1 className="text-2xl font-bold">
      <Link href="/">SUPOTOMOBILE</Link>
    </h1>
    <ul className="flex flex-row gap-5 font-semibold">
      <li>
        <Link href="/cars">Cars</Link>
      </li>
      <li>
        <Link href="/signin">Sign in</Link>
      </li>
      <li>
        <Link href="/signup">Sign up</Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
