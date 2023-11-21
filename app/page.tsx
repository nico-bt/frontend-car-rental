import CarsTable from "./components/CarsTable"

export interface CarType {
  id: number
  marca: string
  modelo: string
  year: number
  km: number
  color: string
  ac: boolean
  pasajeros: number
  cambios: "MANUAL" | "AUTOMATICO"
  created_at: string
  updated_at: string
  price: number
  is_rented: boolean
}

export const fetchCars = async (url: string): Promise<CarType[]> => {
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const cars = await res.json()

  return cars
}

export default async function Home() {
  const cars = await fetchCars(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/`)
  return <CarsTable cars={cars} />
}
