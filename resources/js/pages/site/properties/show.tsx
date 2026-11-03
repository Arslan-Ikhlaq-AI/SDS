import { Link } from '@inertiajs/react';
import {
    BedDouble,
    Building2,
    Check,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Hash,
    LandPlot,
    MapPin,
    Maximize,
    Phone,
    Tag,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { WhatsAppIcon } from '@/components/site/brand-icons';
import { PropertyEnquiryForm } from '@/components/site/enquiry-form';
import { PageHero } from '@/components/site/page-hero';
import { PillAnchor } from '@/components/site/pill-link';
import { SeoHead } from '@/components/site/seo-head';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { index } from '@/routes/properties';
import type { Property } from '@/types/site';

type OverviewItem = {
    label: string;
    value: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function formatArea(area: number): string {
    return `${area.toLocaleString('en-US')} Sq Ft`;
}

function overviewFor(property: Property): OverviewItem[] {
    const items: OverviewItem[] = [
        { label: 'Reference', value: property.reference, icon: Hash },
        { label: 'Type', value: property.type, icon: Building2 },
    ];

    if (property.status_label !== null) {
        items.push({
            label: 'Status',
            value: property.status_label,
            icon: Tag,
        });
    }

    if (property.bedrooms !== null) {
        items.push({
            label: 'Bedrooms',
            value: String(property.bedrooms),
            icon: BedDouble,
        });
    }

    if (property.size_sqft !== null) {
        items.push({
            label: 'Size',
            value: formatArea(property.size_sqft),
            icon: Maximize,
        });
    }

    if (property.land_area_sqft !== null) {
        items.push({
            label: 'Land area',
            value: formatArea(property.land_area_sqft),
            icon: LandPlot,
        });
    }

    if (property.payment_plan !== null) {
        items.push({
            label: 'Payment plan',
            value: property.payment_plan,
            icon: CreditCard,
        });
    }

    return items;
}

function Gallery({ title, images }: { title: string; images: string[] }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const lastImageIndex = images.length - 1;

    const showPrevious = (): void =>
        setActiveImageIndex((current) =>
            current === 0 ? lastImageIndex : current - 1,
        );
    const showNext = (): void =>
        setActiveImageIndex((current) =>
            current === lastImageIndex ? 0 : current + 1,
        );

    const arrowClasses =
        'absolute top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-plum-800 shadow-md transition-colors hover:bg-white';

    return (
        <div>
            <div className="relative overflow-hidden rounded-[14px] bg-plum-50">
                <img
                    src={images[activeImageIndex]}
                    alt={`${title}, photo ${activeImageIndex + 1} of ${images.length}`}
                    fetchPriority="high"
                    className="aspect-[16/10] w-full object-cover"
                />
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous photo"
                            className={cn(arrowClasses, 'left-3')}
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Next photo"
                            className={cn(arrowClasses, 'right-3')}
                        >
                            <ChevronRight
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                        <span className="absolute right-3 bottom-3 rounded-full bg-plum-950/75 px-3 py-1 text-xs font-medium text-white">
                            {activeImageIndex + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <ul className="mt-3 grid grid-cols-4 gap-2.5 sm:grid-cols-6 lg:grid-cols-7">
                    {images.map((image, position) => (
                        <li key={image}>
                            <button
                                type="button"
                                onClick={() => setActiveImageIndex(position)}
                                aria-label={`Show photo ${position + 1}`}
                                aria-current={
                                    position === activeImageIndex
                                        ? 'true'
                                        : undefined
                                }
                                className={cn(
                                    'block w-full cursor-pointer overflow-hidden rounded-lg ring-offset-2 transition-opacity',
                                    position === activeImageIndex
                                        ? 'ring-2 ring-tangerine-500'
                                        : 'opacity-75 hover:opacity-100',
                                )}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function DetailSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="border-t border-hairline pt-7">
            <h2 className="font-display text-2xl leading-snug font-medium text-ink">
                {title}
            </h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}

function CheckList({
    items,
    className,
}: {
    items: string[];
    className?: string;
}) {
    return (
        <ul className={cn('grid gap-x-8 gap-y-2.5 sm:grid-cols-2', className)}>
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-start gap-2.5 text-[15px] leading-snug text-body"
                >
                    <Check
                        aria-hidden="true"
                        strokeWidth={2.5}
                        className="mt-0.5 size-4 shrink-0 text-tangerine-600"
                    />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function AgentCard({ property }: { property: Property }) {
    const site = useSite();
    const agent = site.listing_agent;

    return (
        <aside className="rounded-[14px] bg-white p-5 shadow-[0_2px_20px_-6px_rgba(27,14,54,0.28)] sm:p-6 lg:sticky lg:top-24">
            <p className="text-[13px] text-soft">Price</p>
            <p className="text-2xl font-bold tracking-[-0.01em] text-ink">
                {property.price_label}
            </p>
            <div className="mt-4 flex items-center gap-3.5 border-t border-hairline pt-4">
                <img
                    src={agent.photo}
                    alt={agent.name}
                    loading="lazy"
                    className="size-14 rounded-full object-cover object-top"
                />
                <div>
                    <p className="font-display text-lg leading-tight font-medium text-ink">
                        {agent.name}
                    </p>
                    <p className="text-[13px] text-soft">{agent.title}</p>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
                <PillAnchor
                    href={`tel:${site.phone}`}
                    variant="outline-plum"
                    className="h-11! px-3! sm:h-11!"
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
                    className="h-11! px-3! sm:h-11!"
                >
                    <WhatsAppIcon aria-hidden="true" className="size-4" />
                    WhatsApp
                </PillAnchor>
            </div>
            <div className="mt-5 border-t border-hairline pt-5">
                <PropertyEnquiryForm property={property} />
            </div>
        </aside>
    );
}

export default function PropertyShow({ property }: { property: Property }) {
    const overview = overviewFor(property);
    const description = `${property.title}: ${property.type} in ${property.location}. ${property.price_label}.`;

    return (
        <>
            <SeoHead
                title={property.title}
                description={description}
                image={property.images[0]}
            />
            <PageHero
                image={property.images[0]}
                imagePosition="center 45%"
                eyebrow={property.badge}
                title={property.title}
                className="lg:pt-36 lg:pb-32"
            >
                <span className="flex items-center gap-2">
                    <MapPin
                        aria-hidden="true"
                        className="size-4 shrink-0 text-tangerine-400"
                    />
                    {property.location}
                </span>
            </PageHero>

            <div className="site-container pt-8 pb-16 lg:pt-10 lg:pb-24">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-soft"
                >
                    <Link href={index()} className="hover:text-plum-700">
                        Properties
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-plum-900">{property.title}</span>
                </nav>

                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
                    <div className="flex min-w-0 flex-col gap-8">
                        <Gallery
                            title={property.title}
                            images={property.images}
                        />

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                            {overview.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start gap-3"
                                >
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tile text-plum-700">
                                        <item.icon
                                            aria-hidden="true"
                                            className="size-[18px]"
                                        />
                                    </span>
                                    <div className="min-w-0">
                                        <dt className="text-xs text-soft">
                                            {item.label}
                                        </dt>
                                        <dd className="text-sm font-semibold text-plum-900">
                                            {item.value}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>

                        {property.highlights.length > 0 && (
                            <DetailSection
                                title={property.summary_title ?? 'Highlights'}
                            >
                                <CheckList items={property.highlights} />
                            </DetailSection>
                        )}

                        {property.features.length > 0 && (
                            <DetailSection title="Features">
                                <CheckList
                                    items={property.features}
                                    className="sm:grid-cols-3"
                                />
                            </DetailSection>
                        )}

                        {property.floor_plan_image !== null && (
                            <DetailSection title="Floor Plan">
                                <img
                                    src={property.floor_plan_image}
                                    alt={`Floor plan of ${property.title}`}
                                    loading="lazy"
                                    className="w-full max-w-2xl rounded-[10px] border border-hairline bg-white"
                                />
                            </DetailSection>
                        )}

                        <DetailSection title="Location">
                            <p className="flex items-center gap-2 text-[15px] text-body">
                                <MapPin
                                    aria-hidden="true"
                                    className="size-4 shrink-0 fill-plum-700 stroke-white"
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
                                    className="mt-4"
                                >
                                    Open in Google Maps
                                </PillAnchor>
                            )}
                        </DetailSection>
                    </div>

                    <AgentCard property={property} />
                </div>
            </div>
        </>
    );
}
