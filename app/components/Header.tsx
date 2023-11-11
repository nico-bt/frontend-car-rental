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
          Cars
        </Link>
        <Link href={"/add-car"} className={currentRoute === "/add-car" ? "active" : ""}>
          Add new car
        </Link>
        <Link href={"/clients"} className={currentRoute === "/clients" ? "active" : ""}>
          Clients
        </Link>
        <Link href={"/add-client"} className={currentRoute === "/add-client" ? "active" : ""}>
          Add new client
        </Link>
      </nav>
    </header>
  )
}

export default Header
