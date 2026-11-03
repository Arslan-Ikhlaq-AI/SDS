<?php

namespace App\Http\Controllers;

use App\Enums\PropertyStatus;
use App\Http\Requests\PropertyIndexRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    /**
     * Show the listings matching the visitor's search.
     */
    public function index(PropertyIndexRequest $request): Response
    {
        /** @var array{status?: string|null, type?: string|null, max_price?: int|string|null, keyword?: string|null, sort?: string|null} $filters */
        $filters = $request->validated();

        $properties = Property::query()
            ->matchingFilters($filters)
            ->sortedBy($filters['sort'] ?? null)
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('site/properties/index', [
            'properties' => PropertyResource::collection($properties),
            'filters' => $filters,
            'filterOptions' => [
                'statuses' => [
                    ['value' => PropertyStatus::ForRent->value, 'label' => PropertyStatus::ForRent->label()],
                    ['value' => PropertyStatus::ForSale->value, 'label' => PropertyStatus::ForSale->label()],
                ],
                'budgets' => Property::budgetOptions(),
                'sorts' => [
                    ['value' => 'newest', 'label' => 'Newest first'],
                    ['value' => 'price-low', 'label' => 'Price: low to high'],
                    ['value' => 'price-high', 'label' => 'Price: high to low'],
                ],
            ],
        ]);
    }

    /**
     * Show a single listing.
     */
    public function show(Property $property): Response
    {
        return Inertia::render('site/properties/show', [
            'property' => (new PropertyResource($property))->resolve(),
        ]);
    }
}
