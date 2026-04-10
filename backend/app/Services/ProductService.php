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
    $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];

    $products = Product::select(
            'id',
            'source_name',
            'slug',
            'price_type',
            'source_category'
        )
        ->with('category:id,name')
        ->with(['meta' => function ($query) use ($priceKeys) {
            $query->select('product_id', 'source_key', 'source_Values')
                  ->whereIn('source_key', $priceKeys)
                  ->whereNull('deleted_at')
                  ->orderByRaw(
                      "FIELD(source_key, '" . implode("','", $priceKeys) . "')"
                  );
        }])
        ->paginate(9);

    // Attach price & remove meta
    $products->getCollection()->transform(function ($product) {
        $meta = $product->meta->first(); // already ordered by priority

        $product->price = $meta ? $meta->showPrice() : null;

        unset($product->meta); // 👈 remove meta completely
        return $product;
    });

    return $products;
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