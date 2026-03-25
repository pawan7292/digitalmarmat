<?php

namespace App\Http\Controllers;

use Modules\Product\app\Models\Rating;
use Modules\Product\app\Models\Product;
use Illuminate\Http\Request;
use App\Models\Bookings;

class RatingApiController extends Controller
{
    public function rateService(Request $request, String $slug) {
        $request->validate([
            'review' => 'required',
            'rating' => 'required',
        ]);

        $user = auth()->user();
        $product = Product::where('slug', $slug)->firstOrFail();

        $exists = Bookings::where('product_id', $product->id)
                                ->where('user_id', $user->id)
                                ->whereIn('booking_status', [5, 6])
                                ->exists();

        if (!$exists) {
            return response()->json([
                'success' => $exists,
                'message' => "The service booking should be completed inorder to rate it"
            ]);
        }
        $rating = Rating::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'review' => $request->review,
            'rating' => $request->rating,
            'review_date' => now()
        ]);

        return response()->json([
            'success' => $exists,
        ]);
    }

    public function getAllRatings() {
        $rating = Rating::orderBy('rating', 'desc')
            ->select('id', 'rating', 'review', 'product_id', 'user_id')
            ->with([
                'product:id,source_name',
                'user:id,name'
            ])
            ->paginate(3);

        return response()->json([
            'ratings' => $rating
        ]);
    }
}
