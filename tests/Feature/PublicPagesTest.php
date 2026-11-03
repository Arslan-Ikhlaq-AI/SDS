<?php

use App\Models\Property;
use Inertia\Testing\AssertableInertia as Assert;

test('the homepage shows the three newest featured listings and the budget options', function () {
    $featured = Property::factory()->featured()->count(4)->create();
    $unfeatured = Property::factory()->create();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/home')
            ->has('featuredProperties', 3)
            ->where('featuredProperties.0.id', $featured->last()->id)
            ->where('featuredProperties', fn ($listings) => ! collect($listings)->contains('id', $unfeatured->id)
                && ! collect($listings)->contains('id', $featured->first()->id))
            ->has('budgets', 15)
            ->where('budgets.0', ['value' => 100000, 'label' => 'AED 100,000'])
        );
});

test('a static page renders its component', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'services' => ['services', 'site/services'],
    'about' => ['about', 'site/about'],
    'contact' => ['contact', 'site/contact'],
    'terms' => ['terms', 'site/terms'],
    'privacy' => ['privacy', 'site/privacy'],
]);
