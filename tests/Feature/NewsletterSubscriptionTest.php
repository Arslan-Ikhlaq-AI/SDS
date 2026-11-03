<?php

use App\Models\NewsletterSubscriber;

test('a visitor can subscribe and the address is stored in lower case', function () {
    $this->from(route('home'))
        ->post(route('newsletter.store'), ['email' => 'Reader@Example.com'])
        ->assertRedirect(route('home'))
        ->assertSessionHasNoErrors();

    $this->assertDatabaseHas('newsletter_subscribers', ['email' => 'reader@example.com']);
});

test('subscribing twice keeps one row and gives the same response', function () {
    NewsletterSubscriber::factory()->create(['email' => 'reader@example.com']);

    $this->from(route('home'))
        ->post(route('newsletter.store'), ['email' => 'READER@example.com'])
        ->assertRedirect(route('home'))
        ->assertSessionHasNoErrors();

    $this->assertDatabaseCount('newsletter_subscribers', 1);
});

test('an invalid address shows the right message', function (string $email, string $message) {
    $this->post(route('newsletter.store'), ['email' => $email])
        ->assertInvalid(['email' => $message]);

    $this->assertDatabaseCount('newsletter_subscribers', 0);
})->with([
    'missing' => ['', 'The email field is required.'],
    'malformed' => ['not-an-email', 'The email field must be a valid email address.'],
]);
