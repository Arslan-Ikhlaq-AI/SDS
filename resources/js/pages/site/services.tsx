import {
    CookingPot,
    ShieldCheck,
    ShowerHead,
    Sofa,
    UtensilsCrossed,
    WashingMachine,
    Wrench,
} from 'lucide-react';
import { CtaBand } from '@/components/site/cta-band';
import { ImageFrame } from '@/components/site/image-frame';
import { PageHero } from '@/components/site/page-hero';
import { PillLink } from '@/components/site/pill-link';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { contact } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

const laborAmenities = [
    { label: 'Spacious living area', icon: Sofa },
    { label: 'Modern Kitchen', icon: CookingPot },
    { label: 'Spacious Dining', icon: UtensilsCrossed },
    { label: 'Laundry Services', icon: WashingMachine },
    { label: 'Modern washroom', icon: ShowerHead },
    { label: '24/7 Security Service', icon: ShieldCheck },
    { label: 'Maintenance Team', icon: Wrench },
];

const propertyThumbnails = [
    { src: '/images/services/villa.webp', label: 'Villas' },
    { src: '/images/services/warehouse.webp', label: 'Warehouses' },
    { src: '/images/services/commercial.webp', label: 'Commercial' },
    { src: '/images/services/office.webp', label: 'Offices' },
];

function OffPlanSection() {
    const site = useSite();

    return (
        <section
            id="off-plan"
            className="site-container scroll-mt-24 pt-12 pb-16 lg:pt-16 lg:pb-24"
        >
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                <div>
                    <Eyebrow>Off-Plan</Eyebrow>
                    <DisplayHeading className="mt-3">
                        Off-Plan Properties in Dubai,{' '}
                        <Highlight>
                            Invest in the Future of Dubai Real Estate
                        </Highlight>
                    </DisplayHeading>
                    <div className="mt-5 flex flex-col gap-4 text-[15px] leading-[1.75] text-body">
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
                        className="mt-7"
                    >
                        View Off-Plan Properties
                    </PillLink>
                </div>
                <ImageFrame
                    src="/images/services/off-plan.webp"
                    alt="Off-plan residential tower in Dubai"
                    corner="right"
                    className="mr-3 sm:mr-3.5"
                    imageClassName="aspect-[5/4]"
                />
            </div>
            <blockquote className="mt-14 border-l-2 border-tangerine-500 pl-6 font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.4] text-ink lg:mt-20 lg:ml-[8%] lg:max-w-4xl">
                Dubai’s off-plan property market offers high-growth investment
                opportunities with flexible payment plans, competitive pricing,
                and strong capital appreciation. Whether you’re looking for your
                dream home or a high-yield investment, off-plan properties in
                Dubai provide exceptional value and long-term returns.
            </blockquote>
        </section>
    );
}

