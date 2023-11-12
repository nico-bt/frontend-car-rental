import { fetchClients } from "@/app/clients/page"
import TransactionForm from "@/app/components/TransactionForm"
import { fetchCars } from "@/app/page"
import { TransactionType } from "@/app/transactions/page"
import { notFound } from "next/navigation"

const fetchTransactionById = async (id: string): Promise<TransactionType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/transactions/${id}`, {
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    notFound()
  }
  const transaction = await res.json()

  return transaction
}

async function EditTransactionPage({ params }: { params: { id: string } }) {
  const transaction = await fetchTransactionById(params.id)
  const cars = await fetchCars(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/`)
  const clients = await fetchClients(`${process.env.NEXT_PUBLIC_BASE_URL_API}/clients/`)

  return (
    <TransactionForm
      transaction={transaction}
      mode={"edit"}
      // Cars passed are free cars (no rented) and the actual car in transaction
      // The rest of rented cars are left outside of the options
      cars={cars.filter((car) => !car.is_rented || car.id === transaction.carId)}
      // Clients passed are free clients (no renting) and the actual client in transaction
      // The rest of renting clients are left outside of the options - only one car at time
      clients={clients.filter((client) => !client.is_renting || client.id === transaction.clientId)}
    />
  )
}

export default EditTransactionPage
