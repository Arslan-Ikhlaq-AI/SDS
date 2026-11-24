import { Link, router } from '@inertiajs/react';
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Search,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { CtaBand } from '@/components/site/cta-band';
import { NativeSelect } from '@/components/site/form-controls';
import {
    SearchField,
    searchControlClasses,
} from '@/components/site/hero-search';
import { PageHero } from '@/components/site/page-hero';
import { PillAnchor, PillLink, pillClasses } from '@/components/site/pill-link';
import { PropertyCard, ValuationCard } from '@/components/site/property-card';
import { Highlight } from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { contact } from '@/routes';
import { index } from '@/routes/properties';
import type {
    PaginatedProperties,
    PropertyFilters,
    SelectOption,
} from '@/types/site';

type FilterOptions = {
    statuses: SelectOption[];
    budgets: SelectOption[];
    sorts: SelectOption[];
};

function compactFilters(
    filters: PropertyFilters,
): Record<string, string | number> {
    return Object.fromEntries(
        Object.entries(filters).filter(
            (entry): entry is [string, string | number] =>
                entry[1] !== null && entry[1] !== undefined && entry[1] !== '',
        ),
    );
}

function Pagination({ meta }: { meta: PaginatedProperties['meta'] }) {
    if (meta.last_page <= 1) {
        return null;
    }

    const lastIndex = meta.links.length - 1;

    return (
        <nav
            aria-label="Pagination"
            className="mt-16 flex flex-wrap items-center justify-center gap-1.5 border-t border-hairline pt-8"
        >
            {meta.links.map((link, position) => {
                const isPrevious = position === 0;
                const isNext = position === lastIndex;
                const content = isPrevious ? (
                    <ChevronLeft aria-hidden="true" className="size-4" />
                ) : isNext ? (
                    <ChevronRight aria-hidden="true" className="size-4" />
                ) : (
                    link.label
                );
                const label = isPrevious
                    ? 'Previous page'
                    : isNext
                      ? 'Next page'
                      : `Page ${link.label}`;
                const classes = cn(
                    'flex size-11 items-center justify-center rounded-full text-[15px] font-semibold transition-colors',
                    link.active
                        ? 'bg-plum-800 text-white'
                        : 'text-plum-800 hover:bg-plum-50',
                    link.url === null && 'pointer-events-none opacity-35',
                );

                return link.url === null ? (
                    <span key={label} aria-hidden="true" className={classes}>
                        {content}
                    </span>
                ) : (
                    <Link
                        key={label}
                        href={link.url}
                        aria-label={label}
                        aria-current={link.active ? 'page' : undefined}
                        className={classes}
                    >
                        {content}
                    </Link>
                );
            })}
        </nav>
    );
}

