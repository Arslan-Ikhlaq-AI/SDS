<?php

namespace Database\Factories;

use App\Enums\EnquirySource;
use App\Models\Enquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Enquiry>
 */
class EnquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'source' => EnquirySource::Contact,
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => '+97150'.fake()->numerify('#######'),
            'message' => fake()->sentence(),
        ];
    }

    /**
     * Indicate that the enquiry has been dealt with.
     */
    public function handled(): static
    {
        return $this->state(fn (array $attributes) => [
            'handled_at' => now(),
        ]);
    }
}
