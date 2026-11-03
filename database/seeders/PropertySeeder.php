<?php

namespace Database\Seeders;

use App\Enums\PropertyCategory;
use App\Enums\PropertyStatus;
use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Load the current listings. Safe to run again: existing listings are updated, not duplicated.
     */
    public function run(): void
    {
        $prefix = config('site.reference_prefix');

        Property::updateOrCreate(['slug' => 'marquis-insignia-1-bedroom-luxurious-apartment'], [
            'reference' => "{$prefix}-1001",
            'title' => 'Marquis Insignia 1 Bedroom Luxurious Apartment',
            'status' => PropertyStatus::ForSale,
            'category' => PropertyCategory::OffPlan,
            'type' => '1 Bed Room',
            'price' => 1_192_329,
            'payment_plan' => '40% x 60%',
            'size_sqft' => 779,
            'land_area_sqft' => 779,
            'bedrooms' => 1,
            'location' => 'Arjan, Dubai',
            'map_url' => 'https://www.google.com/maps/search/?api=1&query=Arjan%20Dubai',
            'summary_title' => 'Marquis Insignia Project Summary',
            'highlights' => [
                'Multiple payment plans.',
                'Completion Q4 2026.',
                'Landmark project in Arjan.',
                'A luxury B+G+9+R.',
                '1, 2 & 3 bedroom luxurious apartments.',
                'Open seating space.',
                'Double height elegantly designed lobby.',
                'Fully furnished option.',
                'Custom designed 5 passenger lifts and separate service lift.',
                'Strategically located in the heart of Arjan.',
                'Exclusive lifestyle with concierge services.',
                '60 meters long Olympic size roof infinity pool with kid’s pool, aqua bike and water massage units.',
                'Yoga & meditation deck.',
                'State of the art gym and fitness centre.',
                'Calisthenics workout area.',
                'Plunge pool.',
                'Roof majlis.',
                'Home theatre.',
                'Business centre, meeting rooms & work suites.',
                'Jogging track.',
                'Kids play area.',
                'Water splash.',
                'Botanical garden.',
                'Indoor games area.',
                'Multi purpose hall to host events.',
                'Rooftop barbeque with skyline views.',
                'Leisure seating area with garden, silent seating.',
                'Est. service charges: 14-15 Dhs. per square feet.',
                'High ROI.',
            ],
            'features' => ['Air Conditioning', 'Gym', 'Laundry'],
            'images' => [
                '/images/properties/marquis-insignia/bedroom.webp',
                '/images/properties/marquis-insignia/exterior-pool.webp',
                '/images/properties/marquis-insignia/reception.webp',
                '/images/properties/marquis-insignia/lounge.webp',
                '/images/properties/marquis-insignia/kitchen.webp',
            ],
            'floor_plan_image' => '/images/properties/marquis-insignia/floor-plan.webp',
            'is_featured' => true,
        ]);

        Property::updateOrCreate(['slug' => 'bin-sanad-camp-al-quoz'], [
            'reference' => "{$prefix}-1002",
            'title' => 'Bin Sanad Camp Al Quoz',
            'category' => PropertyCategory::Residential,
            'type' => 'Labor Camp',
            'location' => 'Al Quoz, Dubai',
            'images' => [
                '/images/properties/bin-sanad-camp/street-view.webp',
                '/images/properties/bin-sanad-camp/frontage.webp',
                '/images/properties/bin-sanad-camp/laundry-row.webp',
                '/images/properties/bin-sanad-camp/courtyard.webp',
                '/images/properties/bin-sanad-camp/laundry.webp',
                '/images/properties/bin-sanad-camp/washroom-corridor.webp',
                '/images/properties/bin-sanad-camp/kitchen.webp',
            ],
            'is_featured' => true,
        ]);
    }
}
