import Link from "next/link";
import { Button } from "../ui/button";
import { ServiceQueryParams } from "@/lib/types/service";

export default async function ServicePagination({
  links,
  category,
  filters,
}: {
  links: [
    {
      url: string;
      label: string;
      active: boolean;
    },
  ];
  category: string;
  filters: ServiceQueryParams;
}) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-2 flex-wrap">
        {links?.map((link: any, index: number) => {
          if (link.label === "...") {
            return (
              <span key={index} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          const pageNumber = link.url
            ? Number(new URL(link.url).searchParams.get("page"))
            : null;

          if (!link.url) return null;

          const searchParams = new URL(link.url).searchParams;
          const paramsObj = Object.fromEntries(searchParams.entries()); // { page: "2", name: "ac" }

          const newParams = { ...filters, page: pageNumber };
          const queryString = new URLSearchParams(newParams as any).toString();

          return (
            <Link href={`/services/${category}/?${queryString}`} key={index}>
              <Button
                variant={link.active ? "default" : "outline"}
                disabled={!pageNumber}
              >
                {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
