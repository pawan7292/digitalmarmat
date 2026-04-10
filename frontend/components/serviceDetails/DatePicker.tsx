"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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

export function DatePicker({
  slots,
  slug,
}: {
  slots: SlotsType[];
  slug: string;
}) {
  const router = useRouter();

  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);

  const [slotsByDate, setSlotsByDate] = React.useState(
    getSlotByDate(date, slots),
  );

  React.useEffect(() => {
    checkSlots(slots, date, setSlotsByDate);
  }, [date]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setSelectedSlot(null);
    }
  };

  const handleBookNow = () => {
    if (!selectedSlot) return;

    router.push(`/book/${slug}/?date=${formatDate(date)}&slot=${selectedSlot}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {format(date, "PPP")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} />
        </PopoverContent>
      </Popover>

      {/* Slots */}
      <div className="flex gap-2 justify-center flex-wrap">
        {slotsByDate.map((slot) => {
          const isSelected = selectedSlot === slot.id;

          return (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => setSelectedSlot(slot.id)}
              className={`
                px-3 py-2 rounded-lg border
                ${
                  slot.available
                    ? "cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }
                ${isSelected ? "bg-brand-raiden-500 text-white" : "bg-gray-100"}
              `}
            >
              {slot.source_values}
            </button>
          );
        })}
      </div>

      {/* Book button */}
      <Button
        disabled={!selectedSlot}
        onClick={handleBookNow}
        size={"xl"}
        className="w-fit self-center hover:cursor-pointer "
      >
        Book Now
      </Button>
    </div>
  );
}
