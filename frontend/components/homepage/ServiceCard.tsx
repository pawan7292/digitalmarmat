"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  href: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  ratingCount?: number;
  stat: string;
  badgeLabel: "Popular" | "Trending";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export function ServiceCard({
  href,
  name,
  price,
  image,
  rating,
  ratingCount,
  stat,
  badgeLabel,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-100 bg-white hover:border-[#b9d1ef] hover:shadow-lg hover:shadow-[#dce8f7]/60 hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#eff4fb]">
        {image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
            alt={name}
            width={1980}
            height={1080}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-sky-100 to-sky-200">
            🔧
          </div>
        )}
        <span
          className={`absolute top-2.5 right-2.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
            badgeLabel === "Popular"
              ? "bg-[#ed1e24] text-white"
              : "bg-[#1d58a9] text-white"
          }`}
        >
          {badgeLabel}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
          {name}
        </p>

        {rating !== undefined && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={rating} />
            <span className="text-xs text-slate-400">
              {rating.toFixed(1)}
              {ratingCount ? ` (${ratingCount})` : ""}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <span className="text-[#0e3a6b] font-extrabold text-sm">
            Rs. {price.toLocaleString()}
            <span className="text-slate-400 font-normal text-xs">
              {" "}
              /service
            </span>
          </span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">
            {stat}
          </span>
        </div>
      </div>
    </Link>
  );
}
