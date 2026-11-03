import { router } from '@inertiajs/react';
import { Building2, ChevronDown, MapPin, Search, Wallet } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, FormEvent, ReactNode, SVGProps } from 'react';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { index as propertiesIndex } from '@/routes/properties';
import type { SelectOption } from '@/types/site';

const statusOptions = [
    { value: '', label: 'All' },
    { value: 'for-sale', label: 'For Sale' },
    { value: 'for-rent', label: 'For Rent' },
];

function SearchField({
    label,
    icon: Icon,
    children,
    className,
    withChevron = false,
}: {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    children: ReactNode;
    className?: string;
    withChevron?: boolean;
}) {
    return (
        <label
            className={cn(
                'flex items-center gap-3.5 px-5 py-3.5 text-left',
                className,
            )}
        >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-700">
                <Icon aria-hidden="true" className="size-[18px]" />
            </span>
            <span className="relative min-w-0 flex-1">
                <span className="block text-[10.5px] font-semibold tracking-[0.14em] text-soft uppercase">
                    {label}
                </span>
                {children}
                {withChevron && (
                    <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-soft"
                    />
                )}
            </span>
        </label>
    );
}

const controlClasses =
    'mt-0.5 block h-7 w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-soft/70';

/**
 * The property search in the hero. It sends the visitor to the listings page with their filters applied.
 */
export function HeroSearch({
    budgets,
    className,
}: {
    budgets: SelectOption[];
    className?: string;
}) {
    const site = useSite();
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [keyword, setKeyword] = useState('');

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const query = Object.fromEntries(
            Object.entries({
                status,
                type,
                max_price: maxPrice,
                keyword: keyword.trim(),
            }).filter(([, value]) => value !== ''),
        );

        router.get(propertiesIndex.url(), query);
    };

    return (
        <form
            onSubmit={submit}
            aria-label="Search properties"
            className={cn(
                'rounded-[26px] bg-white/12 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/20 backdrop-blur-xl',
                className,
            )}
        >
            <div
                role="group"
                aria-label="Listing status"
                className="flex flex-wrap gap-1 px-1.5 pt-1 pb-2.5"
            >
                {statusOptions.map((option) => {
                    const isActive = status === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setStatus(option.value)}
                            className={cn(
                                'h-9 cursor-pointer rounded-full px-5 text-[13px] font-semibold transition-colors duration-200',
                                isActive
                                    ? 'bg-white text-plum-900 shadow-sm'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                            )}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
            <div className="grid overflow-hidden rounded-[18px] bg-white sm:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1.25fr_auto] lg:divide-x lg:divide-hairline">
                <SearchField
                    label="Property type"
                    icon={Building2}
                    withChevron
                    className="border-b border-hairline lg:border-b-0"
                >
                    <select
                        name="type"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        className={controlClasses}
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
                                {category.types.map((propertyType) => (
                                    <option
                                        key={`${category.value}-${propertyType}`}
                                        value={propertyType}
                                    >
                                        {propertyType}
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
                    className="border-b border-hairline sm:border-l lg:border-b-0 lg:border-l-0"
                >
                    <select
                        name="max_price"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        className={controlClasses}
                    >
                        <option value="">Any budget</option>
                        {budgets.map((budget) => (
                            <option key={budget.value} value={budget.value}>
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
                        name="keyword"
                        value={keyword}
                        maxLength={100}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="Arjan, Al Quoz, Marina…"
                        className={cn(controlClasses, 'cursor-text')}
                    />
                </SearchField>
                <div className="p-2 sm:col-span-2 lg:col-span-1">
                    <button
                        type="submit"
                        className="group flex h-full min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[12px] bg-tangerine-500 px-8 text-[14px] font-semibold text-plum-950 transition-colors duration-200 hover:bg-tangerine-400"
                    >
                        <Search
                            aria-hidden="true"
                            className="size-4 transition-transform duration-300 group-hover:scale-110"
                        />
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}
