import HistorialTable from "@/app/components/HistorialTable"
import { mockHistorialTransactions } from "../mockData"
import { TransactionType } from "@/api/car-rental-api"

export default async function MockHistorialPage() {
  return <HistorialTable transactions={mockHistorialTransactions as TransactionType[]} />
}
