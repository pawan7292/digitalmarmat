<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogDetailsResource extends JsonResource
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
            'title' => $this->title,
            'image' => $this->image,
            'slug' => $this->slug,
            'category' => $this->categoryRelation?->name,
            'category_id' => $this->categoryRelation?->id,
            'seo_description' => $this->seo_description,
            'seo_title' => $this->seo_title,
            'seo_tags' => $this->tags,
            'description' => $this->description,
            'created_at' => $this->created_at,
        ];
    }
}
