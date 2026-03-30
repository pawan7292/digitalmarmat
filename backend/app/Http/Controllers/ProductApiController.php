<?php

namespace App\Http\Controllers;

use Modules\Product\app\Models\Product;
use Modules\Product\app\Models\Category;
use App\Models\NewProduct;
use App\Http\Resources\ProductApiResource;
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
            ->paginate(9);

        // return response()->json([
        //     'result' => $products
        // ]);
        return ProductApiResource::collection($products);
    }

    public function getProductCategories()
    {
        $categories = Category::where('source_type', 'product')->where('parent_id',0)->get();
            // ->withCount(['products as services_count' => function ($q) {
            //     $q->where('source_type', 'service');
            // }])
            // ->get();

        return CategoryResource::collection($categories);
    }
}
