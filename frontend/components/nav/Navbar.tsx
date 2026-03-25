import Image from "next/image";

import { Ultra } from "next/font/google";
import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import { CiUser } from "react-icons/ci";
import Link from "next/link";

const ultrafont = Ultra({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Navbar() {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories?.data || [];
  return (
    <header className="flex sticky top-0 bg-brand-raiden-100 py-2 px-24 z-4 text-[15px] flex items-center gap-16 w-full">
      <Link href={"/"} className="flex gap-2">
        <div className="relative h-8 w-8">
          <Image
            src={"/images/FrayedNoBG.svg"}
            fill
            className="object-contain"
            alt="Digital Marmat Icon"
          />
        </div>
        <div className={`${ultrafont.className} leading-4`}>
          <span className="text-brand-raiden-500">DIGITAL</span>
          <br></br>
          <span className="text-brand-ruby-500">MARMAT</span>
        </div>
      </Link>
      <div className="font-general-sans text-[12px]">
        <div className="flex gap-4">
          {categories.slice(0, 5).map((eachCategory: GetCategoryType) => {
            return (
              <Link
                className="hover:underline hover:cursor-pointer"
                href={`/services/${eachCategory.slug}`}
                key={eachCategory.id}
              >
                {eachCategory.name}
              </Link>
            );
          })}

          <div className="hover:underline hover:cursor-pointer">
            All Services
          </div>
          <div className="hover:underline hover:cursor-pointer">
            All Products
          </div>
        </div>
      </div>
      <div className="justify-end ml-auto">
        <CiUser className="stroke-1" size={20} />
      </div>
    </header>
  );
}
