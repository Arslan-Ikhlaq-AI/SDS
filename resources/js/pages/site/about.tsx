import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Award,
    Building2,
    HardHat,
    HeartHandshake,
    Mail,
    MapPin,
    Phone,
    Plus,
    ShieldCheck,
    TrendingUp,
    UserRound,
    UsersRound,
} from 'lucide-react';
import { AboutHero } from '@/components/site/about-hero';
import { CtaBand } from '@/components/site/cta-band';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { Logo, LogoMark } from '@/components/site/logo';
import { PillLink } from '@/components/site/pill-link';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { managementEnquiryUrl } from '@/lib/management-enquiry';
import { cn } from '@/lib/utils';
import { services } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

const eyebrowClasses = 'text-[13px] font-bold tracking-[0.24em]';

const headingClasses =
    'mt-4 text-[clamp(2rem,3.2vw,2.875rem)] leading-[1.12] text-balance text-plum-900';

const bodyClasses = 'text-[16px] leading-[1.8] text-pretty text-body';

const pillSizeClasses = 'h-12 px-7 xl:h-12 xl:px-7';

const medallionClasses =
    'flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))] text-white shadow-[0_16px_30px_-14px_rgba(46,23,96,0.85)]';

const serviceCards = [
    {
        title: 'Property Management',
        description:
            'We find reliable tenants, collect rent on time, look after maintenance and keep every contract and renewal in order, so your property earns while you stay free of the day-to-day.',
        image: '/images/services/dubai-skyline.webp',
        imagePosition: 'object-[64%_50%]',
        anchor: 'property-management',
        isWide: true,
    },
    {
        title: 'Labor Accommodation',
        description:
            'Labor camps and staff accommodation for rent, at prices that fit your budget.',
        image: '/images/services/labor-camps.webp',
        imagePosition: 'object-[58%_50%]',
        anchor: 'labor-accommodation',
        isWide: false,
    },
    {
        title: 'Residential & Commercial',
        description:
            'Apartments, villas, shops, offices and warehouses to lease, buy or sell.',
        image: '/images/services/dubai-night-view.webp',
        imagePosition: 'object-[50%_50%]',
        anchor: 'residential-commercial',
        isWide: false,
    },
    {
        title: 'Off-Plan Projects',
        description:
            'Invest early in Dubai’s new developments, with flexible payment plans.',
        image: '/images/services/off-plan.webp',
        imagePosition: 'object-[40%_40%]',
        anchor: 'off-plan',
        isWide: false,
    },
    {
        title: 'Primary & Secondary',
        description:
            'Brand-new homes from developers and ready resale properties.',
        image: '/images/services/primary-secondary.webp',
        imagePosition: 'object-[55%_50%]',
        anchor: 'primary-secondary',
        isWide: false,
    },
];

const reasons = [
    {
        title: 'Trustworthy',
        description:
            'Being one of the best real estate companies in Dubai, we prioritize trust in every deal. Our transparent processes and expert guidance ensure you make the right property decisions.',
        icon: ShieldCheck,
    },
    {
        title: 'Experienced',
        description:
            'We make it easy to buy and sell property in Dubai, offering expert guidance at every step. Explore the best Dubai properties for sale with a team that knows the market inside out.',
        icon: Award,
    },
    {
        title: 'Committed',
        description:
            'Our commitment goes beyond transactions—we help you find the right space. Dubai properties for sale and labor accommodation in Dubai are handled with expertise and care.',
        icon: HeartHandshake,
    },
];

const steps = [
    {
        title: 'We listen',
        description:
            'We start with your budget, your timeline and what the property has to do for you.',
    },
    {
        title: 'We advise',
        description:
            'You get honest guidance on price, location and options, with the trade-offs explained in plain words.',
    },
    {
        title: 'We arrange',
        description:
            'Viewings, negotiation, paperwork and handover are handled for you, and you are kept informed throughout.',
    },
    {
        title: 'We look after it',
        description:
            'After the keys change hands we stay on: tenants, rent, maintenance, contracts and renewals.',
    },
];

