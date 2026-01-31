<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceDetailResource;
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
                //filters
                ->filterName(request('name'))
                ->filterCategory(request('categoryId'))
                ->filterLocation(request('location'))
                ->filterPrice(request('min_price'), request('max_price'))
                //sort
                ->sort(request('sort'))
                //paginate
                ->paginate(9)
                ->withQueryString();
        
        return ServiceResource::collection($products);
    }

    public function show(string $slug)
    {
        $product = Product::withPrice()
            ->withCategory()
            ->withCount('bookings')
            ->with([
                'images',
                'user.detail.cityRelation.state.country',
                'slots'
            ])
            ->where('slug', $slug)
            ->whereHas('user.detail.cityRelation.state.country')
            ->whereHas('category')
            ->firstOrFail();

        // increment views safely
        $product->increment('views');

        return new ServiceDetailResource($product);
    }
}
