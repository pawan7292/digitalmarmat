<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductApiResource extends JsonResource
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
            'views' => $this->views,
            'slug' => $this->slug,
            'category' => $this->category?->name,
            'category_id' => $this->source_category,
            'price_type' => $this->price_type,
            'price' => $this->price,
            'location' => $this->location,
            'images' => $this->images,
            'seo_description' => $this->seo_description,
            'seo_title' => $this->seo_title,
            'seo_tags' => $this->tags,
        ];
    }
}
