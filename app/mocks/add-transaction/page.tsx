import TransactionForm from "@/app/components/TransactionForm"
import { mockCars, mockClients } from "../mockData"
import { CarType, ClientType } from "@/api/car-rental-api"

async function AddTransactionPage() {
  return (
    <TransactionForm
      mode="add"
      cars={mockCars.filter((car) => !car.is_rented) as CarType[]}
      clients={mockClients.filter((client) => !client.is_renting) as ClientType[]}
    />
  )
}

export default AddTransactionPage
