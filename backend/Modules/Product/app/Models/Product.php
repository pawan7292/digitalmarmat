<?php

namespace Modules\Product\app\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ChangesHistory;
use App\Models\User;
use Modules\Product\app\Models\Rating;
use Modules\Categories\app\Models\Categories;
use App\Models\Book;
use Modules\Product\app\Models\Category;
use Modules\Product\app\Models\Productmeta;
use App\Models\Bookings;

class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'id',
        'user_id',
        'source_name',
        'slug',
        'source_code',
        'source_type',
        'source_tag',
        'source_description',
        'source_category',
        'source_subcategory',
        'source_price',
        'plan',
        'price_description',
        'source_brand',
        'source_stock',
        'seo_title',
        'tags',
        'featured',
        'popular',
        'seo_description',
        'price_type',
        'duration',
        'country',
        'state',
        'city',
        'address',
        'pincode',
        'include',
        'language_id',
        'parent_id',
        'status',
        'created_by',
        'verified_status',
        'created_at',
        'updated_at',
        'deleted_at',
        'updated_by',
        'deleted_by',
        'views'
    ];


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    public function getLocationAttribute()
    {
        $detail = $this->user?->detail;

        if (!$detail) return 'No detail';

        $city = $detail?->cityRelation;
        $state = $city?->state;
        $country = $state?->country;

        if ($city) {
            return "{$city?->name}, {$country?->name}";
        }

        return null;
    }
    
    public function category() {
        return $this->belongsTo(Category::class, 'source_category');
    }

    public function meta()
    {
        return $this->hasMany(Productmeta::class, 'product_id', 'id');
    }

    public function getPriceAttribute() {
        $map = [
            'fixed'          => 'Fixed',
            'hourly'         => 'Hourly',
            'minute'         => 'Minute',
            'squre-metter'   => 'Squre-metter',
            'square-feet'    => 'Square-feet',
        ];

        $priceType = $map[strtolower($this->price_type)] ?? 'Fixed';

        $meta = $this->meta->firstWhere('source_key', $priceType);

        return $meta?->showPrice();
    }


    public function scopeWithPrice($query)
    {
        $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];

        $returned =  $query->with(['meta' => function ($q) use ($priceKeys) {
            $q->select('product_id', 'source_key', 'source_Values')
            ->whereIn('source_key', $priceKeys)
            ->whereNull('deleted_at');
        }]);
        return $returned;
    }

    public function slots()
    {
        return $this->hasMany(Productmeta::class, 'product_id', 'id')
                ->where('source_key', "LIKE", "%slot%")
                ->whereNull('deleted_at');
    }

    public function getSlotsAttribute()
    {
        if (!$this->relationLoaded('slots')) {
            return [];
        }
        $slots = $this->getRelationValue('slots');

        return $slots
            ->map(fn ($slot) => [
                'id' => $slot->id,
                'source_key' => $slot->source_key,
                'source_values' => $slot->source_Values,
            ])
            ->values()
            ->toArray();
    }
    
    public function images()
    {
        return $this->hasMany(Productmeta::class, 'product_id', 'id')
            ->where('source_key', 'product_image')
            ->whereNull('deleted_at');
    }

    public function getImagesAttribute()
    {
        if (!$this->relationLoaded('images')) {
            return [];
        }
        $images = $this->getRelationValue('images');

        return $images
            ->pluck('source_Values')
            ->map(fn ($path) => ($path))
            ->values()
            ->toArray();
    }

    public function scopeWithCategory($query)
    {
        return $query->with('category:id,name');
    }

    
    public function ratings()
    {
        return $this->hasMany(Rating::class, 'product_id');
    }
    public function bookings()
    {
        return $this->hasMany(Bookings::class, 'product_id');
    }

    public function showproductname()
    {

        return $this->source_name;
    }

    // Filters

    public function scopeFilterName($query, $name)
    {
        if (!$name) return $query;
        
        return $query->where('source_name', 'LIKE', "%{$name}%");
    }

    public function scopeFilterCategory($query, $categoryId)
    {
        if (!$categoryId) return $query;

        return $query->where('source_category', $categoryId);
    }

    public function scopeFilterLocation($query, $location)
    {
        if (!$location) return $query;

        return $query->whereHas('user.detail.cityRelation', function ($q) use ($location) {
            $q->where('name', 'LIKE', "%{$location}%");
        });
    }

    public function scopeFilterPrice($query, $min = null, $max = null)
    {
        if (is_null($min) && is_null($max)) return $query;

        $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];

        // Join or filter meta
        return $query->whereHas('meta', function ($q) use ($priceKeys, $min, $max) {

            $q->whereIn('source_key', $priceKeys)
            ->whereNull('deleted_at');

            if (!is_null($min)) {
                $q->where('source_Values', '>=', $min);
            }
            if (!is_null($max)) {
                $q->where('source_Values', '<=', $max);
            }
        });
    }

    // sorting
    public function scopeSort($query, $sortBy)
    {
        switch ($sortBy) {
            case 'most_viewed':
                $query->orderBy('views', 'desc');
                break;

            case 'most_booked':
                $query->withCount('bookings')
                    ->orderBy('bookings_count', 'desc');
                break;

            case 'price_low':
                $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];
                $query->whereHas('meta', function($q) use ($priceKeys) {
                    $q->whereIn('source_key', $priceKeys)->whereNull('deleted_at');
                })
                ->join('products_meta as pm', function($join) use ($priceKeys) {
                    $join->on('products.id', '=', 'pm.product_id')
                        ->whereIn('pm.source_key', $priceKeys)
                        ->whereNull('pm.deleted_at');
                })
                ->orderByRaw('CAST(pm.source_Values AS DECIMAL(10,2)) ASC')
                ->select('products.*'); // important to not break Eloquent
                break;

            case 'price_high':
                $priceKeys = ['Fixed', 'Hourly', 'Minute', 'Minitue', 'Squre-metter', 'Square-feet'];
                $query->whereHas('meta', function($q) use ($priceKeys) {
                    $q->whereIn('source_key', $priceKeys)->whereNull('deleted_at');
                })
                ->join('products_meta as pm', function($join) use ($priceKeys) {
                    $join->on('products.id', '=', 'pm.product_id')
                        ->whereIn('pm.source_key', $priceKeys)
                        ->whereNull('pm.deleted_at');
                })
                ->orderByRaw('CAST(pm.source_Values AS DECIMAL(10,2)) DESC')
                ->select('products.*');
                break;

            default:
                $query->latest(); // fallback: newest first
        }

        return $query;
    }
}
