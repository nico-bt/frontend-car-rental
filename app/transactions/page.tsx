import { api } from "@/api/car-rental-api"
import TransactionsTable from "../components/TransactionsTable"

export default async function TransactionsPage() {
  const transactions = await api.fetchTransactions({ active: true })

  return <TransactionsTable transactions={transactions} />
}
