<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\DashboardController;
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
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::middleware('can:access-admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('enquiries', Admin\EnquiryController::class)->only(['index', 'show', 'update']);
        Route::resource('properties', Admin\PropertyController::class)->except('show');
        Route::put('properties/{property}/published', [Admin\PublishedPropertyController::class, 'update'])->name('properties.published.update');
    });
});

require __DIR__.'/settings.php';
