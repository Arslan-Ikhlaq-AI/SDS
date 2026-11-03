<?php

namespace App\Models;

use App\Enums\EnquiryRole;
use App\Enums\EnquirySource;
use Database\Factories\EnquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property EnquirySource $source
 * @property int|null $property_id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property EnquiryRole|null $role
 * @property string|null $message
 * @property string|null $property_type
 * @property string|null $city
 * @property int|null $bedrooms
 * @property int|null $bathrooms
 * @property int|null $budget
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Property|null $property
 */
#[Fillable([
    'source',
    'property_id',
    'name',
    'email',
    'phone',
    'role',
    'message',
    'property_type',
    'city',
    'bedrooms',
    'bathrooms',
    'budget',
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
            'role' => EnquiryRole::class,
            'bedrooms' => 'integer',
            'bathrooms' => 'integer',
            'budget' => 'integer',
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
}
