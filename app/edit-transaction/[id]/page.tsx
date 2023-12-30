import TransactionForm from "@/app/components/TransactionForm"
import { api } from "@/api/car-rental-api"

async function EditTransactionPage({ params }: { params: { id: string } }) {
  const transaction = await api.fetchTransactionById(params.id)
  const cars = await api.fetchCars()
  const clients = await api.fetchClients()

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
