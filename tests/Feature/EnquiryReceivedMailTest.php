<?php

use App\Enums\EnquiryPurpose;
use App\Enums\EnquiryRole;
use App\Enums\EnquirySource;
use App\Mail\EnquiryReceived;
use App\Models\Enquiry;
use App\Models\Property;

test('the enquiry email carries the details and replies go to the visitor', function () {
    $enquiry = Enquiry::factory()->create([
        'name' => 'Ayesha Khan',
        'email' => 'ayesha@example.com',
        'phone' => '+971501234567',
        'role' => EnquiryRole::Tenant,
        'message' => 'Is the apartment still available?',
        'city' => 'Sharjah',
        'budget' => 85000,
    ]);

    $mail = new EnquiryReceived($enquiry);

    $mail->assertHasSubject('Contact form from Ayesha Khan')
        ->assertHasReplyTo('ayesha@example.com', 'Ayesha Khan')
        ->assertSeeInText('+971501234567')
        ->assertSeeInOrderInHtml(['Enquiring as:', 'Tenant'])
        ->assertSeeInOrderInHtml(['City:', 'Sharjah'])
        ->assertSeeInOrderInHtml(['Budget:', 'AED 85,000'])
        ->assertSeeInText('Is the apartment still available?');
});

test('the enquiry email names the listing a property enquiry is about', function () {
    $property = Property::factory()->create(['title' => 'Marina Gate Penthouse', 'reference' => 'SDS-7777']);
    $enquiry = Enquiry::factory()->create([
        'source' => EnquirySource::Property,
        'property_id' => $property->id,
    ]);

    (new EnquiryReceived($enquiry))
        ->assertHasSubject("Property enquiry from {$enquiry->name}")
        ->assertSeeInOrderInHtml(['Listing:', 'Marina Gate Penthouse (SDS-7777)']);
});

test('the enquiry email words its details for what the visitor wants', function (EnquiryPurpose $purpose, string $label, string $budgetLabel, string $dateLabel) {
    $enquiry = Enquiry::factory()->create([
        'name' => 'Ayesha Khan',
        'purpose' => $purpose,
        'area' => 'Al Barsha 1',
        'budget' => 90000,
        'available_from' => '2027-01-15',
    ]);

    (new EnquiryReceived($enquiry))
        ->assertHasSubject("Contact form ({$label}) from Ayesha Khan")
        ->assertSeeInOrderInHtml(['Would like to:', $label])
        ->assertSeeInOrderInHtml(['Area or building:', 'Al Barsha 1'])
        ->assertSeeInOrderInHtml(["{$budgetLabel}:", 'AED 90,000'])
        ->assertSeeInOrderInHtml(["{$dateLabel}:", '15 January 2027']);
})->with([
    'rent' => [EnquiryPurpose::Rent, 'Rent a property', 'Yearly budget', 'Move-in date'],
    'buy' => [EnquiryPurpose::Buy, 'Buy a property', 'Budget', 'Move-in date'],
    'rent out' => [EnquiryPurpose::RentOut, 'Rent out their property', 'Expected yearly rent', 'Available from'],
    'manage' => [EnquiryPurpose::Manage, 'Have their property managed', 'Expected yearly rent', 'Available from'],
    'rent out and manage' => [EnquiryPurpose::RentOutAndManage, 'Rent out and have their property managed', 'Expected yearly rent', 'Available from'],
    'sell' => [EnquiryPurpose::Sell, 'Sell their property', 'Expected price', 'Available from'],
]);

test('the enquiry email escapes what the visitor typed', function () {
    $enquiry = Enquiry::factory()->create([
        'name' => 'Eve <script>alert(1)</script>',
        'message' => '<img src=x onerror=alert(1)>',
    ]);

    (new EnquiryReceived($enquiry))
        ->assertSeeInHtml('&lt;script&gt;alert(1)&lt;/script&gt;', escape: false)
        ->assertDontSeeInHtml('<script>alert(1)</script>', escape: false)
        ->assertDontSeeInHtml('<img src=x', escape: false);
});
