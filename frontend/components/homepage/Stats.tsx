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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {items.map(({ icon: Icon, title, lines }) => (
        <div
          key={title}
          className="flex gap-3 rounded-xl border border-brand-raiden-100 bg-white p-4 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-raiden-50 text-brand-raiden-600">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-left font-general-sans text-brand-raiden-600">
            <div className="text-sm font-semibold sm:text-[15px]">{title}</div>
            <div className="mt-1 space-y-0.5 text-[11px] font-medium leading-snug text-gray-600 sm:text-xs">
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
