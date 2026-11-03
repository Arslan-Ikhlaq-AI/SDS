<?php

namespace App\Enums;

enum EnquirySource: string
{
    case Contact = 'contact';
    case Valuation = 'valuation';
    case Property = 'property';

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
