import CarForm from "@/app/components/CarForm"
import { CarType, api } from "@/api/car-rental-api"
import { notFound } from "next/navigation"

async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await api.fetchCarById(params.id)

  return <CarForm car={car} mode={"edit"} />
}

export default EditCarPage
