"use client";

import { useGetUserBookings } from "@/hooks/useBookings";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfileBookingsPage() {
  const { data, isLoading } = useGetUserBookings();

  if (isLoading) return <p>Loading bookings...</p>;

  const bookings = data?.bookings?.data ?? [];

  console.log(bookings);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking: any) => (
          <Card key={booking.id}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-medium">{booking.product?.source_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Order ID: {booking.order_id}
                </p>
                <p className="text-sm">
                  {booking.booking_date} • {booking.slot?.source_Values}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.branch?.branch_name}
                </p>
              </div>

              <div className="text-right space-y-2">
                <Badge>
                  {booking.payment_status === "1" ? "Not Paid" : "Paid"}
                </Badge>
                <p className="font-semibold">₹ {booking.total_amount}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
