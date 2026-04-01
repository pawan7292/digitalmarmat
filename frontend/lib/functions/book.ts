import { ServiceDetailsType, SlotsType } from "../types/service";

export const DAY_MAP: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function parseSlots(slots: ServiceDetailsType["slots"][number][]) {
  const map = new Map<number, { id: number; start: string; end: string }[]>();
  for (const slot of slots) {
    const dayName = slot.source_key.split("_slot_")[0];
    const dayIndex = DAY_MAP[dayName];
    if (dayIndex === undefined) continue;
    const [start, end] = slot.source_values.split(" - ");
    if (!map.has(dayIndex)) map.set(dayIndex, []);
    map.get(dayIndex)!.push({ id: slot.id, start, end });
  }
  return map;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getSlotByDate(date: Date, slots: SlotsType[]) {
  const dayOfDate = date.getDay();

  const dayOfSlot = slots.filter((slot) =>
    DAY_MAP[slot.source_key.split("_slot_")[0]] === dayOfDate,
  );
  return dayOfSlot
}
