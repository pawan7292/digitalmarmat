import { getServiceDetail } from "@/lib/fetches/service";
import { ServiceDetailsType } from "@/lib/types/service";
import { getBranches } from "@/lib/fetches/branches";
import { BranchType } from "@/lib/types/branches";
import { UserType } from "@/lib/types/user";
import BookClient from "@/components/book/BookClient";

export default async function BookService({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [serviceData, branchesData]: [
    ServiceDetailsType,
    { branches: BranchType[]; user_details: UserType },
  ] = await Promise.all([getServiceDetail(slug), getBranches()]);

  return <BookClient branchesData={branchesData} serviceData={serviceData} />;
}
