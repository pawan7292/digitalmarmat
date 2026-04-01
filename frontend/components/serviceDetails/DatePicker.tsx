"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { checkSlotsAction } from "@/lib/actions/check-slots";
import { SlotsType } from "@/lib/types/service";
import { formatDate, getSlotByDate } from "@/lib/functions/book";

async function checkSlots(slots: SlotsType[], date: Date, setSlotsByDate: any) {
  const slotsByDate: SlotsType[] = getSlotByDate(date, slots);

  const formattedDate = formatDate(date);

  const response = await checkSlotsAction(
    formattedDate,
    slotsByDate.map((slot) => slot.id),
  );

  setSlotsByDate(
    slotsByDate.map((slot) => ({
      ...slot,
      available: response[slot.id] ?? false,
    })),
  );
}

export function DatePicker({ slots }: { slots: SlotsType[] }) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [slotsByDate, setSlotsByDate] = React.useState(
    getSlotByDate(date, slots),
  );

  React.useEffect(() => {
    checkSlots(slots, date, setSlotsByDate);
  }, [date]);

  const handleDateChange = async (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          defaultMonth={date}
        />
      </PopoverContent>
      {slotsByDate.map((eachslot) => {
        return (
          <div key={eachslot.id}>
            {eachslot.source_key} {eachslot.source_values}
          </div>
        );
      })}
    </Popover>
  );
}
