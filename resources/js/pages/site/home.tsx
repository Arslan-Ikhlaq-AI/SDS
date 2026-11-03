import { Link } from '@inertiajs/react';
import { Handshake, ShieldCheck, UsersRound } from 'lucide-react';
import { CtaBand } from '@/components/site/cta-band';
import { HomeHero } from '@/components/site/home-hero';
import { ImageFrame } from '@/components/site/image-frame';
import { OfferColumns } from '@/components/site/offer-columns';
import { PillLink } from '@/components/site/pill-link';
import { PropertyCard, ValuationCard } from '@/components/site/property-card';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
    SectionHeading,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { about, services } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';
import type { Property, SelectOption } from '@/types/site';

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

const stats = [
    { value: '80+', label: 'Team Members' },
    { value: '5k+', label: 'Happy Clients' },
    { value: '80+', label: 'Properties' },
];

const specialisms = [
    {
        title: 'Off-Plan Properties in Dubai',
        description: 'Lower prices and flexible payment plans.',
        image: '/images/services/off-plan.webp',
        hash: 'off-plan',
    },
    {
        title: 'Primary and Secondary Properties',
        description: 'Brand-new homes and high-value resale properties.',
        image: '/images/services/primary-secondary.webp',
        hash: 'primary-secondary',
    },
    {
        title: 'Best Labor Accommodations',
        description: 'Labor camps and staff accommodation for rent.',
        image: '/images/services/labor-camps.webp',
        hash: 'labor-accommodation',
    },
    {
        title: 'Residential and Commercial',
        description: 'Apartments, shops, offices and warehouses.',
        image: '/images/services/dubai-skyline.webp',
        hash: 'residential-commercial',
    },
];

function WhatWeOffer() {
    const site = useSite();

    return (
        <section
            id="what-we-offer"
            className="site-container scroll-mt-20 pt-8 pb-11 lg:pt-1 lg:pb-11"
        >
            <SectionHeading
                eyebrow="Our Services"
                title="What We Offer?"
                intro={
                    <>
                        Your property journey starts here. {site.name}, The Best
                        real estate company in Dubai, makes buying, selling, and
                        renting effortless. Labor accommodations, residential
                        and commercial properties, offices, shops, and
                        warehouses, whatever you need, the best options are
                        here. Off-plan, primary, or secondary properties, every
                        deal is backed by expert guidance for a smooth and
                        rewarding experience.
                    </>
                }
            />
            <div className="mt-6">
                <OfferColumns />
            </div>
        </section>
    );
}

