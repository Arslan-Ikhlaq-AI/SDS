import { Link } from '@inertiajs/react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { WhatsAppIcon } from '@/components/site/brand-icons';
import { CtaBand } from '@/components/site/cta-band';
import { PropertyEnquiryForm } from '@/components/site/enquiry-form';
import { PageHero } from '@/components/site/page-hero';
import { PillAnchor } from '@/components/site/pill-link';
import { PropertyGallery } from '@/components/site/property-gallery';
import { SeoHead } from '@/components/site/seo-head';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { index } from '@/routes/properties';
import type { Property } from '@/types/site';

type OverviewItem = {
    label: string;
    value: string;
};

/**
 * How many highlights are shown before the visitor asks for the rest.
 */
const VISIBLE_HIGHLIGHTS = 12;

/**
 * The embedded map of the property's area.
 */
function areaMapEmbedUrl(location: string): string {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${location}, UAE`)}&t=m&z=14&output=embed&iwloc=near`;
}

function formatArea(area: number): string {
    return `${area.toLocaleString('en-US')} Sq Ft`;
}

function overviewFor(property: Property): OverviewItem[] {
    const items: OverviewItem[] = [
        { label: 'Reference', value: property.reference },
        { label: 'Type', value: property.type },
    ];

    if (property.status_label !== null) {
        items.push({
            label: 'Status',
            value: property.status_label,
        });
    }

    if (property.bedrooms !== null) {
        items.push({
            label: 'Bedrooms',
            value: String(property.bedrooms),
        });
    }

    if (property.size_sqft !== null) {
        items.push({
            label: 'Size',
            value: formatArea(property.size_sqft),
        });
    }

    if (property.land_area_sqft !== null) {
        items.push({
            label: 'Land area',
            value: formatArea(property.land_area_sqft),
        });
    }

    if (property.payment_plan !== null) {
        items.push({
            label: 'Payment plan',
            value: property.payment_plan,
        });
    }

    return items;
}

function DetailSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="border-t border-hairline pt-10 lg:pt-12">
            <h2 className="font-display text-[clamp(1.625rem,2.3vw,2.125rem)] leading-[1.2] font-medium text-balance text-plum-900 lining-nums">
                {title}
            </h2>
            <div className="mt-6">{children}</div>
        </section>
    );
}

