<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

test('a new admin is created and sent a link to choose a password', function () {
    Notification::fake();

    $this->artisan('admin:create', ['email' => 'Owner@Example.com'])->assertSuccessful();

    $admin = User::query()->where('email', 'owner@example.com')->sole();

    expect($admin)
        ->is_admin->toBeTrue()
        ->hasVerifiedEmail()->toBeTrue();
    Notification::assertSentTo($admin, ResetPassword::class);
});

test('an existing confirmed account becomes an admin and keeps its password', function () {
    Notification::fake();
    $user = User::factory()->create();
    $password = $user->password;

    $this->artisan('admin:create', ['email' => $user->email])->assertSuccessful();

    expect($user->refresh())
        ->is_admin->toBeTrue()
        ->password->toBe($password);
    Notification::assertNothingSent();
});

test('an account with an unconfirmed email address is refused', function () {
    $user = User::factory()->unverified()->create();

    $this->artisan('admin:create', ['email' => $user->email])->assertFailed();

    expect($user->refresh()->is_admin)->toBeFalse();
});

test('an invalid email address is refused', function () {
    $this->artisan('admin:create', ['email' => 'not-an-email'])->assertFailed();

    expect(User::count())->toBe(0);
});
