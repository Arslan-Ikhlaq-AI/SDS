<?php

namespace App\Enums;

enum EnquiryRole: string
{
    case Buyer = 'buyer';
    case Tenant = 'tenant';
    case PropertyOwner = 'property-owner';
    case Agent = 'agent';
    case Other = 'other';

    /**
     * Get the label used when notifying the sales team.
     */
    public function label(): string
    {
        return match ($this) {
            self::Buyer => 'Buyer',
            self::Tenant => 'Tenant',
            self::PropertyOwner => 'Property owner',
            self::Agent => 'Agent',
            self::Other => 'Other',
        };
    }
}
