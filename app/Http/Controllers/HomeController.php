<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the homepage with the featured listings.
     */
    public function __invoke(): Response
    {
        $featuredProperties = Property::query()
            ->featured()
            ->sortedBy(null)
            ->limit(3)
            ->get();

        return Inertia::render('site/home', [
            'featuredProperties' => PropertyResource::collection($featuredProperties)->resolve(),
            'budgets' => Property::budgetOptions(),
        ]);
    }
}
