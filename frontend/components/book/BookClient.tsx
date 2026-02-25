"use client";
import { StepType } from "@/lib/types/book";
import { BranchType } from "@/lib/types/branches";
import { ServiceType } from "@/lib/types/service";
import { UserFormType, UserType } from "@/lib/types/user";
import { useState } from "react";
import BookBranch from "./BookBranch";
import BookDate from "./BookDate";
import UserInfo from "./UserInfo";
import BookPayment from "./BookPayment";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<UserFormType | null>(null);

  const handleBookingSelection = (date: string, slotId: number) => {
    setSelectedDate(date);
    setSelectedSlotId(slotId);
    console.log("Selected Date:", date, "Slot ID:", slotId);
  };

  const branches = branchesData?.branches || [];
  return (
    <div className="flex flex-col items-center gap-12 px-18 py-12 min-h-[80vh]">
      <div className="flex w-full flex-col">
        <div className="flex text-3xl font-bold self-center">Book Service</div>
        <div className="font-bold">
          Service Name: <span className="text-red-500">{serviceData.name}</span>
        </div>
      </div>

      <div className="flex gap-8 items-center w-full">
        <div className="w-64 shrink-0 rounded-2xl border bg-white shadow-sm p-6">
          <div className="font-semibold text-lg mb-4">Booking Steps</div>

          <div className="flex flex-col gap-3">
            {steps.map((s, i) => {
              const active = step === s;
              console.log("is slot null", slot);
              // --- VALIDATION RULES ---
              const canGoToStep =
                s === "branch" ||
                (s === "datetime" && branch !== null) ||
                (s === "userinfo" &&
                  branch !== null &&
                  selectedSlotId !== null) ||
                (s === "payment" &&
                  branch !== null &&
                  selectedSlotId !== null &&
                  userDetails !== null) ||
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
        <div className="flex items-center w-full justify-center">
          {step === "branch" && (
            <BookBranch
              branches={branches}
              setBranch={setBranch}
              branch={branch}
              onNext={() => setStep("datetime")}
            />
          )}
          {step === "datetime" && (
            <BookDate
              slots={serviceData.slots}
              onBook={handleBookingSelection}
              onNext={() => setStep("userinfo")}
            />
          )}
          {step === "userinfo" && (
            <UserInfo
              user_details={branchesData.user_details}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              onNext={() => setStep("payment")}
            />
          )}
          {step === "payment" && (
            <BookPayment
              serviceData={serviceData}
              onNext={() => setStep("confirm")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
