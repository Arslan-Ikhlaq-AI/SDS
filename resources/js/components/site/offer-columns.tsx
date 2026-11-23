import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import {
    HouseGearIcon,
    HouseInHandIcon,
    HouseKeyIcon,
    OfficeBuildingIcon,
} from '@/components/site/duotone-icons';
import { managementEnquiryUrl } from '@/lib/management-enquiry';
import { contact } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

type Offer = {
    title: string;
    description: string;
    action: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * The four things the business offers, each as a card with a plum medallion icon
 * and a link to where that journey starts.
 */
export function OfferColumns() {
    const offers: Offer[] = [
        {
            title: 'Buy',
            description:
                'Buy properties in Dubai, hassle-free. Apartments, villas and off-plan homes, shortlisted for you.',
            action: 'Properties for sale',
            href: propertiesIndex.url({ query: { status: 'for-sale' } }),
            icon: HouseInHandIcon,
        },
        {
            title: 'Sell',
            description:
                'Sell fast with expert support, from pricing your property to closing the deal.',
            action: 'Talk to an agent',
            href: contact.url(),
            icon: OfficeBuildingIcon,
        },
        {
            title: 'Rent',
            description:
                'Rent smart, live comfortably. Homes, offices, shops and labor camps, looked after by our own team.',
            action: 'Properties for rent',
            href: propertiesIndex.url({ query: { status: 'for-rent' } }),
            icon: HouseKeyIcon,
        },
        {
            title: 'Management',
            description:
                'We take on your property and manage it end to end, from finding reliable tenants to rent collection and upkeep.',
            action: 'Manage my property',
            href: managementEnquiryUrl(),
            icon: HouseGearIcon,
        },
    ];

    return (
        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {offers.map((offer) => (
                <li key={offer.title}>
                    <Link
                        href={offer.href}
                        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline bg-white p-7 shadow-[0_24px_60px_-42px_rgba(46,23,96,0.5)] transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-plum-100 hover:shadow-[0_40px_80px_-40px_rgba(46,23,96,0.55)] xl:p-8"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-b-full bg-[linear-gradient(90deg,var(--color-tangerine-500),var(--color-tangerine-400))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute -top-20 -right-20 size-48 rounded-full bg-plum-50 transition-colors duration-500 group-hover:bg-tangerine-500/8"
                        />

                        <span
                            style={
                                {
                                    '--icon-backdrop': 'var(--color-plum-700)',
                                } as CSSProperties
                            }
                            className="relative flex size-[76px] items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))] shadow-[0_16px_30px_-14px_rgba(46,23,96,0.85)] ring-[7px] ring-plum-50 transition-[scale,box-shadow] duration-500 group-hover:scale-105 group-hover:ring-tangerine-500/15"
                        >
                            <offer.icon stroke="white" className="size-10" />
                        </span>

                        <span className="relative mt-7 font-display text-[26px] leading-tight font-medium text-plum-900">
                            {offer.title}
                        </span>
                        <span className="relative mt-2.5 flex-1 text-[15px] leading-[1.7] text-body">
                            {offer.description}
                        </span>

                        <span className="relative mt-7 flex items-center justify-between gap-3 border-t border-hairline pt-5 text-[13.5px] font-semibold whitespace-nowrap text-plum-700 transition-colors duration-300 group-hover:text-plum-900">
                            {offer.action}
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-plum-100 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950">
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                                />
                            </span>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
