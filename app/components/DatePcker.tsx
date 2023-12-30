import dayjs, { Dayjs } from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import "dayjs/locale/en-gb"
import { Dispatch, SetStateAction } from "react"

export default function DatePickerValue({
  label,
  disableFuture,
  disablePast,
  setFecha,
  fecha,
}: {
  label: string
  disableFuture?: boolean
  disablePast?: boolean
  setFecha: Dispatch<SetStateAction<dayjs.Dayjs | null>>
  fecha: Dayjs | null
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        disableFuture={disableFuture}
        disablePast={disablePast}
        label={label}
        value={fecha}
        onChange={(newValue) => setFecha(newValue)}
      />
    </LocalizationProvider>
  )
}