function AboutSummary() {
    const site = useSite();

    const qualities = [
        { label: 'Trustworthy', icon: ShieldCheck },
        { label: 'Experienced', icon: UsersRound },
        { label: 'Committed', icon: Handshake },
    ];

    return (
        <section className="site-container pb-12 lg:pb-10">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,390fr)_minmax(0,350fr)_minmax(132px,150fr)] lg:gap-x-7">
                <ImageFrame
                    src="/images/services/dubai-skyline.webp"
                    alt="Downtown Dubai skyline at dusk"
                    className="ml-3 sm:ml-3.5 lg:ml-[11px]"
                    imageClassName="aspect-[16/10] object-[50%_75%] lg:aspect-[3/2] xl:aspect-[16/9]"
                />
                <div>
                    <Eyebrow>About {site.name}</Eyebrow>
                    <DisplayHeading className="mt-2.5 lg:text-[clamp(1.5rem,2.55vw,2.5rem)]">
                        Dubai’s Leading Real Estate{' '}
                        <span className="block">
                            <Highlight>Brokerage Company</Highlight>
                        </span>
                    </DisplayHeading>
                    <p className="mt-3.5 text-[13.5px] leading-[1.7] text-body xl:text-[15px]">
                        {site.name} makes real estate simple. If you are in need
                        of labor accommodation in Dubai or Commercial,
                        Residential Apartments, Shops or Warehouses for rent? We
                        offer comfortable and well-located options to suit your
                        needs and budget too. We also offer services to those
                        who are looking to buy and sell property in Dubai? We
                        ensure smooth transactions with the best deals possible.
                        With {site.name} on your side, finding the right
                        property is easier than ever.
                    </p>
                    <PillLink
                        href={about()}
                        variant="plum"
                        className="mt-4 h-[34px] px-5 text-xs"
                    >
                        Learn More
                    </PillLink>
                </div>
                <ul className="flex flex-wrap gap-x-8 gap-y-5 lg:flex-col lg:gap-y-8 lg:border-l lg:border-hairline lg:py-3 lg:pl-6">
                    {qualities.map((quality) => (
                        <li
                            key={quality.label}
                            className="flex items-center gap-3.5 text-[13px] font-semibold text-plum-800"
                        >
                            <quality.icon
                                aria-hidden="true"
                                strokeWidth={1.5}
                                className="size-[26px] shrink-0 text-tangerine-500"
                            />
                            {quality.label}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function WhoWeAre() {
    const site = useSite();

    const reasons = [
        {
            title: 'Team',
            description:
                'Our team is strongly aligned with the company’s mission and vision in successive and exponential progress through working hand in hand.',
            icon: UsersRound,
        },
        {
            title: 'Commitment',
            description:
                'We uphold our assurances with dedication and transparency, ensuring trust and safeguarding long-lasting relationships with our clientele.',
            icon: ShieldCheck,
        },
        {
            title: 'Respect',
            description:
                'It is important we treat our stakeholders with the utmost respect as we believe in garnering strong relationships with anyone we meet.',
            icon: Handshake,
        },
    ];

    return (
        <section className="bg-plum-50">
            <div className="site-container py-11 lg:py-12">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
                    <div>
                        <DisplayHeading>Who We Are?</DisplayHeading>
                        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-body">
                            {site.name} is a trusted real estate company in
                            Dubai, connecting buyers, sellers, and investors
                            with top properties.
                        </p>
                    </div>
                    <dl className="grid grid-cols-3 divide-x divide-plum-900/10">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col-reverse px-3 text-center sm:px-6"
                            >
                                <dt className="text-xs text-soft sm:text-sm">
                                    {stat.label}
                                </dt>
                                <dd className="font-display text-[clamp(1.75rem,3.2vw,2.625rem)] leading-tight font-medium text-plum-700 lining-nums">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="mt-9 border-t border-plum-900/10 pt-9">
                    <h3 className="font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-snug font-medium text-ink">
                        Why {site.name} is{' '}
                        <Highlight>The Perfect Choice?</Highlight>
                    </h3>
                    <ul className="mt-6 grid gap-7 md:grid-cols-3 md:gap-9">
                        {reasons.map((reason) => (
                            <li key={reason.title} className="flex gap-3.5">
                                <reason.icon
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                    className="mt-0.5 size-7 shrink-0 text-tangerine-500"
                                />
                                <div>
                                    <h4 className="text-[15px] font-semibold text-plum-900">
                                        {reason.title}
                                    </h4>
                                    <p className="mt-1 text-sm leading-relaxed text-soft">
                                        {reason.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function FeaturedProperties({ properties }: { properties: Property[] }) {
    return (
        <section className="site-container pb-12">
            <div className="relative">
                <SectionHeading
                    eyebrow="Featured Properties"
                    title="Find Your Perfect Property"
                />
                <Link
                    href={propertiesIndex()}
                    className="group mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-plum-700 lg:absolute lg:right-0 lg:bottom-2 lg:mt-0"
                >
                    View All Properties
                    <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                    >
                        →
                    </span>
                </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
                {properties.length < 3 && <ValuationCard />}
            </div>
        </section>
    );
}

function Specialisms() {
    return (
        <section className="site-container pt-12 pb-14 lg:pb-16">
            <DisplayHeading className="text-center">
                Your property journey starts here.
            </DisplayHeading>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {specialisms.map((specialism) => (
                    <li key={specialism.hash}>
                        <Link
                            href={`${services.url()}#${specialism.hash}`}
                            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[14px] p-5 sm:aspect-[3/4]"
                        >
                            <img
                                src={specialism.image}
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,14,54,0)_32%,rgba(27,14,54,0.9)_100%)]"
                            />
                            <span className="relative font-display text-xl leading-snug font-medium text-white">
                                {specialism.title}
                            </span>
                            <span className="relative mt-1.5 text-[13px] leading-relaxed text-white/85">
                                {specialism.description}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function ChannelPartners() {
    return (
        <section className="site-container pb-14 lg:pb-16">
            <Eyebrow centered>Our Channel Partners</Eyebrow>
            <ul className="mt-6 grid grid-cols-2 border-t border-l border-hairline sm:grid-cols-3 md:grid-cols-5">
                {channelPartners.map((partner) => (
                    <li
                        key={partner.logo}
                        className="flex h-[84px] items-center justify-center border-r border-b border-hairline"
                    >
                        <img
                            src={`/images/partners/${partner.logo}.webp`}
                            alt={partner.name}
                            loading="lazy"
                            width={100}
                            height={50}
                            className="mix-blend-multiply"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function Home({
    featuredProperties,
    budgets,
}: {
    featuredProperties: Property[];
    budgets: SelectOption[];
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
            <FeaturedProperties properties={featuredProperties} />
            <WhoWeAre />
            <Specialisms />
            <ChannelPartners />
            <CtaBand />
        </>
    );
}
