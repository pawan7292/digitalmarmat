"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import CategoriesNavigation from "./CategoryNavigation";

export default function NavigationMenuButtons() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0.5">
        <CategoriesNavigation />
        {/* Flat links */}
        {[
          { label: "Products", href: "/products" },
          { label: "Services", href: "/services" },
          { label: "Blogs", href: "/blogs" },
          { label: "Contact", href: "/contact" },
          { label: "About", href: "/about" },
        ].map(({ label, href }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink asChild>
              <Link
                href={href}
                className="text-sm font-medium text-slate-700 hover:text-[#165092] hover:bg-[#eff4fb] px-3 py-2 rounded-lg transition-colors inline-block"
              >
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
