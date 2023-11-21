import { api } from "@/api/car-rental-api"
import ClientsTable from "../components/ClientsTable"

export default async function ClientsPage() {
  const clients = await api.fetchClients()

  return <ClientsTable clients={clients} />
}
