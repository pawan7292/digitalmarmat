"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Clock2Icon, LoaderCircleIcon } from "lucide-react";
import { ServiceType } from "@/lib/types/service";
import { checkSlotsAction } from "@/lib/actions/check-slots";
import { parseSlots, formatDate } from "@/lib/functions/book";

export default function BookDate({
  slots,
  onBook,
  onNext,
}: {
  slots: ServiceType["slots"][number][];
  onBook?: (bookingDate: string, slotId: number) => void;
  onNext: () => void;
}) {
  const { tomorrow } = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const tm = new Date(t);
    tm.setDate(tm.getDate() + 1);
    return { tomorrow: tm };
  }, []);

  const slotsByDay = useMemo(() => parseSlots(slots), [slots]);
  const availableDays = useMemo(() => new Set(slotsByDay.keys()), [slotsByDay]);

  const [date, setDate] = useState<Date | undefined>(() => {
    for (let i = 0; i < 7; i++) {
      const d = new Date(tomorrow);
      d.setDate(d.getDate() + i);
      if (availableDays.has(d.getDay())) return d;
    }
    return tomorrow;
  });

  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [loadingDate, setLoadingDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  const fetchAvailability = useCallback(
    async (d: Date) => {
      const daySlots = slotsByDay.get(d.getDay()) ?? [];
      if (daySlots.length === 0) return;

      const dateStr = formatDate(d);
      setLoadingDate(dateStr);
      setAvailability({});
      setSelectedSlotId(null);

      try {
        console.log(dateStr);
        const result = await checkSlotsAction(
          dateStr,
          daySlots.map((s) => s.id),
        );
        console.log(result);
        setAvailability(result);
      } finally {
        setLoadingDate(null);
      }
    },
    [slotsByDay],
  );

  useEffect(() => {
    if (date) fetchAvailability(date);
  }, []);

  const handleDateSelect = useCallback(
    (d: Date | undefined) => {
      setDate(d);
      if (d) fetchAvailability(d);
    },
    [fetchAvailability],
  );

  const isDisabled = (d: Date) =>
    d < tomorrow || !availableDays.has(d.getDay());

  const daySlots = useMemo(
    () => (date ? (slotsByDay.get(date.getDay()) ?? []) : []),
    [date, slotsByDay],
  );

  const isChecking = date ? loadingDate === formatDate(date) : false;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        disabled={isDisabled}
        modifiers={{ unavailable: isDisabled }}
        modifiersClassNames={{
          unavailable: "[&>button]:line-through opacity-40 cursor-not-allowed",
        }}
      />

      <div className="flex flex-col justify-center gap-3 min-h-[200px]">
        {!date ? (
          <p className="text-sm text-muted-foreground italic">
            Please select a date.
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-muted-foreground">
              Available slots for{" "}
              <span className="text-foreground font-semibold">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>

            {isChecking ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                Checking availability…
              </div>
            ) : daySlots.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No slots configured for this day.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {daySlots.map((slot) => {
                  const isAvailable = availability[String(slot.id)] === true;
                  const isSelected = selectedSlotId === slot.id;
                  const hasChecked = Object.keys(availability).length > 0;

                  return (
                    <button
                      key={slot.id}
                      disabled={!isAvailable}
                      onClick={() => {
                        setSelectedSlotId(slot.id);
                        onBook?.(formatDate(date), slot.id);
                      }}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors w-full text-left
                        ${
                          !hasChecked
                            ? "border-border bg-background text-muted-foreground"
                            : isSelected
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : isAvailable
                                ? "border-border bg-background hover:bg-muted text-foreground cursor-pointer"
                                : "border-border bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed line-through"
                        }`}
                    >
                      <Clock2Icon className="h-4 w-4 shrink-0" />
                      <span>{slot.start}</span>
                      <span className="text-muted-foreground">→</span>
                      <span>{slot.end}</span>
                      {hasChecked && (
                        <span
                          className={`ml-auto text-xs font-medium ${
                            isAvailable ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isAvailable ? "Available" : "Taken"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <div className="md:col-start-2 justify-self-end">
        <button
          onClick={onNext}
          disabled={!selectedSlotId}
          className={`
            px-6 py-2 rounded-lg font-medium transition

            ${
              selectedSlotId
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
