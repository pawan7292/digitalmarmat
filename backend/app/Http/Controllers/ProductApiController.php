<?php

namespace App\Http\Controllers;

use Modules\Product\app\Models\Product;
use App\Http\Resources\ProductApiResource;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    public function index() {
        $products = Product::withPrice()
                ->withCategory()
                ->withCount('bookings')
                ->with([
                    'images',
                    'user.detail.cityRelation.state.country',
                ])
                ->whereHas('user.detail.cityRelation.state.country')
                ->whereHas('category')
                ->where('source_type', "product")
                //filters
                ->filterName(request('name'))
                ->filterCategory(request('category'))
                ->filterLocation(request('location'))
                ->filterPrice(request('min_price'), request('max_price'))
                //sort
                ->sort(request('sort'))
                //paginate
                ->paginate(9)
                ->withQueryString();

        return ProductApiResource::collection($products);

    }
}
