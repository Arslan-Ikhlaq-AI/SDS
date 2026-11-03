<?php

namespace App\Http\Requests;

use App\Enums\EnquiryRole;
use App\Enums\EnquirySource;
use App\Enums\PropertyCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnquiryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * The "website" field is a honeypot: it is hidden from visitors, so only
     * automated submissions fill it in.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source' => ['required', Rule::enum(EnquirySource::class)],
            'property_id' => ['nullable', 'required_if:source,'.EnquirySource::Property->value, 'integer', Rule::exists('properties', 'id')],
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['required', 'string', 'max:32', 'regex:/^\+?[0-9][0-9\s()-]{6,}$/'],
            'role' => ['nullable', Rule::enum(EnquiryRole::class)],
            'message' => ['nullable', 'string', 'max:5000'],
            'property_type' => ['nullable', Rule::in(PropertyCategory::allTypes())],
            'city' => ['nullable', Rule::in(config('site.cities'))],
            'bedrooms' => ['nullable', 'integer', 'min:0', 'max:50'],
            'bathrooms' => ['nullable', 'integer', 'min:0', 'max:50'],
            'budget' => ['nullable', 'integer', 'min:0', 'max:100000000000'],
            'website' => ['prohibited'],
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
            'phone.regex' => 'Please enter a valid phone number.',
        ];
    }
}
