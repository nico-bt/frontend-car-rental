import { api } from "@/api/car-rental-api"
import CarsTable from "./components/CarsTable"

export default async function Home() {
  const cars = await api.fetchCars()

  return <CarsTable cars={cars} />
}
