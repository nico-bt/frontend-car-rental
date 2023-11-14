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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined"

const rowHead = [
  "marca",
  "modelo",
  "cliente",
  "documento",
  "precio/dia",
  "fecha inicio",
  "fecha fin",
  "estado",
]

export default function HistorialTable({ transactions }: { transactions: TransactionType[] }) {
  return (
    <TableContainer component={Paper} sx={{ width: 1150, margin: "0 auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "lightgoldenrodyellow", fontVariantCaps: "small-caps" }}>
            {rowHead.map((item) => (
              <TableCell align="center" key={item}>
                {item}
              </TableCell>
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
              <TableRow
                key={transaction.id}
                style={transaction.is_active ? {} : { backgroundColor: "#f2f8f2" }}
              >
                <TableCell align="center">{transaction.car.marca}</TableCell>
                <TableCell align="center">{transaction.car.modelo}</TableCell>
                <TableCell align="center">
                  {transaction.client.nombre + " " + transaction.client.apellido}
                </TableCell>
                <TableCell align="center">{transaction.client.nro_documento}</TableCell>
                <TableCell align="center">{transaction.car.price}</TableCell>
                <TableCell align="center">
                  {new Date(transaction.start_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell align="center">
                  {new Date(transaction.finish_date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell align="center">
                  {transaction.is_active ? <PendingOutlinedIcon /> : <CheckCircleOutlineIcon />}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
