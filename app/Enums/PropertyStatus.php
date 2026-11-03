<?php

namespace App\Enums;

enum PropertyStatus: string
{
    case ForSale = 'for-sale';
    case ForRent = 'for-rent';
    case Sold = 'sold';

    /**
     * Get the label shown to visitors.
     */
    public function label(): string
    {
        return match ($this) {
            self::ForSale => 'For Sale',
            self::ForRent => 'For Rent',
            self::Sold => 'Sold',
        };
    }
}
