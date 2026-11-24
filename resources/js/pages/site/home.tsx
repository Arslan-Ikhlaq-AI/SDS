import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Building2,
    Handshake,
    HardHat,
    MapPin,
    Phone,
    ShieldCheck,
    UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CtaBand } from '@/components/site/cta-band';
import { HomeHero } from '@/components/site/home-hero';
import { OfferColumns } from '@/components/site/offer-columns';
import { PillLink } from '@/components/site/pill-link';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { about, services } from '@/routes';
import {
    index as propertiesIndex,
    show as showProperty,
} from '@/routes/properties';
import type { SelectOption } from '@/types/site';

const channelPartners = [
    { name: 'Sobha Realty', logo: 'sobha' },
    { name: 'The Luxe Developers', logo: 'lux-developers' },
    { name: 'Binghatti', logo: 'binghati' },
    { name: 'Emaar', logo: 'emmar' },
    { name: 'Dubai Properties', logo: 'dubai-properties' },
    { name: 'Danube Properties', logo: 'danube' },
    { name: 'BT Properties', logo: 'bt-properties' },
    { name: 'Tiger Properties', logo: 'tiger' },
    { name: 'Reportage Properties', logo: 'reportage' },
    { name: 'Pre Real Estate Agency', logo: 'pre-realestate' },
];

type FeaturedBuilding = {
    title: string;
    location: string;
    badge: string;
    image: string;
    imagePosition: string;
    facts: string[];
    /** The live listing the card opens while that listing is shown on the website. */
    listingSlug?: string;
    href: string;
};

type FeaturedBuildingGroup = {
    title: string;
    description: string;
    icon: LucideIcon;
    browseHref: string;
    buildings: FeaturedBuilding[];
};

/**
 * Two residential and two worker accommodation buildings; the first of each pair is a live listing from PropertySeeder.
 */
const featuredBuildingGroups: FeaturedBuildingGroup[] = [
    {
        title: 'Residential Buildings',
        description:
            'Apartment buildings for families and professionals, from off-plan launches to ready homes.',
        icon: Building2,
        browseHref: propertiesIndex.url({ query: { type: 'residential' } }),
        buildings: [
            {
                title: 'Marquis Insignia',
                location: 'Arjan, Dubai',
                badge: 'Off Plan · For Sale',
                image: '/images/properties/marquis-insignia/exterior-pool.webp',
                imagePosition: 'object-[42%_50%]',
                facts: ['B+G+9+R', '1–3 Bedrooms', 'Rooftop Pool'],
                listingSlug: 'marquis-insignia-1-bedroom-luxurious-apartment',
                href: propertiesIndex.url({ query: { type: 'residential' } }),
            },
            {
                title: 'Ready Apartment Towers',
                location: 'Across Dubai',
                badge: 'Primary & Secondary',
                image: '/images/services/dubai-night-view.webp',
                imagePosition: 'object-[50%_50%]',
                facts: ['Apartments', 'Studios', 'Villas'],
                href: propertiesIndex.url({ query: { type: 'residential' } }),
            },
        ],
    },
    {
        title: 'Worker Accommodation',
        description:
            'Labor camps and staff accommodation for rent, at prices that fit your budget.',
        icon: HardHat,
        browseHref: propertiesIndex.url({ query: { type: 'Labor Camp' } }),
        buildings: [
            {
                title: 'Bin Sanad Camp',
                location: 'Al Quoz, Dubai',
                badge: 'Labor Camp',
                image: '/images/properties/bin-sanad-camp/street-view.webp',
                imagePosition: 'object-[22%_50%]',
                facts: ['Shared Kitchens', 'Laundry', 'Courtyard'],
                listingSlug: 'bin-sanad-camp-al-quoz',
                href: propertiesIndex.url({ query: { type: 'Labor Camp' } }),
            },
            {
                title: 'Staff Accommodation',
                location: 'Across Dubai',
                badge: 'For Rent',
                image: '/images/services/labor-camps.webp',
                imagePosition: 'object-[58%_50%]',
                facts: ['Labor Camps', 'Staff Housing', 'Affordable Rents'],
                href: `${services.url()}#labor-accommodation`,
            },
        ],
    },
];

