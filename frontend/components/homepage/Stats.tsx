import { FaUserShield } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegFaceSmileWink } from "react-icons/fa6";

const items = [
  {
    icon: FaUserShield,
    title: "500+ Experts",
    lines: ["Verified and trusted", "Across Kathmandu"],
  },
  {
    icon: FaThumbsUp,
    title: "4,500+ Jobs",
    lines: ["AC, fridge & appliances", "And home repairs"],
  },
  {
    icon: FaRegFaceSmileWink,
    title: "3,270 Clients",
    lines: ["Your satisfaction", "Our pride"],
  },
] as const;

export default async function StatsComponent() {
  return (
    <div className="grid gap-2 grid-cols-3 sm:gap-4">
      {items.map(({ icon: Icon, title, lines }) => (
        <div
          key={title}
          className="flex  sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-1 sm:gap-3 rounded-lg sm:rounded-xl border border-brand-raiden-100 bg-white p-2 sm:p-4 shadow-sm"
        >
          <div className="flex h-6 w-6 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-brand-raiden-50 text-brand-raiden-600">
            <Icon className="h-3 w-3 sm:h-5 sm:w-5" aria-hidden />
          </div>

          <div className="min-w-0 flex-1 font-general-sans text-brand-raiden-600">
            <div className="text-[9px] sm:text-[15px] font-semibold leading-tight">
              {title}
            </div>

            <div className="mt-1 hidden sm:block space-y-0.5 text-[11px] font-medium leading-snug text-gray-600 sm:text-xs">
              {lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
