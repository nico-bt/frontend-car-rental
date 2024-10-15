import { notFound } from "next/navigation"

const BASE_URL = "https://bewildered-rozamond-nico-bat-4a2e4923.koyeb.app/api"

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

export interface ClientType {
  id: number
  nombre: string
  apellido: string
  tipo_documento: Documentotype
  nro_documento: string
  nacionalidad: string
  direccion: string
  telefono: string
  email: string
  fecha_nacimiento: string
  created_at: string
  updated_at: string
  is_renting: boolean
}

export enum Documentotype {
  PASAPORTE = "PASAPORTE",
  DNI = "DNI",
  CEDULA = "CEDULA",
}

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
  created_at: string
  updated_at: string
}

export interface CarBody {
  marca: string
  modelo: string
  year: number
  km: number
  color: string
  ac: boolean
  pasajeros: number
  cambios: "MANUAL" | "AUTOMATICO"
  price: number
}

export interface ClientBody {
  nombre: string
  apellido: string
  tipo_documento: Documentotype
  nro_documento: string
  nacionalidad: string
  direccion: string
  telefono: string
  email: string
  fecha_nacimiento: string
}

export interface TransactionBody {
  clientId: number
  carId: number
  start_date: string
  finish_date: string
}

export const api = {
  fetchCars: async (): Promise<CarType[]> => {
    try {
      const res = await fetch(BASE_URL + "/car", { next: { revalidate: 0 } })
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      const cars = await res.json()

      return cars
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch data")
    }
  },
  fetchClients: async (): Promise<ClientType[]> => {
    const res = await fetch(BASE_URL + "/clients", { next: { revalidate: 0 } })
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const clients = await res.json()

    return clients
  },

  fetchCarById: async (id: string): Promise<CarType> => {
    const res = await fetch(`${BASE_URL}/car/${id}`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      notFound()
    }
    const car = await res.json()

    return car
  },
  fetchClientById: async (id: string): Promise<ClientType> => {
    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      notFound()
    }
    const client = await res.json()

    return client
  },
  fetchTransactions: async ({ active }: { active?: boolean } = {}): Promise<TransactionType[]> => {
    const res = await fetch(`${BASE_URL}/${active ? "transactions?active=true" : "transactions"}`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const transactions = await res.json()

    return transactions
  },
  fetchTransactionById: async (id: string): Promise<TransactionType> => {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      notFound()
    }
    const transaction = await res.json()

    return transaction
  },
  addCar: (body: CarBody) => {
    return fetch(`${BASE_URL}/car`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  editCar: (id: number, body: CarBody) => {
    return fetch(`${BASE_URL}/car/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  deleteCar: (id: number) => {
    return fetch(`${BASE_URL}/car/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
  addClient: (body: ClientBody) => {
    return fetch(`${BASE_URL}/clients`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  editClient: (id: number, body: ClientBody) => {
    return fetch(`${BASE_URL}/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  deleteClient: (id: number) => {
    return fetch(`${BASE_URL}/clients/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
  addTransaction: (body: TransactionBody) => {
    return fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  editTransaction: (id: number, body: TransactionBody) => {
    return fetch(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  },
  finishTransaction: (id: number) => {
    return fetch(`${BASE_URL}/transactions/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
}
