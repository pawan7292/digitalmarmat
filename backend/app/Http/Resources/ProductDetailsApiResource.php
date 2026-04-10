<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailsApiResource extends JsonResource
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
            'source_code' => $this->source_code,

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
            'specification' => $this->specs,
            'images' => $this->images,
            'description' => $this->source_description,
            'price' => $this->source_price,
            'stock' => $this->source_stock,
            'popular' => $this->popular,
            'warranty' => $this->warranty,
            'images' => $this->images,
            'discount' => $this->discount_percent,
            'seo_description' => $this->seo_description,
            'seo_title' => $this->seo_title,
            'seo_tags' => $this->seo_tags,
        ];
    }
}
