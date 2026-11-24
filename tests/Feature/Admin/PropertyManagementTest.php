<?php

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->admin()->create());
});

/**
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function propertyInput(array $overrides = []): array
{
    return [
        'title' => 'Al Nahda Two Bedroom',
        'status' => 'for-rent',
        'category' => 'residential',
        'type' => 'Apartment',
        'location' => 'Al Nahda, Dubai',
        'is_published' => false,
        ...$overrides,
    ];
}

test('a property can be added as each listing type and stays off the website', function (string $status) {
    $this->post(route('admin.properties.store'), propertyInput(['status' => $status]))
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.properties.index'));

    $property = Property::query()->sole();

    expect($property)
        ->status->toBe(PropertyStatus::from($status))
        ->is_published->toBeFalse()
        ->reference->toBe('SDS-1001')
        ->slug->toBe('al-nahda-two-bedroom');

    $this->get(route('properties.index'))
        ->assertInertia(fn (Assert $page) => $page->has('properties.data', 0));
    $this->get(route('properties.show', $property))->assertNotFound();
})->with(['management', 'for-rent', 'for-sale']);

test('a property added with photos can be shown on the website straight away', function () {
    $this->post(route('admin.properties.store'), propertyInput([
        'is_published' => true,
        'highlights' => "Sea view\r\n\r\n  Near metro  ",
        'features' => 'Gym',
        'photos' => [UploadedFile::fake()->image('front.jpg'), UploadedFile::fake()->image('back.png')],
    ]))->assertSessionHasNoErrors();

    $property = Property::query()->sole();

    expect($property->highlights)->toBe(['Sea view', 'Near metro'])
        ->and($property->features)->toBe(['Gym'])
        ->and($property->images)->toHaveCount(2)
        ->each->toStartWith('/storage/properties/');

    foreach ($property->images as $image) {
        Storage::disk('public')->assertExists(str($image)->after('/storage/')->toString());
    }

    $this->get(route('properties.show', $property))->assertOk();
});

test('references and slugs do not clash with existing properties', function () {
    Property::factory()->create(['reference' => 'SDS-1041', 'slug' => 'al-nahda-two-bedroom']);

    $this->post(route('admin.properties.store'), propertyInput())->assertSessionHasNoErrors();

    expect(Property::query()->latest('id')->first())
        ->reference->toBe('SDS-1042')
        ->slug->toBe('al-nahda-two-bedroom-2');
});

test('the required details must be filled in', function () {
    $this->post(route('admin.properties.store'), [])
        ->assertSessionHasErrors(['title', 'status', 'category', 'type', 'location', 'is_published']);

    expect(Property::count())->toBe(0);
});

test('invalid details are refused', function (array $input, string $field, string $message) {
    Property::factory()->create(['reference' => 'SDS-5000']);

    $this->post(route('admin.properties.store'), propertyInput($input))
        ->assertSessionHasErrors([$field => $message]);

    expect(Property::count())->toBe(1);
})->with([
    'type from another category' => [['type' => 'Warehouses'], 'type', 'Please choose a type that belongs to this category.'],
    'reference in use' => [['reference' => 'SDS-5000'], 'reference', 'The reference has already been taken.'],
    'map link that is not a web address' => [['map_url' => 'javascript:alert(1)'], 'map_url', 'Please paste a full link starting with https://.'],
    'shown without a photo' => [['is_published' => true], 'photos', 'Add at least one photo before showing this property on the website.'],
    'file that is not a photo' => [fn () => ['photos' => [UploadedFile::fake()->create('page.php', 10, 'text/php')]], 'photos.0', 'Photos must be JPG, PNG or WebP images.'],
    'photo that is too large' => [fn () => ['photos' => [UploadedFile::fake()->image('big.jpg')->size(9000)]], 'photos.0', 'Each photo must be 8 MB or smaller.'],
    'image path that was never uploaded' => [['kept_images' => ['/storage/other.jpg']], 'kept_images.0', 'The selected kept_images.0 is invalid.'],
]);

test('editing keeps, reorders, adds and removes photos', function () {
    $kept = '/storage/'.UploadedFile::fake()->image('kept.jpg')->store('properties', 'public');
    $removed = '/storage/'.UploadedFile::fake()->image('removed.jpg')->store('properties', 'public');
    $bundled = '/images/properties/marquis-insignia/bedroom.webp';
    $property = Property::factory()->create([
        'slug' => 'shared-link',
        'reference' => 'SDS-1050',
        'images' => [$bundled, $removed, $kept],
    ]);

    $this->put(route('admin.properties.update', $property), propertyInput([
        'status' => 'management',
        'category' => 'commercial',
        'type' => 'Offices',
        'is_published' => true,
        'kept_images' => [$kept, $bundled],
        'photos' => [UploadedFile::fake()->image('new.jpg')],
    ]))->assertSessionHasNoErrors();

    $property->refresh();

    expect($property)
        ->title->toBe('Al Nahda Two Bedroom')
        ->slug->toBe('shared-link')
        ->reference->toBe('SDS-1050')
        ->status->toBe(PropertyStatus::Management)
        ->category->toBe(PropertyCategory::Commercial)
        ->and($property->images)->toHaveCount(3)
        ->and(array_slice($property->images, 0, 2))->toBe([$kept, $bundled]);

    Storage::disk('public')->assertMissing(str($removed)->after('/storage/')->toString());
    Storage::disk('public')->assertExists(str($kept)->after('/storage/')->toString());
});

test('deleting a property deletes its uploaded photos', function () {
    $photo = UploadedFile::fake()->image('photo.jpg')->store('properties', 'public');
    $property = Property::factory()->create(['images' => ['/storage/'.$photo]]);

    $this->delete(route('admin.properties.destroy', $property))
        ->assertRedirect(route('admin.properties.index'));

    $this->assertModelMissing($property);
    Storage::disk('public')->assertMissing($photo);
});

test('a property can be shown on the website and hidden again', function () {
    $property = Property::factory()->unpublished()->create();

    $this->put(route('admin.properties.published.update', $property), ['is_published' => true])
        ->assertSessionHasNoErrors();
    $this->get(route('properties.show', $property))->assertOk();

    $this->put(route('admin.properties.published.update', $property), ['is_published' => false])
        ->assertSessionHasNoErrors();
    $this->get(route('properties.show', $property))->assertNotFound();
});

test('a property without photos cannot be switched on', function () {
    $property = Property::factory()->unpublished()->create(['images' => []]);

    $this->put(route('admin.properties.published.update', $property), ['is_published' => true])
        ->assertSessionHasErrors(['is_published' => 'Add at least one photo before showing this property on the website.']);

    expect($property->refresh()->is_published)->toBeFalse();
});

test('the list includes hidden properties and can be filtered by listing type', function () {
    Property::factory()->create();
    $managed = Property::factory()->unpublished()->create(['status' => PropertyStatus::Management]);

    $this->get(route('admin.properties.index'))
        ->assertInertia(fn (Assert $page) => $page->has('properties.data', 2));

    $this->get(route('admin.properties.index', ['status' => 'management']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('properties.data', 1)
            ->where('properties.data.0.id', $managed->id)
            ->where('properties.data.0.status_label', 'Management')
        );
});
