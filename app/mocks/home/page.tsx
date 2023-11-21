import CarsTable from "@/app/components/CarsTable"
import { mockCars } from "../mockData"
import { CarType } from "@/api/car-rental-api"

export default async function HomeMockPageForTesting() {
  return <CarsTable cars={mockCars as CarType[]} />
}
