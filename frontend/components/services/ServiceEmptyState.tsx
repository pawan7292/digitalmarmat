import Link from "next/link";
import { PackageOpen } from "lucide-react";

interface ServiceEmptyStateProps {
  hasFiltersApplied?: boolean;
}

export default function ServiceEmptyState({
  hasFiltersApplied = false,
}: ServiceEmptyStateProps) {
  return (
    <div className="w-full flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        {/* Icon */}
        <div className="bg-gray-100 rounded-full p-6 sm:p-8 md:p-10">
          <PackageOpen className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            {hasFiltersApplied ? "No Services Found" : "No Services Available"}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {hasFiltersApplied
              ? "We couldn't find any services matching your filters. Try adjusting your search criteria."
              : "There are no services available at the moment."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          {hasFiltersApplied ? (
            <>
              {/* Reset Filters Button */}
              <Link
                href="/all-services"
                className="px-6 py-2.5 sm:py-3 bg-brand-raiden-600 text-white rounded-lg font-medium hover:bg-brand-raiden-700 transition duration-200 text-sm sm:text-base"
              >
                Reset Filters
              </Link>

              {/* Browse All Services Button */}
              <Link
                href="/services"
                className="px-6 py-2.5 sm:py-3 border-2 border-brand-raiden-600 text-brand-raiden-600 rounded-lg font-medium hover:bg-brand-raiden-50 transition duration-200 text-sm sm:text-base"
              >
                Browse All Categories
              </Link>
            </>
          ) : (
            <>
              {/* Browse Categories Button */}
              <Link
                href="/services"
                className="px-6 py-2.5 sm:py-3 bg-brand-raiden-600 text-white rounded-lg font-medium hover:bg-brand-raiden-700 transition duration-200 text-sm sm:text-base"
              >
                Browse Categories
              </Link>

              {/* Home Button */}
              <Link
                href="/"
                className="px-6 py-2.5 sm:py-3 border-2 border-brand-raiden-600 text-brand-raiden-600 rounded-lg font-medium hover:bg-brand-raiden-50 transition duration-200 text-sm sm:text-base"
              >
                Go to Home
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
