<?php

use App\Models\Property;
use Database\Seeders\PropertySeeder;

test('the property seeder can run again without duplicating listings', function () {
    $this->seed(PropertySeeder::class);
    $this->seed(PropertySeeder::class);

    expect(Property::count())->toBe(2)
        ->and(Property::query()->featured()->count())->toBe(2)
        ->and(Property::query()->pluck('reference')->all())->toContain('SDS-1001', 'SDS-1002');
});
