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

            'category' => optional($this->category)->only([
                'id',
                'name',
                'slug',
                'icon',
                'image',
                'description'
            ]),

            'sub_category' => optional($this->subcategory)->only([
                'id',
                'name',
                'slug',
                'icon',
                'image',
                'description'
            ]),
            'createdBy' => $this->createdBy ? [
                'name' => $this->createdBy->name,
                'email' => $this->createdBy->email,
                'phone' => $this->createdBy->phone_number,
            ] : null,
                        
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
