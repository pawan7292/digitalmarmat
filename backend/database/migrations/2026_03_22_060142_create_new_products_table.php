<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('new_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('source_name'); 
            $table->string('slug')->unique();
            $table->string('source_code')->unique();
            $table->string('source_type')->default('product');
            
            // Categorization
            $table->integer('source_category');
            $table->integer('source_subcategory');
            
            // New Specification Fields
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('capacity')->nullable();
            $table->string('warranty')->nullable();
            $table->json('specs')->nullable();
            $table->json('images')->nullable();
            
            // Content (Markdown compatible)
            $table->longText('source_description'); 
            
            // Pricing & Stock
            $table->string('price_type')->default('fixed');
            $table->decimal('source_price', 15, 2);
            $table->decimal('discount_percent', 5, 2)->default(0);
            $table->integer('source_stock')->default(0);
            
            // SEO
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            
            // Status & Meta
            $table->integer('featured')->default(0);
            $table->integer('popular')->default(0);
            $table->integer('verified_status')->default(1);
            $table->integer('language_id')->default(1);
            $table->integer('created_by');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_products');
    }
};
