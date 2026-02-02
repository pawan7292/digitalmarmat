import { Button } from "../ui/button";

export default function ServicePagination({
  links,
  setPage,
}: {
  links: [
    {
      url: string;
      label: string;
      active: boolean;
    },
  ];
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

          return (
            <Button
              key={index}
              variant={link.active ? "default" : "outline"}
              disabled={!pageNumber}
              onClick={() => pageNumber && setPage(pageNumber)}
            >
              {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
