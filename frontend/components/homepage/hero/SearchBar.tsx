import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default async function SearchBar() {
  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="relative h-1/2">
        <Image
          src={"/images/FrayedNoBG.svg"}
          fill
          className="object-contain"
          alt="Digital Marmat Icon"
        />
      </div>
      <div className="relative w-[40vw]">
        <input
          className="w-full px-4 py-4 body pr-28 rounded-xl border-2 border-brand-ruby-500 bg-brand-raiden-100 outline-none"
          placeholder="Search services..."
        />

        <button className="hover:cursor-pointer hover:bg-brand-ruby-600 body absolute right-1 top-1 bottom-1 px-8 rounded-lg bg-brand-ruby-500 text-white font-medium hover:bg-bloody-ruby-500 transition">
          <CiSearch size={24} />
        </button>
      </div>
      <div className="self-center blockquote">
        Everything for your home without the headache
      </div>
    </div>
  );
}
