import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ServiceQueryParams, SortOption } from "@/lib/types/service";
import Link from "next/link";

const sortItems: { label: string; value: SortOption }[] = [
  { label: "Most Viewed", value: "most_viewed" },
  { label: "Most Booked", value: "most_booked" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Price: High to Low", value: "price_high" },
];

export default async function ServiceSort({
  params,
  slug,
}: {
  params: ServiceQueryParams;
  slug: string;
}) {
  const currentLabel =
    sortItems.find((item) => item.value === params.sort)?.label ?? "Sort by";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          {currentLabel}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {sortItems.map((item) => {
          const newParams = { ...params, sort: item.value };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link key={item.value} href={`/${slug}/?${queryString}`}>
              <DropdownMenuItem
                className={params.sort === item.value ? "font-medium" : ""}
              >
                {item.label}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
