import ClientsTable from "../components/ClientsTable"

export interface ClientType {
  id: number
  nombre: string
  apellido: string
  tipo_documento: Documentotype
  nro_documento: string
  nacionalidad: string
  direccion: string
  telefono: string
  email: string
  fecha_nacimiento: string
  created_at: string
  updated_at: string
  is_renting: boolean
}

export enum Documentotype {
  PASAPORTE = "PASAPORTE",
  DNI = "DNI",
  CEDULA = "CEDULA",
}

export const fetchClients = async (url: string): Promise<ClientType[]> => {
  const res = await fetch(url, { next: { revalidate: 0 } })
  const clients = await res.json()

  return clients
}

export default async function ClientsPage() {
  const clients = await fetchClients(`${process.env.NEXT_PUBLIC_BASE_URL_API}/clients/`)
  return <ClientsTable clients={clients} />
}
