<?php

use App\Models\Property;
use Inertia\Testing\AssertableInertia as Assert;

test('the homepage shows the budget options for the hero search', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/home')
            ->missing('featuredProperties')
            ->has('budgets', 15)
            ->where('budgets.0', ['value' => 100000, 'label' => 'AED 100,000'])
        );
});

test('the homepage only links to featured listings that are shown on the website', function () {
    $shown = Property::factory()->featured()->create();
    Property::factory()->featured()->unpublished()->create();
    Property::factory()->create();

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page->where('featuredSlugs', [$shown->slug]));
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
