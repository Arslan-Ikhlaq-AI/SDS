<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SavePropertyRequest;
use App\Http\Resources\Admin\PropertyResource;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    /**
     * Show every property, including the ones hidden from the website.
     */
    public function index(Request $request): Response
    {
        /** @var array{status?: string|null, keyword?: string|null} $filters */
        $filters = $request->validate([
            'status' => ['nullable', Rule::enum(PropertyStatus::class)],
            'keyword' => ['nullable', 'string', 'max:100'],
        ]);

        $properties = Property::query()
            ->matchingFilters($filters)
            ->latest()
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/properties/index', [
            'properties' => PropertyResource::collection($properties),
            'filters' => $filters,
            'statuses' => PropertyStatus::options(),
        ]);
    }

    /**
     * Show the form for adding a property.
     */
    public function create(): Response
    {
        return Inertia::render('admin/properties/create', $this->formOptions());
    }

    /**
     * Save a new property. It stays off the website unless the admin chose to show it.
     */
    public function store(SavePropertyRequest $request): RedirectResponse
    {
        $property = Property::create([
            ...$request->propertyAttributes(),
            'slug' => Property::uniqueSlug($request->string('title')->toString()),
            'reference' => $request->input('reference') ?? Property::nextReference(),
            'images' => $this->storePhotos($request),
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "{$property->reference} added.",
        ]);

        return to_route('admin.properties.index');
    }

    /**
     * Show the form for editing a property.
     */
    public function edit(Request $request, Property $property): Response
    {
        return Inertia::render('admin/properties/edit', [
            'property' => (new PropertyResource($property))->resolve($request),
            ...$this->formOptions(),
        ]);
    }

    /**
     * Save the changes to a property.
     *
     * The slug never changes, so links already shared keep working.
     */
    public function update(SavePropertyRequest $request, Property $property): RedirectResponse
    {
        $removedImages = array_diff($property->images, $request->keptImages());

        $property->update([
            ...$request->propertyAttributes(),
            'reference' => $request->input('reference') ?? $property->reference,
            'images' => [...$request->keptImages(), ...$this->storePhotos($request)],
        ]);

        $this->deletePhotos($removedImages);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "{$property->reference} saved.",
        ]);

        return to_route('admin.properties.index');
    }

    /**
     * Delete a property and the photos uploaded for it.
     */
    public function destroy(Property $property): RedirectResponse
    {
        $property->delete();

        $this->deletePhotos($property->images);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "{$property->reference} deleted.",
        ]);

        return to_route('admin.properties.index');
    }

    /**
     * Get the choices offered in the property form.
     *
     * @return array{statuses: list<array{value: string, label: string}>, categories: list<array{value: string, label: string, types: list<string>}>}
     */
    private function formOptions(): array
    {
        return [
            'statuses' => PropertyStatus::options(),
            'categories' => PropertyCategory::options(),
        ];
    }

    /**
     * Store the uploaded photos and get the paths they are served from.
     *
     * @return list<string>
     */
    private function storePhotos(SavePropertyRequest $request): array
    {
        /** @var list<UploadedFile> $photos */
        $photos = array_values($request->file('photos') ?? []);

        return array_map(
            fn (UploadedFile $photo): string => '/storage/'.$photo->store('properties', 'public'),
            $photos,
        );
    }

    /**
     * Delete uploaded photos, leaving the images that ship with the website in place.
     *
     * @param  array<int, string>  $images
     */
    private function deletePhotos(array $images): void
    {
        foreach ($images as $image) {
            if (Str::startsWith($image, '/storage/properties/')) {
                Storage::disk('public')->delete(Str::after($image, '/storage/'));
            }
        }
    }
}
