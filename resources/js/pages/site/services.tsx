import { Link } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUpRight,
    CookingPot,
    ShieldCheck,
    ShowerHead,
    Sofa,
    UtensilsCrossed,
    WashingMachine,
    Wrench,
} from 'lucide-react';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { PillLink } from '@/components/site/pill-link';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { managementEnquiryUrl } from '@/lib/management-enquiry';
import { contact } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

const eyebrowClasses = 'text-[13px] font-bold tracking-[0.24em]';

const headingClasses =
    'mt-4 text-[clamp(2rem,3.2vw,2.875rem)] leading-[1.12] text-balance text-plum-900';

const bodyClasses = 'text-[16px] leading-[1.8] text-pretty text-body';

const pillSizeClasses = 'h-12 px-7 xl:h-12 xl:px-7';

const sections = [
    {
        id: 'off-plan',
        label: 'Off-Plan',
        description: 'Invest early with flexible payment plans.',
    },
    {
        id: 'primary-secondary',
        label: 'Primary & Secondary',
        description: 'Brand-new homes and ready resale properties.',
    },
    {
        id: 'labor-accommodation',
        label: 'Labor Accommodation',
        description: 'Labor camps and staff housing for rent.',
    },
    {
        id: 'residential-commercial',
        label: 'Residential & Commercial',
        description: 'Apartments, shops, offices and warehouses.',
    },
];

const laborAmenities = [
    { label: 'Spacious living area', icon: Sofa },
    { label: 'Modern Kitchen', icon: CookingPot },
    { label: 'Spacious Dining', icon: UtensilsCrossed },
    { label: 'Laundry Services', icon: WashingMachine },
    { label: 'Modern washroom', icon: ShowerHead },
    { label: '24/7 Security Service', icon: ShieldCheck },
    { label: 'Maintenance Team', icon: Wrench },
];

const propertyKinds = [
    {
        label: 'Villas',
        image: '/images/services/villa.webp',
        type: 'Villa',
    },
    {
        label: 'Warehouses',
        image: '/images/services/warehouse.webp',
        type: 'Warehouses',
    },
    {
        label: 'Commercial',
        image: '/images/services/commercial.webp',
        type: 'commercial',
    },
    {
        label: 'Offices',
        image: '/images/services/office.webp',
        type: 'Offices',
    },
];

const managementDuties = [
    'We find reliable tenants',
    'We collect rent on time',
    'We look after maintenance',
    'We keep every contract and renewal in order',
];

/**
 * The page's contents, resting on the hero's edge.
 */
