<?php

use App\Models\Enquiry;
use App\Models\Property;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

dataset('admin requests', [
    'list requests' => ['get', fn (): string => route('admin.enquiries.index')],
    'view a request' => ['get', fn (): string => route('admin.enquiries.show', Enquiry::factory()->create())],
    'handle a request' => ['patch', fn (): string => route('admin.enquiries.update', Enquiry::factory()->create())],
    'list properties' => ['get', fn (): string => route('admin.properties.index')],
    'open the add form' => ['get', fn (): string => route('admin.properties.create')],
    'add a property' => ['post', fn (): string => route('admin.properties.store')],
    'open the edit form' => ['get', fn (): string => route('admin.properties.edit', Property::factory()->create())],
    'edit a property' => ['put', fn (): string => route('admin.properties.update', Property::factory()->create())],
    'delete a property' => ['delete', fn (): string => route('admin.properties.destroy', Property::factory()->create())],
    'publish a property' => ['put', fn (): string => route('admin.properties.published.update', Property::factory()->create())],
]);

test('guests are sent to the login page', function (string $method, Closure $url) {
    $this->call($method, $url())->assertRedirect(route('login'));
})->with('admin requests');

test('users who are not admins are refused', function (string $method, Closure $url) {
    $this->actingAs(User::factory()->create())
        ->call($method, $url())
        ->assertForbidden();
})->with('admin requests');

test('the dashboard shows the latest requests to admins', function () {
    Enquiry::factory()->handled()->create(['created_at' => now()->subDay()]);
    $latest = Enquiry::factory()->create();
    Property::factory()->create();
    Property::factory()->unpublished()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('overview.new_enquiries', 1)
            ->where('overview.total_enquiries', 2)
            ->where('overview.total_properties', 2)
            ->where('overview.published_properties', 1)
            ->where('overview.latest_enquiries.0.id', $latest->id)
        );
});

test('the dashboard keeps requests from users who are not admins', function () {
    Enquiry::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->where('overview', null));
});

test('a user cannot make themselves an admin from their profile', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => 'New Name',
        'email' => $user->email,
        'is_admin' => true,
    ])->assertSessionHasNoErrors();

    expect($user->refresh())
        ->name->toBe('New Name')
        ->is_admin->toBeFalse();
});

test('a visitor cannot register as an admin', function () {
    $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'visitor@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'is_admin' => true,
    ]);

    expect(User::query()->where('email', 'visitor@example.com')->firstOrFail()->is_admin)->toBeFalse();
});
