"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import DatePickerValue from "./DatePcker"
import dayjs, { Dayjs } from "dayjs"
import { ClientType, CarType, api, TransactionBody } from "@/api/car-rental-api"
import { TransactionType } from "@/api/car-rental-api"

export default function TransactionForm({
  cars,
  clients,
  mode,
  transaction,
}: {
  cars: CarType[]
  clients: ClientType[]
  mode: "edit" | "add"
  transaction?: TransactionType
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const [carToRent, setCarToRent] = useState(mode === "edit" ? transaction?.carId : cars[0]?.id)

  const [clientToRent, setClientToRent] = useState(
    mode === "edit" ? transaction?.clientId : clients[0]?.id
  )

  const [startDate, setStartDate] = useState<Dayjs | null>(
    mode === "edit" ? dayjs(transaction?.start_date) : null
  )
  const [finishtDate, setFinishDate] = useState<Dayjs | null>(
    mode === "edit" ? dayjs(transaction?.finish_date) : null
  )

  const daysOfRent = finishtDate?.diff(startDate, "day")
  const priceSelectedCar = cars.find((car) => car.id === carToRent)?.price

  // Added a custom useRouter property in the component (defined at the end of this file)
  // to mock it during testing with cypress forr component testing
  const router = TransactionForm.useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (daysOfRent && daysOfRent < 1) {
      setError("Los días de alquiler tienen que ser un numero positivo")
      return
    }
    const newTransaction = {
      carId: carToRent,
      clientId: clientToRent,
      start_date: startDate?.toISOString(),
      finish_date: finishtDate?.toISOString(),
    } as TransactionBody

    setIsLoading(true)
    setError(null)
    try {
      const response = await (mode === "add"
        ? api.addTransaction(newTransaction)
        : api.editTransaction(transaction!.id, newTransaction))

      if (response.ok) {
        setError(null)
        router.push("/transactions")
        router.refresh()
      } else {
        const res = await response.json()
        setError(res.message[0])
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!cars || cars.length === 0) {
    return (
      <Box className="editForm" color={"black"}>
        <h3>No cars available for rent</h3>
      </Box>
    )
  }

  return (
    <Box
      component="form"
      className="editForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="car-label">Car</InputLabel>
        <Select
          id="car"
          labelId="car-label"
          label="Car list"
          value={carToRent}
          onChange={(event) => {
            setCarToRent(+event.target.value)
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          {cars.map((car) => (
            <MenuItem key={car.id} value={car.id}>
              {car.marca + " " + car.modelo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="client-label">Client</InputLabel>
        <Select
          id="client"
          labelId="client-label"
          label="Clien list"
          value={clientToRent}
          onChange={(event) => {
            setClientToRent(+event.target.value)
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.nombre + " " + client.apellido + " - " + client.nro_documento}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePickerValue
        data-testid="fechaInicio"
        disablePast={mode === "add" ? true : false}
        label="Fecha Inicio"
        setFecha={setStartDate}
        fecha={startDate}
      />
      <DatePickerValue
        disablePast={mode === "add" ? true : false}
        label="Fecha Fin"
        setFecha={setFinishDate}
        fecha={finishtDate}
      />

      <Button
        type="submit"
        variant="contained"
        color={mode === "add" ? "success" : "primary"}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : mode === "edit" ? "Edit Transaction" : "Add"}
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        onClick={() => router.push("/transactions")}
      >
        Cancel
      </Button>

      <div className="transaction_preview">
        <h3>Preview</h3>
        <ul>
          <li>Price per day: ${priceSelectedCar} </li>
          <li>Days: {daysOfRent}</li>
          <li>Total Price: {priceSelectedCar && daysOfRent && priceSelectedCar * daysOfRent}</li>
        </ul>
      </div>
    </Box>
  )
}

TransactionForm.useRouter = useRouter
