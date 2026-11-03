<?php

namespace App\Models;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use Database\Factories\PropertyFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property string $reference
 * @property string $title
 * @property PropertyStatus|null $status
 * @property PropertyCategory $category
 * @property string $type
 * @property int|null $price
 * @property string|null $payment_plan
 * @property int|null $size_sqft
 * @property int|null $land_area_sqft
 * @property int|null $bedrooms
 * @property string $location
 * @property string|null $map_url
 * @property string|null $summary_title
 * @property list<string>|null $highlights
 * @property list<string>|null $features
 * @property list<string> $images
 * @property string|null $floor_plan_image
 * @property bool $is_featured
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'reference',
    'title',
    'status',
    'category',
    'type',
    'price',
    'payment_plan',
    'size_sqft',
    'land_area_sqft',
    'bedrooms',
    'location',
    'map_url',
    'summary_title',
    'highlights',
    'features',
    'images',
    'floor_plan_image',
    'is_featured',
])]
class Property extends Model
{
    /** @use HasFactory<PropertyFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => PropertyStatus::class,
            'category' => PropertyCategory::class,
            'price' => 'integer',
            'size_sqft' => 'integer',
            'land_area_sqft' => 'integer',
            'bedrooms' => 'integer',
            'highlights' => 'array',
            'features' => 'array',
            'images' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Budget ceilings offered in search forms, in AED.
     *
     * @return list<array{value: int, label: string}>
     */
    public static function budgetOptions(): array
    {
        $budgets = [
            100_000, 200_000, 300_000, 400_000, 500_000, 600_000, 700_000, 800_000, 900_000,
            1_000_000, 1_500_000, 2_000_000, 2_500_000, 5_000_000, 10_000_000,
        ];

        return array_map(fn (int $budget): array => [
            'value' => $budget,
            'label' => 'AED '.number_format($budget),
        ], $budgets);
    }

    /**
     * Limit the query to the listings shown on the homepage.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function featured(Builder $query): void
    {
        $query->where('is_featured', true);
    }

    /**
     * Limit the query to the listings matching the visitor's search.
     *
     * A budget only matches listings with a published price. The type filter
     * accepts either a whole category or one specific property type.
     *
     * @param  Builder<self>  $query
     * @param  array{status?: string|null, type?: string|null, max_price?: int|string|null, keyword?: string|null}  $filters
     */
    #[Scope]
    protected function matchingFilters(Builder $query, array $filters): void
    {
        $query
            ->when($filters['status'] ?? null, fn (Builder $query, string $status) => $query->where('status', $status))
            ->when($filters['type'] ?? null, function (Builder $query, string $type): void {
                $category = PropertyCategory::tryFrom($type);

                $category !== null
                    ? $query->where('category', $category)
                    : $query->where('type', $type);
            })
            ->when($filters['max_price'] ?? null, fn (Builder $query, int|string $maxPrice) => $query->where('price', '<=', (int) $maxPrice))
            ->when($filters['keyword'] ?? null, fn (Builder $query, string $keyword) => $query->whereAny(
                ['title', 'location', 'reference'],
                'like',
                "%{$keyword}%",
            ));
    }

    /**
     * Order the query by the visitor's chosen sort, keeping unpriced listings last when sorting by price.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function sortedBy(Builder $query, ?string $sort): void
    {
        match ($sort) {
            'price-low' => $query->orderByRaw('price is null')->orderBy('price')->orderByDesc('id'),
            'price-high' => $query->orderByRaw('price is null')->orderByDesc('price')->orderByDesc('id'),
            default => $query->orderByRaw('price is null')->latest()->orderByDesc('id'),
        };
    }
}
