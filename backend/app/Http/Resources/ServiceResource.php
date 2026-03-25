<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->source_name,
            'views' => $this->views,
            'slug' => $this->slug,
            'category' => $this->category?->only([
                            'id',
                            'name',
                            'slug',
                            'icon',
                            'image',
                            'description'
                        ]),
            'sub_category' => $this->subcategory?->only([
                            'id',
                            'name',
                            'slug',
                            'icon',
                            'image',
                            'description'
                        ]),

                                    
            'ratings' => $this->ratings,
            'avg_rating' => $this->avg_rating ?? 0,
            'price_type' => $this->price_type,
            'price' => $this->price,
            'location' => $this->location,
            'images' => $this->images,
            'bookings' => $this->bookings_count,
            'seo_description' => $this->seo_description,
            'seo_title' => $this->seo_title,
            'seo_tags' => $this->tags,
        ];
    }
}
