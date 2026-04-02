"use client";

import Link from "next/link";
import { GetCategoryType } from "@/lib/types/category";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const mainLinks = [
  { href: "/services", label: "All services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blogs", label: "Blogs" },
] as const;

export default function MobileNavMenu({
  categories,
}: {
  categories: GetCategoryType[];
}) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 gap-2 rounded-full border-brand-raiden-200 bg-white px-3 text-brand-raiden-700 shadow-sm hover:bg-brand-raiden-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span className="text-xs font-semibold">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[min(100%,20rem)] flex-col gap-0 border-r border-gray-200 p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b border-gray-100 px-5 py-4 text-left">
            <SheetTitle className="text-base font-semibold text-brand-raiden-700">
              Browse
            </SheetTitle>
          </SheetHeader>

          <nav
            className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto overscroll-contain"
            aria-label="Mobile navigation"
          >
            <div className="px-3 py-3">
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Service categories
              </p>
              <ul className="flex flex-col gap-0.5">
                {categories.slice(0, 8).map((category) => (
                  <li key={category.id}>
                    <SheetClose asChild>
                      <Link
                        href={`/services/${category.slug}`}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-brand-raiden-50 hover:text-brand-raiden-700"
                      >
                        {category.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-3 border-t border-gray-100" />

            <div className="px-3 py-3">
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Site
              </p>
              <ul className="flex flex-col gap-0.5">
                {mainLinks.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose asChild>
                      <Link
                        href={href}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-brand-raiden-50 hover:text-brand-raiden-700"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
