import { ClientType, api } from "@/api/car-rental-api"
import ClientForm from "@/app/components/ClientForm"
import { notFound } from "next/navigation"

async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await api.fetchClientById(params.id)

  return <ClientForm client={client} mode={"edit"} />
}

export default EditClientPage
