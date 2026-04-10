import Link from "next/link";
import Image from "next/image";

interface Brand {
  name: string;
  iconUrl: string;
  iconBg: string;
  tagline: string;
  website: string;
}

const brands: Brand[] = [
  {
    name: "Samsung",
    iconUrl: "/icons/samsung.svg",
    iconBg: "bg-blue-50",
    tagline: "Electronics & ACs",
    website: "https://www.samsung.com",
  },
  {
    name: "LG",
    iconUrl: "/icons/lg.svg",
    iconBg: "bg-rose-50",
    tagline: "Home Appliances",
    website: "https://www.lg.com",
  },
  {
    name: "Bosch",
    iconUrl: "/icons/bosch.svg",
    iconBg: "bg-red-50",
    tagline: "Tools & Appliances",
    website: "https://www.bosch-home.com",
  },
  {
    name: "Panasonic",
    iconUrl: "/icons/panasonic.svg",
    iconBg: "bg-indigo-50",
    tagline: "Electronics & ACs",
    website: "https://www.panasonic.com",
  },
  {
    name: "Sony",
    iconUrl: "/icons/sony.svg",
    iconBg: "bg-slate-50",
    tagline: "TVs & Electronics",
    website: "https://www.sony.com",
  },
  {
    name: "Hitachi",
    iconUrl: "/icons/hitachi.svg",
    iconBg: "bg-rose-50",
    tagline: "AC & Electricals",
    website: "https://www.hitachi.com",
  },
  {
    name: "Havells",
    iconUrl: "/icons/havells.svg",
    iconBg: "bg-orange-50",
    tagline: "Electricals & Wiring",
    website: "https://www.havells.com",
  },
  {
    name: "Mitsubishi",
    iconUrl: "/icons/mitsubishi.svg",
    iconBg: "bg-orange-50",
    tagline: "Electricals & ACs",
    website: "https://www.mitsubishicars.com",
  },
];

export default function TopBrands() {
  return (
    <section className="px-6 md:px-12 py-14 bg-[#f7faff]">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">
            Trusted Partners
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Top Brands
          </h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#ed1e24] to-[#1d58a9]" />
        </div>
        <Link
          href="/brands"
          className="text-sm font-semibold text-[#1d58a9] border border-[#b9d1ef] hover:bg-[#1d58a9] hover:text-white px-4 py-2 rounded-lg transition-all duration-150"
        >
          View All →
        </Link>
      </div>

      {/* Sideways scrollable row */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory brands-scroll">
        {brands.map((brand) => (
          <a
            key={brand.name}
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-start shrink-0 w-40 group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white hover:border-[#b9d1ef] hover:shadow-lg hover:shadow-[#dce8f7]/60 hover:-translate-y-1 transition-all duration-200 p-5"
          >
            {/* Logo via Clearbit */}
            <div
              className={`w-14 h-14 rounded-xl ${brand.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 overflow-hidden p-2`}
            >
              <Image
                src={`https://simpleicons.org${brand.iconUrl}`}
                alt={`${brand.name} logo`}
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="font-bold text-slate-800 text-sm">{brand.name}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                {brand.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