function WhatWeOffer() {
    const site = useSite();

    return (
        <section
            id="what-we-offer"
            className="relative scroll-mt-20 bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,var(--color-plum-50)_0%,transparent_72%)] pt-16 pb-16 sm:pt-20 lg:pt-24 lg:pb-20"
        >
            <div className="site-container">
                <div className="mx-auto max-w-[54rem] text-center">
                    <Eyebrow
                        centered
                        className="text-[13px] font-bold tracking-[0.24em]"
                    >
                        Our Services
                    </Eyebrow>
                    <DisplayHeading className="mt-4 text-[clamp(2.125rem,3.8vw,3.375rem)] leading-[1.08] text-plum-900">
                        What We <Highlight>Offer</Highlight>?
                    </DisplayHeading>
                    <p className="mx-auto mt-5 max-w-[50rem] text-[15.5px] leading-[1.8] text-pretty text-body sm:text-[17px]">
                        <span className="font-semibold text-plum-800">
                            Your property journey starts here.
                        </span>{' '}
                        Property management is at the heart of {site.name}. We
                        take on properties, manage them end to end and lease
                        them to reliable tenants, so owners enjoy steady returns
                        without the day-to-day work. Alongside management, we
                        make buying, selling and renting effortless, from labor
                        accommodation and residential apartments to offices,
                        shops and warehouses. Off-plan, primary or secondary,
                        every deal is backed by expert guidance for a smooth and
                        rewarding experience.
                    </p>
                </div>
                <div className="mt-12 lg:mt-14">
                    <OfferColumns />
                </div>
            </div>
        </section>
    );
}

