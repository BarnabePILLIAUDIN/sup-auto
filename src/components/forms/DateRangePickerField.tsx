import DateRangePicker from "@/components/ui/DateRangePicker"
import { Label } from "@/components/ui/Label"
import { type DateRange } from "react-day-picker"
import { useFormContext } from "react-hook-form"

type Props = {
  label: string
}

const DateRangePickerField = ({ label }: Props) => {
  const { getValues, setValue } = useFormContext()

  const handleSelect = (date: DateRange | undefined) => {
    setValue("from", date?.from)
    setValue("to", date?.to)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <DateRangePicker
        onSelect={handleSelect}
        initialValues={{
          from: getValues("from") as Date | undefined,
          to: getValues("to") as Date | undefined,
        }}
      />
    </div>
  )
}

export default DateRangePickerField
