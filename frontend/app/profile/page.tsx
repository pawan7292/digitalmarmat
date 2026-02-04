"use client";

import { useGetUserBookings } from "@/hooks/useBookings";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileDashboard() {
  const { data, isLoading } = useGetUserBookings();

  if (isLoading) return <p>Loading...</p>;

  const summary = data?.summary;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bookings" value={summary.total_bookings} />
        <StatCard label="Completed" value={summary.completed_bookings} />
        <StatCard label="Upcoming" value={summary.upcoming_bookings} />
        <StatCard label="Total Spent" value={`₹ ${summary.total_spent}`} />
      </div>
    </div>
  );
}

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
