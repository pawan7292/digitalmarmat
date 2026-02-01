<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->unsignedBigInteger('language_id');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('title');
            $table->text('content')->nullable();
            $table->boolean('status')->default(1); // 1 = active, 0 = inactive
            $table->softDeletes(); // deleted_at
            $table->timestamps();

            // Foreign key constraints (optional if you want integrity)
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('pages')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};