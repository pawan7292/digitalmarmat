import { getUserData } from "@/lib/fetches/user";

export default async function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const userDetails = await getUserData();
  console.log(userDetails)
  if (userDetails?.name) {
    return <>{children}</>;
  }
  return <>login to use</>;
}
