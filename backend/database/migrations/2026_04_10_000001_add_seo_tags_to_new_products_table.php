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
        Schema::table('new_products', function (Blueprint $table) {
            // Add seo_tags column after seo_description if it doesn't exist
            if (!Schema::hasColumn('new_products', 'seo_tags')) {
                $table->text('seo_tags')->nullable()->after('seo_description');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new_products', function (Blueprint $table) {
            if (Schema::hasColumn('new_products', 'seo_tags')) {
                $table->dropColumn('seo_tags');
            }
        });
    }
};
