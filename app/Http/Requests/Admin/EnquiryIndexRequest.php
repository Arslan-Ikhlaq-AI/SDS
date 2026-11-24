<?php

namespace App\Http\Requests\Admin;

use App\Enums\EnquiryPurpose;
use App\Enums\EnquirySource;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EnquiryIndexRequest extends FormRequest
{
    /**
     * The route to redirect to when a filter in the URL is not valid.
     *
     * @var string
     */
    protected $redirectRoute = 'admin.enquiries.index';

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'state' => ['nullable', Rule::in(['new', 'handled'])],
            'purpose' => ['nullable', Rule::enum(EnquiryPurpose::class)],
            'source' => ['nullable', Rule::enum(EnquirySource::class)],
            'keyword' => ['nullable', 'string', 'max:100'],
        ];
    }
}
