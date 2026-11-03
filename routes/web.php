<?php

use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterSubscriberController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('services', 'site/services')->name('services');
Route::inertia('about', 'site/about')->name('about');
Route::inertia('contact', 'site/contact')->name('contact');
Route::inertia('terms-and-conditions', 'site/terms')->name('terms');
Route::inertia('privacy-policy', 'site/privacy')->name('privacy');

Route::get('properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('properties/{property:slug}', [PropertyController::class, 'show'])->name('properties.show');

Route::middleware('throttle:10,1')->group(function () {
    Route::post('enquiries', [EnquiryController::class, 'store'])->name('enquiries.store');
    Route::post('newsletter', [NewsletterSubscriberController::class, 'store'])->name('newsletter.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
