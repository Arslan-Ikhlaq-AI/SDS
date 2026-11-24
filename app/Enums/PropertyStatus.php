<?php

namespace App\Enums;

enum PropertyStatus: string
{
    case ForSale = 'for-sale';
    case ForRent = 'for-rent';
    case Management = 'management';
    case Sold = 'sold';

    /**
     * Get every status, for building select menus.
     *
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(fn (self $status): array => [
            'value' => $status->value,
            'label' => $status->label(),
        ], self::cases());
    }

    /**
     * Get the label shown to visitors.
     */
    public function label(): string
    {
        return match ($this) {
            self::ForSale => 'For Sale',
            self::ForRent => 'For Rent',
            self::Management => 'Management',
            self::Sold => 'Sold',
        };
    }
}
