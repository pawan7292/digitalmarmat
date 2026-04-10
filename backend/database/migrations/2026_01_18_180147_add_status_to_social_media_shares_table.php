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
            Schema::table('social_media_shares', function (Blueprint $table) {
                $table->tinyInteger('status')->default(1); // or place wherever it makes sense
            });
        }

        public function down(): void
        {
            Schema::table('social_media_shares', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
};
