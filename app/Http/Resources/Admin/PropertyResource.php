<?php

namespace App\Http\Resources\Admin;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Property
 */
class PropertyResource extends JsonResource
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
            'slug' => $this->slug,
            'reference' => $this->reference,
            'title' => $this->title,
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'category' => $this->category->value,
            'category_label' => $this->category->label(),
            'type' => $this->type,
            'price' => $this->price,
            'price_label' => $this->price === null ? 'Price on request' : 'AED '.number_format($this->price),
            'payment_plan' => $this->payment_plan,
            'size_sqft' => $this->size_sqft,
            'land_area_sqft' => $this->land_area_sqft,
            'bedrooms' => $this->bedrooms,
            'location' => $this->location,
            'map_url' => $this->map_url,
            'summary_title' => $this->summary_title,
            'highlights' => $this->highlights ?? [],
            'features' => $this->features ?? [],
            'images' => $this->images,
            'is_published' => $this->is_published,
        ];
    }
}
