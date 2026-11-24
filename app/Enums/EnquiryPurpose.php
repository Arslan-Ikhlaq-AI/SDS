<?php

namespace App\Enums;

enum EnquiryPurpose: string
{
    case Rent = 'rent';
    case Buy = 'buy';
    case RentOut = 'rent-out';
    case Manage = 'manage';
    case RentOutAndManage = 'rent-out-and-manage';
    case Sell = 'sell';

    /**
     * Get every purpose, for building select menus.
     *
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(fn (self $purpose): array => [
            'value' => $purpose->value,
            'label' => $purpose->label(),
        ], self::cases());
    }

    /**
     * Get the label used when notifying the sales team.
     */
    public function label(): string
    {
        return match ($this) {
            self::Rent => 'Rent a property',
            self::Buy => 'Buy a property',
            self::RentOut => 'Rent out their property',
            self::Manage => 'Have their property managed',
            self::RentOutAndManage => 'Rent out and have their property managed',
            self::Sell => 'Sell their property',
        };
    }

    /**
     * Get what the amount the visitor gave means for this purpose.
     */
    public function budgetLabel(): string
    {
        return match ($this) {
            self::Rent => 'Yearly budget',
            self::Buy => 'Budget',
            self::RentOut, self::Manage, self::RentOutAndManage => 'Expected yearly rent',
            self::Sell => 'Expected price',
        };
    }

    /**
     * Get what the date the visitor gave means for this purpose.
     */
    public function dateLabel(): string
    {
        return match ($this) {
            self::Rent, self::Buy => 'Move-in date',
            self::RentOut, self::Manage, self::RentOutAndManage, self::Sell => 'Available from',
        };
    }
}
