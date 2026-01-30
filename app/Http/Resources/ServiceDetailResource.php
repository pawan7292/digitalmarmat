<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Mews\Purifier\Facades\Purifier;

class ServiceDetailResource extends JsonResource
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
            'name' => $this->source_name,
            'slug' => $this->slug,

            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],

            'price_type' => $this->price_type,
            'price' => $this->price,

            'location' => $this->location,

            'views' => $this->views,
            'bookings' => $this->bookings_count,

            'images' => $this->images,

            'include' => $this->include,
            'description' => $this->source_description,
            // SAFE HTML
            // Purifier::clean(
            //     $this->source_description,
            //     [
            //         'HTML.Allowed' => 'p,br,strong,b,em,i,ul,ol,li,h1,h2,h3,h4,hr',
            //         'CSS.AllowedProperties' => [],
            //         'Attr.EnableID' => false,
            //     ]
            // ),

            'created_at' => $this->created_at,
        ];
    }
}
