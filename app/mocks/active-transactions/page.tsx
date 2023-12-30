import TransactionsTable from "@/app/components/TransactionsTable"
import { mockActiveTransactions } from "../mockData"
import { TransactionType } from "@/api/car-rental-api"

export default async function MockTransactionsPage() {
  return <TransactionsTable transactions={mockActiveTransactions as TransactionType[]} />
}