export default function PropertiesIndex({
    properties,
    filters,
    filterOptions,
}: {
    properties: PaginatedProperties;
    filters: PropertyFilters;
    filterOptions: FilterOptions;
}) {
    const site = useSite();
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [keyword, setKeyword] = useState(filters.keyword ?? '');

    const applyFilters = (changes: PropertyFilters): void => {
        const nextFilters = { ...currentFilters, ...changes };

        setCurrentFilters(nextFilters);
        router.get(index.url(), compactFilters(nextFilters), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const submitKeyword = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        applyFilters({ keyword });
    };

    const clearFilters = (): void => {
        setKeyword('');
        setCurrentFilters({});
        router.get(
            index.url(),
            {},
            { preserveScroll: true, preserveState: true, replace: true },
        );
    };

    const hasFilters = Object.keys(compactFilters(filters)).some(
        (name) => name !== 'sort',
    );
    const statusTabs = [{ value: '', label: 'All' }, ...filterOptions.statuses];
    const total = properties.meta.total;

    return (
        <>
            <SeoHead
                title="Properties"
                description={`Browse properties for sale and rent in Dubai with ${site.name}: apartments, villas, offices, shops, warehouses, labor camps and off-plan projects.`}
                image="/images/services/dubai-skyline.webp"
            />
            <PageHero
                image="/images/services/dubai-skyline.webp"
                imagePosition="center 52%"
                eyebrow="Properties"
                title={
                    <>
                        Find Your <Highlight>Perfect Property</Highlight>
                    </>
                }
                className="pb-40 sm:pb-44 lg:pb-60"
            >
                Apartments, villas, offices, shops, warehouses and labor camps
                across Dubai, for sale and for rent.
            </PageHero>

            <section
                aria-label="Search properties"
                className="relative z-10 site-container -mt-28 sm:-mt-28 lg:-mt-40"
            >
                <form
                    onSubmit={submitKeyword}
                    className="rounded-[32px] border border-hairline bg-white p-2.5 shadow-[0_40px_90px_-46px_rgba(27,14,54,0.6)] lg:rounded-[44px] lg:p-3.5"
                >
                    <div
                        role="group"
                        aria-label="Status"
                        className="flex flex-wrap gap-1.5 px-2 pt-1.5 pb-3 lg:px-4"
                    >
                        {statusTabs.map((status) => {
                            const isActive =
                                (currentFilters.status ?? '') === status.value;

                            return (
                                <button
                                    key={status.value}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() =>
                                        applyFilters({
                                            status: String(status.value),
                                        })
                                    }
                                    className={cn(
                                        'h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors duration-200 sm:px-5',
                                        isActive
                                            ? 'bg-plum-800 text-white'
                                            : 'text-plum-800 ring-1 ring-hairline ring-inset hover:bg-plum-50',
                                    )}
                                >
                                    {status.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="grid overflow-hidden rounded-[26px] border border-hairline p-1.5 sm:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1.25fr_auto] lg:items-center lg:rounded-full">
                        <SearchField
                            label="Property type"
                            icon={Building2}
                            withChevron
                            className="border-b border-hairline lg:border-r lg:border-b-0"
                        >
                            <select
                                value={currentFilters.type ?? ''}
                                onChange={(event) =>
                                    applyFilters({ type: event.target.value })
                                }
                                className={searchControlClasses}
                            >
                                <option value="">Any type</option>
                                {site.property_categories.map((category) => (
                                    <optgroup
                                        key={category.value}
                                        label={category.label}
                                    >
                                        <option value={category.value}>
                                            All {category.label}
                                        </option>
                                        {category.types.map((type) => (
                                            <option
                                                key={`${category.value}-${type}`}
                                                value={type}
                                            >
                                                {type}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </SearchField>
                        <SearchField
                            label="Max. budget"
                            icon={Wallet}
                            withChevron
                            className="border-b border-hairline sm:border-l lg:border-r lg:border-b-0 lg:border-l-0"
                        >
                            <select
                                value={currentFilters.max_price ?? ''}
                                onChange={(event) =>
                                    applyFilters({
                                        max_price: event.target.value,
                                    })
                                }
                                className={searchControlClasses}
                            >
                                <option value="">Any budget</option>
                                {filterOptions.budgets.map((budget) => (
                                    <option
                                        key={budget.value}
                                        value={budget.value}
                                    >
                                        {budget.label}
                                    </option>
                                ))}
                            </select>
                        </SearchField>
                        <SearchField
                            label="Location or keyword"
                            icon={MapPin}
                            className="border-b border-hairline sm:col-span-2 lg:col-span-1 lg:border-b-0"
                        >
                            <input
                                type="search"
                                value={keyword}
                                maxLength={100}
                                onChange={(event) =>
                                    setKeyword(event.target.value)
                                }
                                placeholder="Location, title or reference"
                                className={cn(
                                    searchControlClasses,
                                    'cursor-text',
                                )}
                            />
                        </SearchField>
                        <div className="p-1 sm:col-span-2 lg:col-span-1">
                            <button
                                type="submit"
                                className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-plum-600),var(--color-plum-800))] px-10 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(46,23,96,0.9)] transition-[filter] duration-200 hover:brightness-115 lg:h-[60px]"
                            >
                                <Search
                                    aria-hidden="true"
                                    className="size-[18px] transition-transform duration-300 group-hover:scale-110"
                                />
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </section>

            <section className="site-container pt-16 pb-20 lg:pt-20 lg:pb-28">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-hairline pb-6">
                    <div role="status">
                        <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.15] font-medium text-plum-900 lining-nums">
                            {total} {total === 1 ? 'property' : 'properties'}
                        </h2>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-2 cursor-pointer text-[14px] font-medium text-soft underline decoration-tangerine-500 underline-offset-4 hover:text-plum-700"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                    {properties.data.length > 0 && (
                        <label className="flex items-center gap-3 text-[14px] text-soft">
                            Sort by
                            <NativeSelect
                                value={currentFilters.sort ?? 'newest'}
                                onChange={(event) =>
                                    applyFilters({ sort: event.target.value })
                                }
                                className="h-11 min-w-52 rounded-full pl-5 text-[14px] font-medium"
                            >
                                {filterOptions.sorts.map((sort) => (
                                    <option key={sort.value} value={sort.value}>
                                        {sort.label}
                                    </option>
                                ))}
                            </NativeSelect>
                        </label>
                    )}
                </div>

                {properties.data.length > 0 ? (
                    <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:gap-x-9">
                        {properties.data.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                        {total < 3 && (
                            <div
                                className={cn(
                                    total === 2 && 'sm:max-lg:col-span-2',
                                )}
                            >
                                <ValuationCard />
                            </div>
                        )}
                    </div>
                ) : (
                    <NoProperties
                        hasFilters={hasFilters}
                        onClearFilters={clearFilters}
                    />
                )}

                <Pagination meta={properties.meta} />
            </section>

            <CtaBand />
        </>
    );
}

function NoProperties({
    hasFilters,
    onClearFilters,
}: {
    hasFilters: boolean;
    onClearFilters: () => void;
}) {
    const site = useSite();

    return (
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20 lg:py-20">
            <div>
                <p className="font-display text-[clamp(1.75rem,3vw,2.625rem)] leading-[1.15] font-medium text-balance text-plum-900">
                    {hasFilters
                        ? 'No properties match your search'
                        : 'No properties are listed right now'}
                </p>
                <p className="mt-5 max-w-lg text-[16px] leading-[1.8] text-body">
                    {hasFilters
                        ? 'Try a wider search, or tell our team what you’re looking for.'
                        : 'Tell our team what you’re looking for and we will help you find it.'}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <PillLink
                        href={contact()}
                        variant="plum"
                        className="h-12 px-7 xl:h-12 xl:px-7"
                    >
                        Talk to Our Team
                    </PillLink>
                    {hasFilters ? (
                        <button
                            type="button"
                            onClick={onClearFilters}
                            className={pillClasses(
                                'outline-plum',
                                'h-12 cursor-pointer px-7 xl:h-12 xl:px-7',
                            )}
                        >
                            Clear filters
                        </button>
                    ) : (
                        <PillAnchor
                            href={`tel:${site.phone}`}
                            variant="outline-plum"
                            className="h-12 px-7 xl:h-12 xl:px-7"
                        >
                            {site.phone_display}
                        </PillAnchor>
                    )}
                </div>
            </div>
            <img
                src="/images/services/primary-secondary.webp"
                alt=""
                className="aspect-[4/3] w-full rounded-[28px] object-cover"
            />
        </div>
    );
}
