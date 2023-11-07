import CarForm from "@/app/components/CarForm"
import { CarType } from "@/app/page"
import { notFound } from "next/navigation"

const fetchCarById = async (id: string): Promise<CarType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/car/${id}`, {
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    notFound()
  }
  const car = await res.json()

  return car
}

async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await fetchCarById(params.id)

  return <CarForm car={car} mode={"edit"} />
}

export default EditCarPage
