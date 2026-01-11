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