const audiences = [
    {
        title: 'Landlords & owners',
        description: 'Who want steady returns without the daily work.',
        icon: Building2,
    },
    {
        title: 'Companies & employers',
        description: 'Who need staff housing, offices or warehouses.',
        icon: HardHat,
    },
    {
        title: 'Families & professionals',
        description: 'Who are looking for the right home to rent or buy.',
        icon: UsersRound,
    },
    {
        title: 'Investors',
        description: 'Who are weighing off-plan, primary and resale property.',
        icon: TrendingUp,
    },
];

type TeamMember = {
    name: string;
    role: string;
    /** Left out until the real portrait is supplied; the frame stays blank without it. */
    photo?: string;
};

const teamMembers: TeamMember[] = [
    { name: 'Saud Abbasi', role: 'Chief Executive Officer (CEO)' },
    { name: 'Daouod Abbasi', role: 'Chief Financial Officer (CFO)' },
    { name: 'Sohaib Abbasi', role: 'Manager' },
    { name: 'Farhan Abbasi', role: 'Manager' },
    { name: 'Saddam Abbasi', role: 'Admin' },
    { name: 'Anns Abbasi', role: 'Accountant' },
];

function WhoWeAre() {
    const site = useSite();

    return (
        <section
            id="who-we-are"
            className="site-container scroll-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-24">
                <div>
                    <Eyebrow className={eyebrowClasses}>Who We Are</Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        A real estate company that stays{' '}
                        <Highlight>after the deal is done</Highlight>
                    </DisplayHeading>
                    <p className="mt-6 border-l-2 border-tangerine-500 pl-5 font-display text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.45] text-pretty text-plum-900 italic">
                        We’re not just in the business of real estate, we’re in
                        the business of helping people find the right fit.
                    </p>
                    <div className={`mt-7 flex flex-col gap-4 ${bodyClasses}`}>
                        <p>
                            At {site.name}, we believe every property decision
                            should be backed by trust and expertise. As a
                            well-established real estate company in Dubai, we
                            specialize in providing labor accommodation in Dubai
                            and offer staff accommodation in Dubai for rent that
                            balances comfort and affordability. If you want to
                            buy and sell property in Dubai, our expertise
                            ensures a smooth and successful transaction.
                        </p>
                        <p>
                            Property management is at the heart of what we do.
                            We manage property on behalf of landlords: finding
                            reliable tenants, collecting rent on time, looking
                            after maintenance and keeping every contract and
                            renewal in order. We treat your asset as if it were
                            our own.
                        </p>
                    </div>
                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                        <PillLink
                            href={services()}
                            variant="plum"
                            className={pillSizeClasses}
                        >
                            Explore Our Services
                        </PillLink>
                        <Link
                            href={propertiesIndex()}
                            className="text-[15px] font-semibold text-plum-800 underline decoration-tangerine-500 decoration-2 underline-offset-[7px] transition-colors hover:text-plum-600"
                        >
                            Browse Properties
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <img
                        src="/images/home-hero.webp"
                        alt="Contemporary villa on the Dubai waterfront at dusk"
                        loading="lazy"
                        className="aspect-[4/5] w-full rounded-[28px] object-cover object-[86%_50%] shadow-[0_40px_80px_-44px_rgba(27,14,54,0.7)]"
                    />
                    <div className="relative mx-4 -mt-28 rounded-[24px] bg-white p-6 shadow-[0_34px_70px_-40px_rgba(27,14,54,0.7)] sm:mx-8 sm:p-8">
                        <Logo />
                        <dl className="mt-6 grid gap-5 border-t border-hairline pt-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-[11.5px] font-bold tracking-[0.16em] text-tangerine-600 uppercase">
                                    Head Office
                                </dt>
                                <dd className="mt-1.5 text-[14.5px] leading-[1.6] text-plum-900">
                                    {site.address.line_one},{' '}
                                    {site.address.line_two}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] font-bold tracking-[0.16em] text-tangerine-600 uppercase">
                                    Where We Work
                                </dt>
                                <dd className="mt-1.5 text-[14.5px] leading-[1.6] text-plum-900">
                                    {site.cities.join(', ')}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}