function AboutSummary() {
    const site = useSite();

    const qualities = [
        {
            title: 'Trustworthy',
            description: 'Honest advice and clear reporting on every property.',
            icon: ShieldCheck,
        },
        {
            title: 'Experienced',
            description: 'A seasoned team that knows Dubai’s market by heart.',
            icon: UsersRound,
        },
        {
            title: 'Committed',
            description:
                'Caring for your property long after the keys change hands.',
            icon: Handshake,
        },
    ];

    return (
        <section
            id="about-sds"
            className="relative scroll-mt-20 overflow-hidden pt-20 pb-20 sm:pt-24 lg:pt-32 lg:pb-28"
        >
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 mx-auto h-px max-w-[min(72rem,calc(100%-2rem))] bg-[linear-gradient(90deg,transparent,var(--color-hairline)_20%,var(--color-hairline)_80%,transparent)]"
            />
            <div className="site-container grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-16 xl:gap-x-24">
                <div className="relative mx-auto w-full max-w-[34rem] pt-5 pr-8 pb-14 pl-5 sm:pr-14 lg:mx-0 lg:max-w-none">
                    <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 h-[78%] w-[72%] rounded-[34px] border-[1.5px] border-tangerine-500/70"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute -right-10 -bottom-6 size-64 rounded-full bg-plum-50"
                    />
                    <img
                        src="/images/services/dubai-skyline.webp"
                        alt="Downtown Dubai skyline at dusk"
                        loading="lazy"
                        className="relative aspect-[4/5] w-full rounded-[28px] object-cover object-[62%_50%] shadow-[0_40px_80px_-44px_rgba(27,14,54,0.7)]"
                    />
                    <img
                        src="/images/services/villa.webp"
                        alt="Contemporary villa in Dubai"
                        loading="lazy"
                        className="absolute right-0 bottom-0 aspect-[4/5] w-[44%] rounded-[22px] object-cover shadow-[0_30px_60px_-30px_rgba(27,14,54,0.75)] ring-[7px] ring-white"
                    />
                </div>

                <div>
                    <Eyebrow className="text-[13px] font-bold tracking-[0.24em]">
                        About {site.name}
                    </Eyebrow>
                    <DisplayHeading className="mt-4 text-[clamp(2rem,3.4vw,3.125rem)] leading-[1.1] text-plum-900">
                        Dubai’s Leading{' '}
                        <Highlight>Real Estate Company</Highlight>
                    </DisplayHeading>
                    <p className="mt-6 border-l-2 border-tangerine-500 pl-5 font-display text-[clamp(1.3rem,1.9vw,1.625rem)] leading-[1.4] text-pretty text-plum-900 italic">
                        You own the property.{' '}
                        <span className="text-tangerine-500">
                            We make it perform.
                        </span>
                    </p>
                    <p className="mt-6 text-[16px] leading-[1.8] text-pretty text-body sm:text-[17px]">
                        <span className="font-semibold text-plum-800">
                            {site.name} manages property on behalf of landlords
                            across Dubai.
                        </span>{' '}
                        We find reliable tenants, collect rent on time, look
                        after maintenance and keep every contract and renewal in
                        order. From labor accommodation and residential
                        apartments to offices, shops and warehouses, we treat
                        your asset as if it were our own, so it earns steadily
                        while you stay free of the day-to-day.
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.8] text-pretty text-soft sm:text-[15.5px]">
                        Looking to buy, sell or rent in Dubai? We guide every
                        step with the same care, securing the best possible deal
                        and a smooth, transparent transaction.
                    </p>

                    <ul className="mt-9 grid gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1 lg:gap-3 xl:grid-cols-3 xl:gap-4">
                        {qualities.map((quality) => (
                            <li
                                key={quality.title}
                                className="group flex items-center gap-4 rounded-[22px] border border-hairline bg-white px-5 py-4 shadow-[0_20px_44px_-36px_rgba(46,23,96,0.55)] transition-[translate,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-plum-100 sm:block sm:p-5 lg:flex lg:px-5 lg:py-4 xl:block xl:p-5"
                            >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))] shadow-[0_10px_20px_-10px_rgba(46,23,96,0.85)] ring-[5px] ring-plum-50 transition-shadow duration-500 group-hover:ring-tangerine-500/15">
                                    <quality.icon
                                        aria-hidden="true"
                                        strokeWidth={1.6}
                                        className="size-5 text-white"
                                    />
                                </span>
                                <div className="sm:mt-4 lg:mt-0 xl:mt-4">
                                    <h3 className="font-display text-[19px] leading-tight font-medium text-plum-900">
                                        {quality.title}
                                    </h3>
                                    <p className="mt-1 text-[13.5px] leading-[1.6] text-soft sm:mt-1.5 lg:mt-1 xl:mt-1.5">
                                        {quality.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                        <PillLink
                            href={about()}
                            variant="plum"
                            className="h-12 px-7 xl:h-12 xl:px-7"
                        >
                            Discover Our Story
                        </PillLink>
                        <a
                            href={`tel:${site.phone}`}
                            className="group flex items-center gap-3"
                        >
                            <span className="flex size-12 items-center justify-center rounded-full border border-plum-100 text-tangerine-500 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950">
                                <Phone
                                    aria-hidden="true"
                                    className="size-[18px]"
                                />
                            </span>
                            <span className="text-[12px] leading-tight text-soft">
                                Speak to an advisor
                                <span className="mt-1 block text-[15px] font-semibold text-plum-900">
                                    {site.phone_display}
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturedBuildingCard({
    building,
    featuredSlugs,
}: {
    building: FeaturedBuilding;
    featuredSlugs: string[];
}) {
    const { listingSlug } = building;
    const isListed =
        listingSlug !== undefined && featuredSlugs.includes(listingSlug);

    return (
        <Link
            href={isListed ? showProperty.url(listingSlug) : building.href}
            className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[26px] bg-plum-950 p-6 shadow-[0_30px_60px_-38px_rgba(27,14,54,0.75)] ring-1 ring-plum-950/5 sm:aspect-[3/4] xl:aspect-[4/5] xl:p-7"
        >
            <img
                src={building.image}
                alt=""
                loading="lazy"
                className={cn(
                    'absolute inset-0 -z-20 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none',
                    building.imagePosition,
                )}
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.45)_0%,rgba(27,14,54,0)_24%,rgba(27,14,54,0.15)_38%,rgba(27,14,54,0.78)_62%,rgba(27,14,54,0.97)_100%)]"
            />
            <span
                aria-hidden="true"
                className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 rounded-b-full bg-[linear-gradient(90deg,var(--color-tangerine-500),var(--color-tangerine-400))] transition-transform duration-500 ease-out group-hover:scale-x-100"
            />

            <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3 xl:inset-x-6 xl:top-6">
                <span className="rounded-full border border-white/20 bg-plum-950/40 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
                    {building.badge}
                </span>
                <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-plum-950/40 text-white backdrop-blur-md transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950"
                >
                    <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
                </span>
            </div>

            <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                <MapPin
                    aria-hidden="true"
                    className="size-3.5 text-tangerine-400"
                />
                {building.location}
            </p>
            <h4 className="mt-2.5 font-display text-[clamp(1.375rem,1.9vw,1.75rem)] leading-[1.15] font-medium text-white">
                {building.title}
            </h4>
            <span
                aria-hidden="true"
                className="mt-4 h-px w-10 bg-tangerine-500/80 transition-[width] duration-500 ease-out group-hover:w-20"
            />
            <ul className="mt-4 flex flex-wrap gap-2">
                {building.facts.map((fact) => (
                    <li
                        key={fact}
                        className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm"
                    >
                        {fact}
                    </li>
                ))}
            </ul>
        </Link>
    );
}

