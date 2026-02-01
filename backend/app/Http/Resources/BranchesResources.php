<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchesResources extends JsonResource
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
            'branch_name' => $this->branch_name,
            'branch_mobile' => $this->branch_mobile,
            'branch_address' => $this->branch_address,
            'branch_image' => "https://digitalmarmat.com/storage/branch/" . $this->branch_image,
        ];
    }
}
