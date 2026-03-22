<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewProduct extends Model
{
    use HasFactory;

    // Explicitly define the table name since it's not the default "products"
    protected $table = 'new_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'source_name',
        'slug',
        'source_code',
        'source_type',
        'source_category',
        'source_subcategory',
        'brand',
        'model',
        'capacity',
        'warranty',
        'specs',
        'images',
        'source_description',
        'price_type',
        'source_price',
        'discount_percent',
        'source_stock',
        'seo_title',
        'seo_description',
        'featured',
        'popular',
        'verified_status',
        'language_id',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     * * This automatically handles JSON encoding when saving 
     * and decoding when retrieving from the database.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'specs' => 'array',
        'images' => 'array',
        'source_price' => 'decimal:2',
        'discount_percent' => 'decimal:2',
    ];

    /**
     * Helper to get discounted price
     */
    public function getFinalPriceAttribute()
    {
        if ($this->discount_percent > 0) {
            return $this->source_price - ($this->source_price * ($this->discount_percent / 100));
        }
        return $this->source_price;
    }
}

?>