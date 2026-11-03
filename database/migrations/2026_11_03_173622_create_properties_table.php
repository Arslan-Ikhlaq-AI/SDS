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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('reference')->unique();
            $table->string('title');
            $table->string('status')->nullable()->index();
            $table->string('category')->index();
            $table->string('type')->index();
            $table->unsignedBigInteger('price')->nullable()->index();
            $table->string('payment_plan')->nullable();
            $table->unsignedInteger('size_sqft')->nullable();
            $table->unsignedInteger('land_area_sqft')->nullable();
            $table->unsignedTinyInteger('bedrooms')->nullable();
            $table->string('location');
            $table->string('map_url')->nullable();
            $table->string('summary_title')->nullable();
            $table->json('highlights')->nullable();
            $table->json('features')->nullable();
            $table->json('images');
            $table->string('floor_plan_image')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
