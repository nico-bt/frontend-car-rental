import CarsTable from "@/app/components/CarsTable"
import { mockCars } from "../mockData"
import { CarType } from "@/app/page"

export default async function HomeMockPageForTesting() {
  return <CarsTable cars={mockCars as CarType[]} />
}
