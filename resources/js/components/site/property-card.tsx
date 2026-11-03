import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin, Maximize } from 'lucide-react';
import { show } from '@/routes/properties';
import type { Property } from '@/types/site';

function CardBadge({ children }: { children: string }) {
    return (
        <span className="absolute top-3 right-3 rounded-full bg-tangerine-500 px-3 py-1 text-xs font-semibold text-plum-950">
            {children}
        </span>
    );
}

function CardArrow() {
    return (
        <span
            aria-hidden="true"
            className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-plum-700 text-plum-700 transition-colors duration-200 group-hover:bg-plum-700 group-hover:text-white"
        >
            <ArrowRight className="size-3.5" />
        </span>
    );
}

const cardClasses =
    'group relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_14px_-4px_rgba(27,14,54,0.2)] transition-shadow duration-300 hover:shadow-[0_18px_34px_-16px_rgba(27,14,54,0.4)]';

export function PropertyCard({ property }: { property: Property }) {
    return (
        <article className={cardClasses}>
            <div className="relative aspect-[2.2/1] overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <CardBadge>{property.badge}</CardBadge>
            </div>
            <div className="flex flex-1 flex-col px-[18px] pt-3.5 pb-4">
                <p className="flex items-center gap-2.5 text-xs text-body">
                    <span className="flex items-center gap-1">
                        <MapPin
                            aria-hidden="true"
                            className="size-3.5 fill-plum-700 stroke-white"
                        />
                        {property.location}
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-soft/40" />
                    <span className="flex items-center gap-1.5">
                        {property.size_sqft !== null ? (
                            <>
                                <Maximize
                                    aria-hidden="true"
                                    className="size-3 text-soft"
                                />
                                {property.size_sqft.toLocaleString('en-US')} Sq
                                Ft
                            </>
                        ) : (
                            property.type
                        )}
                    </span>
                </p>
                <h3 className="mt-2 text-sm leading-snug font-semibold text-plum-900">
                    <Link
                        href={show(property.slug)}
                        className="after:absolute after:inset-0"
                    >
                        {property.title}
                    </Link>
                </h3>
                <div className="mt-auto flex items-center justify-between gap-3 pt-2.5">
                    <p className="text-lg font-bold tracking-[-0.01em] text-ink">
                        {property.price_label}
                    </p>
                    <CardArrow />
                </div>
            </div>
        </article>
    );
}

/**
 * Fills out a row of listings with an invitation rather than an invented property.
 */
export function ValuationCard() {
    return (
        <article className={cardClasses}>
            <div className="relative aspect-[2.2/1] overflow-hidden">
                <img
                    src="/images/services/primary-secondary.webp"
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <CardBadge>Free Valuation</CardBadge>
            </div>
            <div className="flex flex-1 flex-col px-[18px] pt-3.5 pb-4">
                <p className="text-xs text-body">
                    Have questions or need expert advice?
                </p>
                <h3 className="mt-2 text-sm leading-snug font-semibold text-plum-900">
                    <Link
                        href="/about#valuation"
                        className="after:absolute after:inset-0"
                    >
                        Request a free valuation of your property
                    </Link>
                </h3>
                <div className="mt-auto flex items-center justify-between gap-3 pt-2.5">
                    <p className="text-lg font-bold tracking-[-0.01em] text-ink">
                        Get in touch
                    </p>
                    <CardArrow />
                </div>
            </div>
        </article>
    );
}
