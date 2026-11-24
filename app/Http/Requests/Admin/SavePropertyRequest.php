<?php

namespace App\Http\Requests\Admin;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use App\Models\Property;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class SavePropertyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $property = $this->property();

        return [
            'title' => ['required', 'string', 'max:160'],
            'reference' => ['nullable', 'string', 'max:40', Rule::unique('properties', 'reference')->ignore($property)],
            'status' => ['required', Rule::enum(PropertyStatus::class)],
            'category' => ['required', Rule::enum(PropertyCategory::class)],
            'type' => ['required', Rule::in($this->enum('category', PropertyCategory::class)?->types() ?? PropertyCategory::allTypes())],
            'price' => ['nullable', 'integer', 'min:1', 'max:100000000000'],
            'payment_plan' => ['nullable', 'string', 'max:120'],
            'size_sqft' => ['nullable', 'integer', 'min:1', 'max:100000000'],
            'land_area_sqft' => ['nullable', 'integer', 'min:1', 'max:100000000'],
            'bedrooms' => ['nullable', 'integer', 'min:0', 'max:100'],
            'location' => ['required', 'string', 'max:160'],
            'map_url' => ['nullable', 'url:http,https', 'max:255'],
            'summary_title' => ['nullable', 'string', 'max:160'],
            'highlights' => ['nullable', 'string', 'max:10000'],
            'features' => ['nullable', 'string', 'max:5000'],
            'is_published' => ['required', 'boolean'],
            'kept_images' => ['nullable', 'array'],
            'kept_images.*' => ['string', 'distinct', Rule::in($property->images ?? [])],
            'photos' => ['nullable', 'array', 'max:15'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:8192'],
        ];
    }

    /**
     * Get the checks that need more than one field.
     *
     * @return list<callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $hasPhoto = $this->keptImages() !== [] || $this->hasFile('photos');

                if ($this->boolean('is_published') && ! $hasPhoto) {
                    $validator->errors()->add('photos', 'Add at least one photo before showing this property on the website.');
                }
            },
        ];
    }

    /**
     * Get the custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'Please choose management, rent or sale.',
            'type.in' => 'Please choose a type that belongs to this category.',
            'map_url.url' => 'Please paste a full link starting with https://.',
            'photos.max' => 'Please add up to 15 photos at a time.',
            'photos.*.image' => 'Photos must be JPG, PNG or WebP images.',
            'photos.*.mimes' => 'Photos must be JPG, PNG or WebP images.',
            'photos.*.max' => 'Each photo must be 8 MB or smaller.',
            'photos.*.uploaded' => 'A photo could not be uploaded. It may be too large.',
        ];
    }

    /**
     * Get the validated columns, with the one-per-line lists split into arrays.
     *
     * @return array<string, mixed>
     */
    public function propertyAttributes(): array
    {
        return [
            ...$this->safe()->except(['reference', 'highlights', 'features', 'kept_images', 'photos']),
            'highlights' => $this->lines('highlights'),
            'features' => $this->lines('features'),
        ];
    }

    /**
     * Get the property's current images the admin kept, in their chosen order.
     *
     * @return list<string>
     */
    public function keptImages(): array
    {
        return array_values(array_filter((array) $this->input('kept_images', []), is_string(...)));
    }

    /**
     * Get the property being edited, or null when adding one.
     */
    private function property(): ?Property
    {
        $property = $this->route('property');

        return $property instanceof Property ? $property : null;
    }

    /**
     * Split a one-per-line field, dropping empty lines.
     *
     * @return list<string>
     */
    private function lines(string $field): array
    {
        $lines = array_map(trim(...), explode("\n", $this->string($field)->toString()));

        return array_values(array_filter($lines, fn (string $line): bool => $line !== ''));
    }
}
