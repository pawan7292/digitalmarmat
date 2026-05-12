"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays, Check, ChevronDownIcon } from "lucide-react";
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
  const [open, setOpen] = React.useState(false);

  const [slotsByDate, setSlotsByDate] = React.useState(
    getSlotByDate(date, slots),
  );

  React.useEffect(() => {
    checkSlots(slots, date, setSlotsByDate);
  }, [date]);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    setDate(date);
    setSelectedSlot(null);

    // close calendar instantly
    setOpen(false);
  };

  const handleBookNow = () => {
    if (!selectedSlot) return;

    router.push(`/book/${slug}/?date=${formatDate(date)}&slot=${selectedSlot}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Book Service</h2>

        <p className="mt-1 text-sm text-gray-500">Choose date and time slot</p>
      </div>

      {/* Selected Date */}
      <div className="rounded-2xl border border-brand-raiden-100 bg-brand-raiden-50 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-brand-raiden-500" />

            <div>
              <p className="text-xs text-gray-500">Selected Date</p>

              <p className="font-semibold text-gray-900">
                {format(date, "PPP")}
              </p>
            </div>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                className="
                  flex items-center gap-1 rounded-xl
                  border border-gray-200 bg-white
                  px-3 py-2 text-sm font-medium
                  hover:border-brand-raiden-300
                "
              >
                Change
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-auto rounded-2xl p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Slots */}
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Available Slots
        </p>

        <div className="flex flex-wrap gap-2">
          {slotsByDate.length === 0 &&
            "No slots available for the given date \n.Select other date"}
          {slotsByDate.map((slot) => {
            const isSelected = selectedSlot === slot.id;

            return (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot.id)}
                className={`
  flex items-center gap-1 rounded-xl
  border px-3 py-2 text-sm font-medium
  transition-all duration-200

  ${
    !slot.available
      ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400 opacity-50"
      : isSelected
        ? "border-brand-raiden-500 bg-brand-raiden-500 text-white"
        : "border-gray-200 bg-white hover:border-brand-raiden-300 hover:bg-brand-raiden-50"
  }
`}
              >
                {isSelected && <Check className="h-4 w-4" />}

                {slot.source_values}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <Button
        disabled={!selectedSlot}
        onClick={handleBookNow}
        className="
          h-12 w-full rounded-2xl
          bg-brand-raiden-500 text-base font-semibold
          hover:bg-brand-raiden-600
        "
      >
        Continue Booking
      </Button>
    </div>
  );
}
