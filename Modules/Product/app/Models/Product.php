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
            return "{$city?->name}, {$state?->name}, {$country?->name}";
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
            ->map(fn ($path) => ('https://digitalmarmat.com/storage/' . $path))
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
}
