import { FaStar } from "react-icons/fa";

export default async function GetRatingStar({
  rating,
  size,
}: {
  rating: number;
  size: number;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }, (_, i) => i + 1).map((eachnumber) => {
        return (
          <FaStar
            key={eachnumber}
            color=""
            size={size}
            className="stroke-black stroke-48 text-yellow-400"
          />
        );
      })}
      {Array.from({ length: 5 - rating }, (_, i) => i + 1).map((eachnumber) => {
        return (
          <FaStar
            key={eachnumber}
            color=""
            size={size}
            className="stroke-black stroke-48 text-gray-400"
          />
        );
      })}
    </div>
  );
}
