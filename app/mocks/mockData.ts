export const mockCars = [
  {
    id: 45,
    marca: "BMW",
    modelo: "X6",
    year: 2022,
    km: 4200,
    color: "negro",
    ac: true,
    pasajeros: 5,
    cambios: "AUTOMATICO",
    created_at: "2023-11-07T16:29:49.219Z",
    updated_at: "2023-11-15T19:18:41.008Z",
    is_deleted: false,
    is_rented: false,
    price: 40,
  },
  {
    id: 76,
    marca: "Ferrari",
    modelo: "458 Spider",
    year: 2021,
    km: 14420,
    color: "rojo",
    ac: true,
    pasajeros: 2,
    cambios: "MANUAL",
    created_at: "2023-11-10T20:42:19.399Z",
    updated_at: "2023-11-15T19:30:33.966Z",
    is_deleted: false,
    is_rented: true,
    price: 75,
  },
]

export const mockClients = [
  {
    id: 18,
    nombre: "Luciana ",
    apellido: "Aymar",
    tipo_documento: "DNI",
    nro_documento: "30444777",
    nacionalidad: "Argentina",
    direccion: "Maipu 478",
    telefono: "1123457676",
    email: "lucha@mail.com",
    fecha_nacimiento: "1980-09-09T03:00:00.000Z",
    created_at: "2023-11-11T20:25:31.908Z",
    updated_at: "2023-11-15T19:29:47.887Z",
    is_renting: false,
    is_deleted: false,
  },
  {
    id: 16,
    nombre: "Diego",
    apellido: "Milito",
    tipo_documento: "DNI",
    nro_documento: "40999888",
    nacionalidad: "Argentino",
    direccion: "Posadas 456",
    telefono: "1147778888",
    email: "diego@mail.com",
    fecha_nacimiento: "1980-11-11T03:00:00.000Z",
    created_at: "2023-11-11T20:23:22.324Z",
    updated_at: "2023-11-12T21:47:54.146Z",
    is_renting: false,
    is_deleted: false,
  },
]

export const mockActiveTransactions = [
  {
    id: 18,
    clientId: 15,
    carId: 82,
    start_date: "2023-11-17T03:00:00.000Z",
    finish_date: "2023-11-30T03:00:00.000Z",
    price_per_day: 5000,
    total_price: 65000,
    is_active: true,
    created_at: "2023-11-18T00:42:13.589Z",
    updated_at: "2023-11-18T00:42:13.589Z",
    is_deleted: false,
    client: {
      id: 15,
      nombre: "Maria Laura",
      apellido: "Ramirez",
      tipo_documento: "DNI",
      nro_documento: "30123123",
      nacionalidad: "Argentina",
      direccion: "Rivadavia 1234",
      telefono: "1141112222",
      email: "mar.lr@mail.com",
      fecha_nacimiento: "1990-06-20T03:00:00.000Z",
      created_at: "2023-11-11T20:21:46.881Z",
      updated_at: "2023-11-18T00:42:14.153Z",
      is_renting: true,
      is_deleted: false,
    },
    car: {
      id: 82,
      marca: "Toyota",
      modelo: "XLM",
      year: 2023,
      km: 1,
      color: "Azul",
      ac: true,
      pasajeros: 5,
      cambios: "MANUAL",
      created_at: "2023-11-17T23:59:02.046Z",
      updated_at: "2023-11-18T00:42:13.870Z",
      is_deleted: false,
      is_rented: true,
      price: 5000,
    },
  },
]

export const mockHistorialTransactions = [
  {
    id: 18,
    clientId: 15,
    carId: 82,
    start_date: "2023-11-17T03:00:00.000Z",
    finish_date: "2023-11-30T03:00:00.000Z",
    price_per_day: 5000,
    total_price: 65000,
    is_active: true,
    created_at: "2023-11-18T00:42:13.589Z",
    updated_at: "2023-11-18T00:42:13.589Z",
    is_deleted: false,
    client: {
      id: 15,
      nombre: "Maria Laura",
      apellido: "Ramirez",
      tipo_documento: "DNI",
      nro_documento: "30123123",
      nacionalidad: "Argentina",
      direccion: "Rivadavia 1234",
      telefono: "1141112222",
      email: "mar.lr@mail.com",
      fecha_nacimiento: "1990-06-20T03:00:00.000Z",
      created_at: "2023-11-11T20:21:46.881Z",
      updated_at: "2023-11-18T00:42:14.153Z",
      is_renting: true,
      is_deleted: false,
    },
    car: {
      id: 82,
      marca: "Toyota",
      modelo: "XLM",
      year: 2023,
      km: 1,
      color: "Azul",
      ac: true,
      pasajeros: 5,
      cambios: "MANUAL",
      created_at: "2023-11-17T23:59:02.046Z",
      updated_at: "2023-11-18T00:42:13.870Z",
      is_deleted: false,
      is_rented: true,
      price: 5000,
    },
  },
  {
    id: 12,
    clientId: 17,
    carId: 42,
    start_date: "2023-11-12T03:00:00.000Z",
    finish_date: "2023-11-29T03:00:00.000Z",
    price_per_day: 70,
    total_price: 1190,
    is_active: false,
    created_at: "2023-11-12T18:46:14.267Z",
    updated_at: "2023-11-13T19:27:01.622Z",
    is_deleted: false,
    client: {
      id: 17,
      nombre: "Enzo",
      apellido: "Francescoli",
      tipo_documento: "DNI",
      nro_documento: "20156456",
      nacionalidad: "Uruguayo",
      direccion: "Wilson 1234",
      telefono: "1233336666",
      email: "enzo@mail.com",
      fecha_nacimiento: "1961-11-12T03:00:00.000Z",
      created_at: "2023-11-11T20:24:42.042Z",
      updated_at: "2023-11-13T19:27:01.241Z",
      is_renting: false,
      is_deleted: false,
    },
    car: {
      id: 42,
      marca: "BMW",
      modelo: "Z4 Roadster",
      year: 2022,
      km: 6000,
      color: "rojo",
      ac: true,
      pasajeros: 2,
      cambios: "MANUAL",
      created_at: "2023-11-07T16:07:46.299Z",
      updated_at: "2023-11-15T20:56:34.739Z",
      is_deleted: true,
      is_rented: false,
      price: 70,
    },
  },
]
