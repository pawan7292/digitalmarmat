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
import { SlotsType } from "@/lib/types/service";
import { checkSlots, getSlotByDate } from "@/lib/functions/book";

export function ConfirmBookings({
  slots,
  selectedSlot,
  date,
  setDate,
  setSelectedSlot,
}: {
  slots: SlotsType[];
  selectedSlot: number;
  date: any;
  setDate: any;
  setSelectedSlot: any;
}) {
  const router = useRouter();

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

    // router.push(`/book/${slug}/?date=${formatDate(date)}&slot=${selectedSlot}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold text-brand-raiden-500">
        Contact Time
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[224px] justify-between">
            {format(date, "PPP")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} />
        </PopoverContent>
      </Popover>

      {/* Slots */}
      <div className="flex gap-2 flex-wrap">
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
              <span className="font-bold capitalize">
                {slot.source_key}
                {": "}
              </span>
              {slot.source_values}
            </button>
          );
        })}
      </div>

      {/* Book button */}
      {/* <Button
        disabled={!selectedSlot}
        onClick={handleBookNow}
        size={"xl"}
        className="w-fit hover:cursor-pointer "
      >
        Book Now
      </Button> */}
    </div>
  );
}
