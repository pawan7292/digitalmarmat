<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;

use App\Models\User;
use App\Models\UserDetail;
use Modules\Communication\app\Models\OtpSetting;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    public function register (Request $request)
    {

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'phone_number' => 'required',
        ]);
        return DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->first_name . " " . $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'user_type' => 3,
                'status' => 0,
            ]);

            UserDetail::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'mobile_number' => $request->phone_number
            ]);

            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            $otp_settings = OtpSetting::updateOrCreate(
                ['email' => $request->email],
                [
                    'otp' => $otp,
                    'expires_at' => now()->addMinutes(15),
                ]
            );

            Mail::to($user->email)->send(new OtpMail($otp));

            return response()->json([
                'message' => 'Check Your email for OTP',
                'time_now' => now(),
                'time_till' => $otp_settings->expires_at
            ]);
        });
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $otp_record = OtpSetting::where('email', $request->email)
                    ->where('otp', $request->otp)
                    ->where('expires_at', '>', now())
                    ->first();

        if (!$otp_record) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }
        $user = User::where('email', $request->email)->first();
        $user->update(['status' => 1, 'email_verified_at' => now()]);

        OtpSetting::where('email', $request->email)->delete();

        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
    }

        // Check if account is active
        if ($user->status != 1) {
            return response()->json([
                'message' => 'Your account is inactive. Verify Email.'
            ], 403);
        }

        // Create token (no expiry by default)
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
