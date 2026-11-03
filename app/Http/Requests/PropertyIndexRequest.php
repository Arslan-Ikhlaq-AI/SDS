<?php

namespace App\Http\Requests;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PropertyIndexRequest extends FormRequest
{
    /**
     * The route to redirect to when a filter in the URL is not valid.
     *
     * @var string
     */
    protected $redirectRoute = 'properties.index';

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::enum(PropertyStatus::class)],
            'type' => ['nullable', Rule::in([
                ...array_column(PropertyCategory::cases(), 'value'),
                ...PropertyCategory::allTypes(),
            ])],
            'max_price' => ['nullable', 'integer', 'min:1'],
            'keyword' => ['nullable', 'string', 'max:100'],
            'sort' => ['nullable', Rule::in(['newest', 'price-low', 'price-high'])],
        ];
    }
}
