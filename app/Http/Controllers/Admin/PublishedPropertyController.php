<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PublishedPropertyController extends Controller
{
    /**
     * Show the property on the website, or hide it.
     */
    public function update(Request $request, Property $property): RedirectResponse
    {
        $validated = $request->validate([
            'is_published' => ['required', 'boolean'],
        ]);

        $isPublished = (bool) $validated['is_published'];

        if ($isPublished && $property->images === []) {
            throw ValidationException::withMessages([
                'is_published' => 'Add at least one photo before showing this property on the website.',
            ]);
        }

        $property->update(['is_published' => $isPublished]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $isPublished
                ? "{$property->reference} is now on the website."
                : "{$property->reference} is hidden from the website.",
        ]);

        return back();
    }
}
