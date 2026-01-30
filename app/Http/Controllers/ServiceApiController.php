<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ServiceResource;
use Modules\Product\app\Models\Product;
use App\Models\UserDetail;

class ServiceApiController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;

    }
    public function index(Request $request)
    {
        $products = Product::withPrice()
                ->withCategory()
                ->withCount('bookings')
                ->with([
                    'images',
                    'user.detail.cityRelation.state.country',
                ])
                ->whereHas('user.detail.cityRelation.state.country')
                ->whereHas('category')
                ->paginate(9);
        
        return ServiceResource::collection($products);
    }
}
