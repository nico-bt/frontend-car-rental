import { api } from "@/api/car-rental-api"
import HistorialTable from "../components/HistorialTable"

export default async function HistorialPage() {
  const transactions = await api.fetchTransactions()

  return <HistorialTable transactions={transactions} />
}
