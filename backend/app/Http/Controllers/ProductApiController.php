<?php

namespace App\Http\Controllers;

use Modules\Product\app\Models\Product;
use Modules\Product\app\Models\Category;
use App\Models\NewProduct;
use App\Http\Resources\ProductApiResource;
use App\Http\Resources\ProductDetailsApiResource;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    public function index() {
        // $products = Product::withPrice()
        //         ->withCategory()
        //         ->withCount('bookings')
        //         ->with([
        //             'images',
        //             'user.detail.cityRelation.state.country',
        //         ])
        //         ->whereHas('user.detail.cityRelation.state.country') // maybe remove this for the not getting one
        //         ->whereHas('category')
        //         ->where('source_type', "product")
        //         //filters
        //         ->filterName(request('name'))
        //         ->filterCategory(request('category'))
        //         ->filterLocation(request('location'))
        //         ->filterPrice(request('min_price'), request('max_price'))
        //         //sort
        //         ->sort(request('sort'))
        //         //paginate
        //         ->paginate(9)
        //         ->withQueryString();

        $products = NewProduct::with(
                [
                    'category',
                    'subcategory'
                ]
            )
            ->filterName(request('name'))
            ->filterCategory(request('category'))
            ->filterSubCategory(request('subcategory'))
            ->filterBrand(request('brand'))
            ->filterWarranty(request('warranty'))
            ->paginate(9);

        return ProductApiResource::collection($products);
    }

    public function show(string $slug)
    {
        $product = NewProduct::with([
                'category',
                'subcategory',
                'createdBy'
            ])
            ->where('slug', $slug)
            ->firstOrFail();
        // increment views safely
        $product->increment('popular');

        return new ProductDetailsApiResource($product);
    }

    public function getUniqueBrand () {
        $uniqueBrand = NewProduct::whereNotNull('brand')
            ->distinct()
            ->orderBy('brand')
            ->pluck('brand');

        return response()->json([
            'data' => $uniqueBrand
        ]);
    }

    public function getUniqueWarranty () {
        $uniqueWarranty = NewProduct::whereNotNull('warranty')
            ->distinct()
            ->orderBy('warranty')
            ->pluck('warranty');

        return response()->json([
            'data' => $uniqueWarranty
        ]);
    }

    public function getProductCategories()
    {
        $categories = Category::where('source_type', 'product')
                    ->where('parent_id',0)
                    ->get();
            // ->withCount(['products as services_count' => function ($q) {
            //     $q->where('source_type', 'service');
            // }])
            // ->get();

        return CategoryResource::collection($categories);
    }
}
