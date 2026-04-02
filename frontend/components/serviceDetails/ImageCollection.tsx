"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex w-full max-w-md shrink-0 flex-col gap-3 sm:max-w-lg lg:max-w-md lg:w-[min(100%,24rem)]">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${images[selected]}`}
          fill
          className="object-contain"
          alt={name}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={img}
            onClick={() => setSelected(index)}
            className={`relative w-16 h-16 rounded-md border-2 shrink-0 
              ${
                selected === index
                  ? "border-brand-raiden-500"
                  : "border-gray-200"
              }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${img}`}
              fill
              className="object-contain p-1"
              alt={name}
            />
          </button>
        ))}
      </div>
    </div>
  );
}