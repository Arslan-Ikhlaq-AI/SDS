<?php

use App\Models\Property;
use Database\Seeders\PropertySeeder;

test('the property seeder can run again without duplicating listings', function () {
    $this->seed(PropertySeeder::class);
    $this->seed(PropertySeeder::class);

    expect(Property::count())->toBe(2)
        ->and(Property::query()->featured()->count())->toBe(2)
        ->and(Property::query()->published()->count())->toBe(2)
        ->and(Property::query()->pluck('reference')->all())->toContain('SDS-1001', 'SDS-1002');
});

test('the property seeder does not undo changes made in the admin panel', function () {
    $this->seed(PropertySeeder::class);
    Property::query()->where('reference', 'SDS-1001')->sole()->update(['title' => 'Edited title']);
    Property::query()->where('reference', 'SDS-1002')->sole()->delete();

    $this->seed(PropertySeeder::class);

    expect(Property::query()->pluck('title')->all())->toBe(['Edited title']);
});
