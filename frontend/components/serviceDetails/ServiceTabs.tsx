"use client";

import { ServiceRatingType } from "@/lib/types/service";
import { useState } from "react";
import GetRatingStar from "../ui/getRating";

export default function ServiceTabs({
  description,
  reviews,
  avgRating,
}: {
  description: string;
  reviews: ServiceRatingType[];
  avgRating: string;
}) {
  const [active, setActive] = useState<"description" | "reviews">(
    "description",
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto border-b pb-px sm:gap-8 [-webkit-overflow-scrolling:touch]">
        <button
          onClick={() => setActive("description")}
          className={`pb-3 text-sm font-medium transition ${
            active === "description"
              ? "border-b-2 border-brand-raiden-500 text-brand-raiden-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActive("reviews")}
          className={`pb-3 text-sm font-medium transition ${
            active === "reviews"
              ? "border-b-2 border-brand-raiden-500 text-brand-raiden-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div>
        {active === "description" && (
          <div
            className="prose prose-sm max-w-none overflow-x-auto sm:prose-base"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {active === "reviews" && (
          <div className="flex flex-col gap-6">
            {/* rating summary */}
            <div className="flex items-center gap-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {Number(avgRating).toFixed(1)}
              </div>

              <GetRatingStar size={18} rating={Number(avgRating)} />

              <div className="text-sm text-gray-500">
                {reviews.length} reviews
              </div>
            </div>

            {/* review list */}
            <div className="flex flex-col gap-6">
              {reviews.length === 0 && (
                <div className="text-gray-500">No reviews yet</div>
              )}

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b pb-4 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <GetRatingStar size={14} rating={Number(review.rating)} />

                    <div className="text-xs text-gray-500">
                      {review.review_date}
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">{review.review}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
