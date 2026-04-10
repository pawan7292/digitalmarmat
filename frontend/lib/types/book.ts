import { BranchType } from "@/lib/types/branches";
import { PriceType, ServiceDetailsType } from "@/lib/types/service";
import { UserFormType } from "@/lib/types/user";

export type StepType = "branch" | "datetime" | "userinfo" | "payment"  | "confirm";

export type ConfirmBookingProps = {
  service: ServiceDetailsType;
  branches: BranchType[];
  branchId: number | null;
  selectedDate: string | null;
  selectedSlotId: number | null;
  userDetails: UserFormType | null;
  priceDetails: PriceType | null;
};