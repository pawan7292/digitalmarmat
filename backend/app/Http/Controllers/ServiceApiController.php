<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceDetailResource;
use App\Http\Resources\CategoryResource;
use Modules\Product\app\Models\Product;
use Modules\Product\app\Models\Category;
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
                ->withCount('bookings')
                ->with([
                    'images',
                    'user.detail.cityRelation.state.country',
                    'subcategory',
                    'category'
                ])
                ->whereHas('user.detail.cityRelation.state.country')
                ->whereHas('category')
                ->where('source_type', "service")
                ->withAvg('ratings as avg_rating', 'rating')
                //filters
                ->filterName(request('name'))
                ->filterCategory(request('category'))
                ->filterSubCategory(request('subcategory'))
                ->filterLocation(request('location'))
                ->filterPrice(request('min_price'), request('max_price'))
                //sort
                ->sort(request('sort'))
                //paginate
                ->paginate(9)
                ->withQueryString();
        
        return ServiceResource::collection($products);
    }

    public function getServiceCategories()
    {
        $categories = Category::whereHas('products', function ($q) {
                $q->where('source_type', 'service');
            })
            ->withCount(['products as services_count' => function ($q) {
                $q->where('source_type', 'service');
            }])
            ->get();

        return CategoryResource::collection($categories);
    }

    public function getLocations()
    {
        $locations = Product::where('source_type', 'service')
            ->with('user.detail.cityRelation.state.country')
            ->get()
            ->map(function ($product) {
                $city    = $product->user?->detail?->cityRelation?->name;
                $state   = $product->user?->detail?->cityRelation?->state?->name;
                $country = $product->user?->detail?->cityRelation?->state?->country?->name;

                return [
                    'city'    => $city,
                    'state'   => $state,
                    'country' => $country,
                ];
            })
            ->filter(function ($loc) {
                // Keep only if at least one of city, state, country is not null
                return $loc['city'] || $loc['state'] || $loc['country'];
            })
            ->unique() // remove duplicates
            ->values();

        return response()->json([
            'locations' => $locations
        ]);
    }

    public function getPriceRange()
    {
        $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];

        $minPrice = Product::where('source_type', 'service')
            ->whereHas('meta', function ($q) use ($priceKeys) {
                $q->whereIn('source_key', $priceKeys)
                ->whereNull('deleted_at');
            })
            ->with('meta')
            ->get()
            ->pluck('meta')
            ->flatten()
            ->whereIn('source_key', $priceKeys)
            ->pluck('source_Values')
            ->map(fn($v) => (float) $v)
            ->min();

        $maxPrice = Product::where('source_type', 'service')
            ->whereHas('meta', function ($q) use ($priceKeys) {
                $q->whereIn('source_key', $priceKeys)
                ->whereNull('deleted_at');
            })
            ->with('meta')
            ->get()
            ->pluck('meta')
            ->flatten()
            ->whereIn('source_key', $priceKeys)
            ->pluck('source_Values')
            ->map(fn($v) => (float) $v)
            ->max();

        return response()->json([
            'min_price' => $minPrice,
            'max_price' => $maxPrice
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::withPrice()
            ->withCategory()
            ->withCount('bookings')
            ->with([
                'images',
                'user.detail.cityRelation.state.country',
                'slots',
            ])
            ->where('slug', $slug)
            ->whereHas('user.detail.cityRelation.state.country')
            ->whereHas('category')
            ->withAvg('ratings as avg_rating', 'rating')
            ->firstOrFail();

        // increment views safely
        $product->increment('views');

        return new ServiceDetailResource($product);
    }

    public function getSubCategories (String $slug) {
        $category = Category::where('slug', $slug)->firstOrFail();
        $sub_categories = Category::select('id', 'name', 'description', 'image', 'icon', 'slug')->where('parent_id', $category->id)->get();
        return response()->json([
            'sub_categories' => $sub_categories
        ]);
    }
}
