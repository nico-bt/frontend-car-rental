import ClientsTable from "@/app/components/ClientsTable"
import { mockClients } from "../mockData"
import { ClientType } from "@/api/car-rental-api"

export default async function MockClientsPage() {
  return <ClientsTable clients={mockClients as ClientType[]} />
}