function PrimarySecondarySection() {
    const site = useSite();

    return (
        <section id="primary-secondary" className="scroll-mt-20 bg-plum-50">
            <div className="site-container grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
                <ImageFrame
                    src="/images/services/primary-secondary.webp"
                    alt="Luxury apartment buildings in Dubai"
                    className="ml-3 sm:ml-3.5"
                    imageClassName="aspect-[5/4]"
                />
                <div>
                    <Eyebrow>Primary &amp; Secondary</Eyebrow>
                    <DisplayHeading className="mt-3">
                        Exclusive Primary and Secondary Properties –{' '}
                        <Highlight>Your Dream Home Awaits in Dubai!</Highlight>
                    </DisplayHeading>
                    <p className="mt-5 text-[15px] leading-[1.75] text-body">
                        Dubai’s property market offers diverse opportunities,
                        from brand-new homes to high-value resale properties.
                        Whether you seek a modern residence or a profitable
                        investment, {site.name} ensures quality, prime
                        locations, and strong returns.
                    </p>
                    <PillLink
                        href={propertiesIndex.url({
                            query: { status: 'for-sale' },
                        })}
                        variant="plum"
                        className="mt-7"
                    >
                        Properties for Sale
                    </PillLink>
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
            className="scroll-mt-20 pt-16 lg:pt-24"
        >
            <div className="site-container">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    <div>
                        <Eyebrow>Labor Accommodation</Eyebrow>
                        <DisplayHeading className="mt-3">
                            Best Labor Accommodations{' '}
                            <Highlight>Options in Dubai</Highlight>
                        </DisplayHeading>
                    </div>
                    <div className="flex flex-col gap-4 text-[15px] leading-[1.75] text-body">
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

                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-[2fr_1fr_1fr]">
                    <img
                        src="/images/services/labor-camps.webp"
                        alt="Labor accommodation building in Dubai"
                        loading="lazy"
                        className="col-span-2 aspect-[16/9] w-full rounded-[14px] object-cover lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:h-full"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/courtyard.webp"
                        alt="Courtyard of a staff accommodation camp"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[14px] object-cover"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/kitchen.webp"
                        alt="Shared kitchen in a staff accommodation camp"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[14px] object-cover"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/laundry-row.webp"
                        alt="Row of laundry machines"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[14px] object-cover"
                    />
                    <img
                        src="/images/properties/bin-sanad-camp/washroom-corridor.webp"
                        alt="Washroom corridor"
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[14px] object-cover"
                    />
                </div>
            </div>

            <div className="mt-10 bg-plum-700 lg:mt-14">
                <div className="site-container py-11 lg:py-14">
                    <h3 className="max-w-2xl font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight font-medium text-white">
                        {site.name} goes above and beyond traditional{' '}
                        <span className="text-tangerine-400">
                            Staff Accommodation
                        </span>
                    </h3>
                    <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:grid-cols-7">
                        {laborAmenities.map((amenity) => (
                            <li
                                key={amenity.label}
                                className="flex flex-col gap-2.5 text-sm leading-snug text-white/90"
                            >
                                <amenity.icon
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                    className="size-7 text-tangerine-400"
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
            className="site-container scroll-mt-24 py-16 lg:py-24"
        >
            <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
                <div>
                    <Eyebrow>Residential &amp; Commercial</Eyebrow>
                    <DisplayHeading className="mt-3">
                        Residential and commercial apartments{' '}
                        <Highlight>shops and warehouses</Highlight>
                    </DisplayHeading>
                    <div className="mt-6 grid gap-x-10 gap-y-4 text-[15px] leading-[1.75] text-body sm:grid-cols-2">
                        <p>
                            At {site.name}, we specialize in brokerage services
                            for residential and commercial properties, including
                            apartments, shops, and warehouses. Whether you’re
                            searching for a retail space to grow your business,
                            or a warehouse for your operations, our expert team
                            connects you with the best available options.
                        </p>
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
                    <div className="mt-7 flex flex-wrap gap-3">
                        <PillLink
                            href={propertiesIndex.url({
                                query: { type: 'residential' },
                            })}
                            variant="plum"
                        >
                            Residential
                        </PillLink>
                        <PillLink
                            href={propertiesIndex.url({
                                query: { type: 'commercial' },
                            })}
                            variant="outline-plum"
                        >
                            Commercial
                        </PillLink>
                        <PillLink
                            href={contact()}
                            variant="outline-plum"
                            withArrow={false}
                        >
                            Talk to Our Team
                        </PillLink>
                    </div>
                </div>
                <ul className="grid grid-cols-2 gap-3 self-center sm:gap-4">
                    {propertyThumbnails.map((thumbnail) => (
                        <li key={thumbnail.label}>
                            <figure>
                                <img
                                    src={thumbnail.src}
                                    alt=""
                                    loading="lazy"
                                    className="aspect-[4/3] w-full rounded-[10px] object-cover"
                                />
                                <figcaption className="mt-2 text-[13px] font-semibold text-plum-900">
                                    {thumbnail.label}
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
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
                description={`Off-plan, primary and secondary properties, labor accommodation, residential and commercial brokerage in Dubai with ${site.name}.`}
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
            >
                {site.name}, The Best real estate company in Dubai, makes
                buying, selling, and renting effortless.
            </PageHero>
            <OffPlanSection />
            <PrimarySecondarySection />
            <LaborAccommodationSection />
            <ResidentialCommercialSection />
            <CtaBand />
        </>
    );
}
