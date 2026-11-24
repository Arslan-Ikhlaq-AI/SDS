<?php

namespace App\Enums;

enum EnquirySource: string
{
    case Contact = 'contact';
    case Valuation = 'valuation';
    case Property = 'property';

    /**
     * Get every source, for building select menus.
     *
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(fn (self $source): array => [
            'value' => $source->value,
            'label' => $source->label(),
        ], self::cases());
    }

    /**
     * Get the label used when notifying the sales team.
     */
    public function label(): string
    {
        return match ($this) {
            self::Contact => 'Contact form',
            self::Valuation => 'Valuation request',
            self::Property => 'Property enquiry',
        };
    }
}
