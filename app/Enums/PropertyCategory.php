<?php

namespace App\Enums;

enum PropertyCategory: string
{
    case Residential = 'residential';
    case Commercial = 'commercial';
    case OffPlan = 'off-plan';

    /**
     * Get the label shown to visitors.
     */
    public function label(): string
    {
        return match ($this) {
            self::Residential => 'Residential',
            self::Commercial => 'Commercial',
            self::OffPlan => 'Off Plan',
        };
    }

    /**
     * Get the property types offered within this category.
     *
     * @return list<string>
     */
    public function types(): array
    {
        return match ($this) {
            self::Residential => ['Apartment', 'Labor Camp', 'Studio', 'Villa'],
            self::Commercial => ['Offices', 'Shops', 'Warehouses'],
            self::OffPlan => ['1 Bed Room', '2 Bed Rooms', 'Shops', 'Town Houses', 'Villas'],
        };
    }

    /**
     * Get every category with its types, for building select menus.
     *
     * @return list<array{value: string, label: string, types: list<string>}>
     */
    public static function options(): array
    {
        return array_map(fn (self $category): array => [
            'value' => $category->value,
            'label' => $category->label(),
            'types' => $category->types(),
        ], self::cases());
    }

    /**
     * Get every property type across all categories.
     *
     * @return list<string>
     */
    public static function allTypes(): array
    {
        return array_values(array_unique(array_merge(
            ...array_map(fn (self $category): array => $category->types(), self::cases()),
        )));
    }
}
