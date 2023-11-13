"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { CarType } from "../page"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRouter } from "next/navigation"
import { useState } from "react"

const rowHead = [
  "estado",
  "marca",
  "modelo",
  "año",
  "precio/dia",
  "km",
  "color",
  "AC",
  "pasajeros",
  "cambios",
  "edit",
  "delete",
]

export default function CarsTable({ cars }: { cars: CarType[] }) {
  const [isLoadingItemWithId, setIsLoadingItemWithId] = useState<number | null>(null)
  const router = useRouter()

  const handleEditClick = (id: number) => {
    router.push("/edit-car/" + id)
  }

  const handleDeleteClick = async (id: number) => {
    setIsLoadingItemWithId(id)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/` + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        setIsLoadingItemWithId(null)
        router.refresh()
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
      setIsLoadingItemWithId(null)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "lightgoldenrodyellow", fontVariantCaps: "small-caps" }}>
            {rowHead.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={10} sx={{ fontSize: "20px" }}>
                No cars added
              </TableCell>
            </TableRow>
          ) : (
            cars.map((car) => (
              <TableRow key={car.id} style={car.is_rented ? { backgroundColor: "lightgray" } : {}}>
                <TableCell sx={{ fontSize: 12 }}>
                  {car.is_rented ? "Alquilado" : "Disponible"}
                </TableCell>
                <TableCell>{car.marca}</TableCell>
                <TableCell>{car.modelo}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell align="center">{car.price}</TableCell>
                <TableCell>{car.km}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell align="center">{car.ac ? "si" : "no"}</TableCell>
                <TableCell align="center">{car.pasajeros}</TableCell>
                <TableCell>{car.cambios}</TableCell>
                <TableCell align="center">
                  <EditIcon
                    className="actionIcon"
                    onClick={() => {
                      handleEditClick(car.id)
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {isLoadingItemWithId === car.id ? (
                    "loading..."
                  ) : (
                    <DeleteIcon
                      className="actionIcon"
                      onClick={() => {
                        handleDeleteClick(car.id)
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
