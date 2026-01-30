<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\UserDetail;

use Illuminate\Http\Request;

class AuthApiController extends Controller
{
    public function register (Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'last_name'  => 'nullable|string',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['first_name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        UserDetail::create([
            'user_id' => $user->id,
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'] ?? null,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
