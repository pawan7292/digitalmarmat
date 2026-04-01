import { getServiceDetail } from "@/lib/fetches/service";
import { ServiceDetailsType } from "@/lib/types/service";
import { getBranches } from "@/lib/fetches/branches";
import { BranchType } from "@/lib/types/branches";
import { UserType } from "@/lib/types/user";
import ProtectedRoutes from "@/components/protected/ProtectedRoute";
import BookingPage from "@/components/book/BookingsPage";

export default async function BookService({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ date: string; slot: string }>;
}) {
  const { slug } = await params;
  const { date, slot } = await searchParams;

  const [serviceData, branchesData]: [
    ServiceDetailsType,
    { branches: BranchType[]; user_details: UserType },
  ] = await Promise.all([getServiceDetail(slug), getBranches()]);

  return (
    <ProtectedRoutes>
      {/* <BookClient branchesData={branchesData} serviceData={serviceData} /> */}
      <BookingPage
        initialDate={date}
        initialSlot={Number(slot)}
        allSlots={serviceData.slots}
        user_details={branchesData.user_details}
        additional_infos={{
          price: serviceData.price,
          product_id: serviceData.id,
          name: serviceData.name,
        }}
      />
    </ProtectedRoutes>
  );
}
