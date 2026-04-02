// app/search/page.tsx

import { Suspense } from "react";
import AllServices from "@/components/services/all-services/AllServices";
import AllProducts from "@/components/products/all-products/AllProducts";
import SearchTabs from "@/components/search/SearchTabs";
import { SearchPageParams } from "@/lib/types/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchPageParams>;
}) {
  const params = await searchParams;
  const activeTab = params.tab === "products" ? "products" : "services"; // default: services

  return (
    <div className="flex flex-col font-general-sans">
      {/* Tab switcher — client component that updates ?tab= in the URL */}
      <SearchTabs activeTab={activeTab} searchParams={params} />

      {/* Render the active tab — each is a full server component with its own fetch */}
      <Suspense
        key={activeTab + JSON.stringify(params)}
        fallback={<TabSkeleton />}
      >
        {activeTab === "services" ? (
          <AllServices searchParams={searchParams} />
        ) : (
          <AllProducts searchParams={searchParams} />
        )}
      </Suspense>
    </div>
  );
}

function TabSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-12 py-8 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-gray-100 w-full" />
      ))}
    </div>
  );
}
