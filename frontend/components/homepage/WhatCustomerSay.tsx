import { getAllRatings } from "@/lib/fetches/ratings";
import { RatingType } from "@/lib/types/rating";
import { FaStar } from "react-icons/fa";

export default async function   () {
  const returnedRatings = await getAllRatings();
  const ratings = returnedRatings?.ratings?.data || [];
  console.log(ratings);
  return (
    <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
      <div className="h4 text-brand-raiden-500">What customers say</div>
      <div className="flex flex-col md:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-20 justify-center flex-wrap">
        {ratings.map((eachRating: RatingType) => {
          return (
            <div
              className="flex flex-col shadow-sm gap-4 p-4 rounded-lg items-center"
              key={eachRating.id}
            >
              <div className="bodyheadingsmall font-bold text-center">
                {eachRating.product.source_name}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {Array.from(
                    { length: eachRating.rating },
                    (_, i) => i + 1,
                  ).map((eachnumber) => {
                    return (
                      <FaStar
                        key={eachnumber}
                        color=""
                        size={40}
                        className="stroke-black stroke-48 text-yellow-400"
                      />
                    );
                  })}
                </div>
                <div className="blockquote">"{eachRating.review}"</div>
                <div className="small self-end">- {eachRating.user.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
