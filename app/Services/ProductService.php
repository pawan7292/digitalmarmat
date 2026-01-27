<?php
namespace App\Services;

use Modules\Product\app\Models\Product;
use App\Models\Productmeta;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Modules\GlobalSetting\app\Models\Language;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductService
{
public function getProducts(Request $request)
{
    $languageId = $this->resolveLanguage();
    $cityUserIds = $this->resolveCityUsers($request);
    $branchServiceIds = $this->resolveNearbyServices($request);

    $query = $this->baseProductQuery($languageId);
    return response()->json([
        'success' => true,
        'data' => $query->paginate(9)
    ]);
    // // Base query
    // $query = Product::with([
    //     'category:id,name', // Category
    //     'userDetail:id,user_id,city,state,country', // Location
    //     'ratings' => fn($q) => $q->where('parent_id', 0), // Ratings
    //     'meta' => fn($q) => $q->whereIn('source_key', ['product_image', 'Fixed', 'Minitue', 'Minute', 'Squre-metter', 'Hourly', 'Squre-Feet'])
    // ])
    // ->where('source_type', 'service')
    // ->where('status', 1)
    // ->where('verified_status', 1)
    // ->where('language_id', $languageId)
    // ->whereNull('deleted_at');

    // Apply filters
    if ($branchServiceIds) $query->whereIn('id', $branchServiceIds);
    if ($request->filled('category_id')) $query->where('source_category', $request->category_id);
    if ($request->filled('keywords')) $query->where('source_name', 'like', "%{$request->keywords}%");
    if ($cityUserIds) $query->whereIn('user_id', $cityUserIds);

    // Pagination
    $products = $query->paginate(9);

    // Transform for full API response
    $products->getCollection()->transform(function ($product) {
        return [
            'id' => $product->id,
            'slug' => $product->slug,
            'name' => $product->source_name,
            'category' => $product->category?->name,
            'price' => $product->meta->whereIn('source_key', ['Fixed', 'Minitue', 'Minute', 'Squre-metter', 'Hourly', 'Squre-Feet'])->pluck('source_Values')->first(),
            'image' => $product->meta->where('source_key', 'product_image')->pluck('source_Values')->first(),
            'location' => $product->userDetail?->showaaddress(),
            'average_rating' => $product->ratings->avg('rating')
        ];
    });

    return response()->json([
        'success' => true,
        'data' => $products
    ]);
}

    private function baseProductQuery(int $languageId)
    {
        return Product::select(
                'products.id',
                'products.user_id',
                'products.slug',
                'products.source_name',
                DB::raw('ROUND(AVG(ratings.rating),1) as average_rating')
            )
            ->join('categories', 'products.source_category', '=', 'categories.id')
            ->leftJoin('ratings', 'products.id', '=', 'ratings.product_id')
            ->where([
                'products.status' => 1,
                'products.verified_status' => 1,
                'products.source_type' => 'service',
                'products.language_id' => $languageId,
            ])
            ->whereNull('products.deleted_at')
            ->groupBy(
                'products.id',
                'products.user_id',
                'products.slug',
                'products.source_name'
            );
    }
    private function resolveCityUsers(Request $request): array
{
    if (!$request->filled('city')) {
        return [];
    }

    $cityName = explode(' - ', $request->city)[0];

    $cityId = DB::table('cities')->where('name', $cityName)->value('id');

    if (!$cityId) {
        return [];
    }

    return DB::table('user_details')
        ->where('city', $cityId)
        ->pluck('user_id')
        ->toArray();
}
    private function resolveNearbyServices(Request $request): array
{
    if (!$request->filled(['lat', 'lang'])) {
        return [];
    }

    $radius = DB::table('global_settings')
        ->where('key', 'milesradious')
        ->value('value');

    $branches = DB::select("
        SELECT id
        FROM branches
        WHERE (ST_Distance_Sphere(
            point(lang, lat),
            point(?, ?)
        ) * 0.000621371192) <= ?
    ", [$request->lang, $request->lat, $radius]);

    $branchIds = collect($branches)->pluck('id');

    return DB::table('service_branches')
        ->whereIn('branch_id', $branchIds)
        ->pluck('service_id')
        ->unique()
        ->toArray();
}
    private function resolveLanguage(): int
    {
        if (Auth::check()) {
            return Auth::user()->user_language_id ?? 1;
        }

        if ($lang = Cookie::get('languageId')) {
            return $lang;
        }

        return Language::where('is_default', 1)
            ->value('id') ?? 1;
    }
    private function applyFilters($query, Request $request, array $cityUsers, array $branchServices): void
    {
        if ($branchServices) {
            $query->whereIn('products.id', $branchServices);
        }

        if ($request->filled('category_id')) {
            $query->where('products.source_category', $request->category_id);
        }

        if ($request->filled('keywords')) {
            $query->where('products.source_name', 'like', "%{$request->keywords}%");
        }

        if ($cityUsers) {
            $query->whereIn('products.user_id', $cityUsers);
        }
    }
}
?>