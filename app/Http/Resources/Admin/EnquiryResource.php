<?php

namespace App\Http\Resources\Admin;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Enquiry
 */
class EnquiryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'source_label' => $this->source->label(),
            'purpose_label' => $this->purpose?->label(),
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role_label' => $this->role?->label(),
            'message' => $this->message,
            'property_type' => $this->property_type,
            'city' => $this->city,
            'area' => $this->area,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'budget_title' => $this->purpose?->budgetLabel() ?? 'Budget',
            'budget_label' => $this->budget === null ? null : 'AED '.number_format($this->budget),
            'date_title' => $this->purpose?->dateLabel() ?? 'Date',
            'date_label' => $this->available_from?->format('j M Y'),
            'property' => $this->property === null ? null : [
                'id' => $this->property->id,
                'reference' => $this->property->reference,
                'title' => $this->property->title,
            ],
            'is_handled' => $this->handled_at !== null,
            'received_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
