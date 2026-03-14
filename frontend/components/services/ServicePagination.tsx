import Link from "next/link";
import { Button } from "../ui/button";

export default async function ServicePagination({
  links,
}: {
  links: [
    {
      url: string;
      label: string;
      active: boolean;
    },
  ];
}) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-2 flex-wrap">
        {links?.map((link: any, index: number) => {
          // Skip "..." button
          if (link.label === "...") {
            return (
              <span key={index} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          // Extract page number from URL
          const pageNumber = link.url
            ? Number(new URL(link.url).searchParams.get("page"))
            : null;

          if (!link.url) return null;

          // Get all query params from the link.url
          const searchParams = new URL(link.url).searchParams;
          const paramsObj = Object.fromEntries(searchParams.entries()); // { page: "2", name: "ac" }

          // Convert them back to a query string
          const queryString = new URLSearchParams(paramsObj).toString();

          return (
            <Link href={`/services?${queryString}`} key={index}>
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
