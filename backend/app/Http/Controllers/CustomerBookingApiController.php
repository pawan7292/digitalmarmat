<?php

namespace App\Http\Controllers;

use App\Models\Branches;
use Illuminate\Http\Request;
use App\Http\Resources\BranchesResources;
use App\Http\Resources\UserDetailResource;
use App\Models\Bookings;
use App\Models\UserDetail;

class CustomerBookingApiController extends Controller
{

public function getUserBookingDashboard(Request $request)
{
    $user = auth()->user();

    // Paginated bookings (only important fields)
    $bookings = Bookings::where('user_id', $user->id)
        ->select([
            'id',
            'product_id',
            'slot_id',
            'order_id',
            'branch_id',
            'booking_date',
            'from_time',
            'to_time',
            'booking_status',
            'payment_status',
            'total_amount',
            'created_at',
        ])
        ->with([
            'branch:id,branch_name,branch_email,branch_address,branch_mobile',
            'slot:id,source_key,source_Values',
            'product:id,source_name'
        ])
        ->orderByDesc('created_at')
        ->paginate(10);

    // Dashboard stats
    $totalBookings = Bookings::where('user_id', $user->id)->count();


    $totalAmountBooked = Bookings::where('user_id', $user->id)
        ->sum('total_amount');

    $totalSpent = Bookings::where('user_id', $user->id)
        ->where('payment_status', 2) // PAID
        ->sum('total_amount');

    $upcomingBookings = Bookings::where('user_id', $user->id)
        ->whereDate('booking_date', '>=', now())
        ->count();

    $completedBookings = Bookings::where('user_id', $user->id)
        ->where('booking_status', 6) // completed
        ->count();

    return response()->json([
        'summary' => [
            'total_bookings' => $totalBookings,
            'totalAmountBooked' => $totalAmountBooked,
            'total_spent' => $totalSpent,
            'upcoming_bookings' => $upcomingBookings,
            'completed_bookings' => $completedBookings,
        ],
        'bookings' => $bookings,
    ]);
}
    public function getBranches()
    {
        $user = auth()->user();

        $branches = Branches::whereNull('deleted_at')->get();

        $user_details = UserDetail::where('user_id', $user->id)
            ->with([
                'user:id,phone_number,email',
                'cityRelation.state.country'
            ])
            ->first();

        return response()->json([
            'branches' => BranchesResources::collection($branches),
            'user_details' => $user_details ?
                        new UserDetailResource($user_details) 
                        : null,
        ]);
    }

    public function checkSlots(Request $request)
    {
        $request->validate([
            'booking_date' => 'required|date',
            'slot_ids' => 'required|array',
        ]);

        // Get booked slot IDs for that date
        $bookedSlots = Bookings::where('booking_date', $request->booking_date)
            ->whereIn('slot_id', $request->slot_ids)
            ->pluck('slot_id')
            ->toArray();

        // Build availability map
        $availability = [];

        foreach ($request->slot_ids as $slotId) {
            $availability[$slotId] = !in_array($slotId, $bookedSlots);
        }

        return response()->json([
            'date' => $request->booking_date,
            'slots' => $availability
        ]);
    }

    public function bookService(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'slot_id' => 'required',
            'booking_date' => 'required',
            
            'branch_id' => 'required',

            'first_name' => 'required',
            'last_name' => 'required',
            'user_email' => 'required',
            'user_phone' => 'required',
            'user_city' => 'required',
            'user_state' => 'required',
            'user_address' => 'required',
            'user_postal' => 'required',

            'notes' => 'required',

            'service_amount' => 'required',
            'amount_tax' => 'required',
            'total_amount' => 'required',
        ]);


        $user = auth()->user();

        $slotTaken = Bookings::where('slot_id', $request->slot_id)
            ->where('booking_date', $request->booking_date)
            ->exists();

        if ($slotTaken) {
            return response()->json([
                'message' => 'This slot is already booked for the selected date'
            ], 422);
        }
        $bookings = Bookings::create([
            'order_id' => 'ORD-' . strtoupper(uniqid()),
            'product_id' => $request->product_id,
            'branch_id' => $request->branch_id,
            'slot_id' => $request->slot_id,
            'booking_date' => $request->booking_date,
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
            'order_id' => $bookings->order_id,
        ]);
    }
}
