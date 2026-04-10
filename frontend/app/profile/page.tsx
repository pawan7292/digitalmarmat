export const dynamic = "force-dynamic";

import { getUserBookings } from "@/lib/fetches/profile";
import { Card, CardContent } from "@/components/ui/card";
import { getUserData } from "@/lib/fetches/user";
import { UserType } from "@/lib/types/user";


function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  );
}

export default async function ProfileDashboard() {
  const returnedBookings = await getUserBookings({});
  const userDetails: UserType = await getUserData();
  console.log(userDetails);
  const summary = returnedBookings?.summary || {
    total_bookings: "",
    completed_bookings: "",
    upcoming_bookings: "",
    total_spent: "",
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div>Hello, {userDetails.name}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bookings" value={summary?.total_bookings} />
        <StatCard label="Completed" value={summary?.completed_bookings} />
        <StatCard label="Upcoming" value={summary?.upcoming_bookings} />
        <StatCard label="Total Spent" value={`₹ ${summary?.total_spent}`} />
      </div>
    </div>
  );
}
