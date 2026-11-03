<?php

use App\Mail\EnquiryReceived;
use App\Models\Enquiry;
use App\Models\Property;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Mail;

/**
 * @return array<string, string>
 */
function validEnquiry(array $overrides = []): array
{
    return [
        'source' => 'contact',
        'name' => 'Ayesha Khan',
        'email' => 'ayesha@example.com',
        'phone' => '+971 50 123 4567',
        'role' => 'buyer',
        'message' => 'Looking for a two bedroom apartment.',
        'property_type' => 'Apartment',
        'city' => 'Dubai',
        'bedrooms' => '2',
        'budget' => '1500000',
        ...$overrides,
    ];
}

test('a contact enquiry is saved and emailed to the sales team', function () {
    Mail::fake();

    $this->from(route('contact'))
        ->post(route('enquiries.store'), validEnquiry())
        ->assertRedirect(route('contact'))
        ->assertSessionHasNoErrors();

    $enquiry = Enquiry::sole();

    expect($enquiry)
        ->name->toBe('Ayesha Khan')
        ->email->toBe('ayesha@example.com')
        ->bedrooms->toBe(2)
        ->budget->toBe(1500000);

    Mail::assertSent(EnquiryReceived::class, fn (EnquiryReceived $mail) => $mail->hasTo(config('site.enquiries_email'))
        && $mail->enquiry->is($enquiry));
});

test('a property enquiry is linked to its listing', function () {
    Mail::fake();
    $property = Property::factory()->create();

    $this->post(route('enquiries.store'), validEnquiry([
        'source' => 'property',
        'property_id' => $property->id,
    ]))->assertSessionHasNoErrors();

    expect(Enquiry::sole()->property_id)->toBe($property->id);
});

test('a property enquiry must name an existing listing', function (array $overrides) {
    Mail::fake();

    $this->post(route('enquiries.store'), validEnquiry(['source' => 'property', ...$overrides]))
        ->assertInvalid(['property_id']);

    $this->assertDatabaseCount('enquiries', 0);
    Mail::assertNothingSent();
})->with([
    'missing' => [[]],
    'unknown' => [['property_id' => 999]],
]);

test('a filled honeypot field is rejected without saving anything', function () {
    Mail::fake();

    $this->post(route('enquiries.store'), validEnquiry(['website' => 'https://spam.example']))
        ->assertInvalid(['website']);

    $this->assertDatabaseCount('enquiries', 0);
    Mail::assertNothingSent();
});

test('an enquiry with an invalid field shows the right message', function (string $field, mixed $value, string $message) {
    $this->post(route('enquiries.store'), validEnquiry([$field => $value]))
        ->assertInvalid([$field => $message]);

    $this->assertDatabaseCount('enquiries', 0);
})->with([
    'missing name' => ['name', '', 'The name field is required.'],
    'invalid email' => ['email', 'not-an-email', 'The email field must be a valid email address.'],
    'invalid phone' => ['phone', 'call me', 'Please enter a valid phone number.'],
    'unknown source' => ['source', 'robot', 'The selected source is invalid.'],
    'unknown role' => ['role', 'landlord', 'The selected role is invalid.'],
    'city outside the UAE' => ['city', 'London', 'The selected city is invalid.'],
    'too many bedrooms' => ['bedrooms', '51', 'The bedrooms field must not be greater than 50.'],
]);

test('a mail failure still saves the enquiry and is reported', function () {
    Exceptions::fake();
    Mail::shouldReceive('to')->once()->andThrow(new RuntimeException('SMTP is down'));

    $this->from(route('contact'))
        ->post(route('enquiries.store'), validEnquiry())
        ->assertRedirect(route('contact'))
        ->assertSessionHasNoErrors();

    $this->assertDatabaseCount('enquiries', 1);
    Exceptions::assertReported(RuntimeException::class);
});

test('the enquiry form is rate limited', function () {
    Mail::fake();

    foreach (range(1, 10) as $attempt) {
        $this->post(route('enquiries.store'), validEnquiry())->assertRedirect();
    }

    $this->post(route('enquiries.store'), validEnquiry())->assertTooManyRequests();
    $this->assertDatabaseCount('enquiries', 10);
});