function Overview({ items }: { items: OverviewItem[] }) {
    return (
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
                <div key={item.label} className="min-w-0">
                    <dt className="text-[12px] font-semibold tracking-[0.14em] text-soft uppercase">
                        {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-[20px] leading-snug font-medium text-plum-900 lining-nums">
                        {item.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function Highlights({ items }: { items: string[] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLong = items.length > VISIBLE_HIGHLIGHTS + 2;
    const visibleItems =
        isLong && !isExpanded ? items.slice(0, VISIBLE_HIGHLIGHTS) : items;

    return (
        <>
            <ul
                id="property-highlights"
                className="grid gap-x-12 gap-y-3.5 sm:grid-cols-2"
            >
                {visibleItems.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-4 text-[15.5px] leading-[1.65] text-body"
                    >
                        <span
                            aria-hidden="true"
                            className="mt-[12px] h-0.5 w-4 shrink-0 bg-tangerine-500"
                        />
                        {item.replace(/\.$/, '')}
                    </li>
                ))}
            </ul>
            {isLong && (
                <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls="property-highlights"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-7 inline-flex cursor-pointer items-center gap-2 text-[15px] font-semibold text-plum-800 underline decoration-tangerine-500 decoration-2 underline-offset-[7px] transition-colors hover:text-plum-600"
                >
                    {isExpanded
                        ? 'Show fewer'
                        : `Show all ${items.length} highlights`}
                    <ChevronDown
                        aria-hidden="true"
                        className={cn(
                            'size-4 transition-transform duration-300',
                            isExpanded && 'rotate-180',
                        )}
                    />
                </button>
            )}
        </>
    );
}

function AgentCard({ property }: { property: Property }) {
    const site = useSite();
    const agent = site.listing_agent;

    return (
        <aside className="overflow-hidden rounded-[28px] border border-hairline bg-white shadow-[0_40px_90px_-56px_rgba(27,14,54,0.6)] lg:sticky lg:top-28">
            <div className="bg-plum-900 px-7 py-7 text-white sm:px-8">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-white/65 uppercase">
                    Price
                </p>
                <p className="mt-1.5 font-display text-[clamp(1.75rem,2.4vw,2.125rem)] leading-tight font-medium lining-nums">
                    {property.price_label}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                    <PillAnchor
                        href={`tel:${site.phone}`}
                        variant="outline-light"
                        className="h-12 px-3 xl:h-12 xl:px-3"
                    >
                        <Phone aria-hidden="true" className="size-4" />
                        Call
                    </PillAnchor>
                    <PillAnchor
                        href={whatsAppUrl(
                            site,
                            `Hello, I am interested in [${property.title}] ${site.url}/properties/${property.slug}`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        variant="tangerine"
                        className="h-12 px-3 xl:h-12 xl:px-3"
                    >
                        <WhatsAppIcon aria-hidden="true" className="size-4" />
                        WhatsApp
                    </PillAnchor>
                </div>
            </div>
            <div className="px-7 pt-6 pb-8 sm:px-8">
                <div className="flex items-center gap-4 border-b border-hairline pb-6">
                    <img
                        src={agent.photo}
                        alt={agent.name}
                        loading="lazy"
                        className="size-14 rounded-full object-cover object-top"
                    />
                    <div>
                        <p className="font-display text-[19px] leading-tight font-medium text-plum-900">
                            {agent.name}
                        </p>
                        <p className="mt-0.5 text-[13.5px] text-soft">
                            {agent.title}
                        </p>
                    </div>
                </div>
                <div className="pt-6">
                    <PropertyEnquiryForm property={property} />
                </div>
            </div>
        </aside>
    );
}

export default function PropertyShow({ property }: { property: Property }) {
    const description = `${property.title}: ${property.type} in ${property.location}. ${property.price_label}.`;

    return (
        <>
            <SeoHead
                title={property.title}
                description={description}
                image={property.images[0]}
            />
            <PageHero
                image="/images/services/dubai-skyline.webp"
                imagePosition="center 52%"
                eyebrow={property.badge}
                title={property.title}
                className="pb-40 sm:pb-48 lg:pb-64"
            >
                <span className="flex items-center gap-2.5">
                    <MapPin
                        aria-hidden="true"
                        className="size-[18px] shrink-0 text-tangerine-400"
                    />
                    {property.location}
                </span>
            </PageHero>

            <div className="relative z-10 site-container -mt-32 pb-20 sm:-mt-36 lg:-mt-48 lg:pb-28">
                <PropertyGallery
                    title={property.title}
                    images={property.images}
                />

                <nav
                    aria-label="Breadcrumb"
                    className="mt-6 flex flex-wrap items-center gap-2.5 text-[14px] text-soft"
                >
                    <Link
                        href={index()}
                        className="font-medium text-plum-800 underline-offset-4 hover:underline"
                    >
                        Properties
                    </Link>
                    <span aria-hidden="true" className="text-tangerine-500">
                        /
                    </span>
                    <span>{property.title}</span>
                </nav>

                <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
                    <div className="flex min-w-0 flex-col gap-10 lg:gap-12">
                        <Overview items={overviewFor(property)} />

                        {property.highlights.length > 0 && (
                            <DetailSection
                                title={property.summary_title ?? 'Highlights'}
                            >
                                <Highlights items={property.highlights} />
                            </DetailSection>
                        )}

                        {property.features.length > 0 && (
                            <DetailSection title="Features">
                                <ul className="flex flex-wrap gap-2.5">
                                    {property.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] font-medium text-plum-900"
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </DetailSection>
                        )}

                        {property.floor_plan_image !== null && (
                            <DetailSection title="Floor Plan">
                                <img
                                    src={property.floor_plan_image}
                                    alt={`Floor plan of ${property.title}`}
                                    loading="lazy"
                                    className="w-full rounded-[28px] border border-hairline bg-white p-4 sm:p-8"
                                />
                            </DetailSection>
                        )}

                        <DetailSection title="Location">
                            <div className="overflow-hidden rounded-[28px] border border-hairline bg-white">
                                <iframe
                                    src={areaMapEmbedUrl(property.location)}
                                    title={`Map of ${property.location}`}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="block aspect-[4/3] w-full border-0 bg-plum-50 sm:aspect-[16/8]"
                                />
                                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-7">
                                    <p className="flex items-center gap-2.5 text-[16px] font-medium text-plum-900">
                                        <MapPin
                                            aria-hidden="true"
                                            className="size-[18px] shrink-0 text-tangerine-600"
                                        />
                                        {property.location}
                                    </p>
                                    {property.map_url !== null && (
                                        <PillAnchor
                                            href={property.map_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            variant="outline-plum"
                                            withArrow
                                        >
                                            Open in Google Maps
                                        </PillAnchor>
                                    )}
                                </div>
                            </div>
                        </DetailSection>
                    </div>

                    <AgentCard property={property} />
                </div>
            </div>

            <CtaBand />
        </>
    );
}
