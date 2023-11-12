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
import { TransactionType } from "../transactions/page"

const rowHead = [
  "marca",
  "modelo",
  "cliente",
  "documento",
  "precio/dia",
  "fecha inicio",
  "fecha fin",
  "edit",
  "delete",
]

export default function TransactionsTable({ transactions }: { transactions: TransactionType[] }) {
  const [isLoadingItemWithId, setIsLoadingItemWithId] = useState<number | null>(null)
  const router = useRouter()

  const handleEditClick = (id: number) => {
    // router.push("/edit-car/" + id)
  }

  const handleDeleteClick = async (id: number) => {
    // setIsLoadingItemWithId(id)
    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/` + id, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   if (response.ok) {
    //     setIsLoadingItemWithId(null)
    //     router.refresh()
    //   } else {
    //     throw new Error()
    //   }
    // } catch (error) {
    //   console.log(error)
    //   setIsLoadingItemWithId(null)
    // }
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
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={10} sx={{ fontSize: "20px" }}>
                No transactions active
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.car.marca}</TableCell>
                <TableCell>{transaction.car.modelo}</TableCell>
                <TableCell>
                  {transaction.client.nombre + " " + transaction.client.apellido}
                </TableCell>
                <TableCell>{transaction.client.nro_documento}</TableCell>
                <TableCell>{transaction.car.price}</TableCell>
                <TableCell>
                  {new Date(transaction.start_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(transaction.finish_date).toLocaleDateString("en-GB")}
                </TableCell>

                <TableCell align="center">
                  <EditIcon
                    className="actionIcon"
                    onClick={() => {
                      handleEditClick(transaction.id)
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {isLoadingItemWithId === transaction.id ? (
                    "loading..."
                  ) : (
                    <DeleteIcon
                      className="actionIcon"
                      onClick={() => {
                        handleDeleteClick(transaction.id)
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
