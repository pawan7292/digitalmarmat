import Link from "next/link";
import { PackageOpen } from "lucide-react";

interface ProductEmptyStateProps {
  category: string;
  subcategory?: string;
  hasFiltersApplied?: boolean;
}

export default function ProductEmptyState({
  category,
  subcategory,
  hasFiltersApplied = false,
}: ProductEmptyStateProps) {
  const isSubcategoryPage = !!subcategory;

  return (
    <div className="w-full flex-1 flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        {/* Icon */}
        <div className="bg-gray-100 rounded-full p-6 sm:p-8 md:p-10">
          <PackageOpen className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            {hasFiltersApplied ? "No Products Found" : "No Products Available"}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {hasFiltersApplied
              ? "We couldn't find any products matching your filters. Try adjusting your search criteria."
              : isSubcategoryPage
                ? "This subcategory doesn't have any products yet."
                : "This category doesn't have any products yet."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          {hasFiltersApplied ? (
            <>
              {/* Reset Filters Button */}
              <Link
                href={
                  isSubcategoryPage
                    ? `/products/${category}/${subcategory}`
                    : `/products/${category}`
                }
                className="px-6 py-2.5 sm:py-3 bg-brand-raiden-600 text-white rounded-lg font-medium hover:bg-brand-raiden-700 transition duration-200 text-sm sm:text-base"
              >
                Reset Filters
              </Link>

              {/* Browse All Products Button */}
              <Link
                href="/all-products"
                className="px-6 py-2.5 sm:py-3 border-2 border-brand-raiden-600 text-brand-raiden-600 rounded-lg font-medium hover:bg-brand-raiden-50 transition duration-200 text-sm sm:text-base"
              >
                Browse All Products
              </Link>
            </>
          ) : (
            <>
              {/* Go Back Button */}
              <Link
                href={isSubcategoryPage ? `/products/${category}` : "/products"}
                className="px-6 py-2.5 sm:py-3 bg-brand-raiden-600 text-white rounded-lg font-medium hover:bg-brand-raiden-700 transition duration-200 text-sm sm:text-base"
              >
                {isSubcategoryPage ? "Back to Category" : "Back to Categories"}
              </Link>

              {/* Browse All Products Button */}
              <Link
                href="/all-products"
                className="px-6 py-2.5 sm:py-3 border-2 border-brand-raiden-600 text-brand-raiden-600 rounded-lg font-medium hover:bg-brand-raiden-50 transition duration-200 text-sm sm:text-base"
              >
                Explore All Products
              </Link>
            </>
          )}
        </div>

        {/* Additional Help Text */}
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          Can't find what you're looking for?{" "}
          <Link href="/contact" className="text-brand-raiden-600 font-medium hover:underline">
            Contact us
          </Link>{" "}
          for assistance.
        </p>
      </div>
    </div>
  );
}