function SectionIndex() {
    return (
        <nav
            aria-label="Services on this page"
            className="relative z-10 site-container -mt-16 sm:-mt-20 lg:-mt-28"
        >
            <ul className="grid overflow-hidden rounded-[28px] border border-hairline bg-white shadow-[0_34px_80px_-46px_rgba(46,23,96,0.65)] sm:grid-cols-2 xl:grid-cols-4">
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className="border-hairline not-last:border-b sm:odd:border-r sm:nth-last-2:border-b-0 xl:border-b-0 xl:not-last:border-r"
                    >
                        <a
                            href={`#${section.id}`}
                            className="group flex h-full items-start justify-between gap-5 px-7 py-6 transition-colors duration-300 hover:bg-plum-50 xl:py-8"
                        >
                            <span>
                                <span className="block font-display text-[21px] leading-tight font-medium text-plum-900">
                                    {section.label}
                                </span>
                                <span className="mt-2 block text-[14px] leading-[1.6] text-soft">
                                    {section.description}
                                </span>
                            </span>
                            <ArrowDown
                                aria-hidden="true"
                                className="mt-1 size-[18px] shrink-0 text-tangerine-500 transition-transform duration-300 group-hover:translate-y-1"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function OffPlanSection() {
    const site = useSite();

    return (
        <section
            id="off-plan"
            className="scroll-mt-16 overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="site-container grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 xl:gap-24">
                <div>
                    <Eyebrow className={eyebrowClasses}>Off-Plan</Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        Off-Plan Properties in Dubai,{' '}
                        <Highlight>
                            Invest in the Future of Dubai Real Estate
                        </Highlight>
                    </DisplayHeading>
                    <div className={`mt-7 flex flex-col gap-4 ${bodyClasses}`}>
                        <p>
                            Off-plan, primary, and secondary properties open
                            doors to smart investments with high returns.
                            Off-plan properties in Dubai offer lower prices and
                            flexible payment plans, making them a great choice
                            for future gains. Primary properties for sale come
                            brand new, directly from developers, ensuring modern
                            designs and premium quality.
                        </p>
                        <p>
                            Secondary market properties provide ready-to-move-in
                            options, ideal for buyers seeking immediate
                            possession. At {site.name}, we make the right
                            approach to make your Dubai real estate investments
                            easy, secure, and profitable.
                        </p>
                    </div>
                    <PillLink
                        href={propertiesIndex.url({
                            query: { type: 'off-plan' },
                        })}
                        variant="plum"
                        className={`mt-9 ${pillSizeClasses}`}
                    >
                        View Off-Plan Properties
                    </PillLink>
                </div>
                <img
                    src="/images/services/off-plan.webp"
                    alt="Off-plan residential tower in Dubai"
                    loading="lazy"
                    className="aspect-[5/4] w-full rounded-[28px] object-cover object-[40%_50%] lg:mr-[calc(var(--site-gutter)*-1)] lg:aspect-auto lg:h-[min(40rem,46vw)] lg:w-[calc(100%+var(--site-gutter))] lg:max-w-none lg:rounded-l-[40px] lg:rounded-r-none"
                />
            </div>
            <blockquote className="site-container mt-16 lg:mt-24">
                <p className="max-w-[62rem] border-l-2 border-tangerine-500 pl-6 font-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-[1.45] text-pretty text-plum-900 italic sm:pl-9 lg:ml-auto">
                    Dubai’s off-plan property market offers high-growth
                    investment opportunities with flexible payment plans,
                    competitive pricing, and strong capital appreciation.
                    Whether you’re looking for your dream home or a high-yield
                    investment, off-plan properties in Dubai provide exceptional
                    value and long-term returns.
                </p>
            </blockquote>
        </section>
    );
}

function PrimarySecondarySection() {
    const site = useSite();

    return (
        <section
            id="primary-secondary"
            className="scroll-mt-16 bg-plum-50 pt-16 pb-20 lg:pt-24 lg:pb-28"
        >
            <div className="site-container">
                <img
                    src="/images/services/primary-secondary.webp"
                    alt="Luxury apartment buildings in Dubai"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[28px] object-cover object-[50%_62%] sm:aspect-[16/9] lg:aspect-[21/10]"
                />
                <div className="relative mx-4 -mt-12 rounded-[28px] bg-white p-7 shadow-[0_40px_90px_-56px_rgba(27,14,54,0.6)] sm:mx-10 sm:p-11 lg:mx-16 lg:-mt-32 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:p-14">
                    <div>
                        <Eyebrow className={eyebrowClasses}>
                            Primary &amp; Secondary
                        </Eyebrow>
                        <DisplayHeading className={headingClasses}>
                            Exclusive Primary and Secondary Properties{'\u00a0'}
                            –{' '}
                            <Highlight>
                                Your Dream Home Awaits in Dubai!
                            </Highlight>
                        </DisplayHeading>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        <p className={bodyClasses}>
                            Dubai’s property market offers diverse
                            opportunities, from brand-new homes to high-value
                            resale properties. Whether you seek a modern
                            residence or a profitable investment, {site.name}{' '}
                            ensures quality, prime locations, and strong
                            returns.
                        </p>
                        <PillLink
                            href={propertiesIndex.url({
                                query: { status: 'for-sale' },
                            })}
                            variant="plum"
                            className={`mt-7 ${pillSizeClasses}`}
                        >
                            Properties for Sale
                        </PillLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LaborAccommodationSection() {
    const site = useSite();

    return (
        <section
            id="labor-accommodation"
            className="scroll-mt-16 bg-plum-950 pt-20 pb-20 text-white lg:pt-28 lg:pb-28"
        >
            <div className="site-container">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
                    <div>
                        <Eyebrow tone="light" className={eyebrowClasses}>
                            Labor Accommodation
                        </Eyebrow>
                        <DisplayHeading
                            className={`${headingClasses} text-white`}
                        >
                            Best Labor Accommodations{' '}
                            <Highlight>Options in Dubai</Highlight>
                        </DisplayHeading>
                    </div>
                    <div className="flex flex-col gap-4 text-[16px] leading-[1.8] text-pretty text-white/75">
                        <p>
                            If you’re an individual or a company struggling to
                            find the right accommodation for your workers in
                            Dubai, it’s more than just finding a roof over their
                            heads. It’s about providing a space where they can
                            relax after a long day.
                        </p>
                        <p>
                            At {site.name} we have labor camps for rent and
                            staff accommodation in Dubai for rent, at an
                            extremely affordable price that fits your budget.
                            Everyone deserves a place to call home, and we’re
                            here to make that happen. Our team ensure to handle
                            the details while you focus on what truly matters,
                            growing your business and enjoying life in Dubai.
                        </p>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <img
                        src="/images/services/labor-camps.webp"
                        alt="Labor accommodation building in Dubai"
                        loading="lazy"
                        className="col-span-2 aspect-[16/10] w-full rounded-[28px] object-cover object-[50%_70%] lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:h-full"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/laundry.webp"
                        alt="Laundry machines in a staff accommodation camp"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[22px] object-cover sm:rounded-[28px]"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/kitchen.webp"
                        alt="Shared kitchen in a staff accommodation camp"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[22px] object-cover sm:rounded-[28px]"
                    />
                </div>

                <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
                    <div>
                        <h3 className="font-display text-[clamp(1.625rem,2.4vw,2.125rem)] leading-[1.2] font-medium text-balance text-white">
                            {site.name} goes above and beyond traditional{' '}
                            <Highlight>Staff Accommodation</Highlight>
                        </h3>
                        <PillLink
                            href={propertiesIndex.url({
                                query: { type: 'Labor Camp' },
                            })}
                            className={`mt-8 ${pillSizeClasses}`}
                        >
                            View Labor Camps
                        </PillLink>
                    </div>
                    <ul className="grid self-start sm:grid-cols-2 sm:gap-x-12">
                        {laborAmenities.map((amenity) => (
                            <li
                                key={amenity.label}
                                className="flex items-center gap-5 border-t border-white/12 py-4.5 text-[16px] text-white/90"
                            >
                                <amenity.icon
                                    aria-hidden="true"
                                    strokeWidth={1.4}
                                    className="size-6 shrink-0 text-tangerine-400"
                                />
                                {amenity.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function ResidentialCommercialSection() {
    const site = useSite();

    return (
        <section
            id="residential-commercial"
            className="site-container scroll-mt-16 pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 xl:gap-24">
                <div>
                    <Eyebrow className={eyebrowClasses}>
                        Residential &amp; Commercial
                    </Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        Residential and commercial apartments{' '}
                        <Highlight>shops and warehouses</Highlight>
                    </DisplayHeading>
                    <p className="mt-7 text-[17px] leading-[1.75] text-pretty text-plum-900 sm:text-[18px]">
                        At {site.name}, we specialize in managing, leasing and
                        selling residential and commercial properties, including
                        apartments, shops, and warehouses. Whether you’re
                        searching for a retail space to grow your business, or a
                        warehouse for your operations, our expert team connects
                        you with the best available options.
                    </p>
                    <div className={`mt-5 flex flex-col gap-4 ${bodyClasses}`}>
                        <p>
                            With a client-focused approach and in-depth market
                            knowledge, we ensure you secure the right property
                            at the best value. Let {site.name} handle your real
                            estate needs with professionalism and expertise.
                        </p>
                        <p>
                            {site.name} provides high-end commercial office
                            space in Dubai, tailored for businesses seeking
                            growth and prestige. Fully furnished office space
                            for rent is available in strategic locations,
                            offering modern amenities and seamless
                            accessibility. A warehouse for sale or rent ensures
                            efficient storage and logistics, meeting diverse
                            business needs.
                        </p>
                        <p>
                            Every transaction is backed by expert guidance,
                            ensuring maximum value and smooth processes. Buy and
                            sell property in Dubai with a trusted team committed
                            to securing the best deals.
                        </p>
                    </div>
                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                        <PillLink
                            href={propertiesIndex.url({
                                query: { type: 'residential' },
                            })}
                            variant="plum"
                            className={pillSizeClasses}
                        >
                            Residential
                        </PillLink>
                        <Link
                            href={contact()}
                            className="text-[15px] font-semibold text-plum-800 underline decoration-tangerine-500 decoration-2 underline-offset-[7px] transition-colors hover:text-plum-600"
                        >
                            Talk to Our Team
                        </Link>
                    </div>
                </div>

                <ul className="self-start border-t border-hairline lg:mt-9">
                    {propertyKinds.map((kind) => (
                        <li
                            key={kind.label}
                            className="border-b border-hairline"
                        >
                            <Link
                                href={propertiesIndex.url({
                                    query: { type: kind.type },
                                })}
                                className="group flex items-center gap-6 py-5"
                            >
                                <img
                                    src={kind.image}
                                    alt=""
                                    loading="lazy"
                                    className="h-[92px] w-[124px] shrink-0 rounded-[16px] object-cover"
                                />
                                <span className="flex-1 font-display text-[24px] leading-tight font-medium text-plum-900 transition-colors duration-300 group-hover:text-plum-600">
                                    {kind.label}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-plum-100 text-plum-700 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950"
                                >
                                    <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function ManagementSection() {
    return (
        <section
            id="property-management"
            className="site-container scroll-mt-20 pb-16 lg:pb-20"
        >
            <div className="grid overflow-hidden rounded-[34px] bg-plum-50 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <img
                    src="/images/services/dubai-skyline.webp"
                    alt="Downtown Dubai skyline at dusk"
                    loading="lazy"
                    className="aspect-[16/10] size-full object-cover object-[62%_50%] lg:aspect-auto"
                />
                <div className="p-8 sm:p-12 lg:p-16">
                    <Eyebrow className={eyebrowClasses}>
                        Property Management
                    </Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        You own the property.{' '}
                        <Highlight>We make it perform.</Highlight>
                    </DisplayHeading>
                    <ul className="mt-8 border-t border-plum-100 text-[16px] text-plum-900">
                        {managementDuties.map((duty) => (
                            <li
                                key={duty}
                                className="flex items-center gap-4 border-b border-plum-100 py-4"
                            >
                                <span
                                    aria-hidden="true"
                                    className="h-0.5 w-5 shrink-0 bg-tangerine-500"
                                />
                                {duty}
                            </li>
                        ))}
                    </ul>
                    <PillLink
                        href={managementEnquiryUrl()}
                        variant="plum"
                        className={`mt-9 ${pillSizeClasses}`}
                    >
                        Manage my property
                    </PillLink>
                </div>
            </div>
        </section>
    );
}

export default function Services() {
    const site = useSite();

    return (
        <>
            <SeoHead
                title="Our Services"
                description={`Off-plan, primary and secondary properties, labor accommodation, residential and commercial properties in Dubai with ${site.name}.`}
                image="/images/services/dubai-panorama.webp"
            />
            <PageHero
                image="/images/services/dubai-panorama.webp"
                imagePosition="center 40%"
                eyebrow="Our Services"
                title={
                    <>
                        Your property journey{' '}
                        <Highlight>starts here.</Highlight>
                    </>
                }
                className="pb-36 sm:pb-44 lg:pb-60"
            >
                {site.name}, The Best real estate company in Dubai, makes
                buying, selling, and renting effortless.
            </PageHero>
            <SectionIndex />
            <OffPlanSection />
            <PrimarySecondarySection />
            <LaborAccommodationSection />
            <ResidentialCommercialSection />
            <ManagementSection />
            <CtaBand />
        </>
    );
}
