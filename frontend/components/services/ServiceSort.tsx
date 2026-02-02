"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SortOption } from "@/lib/types/service";

const sortItems: { label: string; value: SortOption }[] = [
  { label: "Most Viewed", value: "most_viewed" },
  { label: "Most Booked", value: "most_booked" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Price: High to Low", value: "price_high" },
];

type Props = {
  sort?: SortOption;
  onChange: (value: SortOption) => void;
};

export default function ServiceSort({ sort, onChange }: Props) {
  const currentLabel =
    sortItems.find((item) => item.value === sort)?.label ?? "Sort by";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          {currentLabel}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {sortItems.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => onChange(item.value)}
            className={sort === item.value ? "font-medium" : ""}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
