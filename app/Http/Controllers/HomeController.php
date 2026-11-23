<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the homepage with the budget options for the hero search.
     */
    public function __invoke(): Response
    {
        return Inertia::render('site/home', [
            'budgets' => Property::budgetOptions(),
        ]);
    }
}
