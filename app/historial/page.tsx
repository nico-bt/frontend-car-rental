import { ClientType } from "../clients/page"
import HistorialTable from "../components/HistorialTable"
import TransactionsTable from "../components/TransactionsTable"
import { CarType } from "../page"

export interface TransactionType {
  id: number
  clientId: number
  carId: number
  start_date: string
  finish_date: string
  price_per_day: number
  total_price: number
  is_active: boolean
  client: ClientType
  car: CarType
}

const fetchTransactions = async (url: string): Promise<TransactionType[]> => {
  const res = await fetch(url, { next: { revalidate: 0 } })
  const transactions = await res.json()

  return transactions
}

export default async function HistorialPage() {
  const transactions = await fetchTransactions(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/transactions`
  )
  return <HistorialTable transactions={transactions} />
}
