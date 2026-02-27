import { BranchType } from "@/lib/types/branches";
import { CiLocationOn, CiPhone } from "react-icons/ci";

export default function BookBranch({
  branches,
  setBranch,
  branch,
  onNext,
}: {
  branches: BranchType[];
  setBranch: React.Dispatch<React.SetStateAction<number | null>>;
  branch: number | null;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Select Branch
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b) => {
            const isSelected = branch === b.id;

            return (
              <button
                key={b.id}
                onClick={() => setBranch(b.id)}
                className={`
                group text-left rounded-xl border overflow-hidden
                transition-all duration-200
                hover:shadow-md

                ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-blue-500"
                }
              `}
              >
                {b.branch_image && (
                  <img
                    src={b.branch_image}
                    alt={b.branch_name}
                    className="w-full h-36 object-cover"
                  />
                )}

                <div className="p-4">
                  <p className="font-semibold text-gray-900 mb-2">
                    {b.branch_name}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <CiLocationOn color="red" />
                    {b.branch_address}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                    <CiPhone color="green" />
                    {b.branch_mobile}
                  </p>

                  {/* selected label */}
                  {isSelected && (
                    <div className="mt-3 text-blue-600 text-sm font-medium">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* NEXT BUTTON */}

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!branch}
          className={`
            px-6 py-2 rounded-lg font-medium transition

            ${
              branch
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
