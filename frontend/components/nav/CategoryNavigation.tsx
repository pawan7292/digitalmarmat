import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const categoriesComponent = [
  {
    title: "AC Service",
    href: "/services?category=ac",
    description: "Installation, repair & maintenance",
  },
  {
    title: "Washing Machine",
    href: "/services?category=washing-machine",
    description: "Full service & drum cleaning",
  },
  {
    title: "Plumbing",
    href: "/services?category=plumbing",
    description: "Leaks, pipes & fittings",
  },
  {
    title: "Electrician",
    href: "/services?category=electrician",
    description: "Wiring, boards & installations",
  },
  {
    title: "TV Mounting",
    href: "/services?category=tv",
    description: "Wall mount & setup",
  },
  {
    title: "Painting",
    href: "/services?category=painting",
    description: "Interior & exterior painting",
  },
];

export default function CategoriesNavigation () {
    return (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-slate-700 hover:text-[#165092] bg-transparent hover:bg-[#eff4fb] data-[state=open]:bg-[#eff4fb] data-[state=open]:text-[#165092] transition-colors px-3 py-2 rounded-lg">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-3 w-[520px]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1d58a9] px-2 mb-2">
                Browse by Category
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {categoriesComponent.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-[#eff4fb] group transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-[#165092] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-400 leading-snug">
                          {item.description}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link
                  href="/services"
                  className="flex items-center gap-1 text-xs font-semibold text-[#1d58a9] hover:text-[#0e3a6b] px-2 transition-colors"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
    )
}