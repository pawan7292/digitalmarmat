"use client";
import { StepType } from "@/lib/types/book";
import { BranchType } from "@/lib/types/branches";
import { ServiceType } from "@/lib/types/service";
import { UserType } from "@/lib/types/user";
import { useState } from "react";
import BookBranch from "./BookBranch";

const steps: StepType[] = [
  "branch",
  "datetime",
  "userinfo",
  "payment",
  "confirm",
];

export default function BookClient({
  serviceData,
  branchesData,
}: {
  serviceData: ServiceType;
  branchesData: { branches: BranchType[]; user_details: UserType };
}) {
  const [step, setStep] = useState<StepType>("branch");
  const [branch, setBranch] = useState<null | number>(null);
  const [slot, setSlot] = useState(null);

  const branches = branchesData?.branches || [];
  return (
    <div className="flex justify-center items-center gap-8 py-12">
      <div className="w-64 shrink-0 rounded-2xl border bg-white shadow-sm p-6">
        <div className="font-semibold text-lg mb-4">Booking Steps</div>

        <div className="flex flex-col gap-3">
          {steps.map((s, i) => {
            const active = step === s;

            // --- VALIDATION RULES ---
            const canGoToStep =
              s === "branch" ||
              (s === "datetime" && branch !== null) ||
              (s === "userinfo" && branch !== null && slot !== null) ||
              (s === "payment" && branch !== null && slot !== null) ||
              (s === "confirm" && branch !== null && slot !== null);

            return (
              <button
                key={s}
                onClick={() => {
                  if (canGoToStep) setStep(s);
                }}
                disabled={!canGoToStep}
                className={`
          text-left rounded-lg px-3 py-2 text-sm transition

          ${
            active
              ? "bg-blue-600 text-white font-medium"
              : canGoToStep
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
              >
                {i + 1}. {s.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {step === "branch" && (
          <BookBranch
            branches={branches}
            setBranch={setBranch}
            branch={branch}
            onNext={() => setStep("datetime")}
          />
        )}
      </div>
    </div>
  );
}
