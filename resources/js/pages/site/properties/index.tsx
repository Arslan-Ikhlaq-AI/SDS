import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { CtaBand } from '@/components/site/cta-band';
import { NativeSelect } from '@/components/site/form-controls';
import { PageHero } from '@/components/site/page-hero';
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

function FilterLabel({ children }: { children: string }) {
    return (
        <span className="mb-1.5 block text-[13px] font-medium text-plum-900">
            {children}
        </span>
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
            className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
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
                    'flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    link.active
                        ? 'bg-plum-700 text-white'
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
                image="/images/services/dubai-panorama.webp"
                imagePosition="center 40%"
                eyebrow="Properties"
                title={
                    <>
                        Find Your <Highlight>Perfect Property</Highlight>
                    </>
                }
                className="pb-32 sm:pb-36 lg:pb-44"
            />

            <section className="relative z-10 site-container -mt-20 sm:-mt-24 lg:-mt-28">
                <form
                    onSubmit={submitKeyword}
                    className="rounded-[14px] bg-white p-5 shadow-[0_18px_44px_-20px_rgba(27,14,54,0.4)] sm:p-6"
                >
                    <div
                        role="group"
                        aria-label="Status"
                        className="flex flex-wrap gap-1.5"
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
                                        'h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors',
                                        isActive
                                            ? 'bg-plum-700 text-white'
                                            : 'bg-plum-50 text-plum-800 hover:bg-plum-100',
                                    )}
                                >
                                    {status.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr]">
                        <label className="block">
                            <FilterLabel>Type</FilterLabel>
                            <NativeSelect
                                value={currentFilters.type ?? ''}
                                onChange={(event) =>
                                    applyFilters({ type: event.target.value })
                                }
                            >
                                <option value="">All types</option>
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
                            </NativeSelect>
                        </label>
                        <label className="block">
                            <FilterLabel>Max. budget</FilterLabel>
                            <NativeSelect
                                value={currentFilters.max_price ?? ''}
                                onChange={(event) =>
                                    applyFilters({
                                        max_price: event.target.value,
                                    })
                                }
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
                            </NativeSelect>
                        </label>
                        <label className="block sm:col-span-2 lg:col-span-1">
                            <FilterLabel>Keyword</FilterLabel>
                            <span className="flex gap-2">
                                <input
                                    type="search"
                                    value={keyword}
                                    maxLength={100}
                                    onChange={(event) =>
                                        setKeyword(event.target.value)
                                    }
                                    placeholder="Location, title or reference"
                                    className="h-12 w-full min-w-0 rounded-lg border border-plum-900/15 bg-white px-4 text-[15px] text-ink transition-colors outline-none placeholder:text-soft/70 hover:border-plum-900/30 focus:border-plum-700 focus:ring-3 focus:ring-plum-700/10"
                                />
                                <button
                                    type="submit"
                                    aria-label="Search"
                                    className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-tangerine-500 text-plum-950 transition-colors hover:bg-tangerine-400"
                                >
                                    <Search
                                        aria-hidden="true"
                                        className="size-[18px]"
                                    />
                                </button>
                            </span>
                        </label>
                    </div>
                </form>
            </section>

            <section className="site-container pt-9 pb-14 lg:pb-20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p
                        role="status"
                        className="text-sm font-medium text-plum-900"
                    >
                        {total} {total === 1 ? 'property' : 'properties'}
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="ml-3 cursor-pointer font-normal text-soft underline underline-offset-2 hover:text-plum-700"
                            >
                                Clear filters
                            </button>
                        )}
                    </p>
                    <label className="flex items-center gap-2.5 text-[13px] text-soft">
                        Sort by
                        <NativeSelect
                            value={currentFilters.sort ?? 'newest'}
                            onChange={(event) =>
                                applyFilters({ sort: event.target.value })
                            }
                            className="h-10 min-w-48 text-sm"
                        >
                            {filterOptions.sorts.map((sort) => (
                                <option key={sort.value} value={sort.value}>
                                    {sort.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </label>
                </div>

                {properties.data.length > 0 ? (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.data.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                        {properties.meta.total < 3 && <ValuationCard />}
                    </div>
                ) : (
                    <div className="mt-6 rounded-[14px] bg-plum-50 px-6 py-14 text-center">
                        <h2 className="font-display text-2xl font-medium text-ink">
                            No properties match your search
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-body">
                            Try a wider search, or{' '}
                            <Link
                                href={contact()}
                                className="font-semibold text-plum-700 underline underline-offset-2"
                            >
                                tell our team what you’re looking for
                            </Link>
                            .
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-5 h-11 cursor-pointer rounded-full bg-plum-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-plum-800"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                <Pagination meta={properties.meta} />
            </section>

            <CtaBand />
        </>
    );
}
