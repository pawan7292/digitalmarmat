<?php

namespace App\Http\Controllers;

use App\Models\Branches;
use Illuminate\Http\Request;
use App\Http\Resources\BranchesResources;
use App\Models\Bookings;

class CustomerBookingApiController extends Controller
{
    public function getBranches()
    {
        $branches = Branches::whereNull('deleted_at')->get();

        return BranchesResources::collection($branches);

    }

    public function checkSlots(Request $request)
    {
        return response()->json([
            'message' => "this api is not made"
        ]);
    }

    public function bookService(Request $request)
    {
        $user = auth()->user();

        $bookings = Bookings::create([
            'order_id' => 'ORD-' . strtoupper(uniqid()),
            'product_id' => $request->product_id,
            'branch_id' => $branch_id,
            'slot_id' => $request->slot_id,
            'bookings_date' => $request->bookings_date,
            'notes' => $request->notes,
            'booking_status' => 1, //Pending
            
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'user_email' => $request->user_email,
            'user_phone' => $request->user_phone,
            'user_city' => $request->user_city,
            'user_state' => $request->user_state,
            'user_address' => $request->user_address,
            'user_postal' => $user->postal,

            'payment_type' => 5, //Cash on Delivery
            'payment_status' => 1, //Unpaid 2 is paid
            'service_amount' => $request->service_amount,
            'amount_tax' => $request->amount_tax,
            'total_amount' => $request->total_amount,

            'created_by' => $user->id

        ]);
        return response()->json([
            'message' => 'Service booked',
            'booking_id' => $bookings->id,
            'order_id' => $booking->order_id,
        ]);
    }
}
