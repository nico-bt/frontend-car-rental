import HistorialTable from "@/app/components/HistorialTable"
import { mockHistorialTransactions } from "../mockData"
import { TransactionType } from "@/app/historial/page"

export default async function MockHistorialPage() {
  return <HistorialTable transactions={mockHistorialTransactions as TransactionType[]} />
}
