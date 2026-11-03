<?php

use Inertia\Testing\AssertableInertia as Assert;

test('every page shares the public business details and keeps the private ones server side', function () {
    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('site.name', config('site.name'))
            ->where('site.phone', config('site.phone'))
            ->where('site.email', config('site.email'))
            ->where('site.url', url('/'))
            ->has('site.property_categories', 3)
            ->has('site.property_categories.0.types')
            ->missing('site.enquiries_email')
            ->missing('site.reference_prefix')
        );
});