function FeaturedBuildings({ featuredSlugs }: { featuredSlugs: string[] }) {
    return (
        <section
            id="featured-buildings"
            className="relative scroll-mt-20 overflow-hidden bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,var(--color-plum-50)_0%,transparent_70%)] pt-20 pb-20 sm:pt-24 lg:pt-28 lg:pb-24"
        >
            <div className="site-container">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <div className="max-w-[40rem]">
                        <Eyebrow className="text-[13px] font-bold tracking-[0.24em]">
                            Featured Buildings
                        </Eyebrow>
                        <DisplayHeading className="mt-4 text-[clamp(2.125rem,3.8vw,3.375rem)] leading-[1.08] text-plum-900">
                            Your property journey{' '}
                            <Highlight>starts here.</Highlight>
                        </DisplayHeading>
                    </div>
                    <div className="flex max-w-md flex-col items-start gap-6">
                        <p className="text-[15px] leading-[1.8] text-soft sm:text-[16px]">
                            From modern apartment buildings to well-kept worker
                            accommodation, explore a few of the buildings we
                            sell, lease and manage across Dubai.
                        </p>
                        <PillLink
                            href={propertiesIndex()}
                            variant="plum"
                            className="h-12 px-7 xl:h-12 xl:px-7"
                        >
                            Browse All Properties
                        </PillLink>
                    </div>
                </div>

                <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-8 xl:gap-10">
                    {featuredBuildingGroups.map((group, index) => (
                        <div key={group.title}>
                            <div className="flex items-center justify-between gap-5 border-b border-hairline pb-5">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))] shadow-[0_10px_20px_-10px_rgba(46,23,96,0.85)] ring-[5px] ring-plum-50">
                                        <group.icon
                                            aria-hidden="true"
                                            strokeWidth={1.6}
                                            className="size-5 text-white"
                                        />
                                    </span>
                                    <div>
                                        <p className="text-[11.5px] font-bold tracking-[0.2em] text-tangerine-600 uppercase lining-nums">
                                            0{index + 1}
                                            <span className="mx-2 text-plum-100">
                                                /
                                            </span>
                                            {group.buildings.length} Buildings
                                        </p>
                                        <h3 className="mt-1 font-display text-[clamp(1.375rem,1.8vw,1.625rem)] leading-tight font-medium text-plum-900">
                                            {group.title}
                                        </h3>
                                    </div>
                                </div>
                                <Link
                                    href={group.browseHref}
                                    className="group/browse hidden shrink-0 items-center gap-1.5 text-[13px] font-semibold text-plum-700 transition-colors hover:text-tangerine-600 sm:flex"
                                >
                                    View all
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="size-4 transition-transform duration-300 group-hover/browse:translate-x-0.5 group-hover/browse:-translate-y-0.5"
                                    />
                                </Link>
                            </div>
                            <p className="mt-4 max-w-lg text-[14.5px] leading-[1.75] text-soft">
                                {group.description}
                            </p>
                            <ul className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-5">
                                {group.buildings.map((building) => (
                                    <li key={building.title}>
                                        <FeaturedBuildingCard
                                            building={building}
                                            featuredSlugs={featuredSlugs}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={group.browseHref}
                                className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-plum-700 sm:hidden"
                            >
                                View all {group.title.toLowerCase()}
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChannelPartners() {
    const renderLogoRow = (isDuplicate: boolean) => (
        <ul
            aria-hidden={isDuplicate || undefined}
            className={cn(
                'flex shrink-0 items-center gap-5 pr-5 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0',
                isDuplicate && 'motion-reduce:hidden',
            )}
        >
            {channelPartners.map((partner) => (
                <li
                    key={partner.logo}
                    className="group flex h-[108px] w-[200px] shrink-0 items-center justify-center rounded-[24px] border border-hairline bg-white shadow-[0_20px_44px_-36px_rgba(46,23,96,0.5)] transition-[translate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-plum-100 hover:shadow-[0_30px_60px_-36px_rgba(46,23,96,0.55)] sm:w-[220px]"
                >
                    <img
                        src={`/images/partners/${partner.logo}.webp`}
                        alt={isDuplicate ? '' : partner.name}
                        loading="lazy"
                        width={100}
                        height={50}
                        className="opacity-70 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <section
            id="channel-partners"
            className="relative mb-14 scroll-mt-20 overflow-hidden border-y border-hairline bg-[linear-gradient(180deg,var(--color-plum-50),#ffffff_85%)] pt-16 pb-12 lg:mb-16 lg:pt-20 lg:pb-14"
        >
            <div className="site-container flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <div>
                    <Eyebrow className="text-[13px] font-bold tracking-[0.24em]">
                        Our Network
                    </Eyebrow>
                    <DisplayHeading className="mt-4 text-[clamp(2rem,3.2vw,2.875rem)] leading-[1.1] text-plum-900">
                        Our Channel <Highlight>Partners</Highlight>
                    </DisplayHeading>
                </div>
                <p className="max-w-md text-[15px] leading-[1.8] text-soft">
                    We work hand in hand with some of the UAE’s most respected
                    developers, so every client buys with confidence.
                </p>
            </div>

            <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none] lg:mt-12">
                <div className="flex w-max animate-marquee py-4 hover:[animation-play-state:paused] motion-reduce:site-container motion-reduce:w-full motion-reduce:animate-none">
                    {renderLogoRow(false)}
                    {renderLogoRow(true)}
                </div>
            </div>
        </section>
    );
}

export default function Home({
    budgets,
    featuredSlugs,
}: {
    budgets: SelectOption[];
    featuredSlugs: string[];
}) {
    const site = useSite();

    return (
        <>
            <SeoHead
                title="Buy, Sell and Rent Property in Dubai"
                description={`Buy, sell and rent property in the UAE with ${site.name}. A wide range of off-plan, primary and secondary properties and labor camps available.`}
            />
            <HomeHero budgets={budgets} />
            <WhatWeOffer />
            <AboutSummary />
            <FeaturedBuildings featuredSlugs={featuredSlugs} />
            <ChannelPartners />
            <CtaBand />
        </>
    );
}
