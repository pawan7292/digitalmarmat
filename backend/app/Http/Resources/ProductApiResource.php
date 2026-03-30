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

            'brand' => $this->brand,
            'model' => $this->model,
            'capacity' => $this->capacity,
            'warranty' => $this->warranty,
            'images' => $this->images,
            'price' => $this->source_price,
            'discount' => $this->discount_percent,
            'seo_description' => $this->seo_description,
            'seo_title' => $this->seo_title,

        ];
    }
}
