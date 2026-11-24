import { Link } from '@inertiajs/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { show } from '@/routes/properties';
import type { Property } from '@/types/site';

function factsFor(property: Property): string[] {
    const facts: string[] = [];

    if (property.badge !== property.type) {
        facts.push(property.type);
    }

    if (property.bedrooms !== null && !/bed/i.test(property.type)) {
        facts.push(
            property.bedrooms === 0
                ? 'Studio'
                : `${property.bedrooms} ${property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`,
        );
    }

    if (property.size_sqft !== null) {
        facts.push(`${property.size_sqft.toLocaleString('en-US')} sq ft`);
    }

    return facts.length > 0 ? facts : [property.category_label];
}

export function PropertyCard({ property }: { property: Property }) {
    return (
        <article className="group relative flex h-full flex-col">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-plum-50 shadow-[0_30px_60px_-42px_rgba(27,14,54,0.75)]">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-plum-950/55 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
                    {property.badge}
                </span>
            </div>
            <div className="flex flex-1 flex-col px-1 pt-6">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.14em] text-soft uppercase">
                    <MapPin
                        aria-hidden="true"
                        className="size-3.5 text-tangerine-600"
                    />
                    {property.location}
                </p>
                <h3 className="mt-2.5 font-display text-[clamp(1.375rem,1.8vw,1.625rem)] leading-[1.2] font-medium text-pretty text-plum-900 lining-nums transition-colors duration-300 group-hover:text-plum-600">
                    <Link
                        href={show(property.slug)}
                        className="after:absolute after:inset-0 after:rounded-[26px]"
                    >
                        {property.title}
                    </Link>
                </h3>
                <ul className="mt-3 mb-5 flex flex-wrap items-center text-[14.5px] text-body">
                    {factsFor(property).map((fact) => (
                        <li
                            key={fact}
                            className="not-first:before:mx-3 not-first:before:text-tangerine-500 not-first:before:content-['·']"
                        >
                            {fact}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-hairline pt-4">
                    <p className="text-[18px] font-semibold tracking-[-0.01em] text-plum-900 lining-nums">
                        {property.price_label}
                    </p>
                    <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-plum-100 text-plum-700 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950"
                    >
                        <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
                    </span>
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
        <article className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[26px] bg-plum-950 p-7 sm:p-8">
            <img
                src="/images/services/primary-secondary.webp"
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-20 size-full object-cover object-[62%_50%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.15)_0%,rgba(27,14,54,0.3)_30%,rgba(27,14,54,0.9)_62%,rgba(27,14,54,0.97)_100%)]"
            />
            <p className="text-[12px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                Free valuation
            </p>
            <h3 className="mt-2.5 font-display text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.18] font-medium text-balance text-white">
                <Link
                    href="/about#valuation"
                    className="after:absolute after:inset-0"
                >
                    Request a free valuation of your property
                </Link>
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-white/80">
                Have questions or need expert advice?
            </p>
            <span className="mt-6 flex items-center justify-between gap-4 border-t border-white/20 pt-4 text-[14px] font-semibold text-white">
                Get in touch
                <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950"
                >
                    <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
                </span>
            </span>
        </article>
    );
}
