import ClientsTable from "@/app/components/ClientsTable"
import { mockClients } from "../mockData"
import { ClientType } from "@/app/clients/page"

export default async function MockClientsPage() {
  return <ClientsTable clients={mockClients as ClientType[]} />
}
