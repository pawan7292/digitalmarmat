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
        Schema::table('categories', function (Blueprint $table) {
            // Add SEO columns after slug if they don't exist
            if (!Schema::hasColumn('categories', 'seo_title')) {
                $table->string('seo_title', 255)->nullable()->after('slug');
            }
            if (!Schema::hasColumn('categories', 'seo_description')) {
                $table->text('seo_description')->nullable()->after('seo_title');
            }
            if (!Schema::hasColumn('categories', 'seo_tags')) {
                $table->text('seo_tags')->nullable()->after('seo_description');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            if (Schema::hasColumn('categories', 'seo_title')) {
                $table->dropColumn('seo_title');
            }
            if (Schema::hasColumn('categories', 'seo_description')) {
                $table->dropColumn('seo_description');
            }
            if (Schema::hasColumn('categories', 'seo_tags')) {
                $table->dropColumn('seo_tags');
            }
        });
    }
};
