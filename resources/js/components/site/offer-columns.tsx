import { Link } from '@inertiajs/react';
import type { ComponentType, SVGProps } from 'react';
import {
    GrowthChartIcon,
    HouseInHandIcon,
    HouseKeyIcon,
    OfficeBuildingIcon,
} from '@/components/site/duotone-icons';
import { contact } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

type Offer = {
    title: string;
    description: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * The four things the business offers, split by the hairlines from the design.
 */
export function OfferColumns() {
    const offers: Offer[] = [
        {
            title: 'Buy',
            description: 'Buy properties in Dubai, hassle-free.',
            href: propertiesIndex.url({ query: { status: 'for-sale' } }),
            icon: HouseInHandIcon,
        },
        {
            title: 'Sell',
            description: 'Sell fast with expert support.',
            href: contact.url(),
            icon: OfficeBuildingIcon,
        },
        {
            title: 'Rent',
            description: 'Rent smart, live comfortably.',
            href: propertiesIndex.url({ query: { status: 'for-rent' } }),
            icon: HouseKeyIcon,
        },
        {
            title: 'Explore',
            description: 'Your real estate journey starts here.',
            href: propertiesIndex.url(),
            icon: GrowthChartIcon,
        },
    ];

    return (
        <ul className="grid grid-cols-2 gap-y-9 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-hairline">
            {offers.map((offer) => (
                <li key={offer.title}>
                    <Link
                        href={offer.href}
                        className="group flex flex-col items-center px-3 text-center sm:px-6"
                    >
                        <span className="flex size-[62px] items-center justify-center rounded-2xl bg-tile transition-transform duration-300 group-hover:-translate-y-1">
                            <offer.icon className="size-[46px]" />
                        </span>
                        <span className="mt-3 text-base font-semibold text-plum-900 transition-colors group-hover:text-plum-600">
                            {offer.title}
                        </span>
                        <span className="mt-1.5 max-w-[11.5rem] text-[13.5px] leading-relaxed text-soft">
                            {offer.description}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
