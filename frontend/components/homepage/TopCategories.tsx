import Link from "next/link";
import {
  AirVent,
  Wrench,
  Zap,
  Tv,
  PaintRoller,
  Hammer,
  LucideIcon,
} from "lucide-react";

interface Category {
  label: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  description: string;
}

const categories: Category[] = [
  {
    label: "AC Service",
    slug: "ac-service",
    icon: AirVent,
    color: "text-sky-600",
    bg: "bg-sky-50",
    description: "Installation & repair",
  },
  {
    label: "Plumbing",
    slug: "plumbing",
    icon: Wrench,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "Leaks, pipes & more",
  },
  {
    label: "Electrician",
    slug: "electrician",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    description: "Wiring & fitting",
  },
  {
    label: "TV Mounting",
    slug: "tv-mounting",
    icon: Tv,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description: "Wall mount & setup",
  },
  {
    label: "Painting",
    slug: "painting",
    icon: PaintRoller,
    color: "text-rose-500",
    bg: "bg-rose-50",
    description: "Interior & exterior",
  },
  {
    label: "Carpentry",
    slug: "carpentry",
    icon: Hammer,
    color: "text-orange-600",
    bg: "bg-orange-50",
    description: "Furniture & fixtures",
  },
];

export default async function TopCategories() {
  return (
    <section className="px-6 md:px-12 py-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">
            Browse By Need
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Top Categories
          </h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#ed1e24] to-[#1d58a9]" />
        </div>
        <Link
          href="/services"
          className="text-sm font-semibold text-[#1d58a9] border border-[#b9d1ef] hover:bg-[#1d58a9] hover:text-white px-4 py-2 rounded-lg transition-all duration-150"
        >
          View All →
        </Link>
      </div>

      {/* Sideways scroll on mobile, grid on md+ */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/services?category=${cat.slug}`}
              className="snap-start shrink-0 w-36 md:w-auto group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white hover:border-[#b9d1ef] hover:shadow-lg hover:shadow-[#dce8f7]/60 hover:-translate-y-1 transition-all duration-200 p-5"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.bg} group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={26} className={cat.color} strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-800 text-sm leading-tight">
                  {cat.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}