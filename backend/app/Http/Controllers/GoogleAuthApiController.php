<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Google_Client;
use Exception;

class GoogleAuthApiController extends Controller
{
    public function verifyGoogleToken(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string',
            ]);

            // Initialize Google Client
            $client = new Google_Client([
                'client_id' => config('services.google.client_id'),
                'client_secret' => config('services.google.client_secret'),
            ]);

            // Verify the token
            $payload = $client->verifyIdToken($request->token);

            if (!$payload) {
                return response()->json([
                    'message' => 'Invalid Google token'
                ], 401);
            }

            $googleEmail = $payload['email'];
            $googleId = $payload['sub'];
            $firstName = $payload['given_name'] ?? 'User';
            $lastName = $payload['family_name'] ?? '';
            $name = $payload['name'] ?? $firstName;

            return DB::transaction(function () use (
                $googleEmail,
                $googleId,
                $firstName,
                $lastName,
                $name
            ) {
                // Find or create user
                $user = User::where('email', $googleEmail)->first();

                if (!$user) {
                    // Create new user
                    $user = User::create([
                        'name' => $name,
                        'email' => $googleEmail,
                        'password' => Hash::make('google_password_' . $googleId),
                        'user_type' => 3,
                        'status' => 1,
                        'email_verified_at' => now(),
                        'auth_provider_id' => $googleId,
                        'auth_provider' => 'google',
                    ]);

                    UserDetail::create([
                        'user_id' => $user->id,
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                    ]);
                } else {
                    // Update existing user's provider if not already set
                    if (!$user->auth_provider) {
                        $user->update([
                            'auth_provider_id' => $googleId,
                            'auth_provider' => 'google',
                            'status' => 1,
                            'email_verified_at' => now(),
                        ]);
                    }
                }

                // Generate Sanctum token
                $token = $user->createToken('google-auth-token')->plainTextToken;

                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => $user->load('userDetail'),
                ], 200);
            });
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Authentication failed: ' . $e->getMessage()
            ], 401);
        }
    }
}
