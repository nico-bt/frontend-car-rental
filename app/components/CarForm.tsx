"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { CarType } from "../page"
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"

export default function CarForm({ car, mode }: { car?: CarType; mode: "edit" | "add" }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const [marca, setMarca] = useState(mode === "edit" ? car?.marca : "")
  const [modelo, setModelo] = useState(mode === "edit" ? car?.modelo : "")
  const [year, setYear] = useState(mode === "edit" ? car?.year : 2023)
  const [km, setKm] = useState(mode === "edit" ? car?.km : 1)
  const [color, setColor] = useState(mode === "edit" ? car?.color : "")
  const [ac, setAc] = useState(mode === "edit" ? car?.ac : true)
  const [pasajeros, setPasajeros] = useState(mode === "edit" ? car?.pasajeros : 5)
  const [cambios, setCambios] = useState(mode === "edit" ? car?.cambios : "MANUAL")
  const [price, setPrice] = useState(mode === "edit" ? car?.price : 20)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/car/${mode === "edit" ? car?.id : ""}`,
        {
          method: mode === "add" ? "POST" : "PATCH",
          body: JSON.stringify({ marca, modelo, year, km, color, ac, pasajeros, cambios, price }),
          headers: { "Content-Type": "application/json" },
        }
      )
      if (response.ok) {
        setError(null)
        router.refresh()
        router.push("/")
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

  return (
    <Box
      component="form"
      className="editForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        id="marca"
        label="Marca"
        value={marca}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setMarca(event.target.value)
        }}
        error={error?.includes("marca")}
      />

      <TextField
        id="modelo"
        label="Modelo"
        value={modelo}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setModelo(event.target.value)
        }}
        error={error?.includes("modelo")}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="year"
            label="Año"
            value={year}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setYear(+event.target.value)
            }}
            error={error?.includes("year")}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="km"
            label="Km"
            value={km}
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setKm(+event.target.value)
            }}
            error={error?.includes("km")}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="color"
            label="Color"
            value={color}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setColor(event.target.value)
            }}
            error={error?.includes("color")}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="price"
            label="Precio por dia"
            value={price}
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPrice(+event.target.value)
            }}
            error={error?.includes("color")}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            label="Aire AC"
            labelPlacement="start"
            sx={{ color: "black" }}
            control={
              <Checkbox
                id="ac"
                checked={ac}
                onChange={() => {
                  setAc((prev) => !prev)
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="pasajeros"
            type="number"
            label="Pasajeros"
            value={pasajeros}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPasajeros(+event.target.value)
            }}
            error={error?.includes("pasajeros")}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="cambios-label">Cambios</InputLabel>
            <Select
              id="cambios"
              labelId="cambios-label"
              label="Cambios"
              value={cambios}
              onChange={(event: SelectChangeEvent<"MANUAL" | "AUTOMATICO">) => {
                setCambios(event.target.value as "MANUAL" | "AUTOMATICO")
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"MANUAL"}>Manual</MenuItem>
              <MenuItem value={"AUTOMATICO"}>Automático</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color={mode === "add" ? "success" : "primary"}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : mode === "edit" ? "Edit" : "Add"}
      </Button>
      <Button type="button" variant="outlined" color="primary" onClick={() => router.push("/")}>
        Cancel
      </Button>
    </Box>
  )
}
