<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactApiController extends Controller
{
    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        // Send email to admin
        Mail::raw(
            "New Contact Message:\n\n".
            "Name: {$contact->name}\n".
            "Email: {$contact->email}\n".
            "Phone: {$contact->phone_number}\n\n".
            "Message:\n{$contact->message}",
            function ($mail) {
                $mail->to('bipulp49@gmail.com')
                     ->subject('Digital Marmat: Contact Us message');
            }
        );

        return response()->json([
            'message' => 'Message sent successfully'
        ]);
    }
}
