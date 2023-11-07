"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

function Header() {
  const currentRoute = usePathname()

  return (
    <header>
      <h1>Car Rental Admin Panel</h1>
      <nav>
        <Link href={"/"} className={currentRoute === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href={"/add-car"} className={currentRoute === "/add-car" ? "active" : ""}>
          Add a new car
        </Link>
      </nav>
    </header>
  )
}

export default Header
