import { ClientType } from "@/app/clients/page"
import ClientForm from "@/app/components/ClientForm"
import { notFound } from "next/navigation"

const fetchClientById = async (id: string): Promise<ClientType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/clients/${id}`, {
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    notFound()
  }
  const client = await res.json()

  return client
}

async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await fetchClientById(params.id)

  return <ClientForm client={client} mode={"edit"} />
}

export default EditClientPage
