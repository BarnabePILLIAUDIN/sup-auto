"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { type SelectRangeEventHandler, type DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { DateTime } from "luxon"

type Props = {
  initialValues?: DateRange
  onSelect: (date: DateRange | undefined) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">

const DateRangePicker = ({ initialValues, onSelect, className }: Props) => {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialValues ?? {
      from: new Date(),
      to: undefined,
    },
  )

  const handleSelect: SelectRangeEventHandler = (date) => {
    setDate(date)
    onSelect(date)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {DateTime.fromJSDate(date.from).toFormat("dd'/'LL'/'yyyy")} -{" "}
                  {DateTime.fromJSDate(date.to).toFormat("dd'/'LL'/'yyyy")}
                </>
              ) : (
                DateTime.fromJSDate(date.from).toFormat("dd'/'LL'/'yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker
