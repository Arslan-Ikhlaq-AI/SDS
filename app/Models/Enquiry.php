<?php

namespace App\Models;

use App\Enums\EnquiryPurpose;
use App\Enums\EnquiryRole;
use App\Enums\EnquirySource;
use Carbon\CarbonImmutable;
use Database\Factories\EnquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property EnquirySource $source
 * @property EnquiryPurpose|null $purpose
 * @property int|null $property_id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property EnquiryRole|null $role
 * @property string|null $message
 * @property string|null $property_type
 * @property string|null $city
 * @property string|null $area
 * @property int|null $bedrooms
 * @property int|null $bathrooms
 * @property int|null $budget
 * @property Carbon|null $available_from
 * @property CarbonImmutable|null $handled_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Property|null $property
 */
#[Fillable([
    'source',
    'purpose',
    'property_id',
    'name',
    'email',
    'phone',
    'role',
    'message',
    'property_type',
    'city',
    'area',
    'bedrooms',
    'bathrooms',
    'budget',
    'available_from',
])]
class Enquiry extends Model
{
    /** @use HasFactory<EnquiryFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'source' => EnquirySource::class,
            'purpose' => EnquiryPurpose::class,
            'role' => EnquiryRole::class,
            'bedrooms' => 'integer',
            'bathrooms' => 'integer',
            'budget' => 'integer',
            'available_from' => 'date',
            'handled_at' => 'datetime',
        ];
    }

    /**
     * Get the listing this enquiry is about.
     *
     * @return BelongsTo<Property, $this>
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Limit the query to the enquiries nobody has dealt with yet.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function unhandled(Builder $query): void
    {
        $query->whereNull('handled_at');
    }

    /**
     * Limit the query to the enquiries matching the admin's search.
     *
     * @param  Builder<self>  $query
     * @param  array{state?: string|null, purpose?: string|null, source?: string|null, keyword?: string|null}  $filters
     */
    #[Scope]
    protected function matchingFilters(Builder $query, array $filters): void
    {
        $query
            ->when(($filters['state'] ?? null) === 'new', fn (Builder $query) => $query->whereNull('handled_at'))
            ->when(($filters['state'] ?? null) === 'handled', fn (Builder $query) => $query->whereNotNull('handled_at'))
            ->when($filters['purpose'] ?? null, fn (Builder $query, string $purpose) => $query->where('purpose', $purpose))
            ->when($filters['source'] ?? null, fn (Builder $query, string $source) => $query->where('source', $source))
            ->when($filters['keyword'] ?? null, fn (Builder $query, string $keyword) => $query->whereAny(
                ['name', 'email', 'phone', 'message', 'area'],
                'like',
                "%{$keyword}%",
            ));
    }
}
