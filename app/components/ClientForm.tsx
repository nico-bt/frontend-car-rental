"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import DatePickerValue from "./DatePcker"
import dayjs, { Dayjs } from "dayjs"
import { ClientType, Documentotype } from "../clients/page"

export default function ClientForm({
  client,
  mode,
}: {
  client?: ClientType
  mode: "edit" | "add"
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const [nombre, setNombre] = useState(mode === "edit" ? client?.nombre : "")
  const [apellido, setApellido] = useState(mode === "edit" ? client?.apellido : "")
  const [tipoDocumento, setTipoDocumento] = useState<Documentotype>(
    mode === "edit" ? client?.tipo_documento! : Documentotype.PASAPORTE
  )
  const [nroDocumento, setNroDocumento] = useState(mode === "edit" ? client?.nro_documento : "")
  const [nacionalidad, setNacionalidad] = useState(mode === "edit" ? client?.nacionalidad : "")
  const [direccion, setDireccion] = useState(mode === "edit" ? client?.direccion : "")
  const [telefono, setTelefono] = useState(mode === "edit" ? client?.telefono : "")
  const [email, setEmail] = useState(mode === "edit" ? client?.email : "")
  const [fechaNacimiento, setFechaNacimiento] = useState<Dayjs | null>(
    mode === "edit" ? dayjs(client?.fecha_nacimiento) : dayjs("2000-04-17")
  )

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newClient = {
      nombre,
      apellido,
      tipo_documento: tipoDocumento,
      nro_documento: nroDocumento,
      nacionalidad,
      direccion,
      telefono,
      email,
      fecha_nacimiento: fechaNacimiento?.toISOString(),
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/clients/${mode === "edit" ? client?.id : ""}`,
        {
          method: mode === "add" ? "POST" : "PATCH",
          body: JSON.stringify(newClient),
          headers: { "Content-Type": "application/json" },
        }
      )
      if (response.ok) {
        setError(null)
        router.push("/clients")
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
        id="nombre"
        label="Nombre"
        value={nombre}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setNombre(event.target.value)
        }}
        error={error?.includes("nombre")}
      />

      <TextField
        id="apellido"
        label="Apellido"
        value={apellido}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setApellido(event.target.value)
        }}
        error={error?.includes("apellido")}
      />

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="tipoDocumento-label">Tipo de Documento</InputLabel>
            <Select
              id="tipoDocumento"
              labelId="tipoDocumento-label"
              label="Tipo de Documento"
              value={tipoDocumento}
              onChange={(event: SelectChangeEvent<Documentotype>) => {
                setTipoDocumento(event.target.value as Documentotype)
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={Documentotype.DNI}>DNI</MenuItem>
              <MenuItem value={Documentotype.PASAPORTE}>Pasaporte</MenuItem>
              <MenuItem value={Documentotype.CEDULA}>Cedula</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <TextField
            sx={{ width: "100%" }}
            id="nroDocumento"
            label="Numero Documento"
            value={nroDocumento}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNroDocumento(event.target.value)
            }}
            error={error?.includes("nro_documento")}
          />
        </Grid>
      </Grid>

      <TextField
        id="nacionalidad"
        label="Nacionalidad"
        value={nacionalidad}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setNacionalidad(event.target.value)
        }}
        error={error?.includes("nacionalidad")}
      />

      <TextField
        id="direccion"
        label="Direccion"
        value={direccion}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setDireccion(event.target.value)
        }}
        error={error?.includes("direccion")}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="telefono"
            label="Telefono"
            value={telefono}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setTelefono(event.target.value)
            }}
            error={error?.includes("telefono")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value)
            }}
            error={error?.includes("email")}
          />
        </Grid>
      </Grid>

      <DatePickerValue
        label="Fecha Nacimiento"
        setFecha={setFechaNacimiento}
        fecha={fechaNacimiento}
        disableFuture
      />

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
