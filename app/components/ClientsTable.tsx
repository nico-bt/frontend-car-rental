"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CarRentalIcon from "@mui/icons-material/CarRental"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ClientType, api } from "@/api/car-rental-api"

const rowHead = [
  "alquilando",
  "nombre",
  "apellido",
  "Tipo Doc",
  "Nro Doc",
  "Nacionalidad",
  "Direccion",
  "Telefono",
  "email",
  "Nacimiento",
  "edit",
  "delete",
]

export default function ClientsTable({ clients }: { clients: ClientType[] }) {
  const [isLoadingItemWithId, setIsLoadingItemWithId] = useState<number | null>(null)
  const router = useRouter()

  const [clientsState, setClientsState] = useState(clients)
  const [sortedDirection, setSortedDirection] = useState<"asc" | "desc" | "">("")

  const sortByColumn = (columnName: string) => {
    if (columnName === "alquilando")
      setClientsState((prevState) => {
        if (prevState[0].is_renting) {
          return [...prevState].sort((a, b) => +a.is_renting - +b.is_renting)
        } else {
          return [...prevState].sort((a, b) => +b.is_renting - +a.is_renting)
        }
      })
    if (columnName === "apellido") {
      if (sortedDirection === "asc" || sortedDirection === "") {
        setClientsState((prev) => [...prev.sort((a, b) => a.apellido.localeCompare(b.apellido))])
        setSortedDirection("desc")
      } else {
        setClientsState((prev) => [...prev.sort((a, b) => b.apellido.localeCompare(a.apellido))])
        setSortedDirection("asc")
      }
    }
  }

  const handleEditClick = (id: number) => {
    router.push("/edit-client/" + id)
  }

  const handleDeleteClick = async (id: number) => {
    setIsLoadingItemWithId(id)
    try {
      const response = await api.deleteClient(id)
      if (response.ok) {
        setIsLoadingItemWithId(null)
        setClientsState((prevState) => prevState.filter((client) => client.id !== id))
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
          <TableRow
            sx={{
              backgroundColor: "lightgoldenrodyellow",
              fontVariantCaps: "small-caps",
              verticalAlign: "top",
            }}
          >
            {rowHead.map((item) => (
              <TableCell key={item} onClick={() => sortByColumn(item)} sx={{ paddingBottom: 0 }}>
                {item}
                {item === "apellido" || item === "alquilando" ? (
                  <span className="sortByColumn">click to sort</span>
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clientsState.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={10} sx={{ fontSize: "20px" }}>
                No Clients Added
              </TableCell>
            </TableRow>
          ) : (
            clientsState.map((client) => (
              <TableRow
                key={client.id}
                style={client.is_renting ? { backgroundColor: "lightgray" } : {}}
              >
                <TableCell align="center">
                  {client.is_renting ? <CarRentalIcon /> : " - "}
                </TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.apellido}</TableCell>
                <TableCell>{client.tipo_documento}</TableCell>
                <TableCell>{client.nro_documento}</TableCell>
                <TableCell>{client.nacionalidad}</TableCell>
                <TableCell>{client.direccion}</TableCell>
                <TableCell>{client.telefono}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  {new Date(client.fecha_nacimiento).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  <EditIcon
                    className="actionIcon"
                    onClick={() => {
                      handleEditClick(client.id)
                    }}
                  />
                </TableCell>
                <TableCell>
                  {isLoadingItemWithId === client.id ? (
                    "loading..."
                  ) : (
                    <DeleteIcon
                      className="actionIcon"
                      onClick={() => {
                        handleDeleteClick(client.id)
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
