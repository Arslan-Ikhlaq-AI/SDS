<?php

/*
|--------------------------------------------------------------------------
| Public Website Details
|--------------------------------------------------------------------------
|
| Everything that identifies the business on the public website lives here
| (the contact details and people are placeholders until the client supplies theirs):
| the name shown in headings and body copy, contact details, social profiles
| and the agent named on listings. Change a value here and every page, the
| legal documents and the enquiry email follow.
|
*/

return [

    'name' => 'SDS Real Estate',

    'legal_name' => 'SDS Real Estate L.L.C',

    'legal_name_arabic' => 'اس دي اس للعقارات ذ.م.م',

    'tagline' => 'Your Trusted Real Estate Partner',

    'cities' => ['Dubai', 'Sharjah', 'Ajman', 'Abu Dhabi'],

    'phone' => '+971501234567',

    'phone_display' => '+971 50 123 4567',

    'whatsapp' => '971501234567',

    'email' => 'info@sdsrealestate.ae',

    'address' => [
        'line_one' => 'Office 1207, Level 12, Bay Square',
        'line_two' => 'Business Bay, Dubai, UAE',
        'map_url' => 'https://www.google.com/maps/search/?api=1&query=Business+Bay+Dubai',
    ],

    'social' => [
        'facebook' => 'https://www.facebook.com/',
        'instagram' => 'https://www.instagram.com/',
        'linkedin' => 'https://www.linkedin.com/',
        'youtube' => 'https://www.youtube.com/',
    ],

    'listing_agent' => [
        'name' => 'Yousef Rahman',
        'title' => 'Sales Executive',
        'photo' => '/images/team/yousef-rahman.webp',
    ],

    /*
    |--------------------------------------------------------------------------
    | Server-Only Values
    |--------------------------------------------------------------------------
    |
    | These are not shared with the browser. New enquiries are emailed to the
    | address below, and listing references start with the prefix below.
    |
    */

    'enquiries_email' => env('ENQUIRIES_EMAIL', 'info@sdsrealestate.ae'),

    'reference_prefix' => 'SDS',

];
