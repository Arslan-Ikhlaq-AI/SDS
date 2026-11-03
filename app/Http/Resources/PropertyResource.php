<?php

namespace App\Http\Resources;

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
            'badge' => $this->status?->label() ?? $this->type,
            'status_label' => $this->status?->label(),
            'category_label' => $this->category->label(),
            'type' => $this->type,
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
            'floor_plan_image' => $this->floor_plan_image,
        ];
    }
}
