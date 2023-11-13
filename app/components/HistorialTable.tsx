"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { TransactionType } from "../transactions/page"

const rowHead = [
  "marca",
  "modelo",
  "cliente",
  "documento",
  "precio/dia",
  "fecha inicio",
  "fecha fin",
]

export default function HistorialTable({ transactions }: { transactions: TransactionType[] }) {
  return (
    <TableContainer component={Paper} sx={{ width: 1150, margin: "0 auto" }}>
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
                <TableCell align="center">{transaction.car.price}</TableCell>
                <TableCell>
                  {new Date(transaction.start_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(transaction.finish_date).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
