"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SlotsType } from "@/lib/types/service";
import { UserFormType, UserType } from "@/lib/types/user";
import { ConfirmBookings } from "./Confirm";
import ConfirmUser from "./ConfirmUser";
import Checkout from "./Checkout";
import { bookServiceAction } from "@/lib/actions/book-service";

export default function BookingPage({
  initialDate,
  initialSlot,
  allSlots,
  user_details,
  additional_infos,
}: {
  initialDate: string;
  initialSlot: number;
  allSlots: SlotsType[];
  user_details: UserType;
  additional_infos: { price: number; product_id: number; name: string };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [date, setDate] = useState(initialDate);
  const [slot, setSlot] = useState(initialSlot);

  const [user, setUser] = useState<UserFormType>({
    first_name: user_details.first_name || "",
    last_name: user_details.last_name || "",
    user_email: user_details.email || "",
    user_phone: user_details.phone_number || "",
    user_city: user_details.city || "",
    user_state: user_details.state || "",
    user_address: user_details.address || "",
    user_postal: user_details.postal_code || "",
    notes: "",
  });

  const handleConfirm = () => {
    startTransition(async () => {
      await bookServiceAction({
        product_id: additional_infos.product_id,
        slot_id: slot,
        booking_date: date,
        branch_id: 3,
        first_name: user.first_name,
        last_name: user.last_name,
        user_email: user.user_email,
        user_phone: user.user_phone,
        user_city: user.user_city,
        user_state: user.user_state,
        user_address: user.user_address,
        user_postal: user.user_postal,
        notes: user.notes,

        service_amount: Number(additional_infos.price),
        amount_tax: (13 / 100) * additional_infos.price,
        total_amount:
          Number((additional_infos.price * 13) / 100) +
          Number(additional_infos.price),
      });

      router.push("/profile/bookings");
    });
  };

  return (
    <div className="px-24 py-12 flex flex-col gap-6 items-start">
      <h1 className="text-2xl font-semibold">Confirm Booking</h1>

      <div className="flex gap-8 items-start w-full">
        {/* left */}
        <div className="flex flex-col gap-8 bg-white p-6 rounded-xl shadow flex-1">
          <ConfirmBookings
            slots={allSlots}
            selectedSlot={Number(slot)}
            date={new Date(date)}
            setDate={setDate}
            setSelectedSlot={setSlot}
          />

          <ConfirmUser user_details={user} setUser={setUser} />
        </div>

        {/* right */}
        <div className="w-1/3 sticky top-40 flex flex-col gap-6">
          <Checkout additional_infos={additional_infos} />

          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="w-full rounded-xl shadow text-center py-4 font-semibold tracking-wider 
            bg-brand-raiden-500 text-white
            hover:bg-white hover:border hover:border-brand-raiden-500 hover:text-brand-raiden-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