function OurTeam() {
    const site = useSite();

    return (
        <section
            id="our-team"
            className="scroll-mt-16 border-t border-hairline bg-white pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="site-container">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <div className="max-w-[40rem]">
                        <Eyebrow className={eyebrowClasses}>Our Team</Eyebrow>
                        <DisplayHeading className={headingClasses}>
                            The people <Highlight>behind SDS</Highlight>
                        </DisplayHeading>
                    </div>
                    <p className="max-w-md text-[15px] leading-[1.8] text-soft sm:text-[16px]">
                        The people you will deal with at {site.name}, from your
                        first call to long after the keys change hands.
                    </p>
                </div>
                <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
                    {teamMembers.map((member) => (
                        <li
                            key={member.name}
                            className="group overflow-hidden rounded-[22px] border border-hairline bg-white text-center shadow-[0_24px_60px_-42px_rgba(46,23,96,0.5)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(46,23,96,0.55)] sm:rounded-[28px]"
                        >
                            <div className="relative isolate flex justify-center overflow-hidden px-5 pt-7 sm:pt-10">
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 top-0 -z-10 h-[78%] bg-[linear-gradient(150deg,var(--color-plum-700),var(--color-plum-950))]"
                                />
                                <div className="relative aspect-[4/5] w-[min(100%,12.5rem)] overflow-hidden rounded-t-[6.25rem] rounded-b-[20px] bg-plum-50 ring-[5px] ring-white sm:ring-[7px]">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            loading="lazy"
                                            className="size-full object-cover object-top"
                                        />
                                    ) : (
                                        <UserRound
                                            aria-hidden="true"
                                            strokeWidth={0.8}
                                            className="absolute inset-0 m-auto size-1/2 text-plum-600/30"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="px-3 pt-6 pb-7 sm:px-7 sm:pb-9">
                                <h3 className="font-display text-[clamp(1.1875rem,1.8vw,1.5rem)] leading-tight font-medium text-plum-900">
                                    {member.name}
                                </h3>
                                <p className="mt-2 text-[13px] leading-snug font-semibold text-tangerine-600 sm:text-[14.5px]">
                                    {member.role}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function MissionAndVision() {
    const site = useSite();

    return (
        <section
            id="mission"
            className="relative isolate scroll-mt-16 overflow-hidden bg-plum-950 py-20 text-white lg:py-28"
        >
            <LogoMark
                variant="light"
                className="pointer-events-none absolute top-1/2 -right-[12%] -z-10 w-[72%] -translate-y-1/2 opacity-[0.045]"
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_55%_60%_at_92%_0%,rgba(246,152,28,0.14),transparent_70%),radial-gradient(ellipse_60%_70%_at_0%_100%,rgba(76,45,143,0.55),transparent_72%)]"
            />
            <div className="site-container grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
                <div>
                    <Eyebrow tone="light" className={eyebrowClasses}>
                        Our Vision
                    </Eyebrow>
                    <p className="mt-6 font-display text-[clamp(1.625rem,2.7vw,2.5rem)] leading-[1.3] font-medium text-pretty text-white">
                        To be the first name people across the UAE think of when
                        a property has to be{' '}
                        <Highlight>found, sold or looked after</Highlight> with
                        care.
                    </p>
                </div>
                <div className="border-white/12 lg:border-l lg:pl-16">
                    <Eyebrow tone="light" className={eyebrowClasses}>
                        Our Mission
                    </Eyebrow>
                    <div className="mt-6 flex flex-col gap-5 text-[16px] leading-[1.8] text-pretty text-white/80">
                        <p className="text-[17px] text-white sm:text-[18px]">
                            Our mission is to make property decisions
                            effortless, rewarding, and built on trust. Searching
                            for houses for sale in Dubai or hoping to buy and
                            sell property in Dubai should be an exciting
                            journey, not a complicated process.
                        </p>
                        <p>
                            We’ve seen how confusing the real estate market can
                            be, which is why we simplify the process, offer
                            honest advice, and ensure every client walks away
                            with confidence. Every property tells a story, and
                            we are here to help you start yours the right way.
                        </p>
                        <p>
                            A living space is more than just four walls, it’s
                            where comfort, security, and a sense of belonging
                            come together. Staff accommodation in Dubai for rent
                            should feel like home, not just another temporary
                            stay. We take the time to understand needs, match
                            them with the best options, and create housing
                            solutions that truly make a difference. At{' '}
                            {site.name}, your space isn’t just a transaction,
                            it’s a part of your journey, and we are here to make
                            it a smooth one.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhatWeDo() {
    return (
        <section
            id="what-we-do"
            className="scroll-mt-16 bg-plum-50 pt-16 pb-20 lg:pt-24 lg:pb-28"
        >
            <div className="site-container">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <div className="max-w-[40rem]">
                        <Eyebrow className={eyebrowClasses}>What We Do</Eyebrow>
                        <DisplayHeading className={headingClasses}>
                            One team for every side{' '}
                            <Highlight>of your property</Highlight>
                        </DisplayHeading>
                    </div>
                    <p className="max-w-md text-[15px] leading-[1.8] text-soft sm:text-[16px]">
                        From a single apartment to a full labor camp, we manage,
                        lease, buy and sell property for owners, tenants and
                        investors.
                    </p>
                </div>

                <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
                    {serviceCards.map((card) => (
                        <li
                            key={card.title}
                            className={cn(card.isWide && 'sm:col-span-2')}
                        >
                            <Link
                                href={`${services.url()}#${card.anchor}`}
                                className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[28px] bg-plum-950 p-7 shadow-[0_30px_60px_-38px_rgba(27,14,54,0.75)] lg:min-h-[25rem] xl:p-8"
                            >
                                <img
                                    src={card.image}
                                    alt=""
                                    loading="lazy"
                                    className={cn(
                                        'absolute inset-0 -z-20 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none',
                                        card.imagePosition,
                                    )}
                                />
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.2)_0%,rgba(27,14,54,0.1)_30%,rgba(27,14,54,0.8)_64%,rgba(27,14,54,0.97)_100%)]"
                                />
                                <span
                                    aria-hidden="true"
                                    className="absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border border-white/25 bg-plum-950/40 text-white backdrop-blur-md transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950"
                                >
                                    <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
                                </span>
                                <h3 className="font-display text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.15] font-medium text-white">
                                    {card.title}
                                </h3>
                                <span
                                    aria-hidden="true"
                                    className="mt-4 h-px w-10 bg-tangerine-500 transition-[width] duration-500 ease-out group-hover:w-20"
                                />
                                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.7] text-pretty text-white/85">
                                    {card.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function WhyChooseUs() {
    const site = useSite();

    return (
        <section
            id="why-choose-us"
            className="site-container scroll-mt-16 pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="mx-auto max-w-3xl text-center">
                <Eyebrow centered className={eyebrowClasses}>
                    Our Values
                </Eyebrow>
                <DisplayHeading className={headingClasses}>
                    Why Choose <Highlight>{site.name}?</Highlight>
                </DisplayHeading>
            </div>
            <ul className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
                {reasons.map((reason) => (
                    <li
                        key={reason.title}
                        className="rounded-[28px] border border-hairline bg-white p-8 shadow-[0_24px_60px_-42px_rgba(46,23,96,0.5)] xl:p-10"
                    >
                        <span
                            className={cn(
                                medallionClasses,
                                'size-16 ring-[6px] ring-plum-50',
                            )}
                        >
                            <reason.icon
                                aria-hidden="true"
                                strokeWidth={1.5}
                                className="size-7"
                            />
                        </span>
                        <h3 className="mt-7 font-display text-[26px] leading-tight font-medium text-plum-900">
                            {reason.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-[1.75] text-pretty text-body">
                            {reason.description}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function HowWeWork() {
    return (
        <section
            id="how-we-work"
            className="site-container scroll-mt-16 pb-20 lg:pb-28"
        >
            <div className="grid overflow-hidden rounded-[34px] bg-plum-50 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="p-8 sm:p-12 lg:p-16">
                    <Eyebrow className={eyebrowClasses}>How We Work</Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        From the first call to{' '}
                        <Highlight>long after the keys</Highlight>
                    </DisplayHeading>
                    <ol className="mt-10">
                        {steps.map((step, index) => (
                            <li
                                key={step.title}
                                className="group relative flex gap-6 pb-8 last:pb-0"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute top-12 bottom-0 left-6 w-px bg-plum-100 group-last:hidden"
                                />
                                <span
                                    aria-hidden="true"
                                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-tangerine-500 bg-white font-display text-[19px] font-medium text-plum-900 lining-nums"
                                >
                                    {index + 1}
                                </span>
                                <div className="pt-1.5">
                                    <h3 className="font-display text-[22px] leading-tight font-medium text-plum-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 max-w-[34rem] text-[15px] leading-[1.75] text-pretty text-body">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-col bg-plum-700 p-8 text-white sm:p-12 lg:p-16">
                    <Eyebrow tone="light" className={eyebrowClasses}>
                        Who We Work With
                    </Eyebrow>
                    <ul className="mt-8">
                        {audiences.map((audience) => (
                            <li
                                key={audience.title}
                                className="flex items-start gap-5 border-t border-white/15 py-6 first:border-t-0 last:pb-0"
                            >
                                <audience.icon
                                    aria-hidden="true"
                                    strokeWidth={1.4}
                                    className="mt-0.5 size-7 shrink-0 text-tangerine-400"
                                />
                                <div>
                                    <h3 className="font-display text-[21px] leading-tight font-medium">
                                        {audience.title}
                                    </h3>
                                    <p className="mt-1.5 text-[15px] leading-[1.7] text-white/80">
                                        {audience.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 border-t border-white/15 pt-8 lg:mt-auto">
                        <p className="font-display text-[22px] leading-[1.4] italic">
                            You own the property.{' '}
                            <span className="text-tangerine-400">
                                We make it perform.
                            </span>
                        </p>
                        <PillLink
                            href={managementEnquiryUrl()}
                            className={`mt-6 ${pillSizeClasses}`}
                        >
                            Manage My Property
                        </PillLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Valuation() {
    const site = useSite();

    const contactDetails = [
        {
            label: 'Call us',
            value: site.phone_display,
            href: `tel:${site.phone}`,
            icon: Phone,
        },
        {
            label: 'Email us',
            value: site.email,
            href: `mailto:${site.email}`,
            icon: Mail,
        },
        {
            label: 'Visit us',
            value: `${site.address.line_one}, ${site.address.line_two}`,
            href: site.address.map_url,
            icon: MapPin,
        },
    ];

    return (
        <section
            id="valuation"
            className="scroll-mt-16 bg-plum-50 py-20 lg:py-28"
        >
            <div className="site-container grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-24">
                <div className="lg:sticky lg:top-32">
                    <Eyebrow className={eyebrowClasses}>Free Valuation</Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        Request a free valuation{' '}
                        <Highlight>of your property</Highlight>
                    </DisplayHeading>
                    <p className={`mt-5 ${bodyClasses}`}>
                        Have questions or need expert advice? Reach out to us,
                        and let’s find the perfect property solution for you.
                    </p>
                    <ul className="mt-8 border-t border-plum-100">
                        {contactDetails.map((detail) => (
                            <li
                                key={detail.label}
                                className="border-b border-plum-100"
                            >
                                <a
                                    href={detail.href}
                                    {...(detail.href.startsWith('http') && {
                                        target: '_blank',
                                        rel: 'noreferrer',
                                    })}
                                    className="group flex items-center gap-5 py-5"
                                >
                                    <span
                                        className={cn(
                                            medallionClasses,
                                            'size-12',
                                        )}
                                    >
                                        <detail.icon
                                            aria-hidden="true"
                                            strokeWidth={1.6}
                                            className="size-5"
                                        />
                                    </span>
                                    <span className="text-[13px] text-soft">
                                        {detail.label}
                                        <span className="mt-0.5 block text-[15px] leading-snug font-semibold text-plum-900 transition-colors group-hover:text-plum-600">
                                            {detail.value}
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-[28px] bg-white p-6 shadow-[0_40px_90px_-56px_rgba(27,14,54,0.6)] sm:p-10">
                    <EnquiryForm
                        source="valuation"
                        submitLabel="Request Valuation"
                    />
                </div>
            </div>
        </section>
    );
}

function CommonQuestions() {
    const site = useSite();

    const questions = [
        {
            question: `What does ${site.name} do?`,
            answer: 'We manage property on behalf of owners, and we help clients buy, sell and rent across Dubai and the neighbouring emirates. That covers apartments, villas, offices, shops, warehouses, labor camps and off-plan projects.',
        },
        {
            question: 'What is included when you manage a property?',
            answer: 'We find reliable tenants, collect rent on time, look after maintenance and keep every contract and renewal in order.',
        },
        {
            question: 'Do you arrange accommodation for company staff?',
            answer: 'Yes. Labor accommodation is one of our specialities. Tell us how many people you need to house and where they work, and we will match you with suitable labor camps or staff accommodation.',
        },
        {
            question: 'Which parts of the UAE do you cover?',
            answer: `We work in ${site.cities.slice(0, -1).join(', ')} and ${site.cities.at(-1)}. Our head office is in ${site.address.line_two}.`,
        },
        {
            question: 'How do I find out what my property is worth?',
            answer: 'Send us the details through the free valuation form on this page, or call the office, and one of our team will come back to you.',
        },
    ];

    return (
        <section
            id="questions"
            className="site-container scroll-mt-16 pt-20 pb-20 lg:pt-28 lg:pb-28"
        >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-24">
                <div>
                    <Eyebrow className={eyebrowClasses}>Good to Know</Eyebrow>
                    <DisplayHeading className={headingClasses}>
                        Common questions <Highlight>about SDS</Highlight>
                    </DisplayHeading>
                </div>
                <div className="border-t border-hairline">
                    {questions.map((item) => (
                        <details
                            key={item.question}
                            name="about-questions"
                            className="group border-b border-hairline"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.1875rem,1.6vw,1.375rem)] leading-snug font-medium text-plum-900 transition-colors hover:text-plum-600 [&::-webkit-details-marker]:hidden">
                                {item.question}
                                <Plus
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-tangerine-600 transition-transform duration-300 group-open:rotate-45"
                                />
                            </summary>
                            <p className="max-w-[42rem] pb-7 text-[15.5px] leading-[1.8] text-pretty text-body">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function About() {
    const site = useSite();

    return (
        <>
            <SeoHead
                title="About Us"
                description={`${site.name} is a well-established real estate company in Dubai, specialising in property management and labor accommodation, and in helping people buy, sell and rent property.`}
                image="/images/about-hero.webp"
            />
            <AboutHero />
            <WhoWeAre />
            <OurTeam />
            <MissionAndVision />
            <WhatWeDo />
            <WhyChooseUs />
            <HowWeWork />
            <Valuation />
            <CommonQuestions />
            <CtaBand />
        </>
    );
}
