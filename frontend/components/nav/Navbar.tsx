import Image from "next/image";
import { Ultra } from "next/font/google";
import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Link from "next/link";
import UserButtons from "./UserButtons";
import MobileNavMenu from "./MobileNavMenu";
import NavigationSearchBar from "./NavigationSearchBar";

const ultrafont = Ultra({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Navbar() {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories?.data || [];
  return (
    <header className="flex w-full items-center gap-3 border-b border-gray-200/80 bg-gray-100 px-4 py-3 shadow-sm sm:gap-4 sm:px-6 md:px-12 md:py-4 lg:px-24 z-40 text-[12px] sm:text-[13px] md:text-[15px] sticky top-0">
      <Link href={"/"} className="flex min-w-0 shrink-0 items-center gap-2">
        <div className="flex">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10">
            <Image
              src={"./icon.svg"}
              fill
              className="object-contain"
              alt="Digital Marmat Icon"
            />
          </div>
          {/* <div className="relative h-9 w-9 sm:h-10 sm:w-10">
            <Image
              src={"/images/FrayedNoBG.svg"}
              fill
              className="object-contain transform -scale-x-100"
              alt="Digital Marmat Icon"
            />
          </div> */}
        </div>

        <div
          className={`${ultrafont.className} leading-tight hidden min-[400px]:block`}
        >
          <span className="text-brand-raiden-500">DIGITAL</span>
          <br />
          <span className="text-brand-ruby-500">MARMAT</span>
        </div>
      </Link>
      <div className="font-general-sans text-[12px] hidden min-w-0 flex-1 md:flex md:items-center">
        <div className="flex gap-2 lg:gap-4 items-center">
          {categories.slice(0, 2).map((eachCategory: GetCategoryType) => {
            return (
              <Link
                className="hover:underline hover:cursor-pointer px-1 lg:px-2"
                href={`/services/${eachCategory.slug}`}
                key={eachCategory.id}
              >
                {eachCategory.name}
              </Link>
            );
          })}

          <Link
            href={"/services"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
          >
            Services
          </Link>
          <Link
            href={"/products"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
          >
            Products
          </Link>
          <Link
            href={"/about"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
          >
            Contact
          </Link>
          <Link
            href={"/blogs"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
          >
            Blogs
          </Link>
          <Link
            href={"https://www.test.digitalmarmat.com"}
            className="hover:underline hover:cursor-pointer font-semibold px-1 lg:px-2"
            target="_blank"
          >
            Become a Provider
          </Link>
          <div>
            <NavigationSearchBar />
          </div>
        </div>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <UserButtons />
        <MobileNavMenu categories={categories} />
      </div>
    </header>
  );
}
