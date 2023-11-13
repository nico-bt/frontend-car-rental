"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Grid } from "@mui/material"
import SeparatorBar from "./SeparatorBar"

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
        <SeparatorBar />

        <Link href={"/clients"} className={currentRoute === "/clients" ? "active" : ""}>
          Clients
        </Link>
        <Link href={"/add-client"} className={currentRoute === "/add-client" ? "active" : ""}>
          Add new client
        </Link>
        <SeparatorBar />

        <Link href={"/transactions"} className={currentRoute === "/transactions" ? "active" : ""}>
          Active Transactions
        </Link>
        <Link
          href={"/add-transaction"}
          className={currentRoute === "/add-transaction" ? "active" : ""}
        >
          Add transaction
        </Link>
        <SeparatorBar />

        <Link href={"/historial"} className={currentRoute === "/historial" ? "active" : ""}>
          Historial
        </Link>
      </nav>
    </header>
  )
}

export default Header
