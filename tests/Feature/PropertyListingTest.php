<?php

use App\Models\Property;
use Inertia\Testing\AssertableInertia as Assert;

test('the listings page renders every listing with the filter options', function () {
    Property::factory()->count(2)->create();

    $this->get(route('properties.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/properties/index')
            ->has('properties.data', 2)
            ->where('properties.meta.total', 2)
            ->has('filterOptions.statuses', 2)
            ->has('filterOptions.budgets', 15)
            ->has('filterOptions.sorts', 3)
        );
});

test('listings can be filtered by status', function () {
    Property::factory()->create();
    $rental = Property::factory()->forRent()->create();

    $this->get(route('properties.index', ['status' => 'for-rent']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $rental->id)
            ->where('filters.status', 'for-rent')
        );
});

test('listings can be filtered by a whole category', function () {
    Property::factory()->create();
    $offPlan = Property::factory()->offPlan()->create();

    $this->get(route('properties.index', ['type' => 'off-plan']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $offPlan->id)
        );
});

test('listings can be filtered by one property type', function () {
    Property::factory()->create(['type' => 'Apartment']);
    $villa = Property::factory()->create(['type' => 'Villa']);

    $this->get(route('properties.index', ['type' => 'Villa']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $villa->id)
        );
});

test('a budget excludes listings over budget and listings without a price', function () {
    $affordable = Property::factory()->create(['price' => 400_000]);
    Property::factory()->create(['price' => 900_000]);
    Property::factory()->priceOnRequest()->create();

    $this->get(route('properties.index', ['max_price' => 500_000]))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $affordable->id)
        );
});

test('a keyword matches the title, location or reference', function (string $keyword) {
    $match = Property::factory()->create([
        'title' => 'Marina Gate Penthouse',
        'location' => 'Dubai Marina',
        'reference' => 'SDS-7777',
    ]);
    Property::factory()->create(['title' => 'Arjan Studio', 'location' => 'Arjan, Dubai', 'reference' => 'SDS-8888']);

    $this->get(route('properties.index', ['keyword' => $keyword]))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $match->id)
        );
})->with(['title' => 'Penthouse', 'location' => 'Marina', 'reference' => '7777']);

test('sorting by price puts listings without a price last', function () {
    $expensive = Property::factory()->create(['price' => 900_000]);
    $cheap = Property::factory()->create(['price' => 300_000]);
    $unpriced = Property::factory()->priceOnRequest()->create();

    $this->get(route('properties.index', ['sort' => 'price-low']))
        ->assertInertia(fn (Assert $page) => $page
            ->where('properties.data.0.id', $cheap->id)
            ->where('properties.data.1.id', $expensive->id)
            ->where('properties.data.2.id', $unpriced->id)
        );
});

test('the default order shows the newest listings first with unpriced listings last', function () {
    $older = Property::factory()->create();
    $unpriced = Property::factory()->priceOnRequest()->create();
    $newest = Property::factory()->create();

    $this->get(route('properties.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('properties.data.0.id', $newest->id)
            ->where('properties.data.1.id', $older->id)
            ->where('properties.data.2.id', $unpriced->id)
        );
});

test('an invalid filter sends the visitor back to the unfiltered listings', function () {
    $this->get(route('properties.index', ['status' => 'bogus']))
        ->assertRedirect(route('properties.index'))
        ->assertSessionHasErrors('status');
});

test('a listing page renders the listing found by its slug', function () {
    $property = Property::factory()->priceOnRequest()->create(['slug' => 'bin-sanad-camp']);

    $this->get(route('properties.show', $property))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/properties/show')
            ->where('property.id', $property->id)
            ->where('property.price_label', 'Price on request')
        );
});

test('an unknown listing slug is not found', function () {
    $this->get('/properties/does-not-exist')->assertNotFound();
});
