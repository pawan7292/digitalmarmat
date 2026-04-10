import { ConfirmBookingProps } from "@/lib/types/book";
import { Button } from "../ui/button";
import { useBookService } from "@/hooks/useBookings";
import { useRouter } from "next/navigation";

export default function ConfirmBooking({
  service,
  branches,
  branchId,
  selectedDate,
  selectedSlotId,
  userDetails,
  priceDetails,
}: ConfirmBookingProps) {
  const bookServiceMutation = useBookService();
  const router = useRouter();
  if (!branchId || !selectedSlotId || !userDetails || !priceDetails) {
    return null;
  }

  const branch = branches.find((b) => b.id === branchId);
  const slot = service.slots.find((s) => s.id === selectedSlotId);

  const handleBookingConfirmation = () => {
    bookServiceMutation.mutate(
      {
        body: {
          product_id: service.id,
          slot_id: selectedSlotId,
          booking_date: selectedDate,
          branch_id: branchId,

          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          user_email: userDetails.user_email,
          user_phone: userDetails.user_phone,
          user_city: userDetails.user_city,
          user_state: userDetails.user_state,
          user_address: userDetails.user_address,
          user_postal: userDetails.user_postal,

          notes: "Some kinda note",

          service_amount: priceDetails.service_amount,
          amount_tax: priceDetails.amount_tax,
          total_amount: priceDetails.total_amount,
        },
      },
      {
        onSuccess: () => {
          router.push("/profile/bookings");
        },
      },
    );
  };
  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8 flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Confirm Your Booking</h2>

      {/* SERVICE */}
      <div className="border rounded-xl p-4 flex flex-col gap-2">
        <div className="font-semibold text-lg">Service</div>
        <div className="flex justify-between">
          <span>Name</span>
          <span>{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Price Type</span>
          <span>{service.price_type}</span>
        </div>
      </div>

      {/* LOCATION & TIME */}
      <div className="border rounded-xl p-4 flex flex-col gap-2">
        <div className="font-semibold text-lg">Schedule</div>
        <div className="flex justify-between">
          <span>Branch</span>
          <span>{branch?.branch_name}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span>{selectedDate}</span>
        </div>
        <div className="flex justify-between">
          <span>Time</span>
          <span>
            {slot?.source_key} - {slot?.source_values}
          </span>
        </div>
      </div>

      {/* USER */}
      <div className="border rounded-xl p-4 flex flex-col gap-2">
        <div className="font-semibold text-lg">Your Details</div>
        <div className="flex justify-between">
          <span>Name</span>
          <span>
            {userDetails.first_name} {userDetails.last_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Email</span>
          <span>{userDetails.user_email}</span>
        </div>
        <div className="flex justify-between">
          <span>Phone</span>
          <span>{userDetails.user_phone}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="border rounded-xl p-4 flex flex-col gap-2">
        <div className="font-semibold text-lg">Payment Summary</div>
        <div className="flex justify-between">
          <span>Service Amount</span>
          <span>{priceDetails.service_amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (13%)</span>
          <span>{priceDetails.amount_tax}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{priceDetails.total_amount}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleBookingConfirmation}
          className="bg-green-600 hover:cursor-pointer text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
