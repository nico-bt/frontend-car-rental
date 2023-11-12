import { fetchClients } from "../clients/page"
import TransactionForm from "../components/TransactionForm"
import { fetchCars } from "../page"

async function AddTransactionPage() {
  const cars = await fetchCars(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/`)
  const clients = await fetchClients(`${process.env.NEXT_PUBLIC_BASE_URL_API}/clients/`)

  return (
    <TransactionForm
      mode="add"
      cars={cars.filter((car) => !car.is_rented)}
      clients={clients.filter((client) => !client.is_renting)}
    />
  )
}

export default AddTransactionPage
