<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'mobile_number' => $this->mobile_number,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'address' => $this->address,
            'postal_code' => $this->postal_code,
            'currency_code' => $this->currency_code,

            // email and phone
            'phone_number' => $this->user->phone_number,
            'email' => $this->user->email,

            // Address
            'city' => $this->cityRelation?->name,
            'state' => $this->cityRelation?->state?->name,
            'country' => $this->cityRelation?->state?->country->name,
        ];
    }
}
