import dayjs, { Dayjs } from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import "dayjs/locale/en-gb"
import { Dispatch, SetStateAction } from "react"

export default function DatePickerValue({
  setFechaNacimiento,
  fechaNacimiento,
}: {
  setFechaNacimiento: Dispatch<SetStateAction<dayjs.Dayjs | null>>
  fechaNacimiento: Dayjs | null
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        disableFuture
        label="Fecha Nacimiento"
        value={fechaNacimiento}
        onChange={(newValue) => setFechaNacimiento(newValue)}
      />
    </LocalizationProvider>
  )
}
