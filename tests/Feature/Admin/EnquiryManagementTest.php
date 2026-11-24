<?php

use App\Enums\EnquiryPurpose;
use App\Enums\EnquirySource;
use App\Models\Enquiry;
use App\Models\Property;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->admin()->create());
});

test('a request sent from the contact form appears in the list', function () {
    Mail::fake();

    $this->post(route('enquiries.store'), [
        'source' => 'contact',
        'purpose' => 'rent-out',
        'name' => 'Sara Ahmed',
        'email' => 'sara@example.com',
        'phone' => '+971501234567',
    ])->assertSessionHasNoErrors();

    $this->get(route('admin.enquiries.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/enquiries/index')
            ->has('enquiries.data', 1)
            ->where('enquiries.data.0.name', 'Sara Ahmed')
            ->where('enquiries.data.0.purpose_label', 'Rent out their property')
            ->where('enquiries.data.0.is_handled', false)
        );
});

test('the newest request is listed first', function () {
    $older = Enquiry::factory()->create(['created_at' => now()->subDay()]);
    $newer = Enquiry::factory()->create();

    $this->get(route('admin.enquiries.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('enquiries.data.0.id', $newer->id)
            ->where('enquiries.data.1.id', $older->id)
        );
});

test('requests can be filtered', function (array $filter) {
    $match = Enquiry::factory()->handled()->create([
        'name' => 'Omar Khalid',
        'source' => EnquirySource::Valuation,
        'purpose' => EnquiryPurpose::Manage,
    ]);
    Enquiry::factory()->create(['name' => 'Someone Else', 'purpose' => EnquiryPurpose::Rent]);

    $this->get(route('admin.enquiries.index', $filter))
        ->assertInertia(fn (Assert $page) => $page
            ->has('enquiries.data', 1)
            ->where('enquiries.data.0.id', $match->id)
        );
})->with([
    'state' => [['state' => 'handled']],
    'purpose' => [['purpose' => 'manage']],
    'source' => [['source' => 'valuation']],
    'keyword' => [['keyword' => 'Khalid']],
]);

test('only new requests are listed under new', function () {
    Enquiry::factory()->handled()->create();
    $new = Enquiry::factory()->create();

    $this->get(route('admin.enquiries.index', ['state' => 'new']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('enquiries.data', 1)
            ->where('enquiries.data.0.id', $new->id)
        );
});

test('an invalid filter returns to the full list', function () {
    $this->get(route('admin.enquiries.index', ['state' => 'bogus']))
        ->assertRedirect(route('admin.enquiries.index'));
});

test('a request shows everything the visitor sent', function () {
    $property = Property::factory()->create();
    $enquiry = Enquiry::factory()->for($property)->create([
        'purpose' => EnquiryPurpose::RentOut,
        'budget' => 120_000,
        'available_from' => '2026-12-01',
        'message' => 'Please call after 5pm.',
    ]);

    $this->get(route('admin.enquiries.show', $enquiry))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/enquiries/show')
            ->where('enquiry.message', 'Please call after 5pm.')
            ->where('enquiry.budget_title', 'Expected yearly rent')
            ->where('enquiry.budget_label', 'AED 120,000')
            ->where('enquiry.date_label', '1 Dec 2026')
            ->where('enquiry.property.id', $property->id)
        );
});

test('a request can be marked as handled and as new again', function () {
    $enquiry = Enquiry::factory()->create();

    $this->patch(route('admin.enquiries.update', $enquiry), ['handled' => true])->assertRedirect();
    expect($enquiry->refresh()->handled_at)->not->toBeNull();

    $this->patch(route('admin.enquiries.update', $enquiry), ['handled' => false])->assertRedirect();
    expect($enquiry->refresh()->handled_at)->toBeNull();
});
