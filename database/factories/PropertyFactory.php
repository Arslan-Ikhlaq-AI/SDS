<?php

namespace Database\Factories;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = rtrim(fake()->unique()->sentence(3), '.');

        return [
            'slug' => Str::slug($title),
            'reference' => 'SDS-'.fake()->unique()->numberBetween(2000, 9999),
            'title' => Str::title($title),
            'status' => PropertyStatus::ForSale,
            'category' => PropertyCategory::Residential,
            'type' => 'Apartment',
            'price' => fake()->numberBetween(500_000, 5_000_000),
            'size_sqft' => fake()->numberBetween(400, 4000),
            'bedrooms' => fake()->numberBetween(1, 5),
            'location' => 'Dubai',
            'images' => ['/images/properties/marquis-insignia/bedroom.webp'],
            'is_featured' => false,
        ];
    }

    /**
     * Indicate that the listing is shown on the homepage.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the listing is available to rent.
     */
    public function forRent(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => PropertyStatus::ForRent,
        ]);
    }

    /**
     * Indicate that the listing does not publish a price.
     */
    public function priceOnRequest(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => null,
        ]);
    }

    /**
     * Indicate that the listing is an off-plan unit of the given type.
     */
    public function offPlan(string $type = '1 Bed Room'): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => PropertyCategory::OffPlan,
            'type' => $type,
        ]);
    }
}
