import { api } from "@/api/car-rental-api"
import TransactionForm from "../components/TransactionForm"

async function AddTransactionPage() {
  const cars = await api.fetchCars()
  const clients = await api.fetchClients()

  return (
    <TransactionForm
      mode="add"
      cars={cars.filter((car) => !car.is_rented)}
      clients={clients.filter((client) => !client.is_renting)}
    />
  )
}

export default AddTransactionPage
