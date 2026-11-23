import { router } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    ChevronDown,
    MapPin,
    Search,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, FormEvent, ReactNode, SVGProps } from 'react';
import { useSite } from '@/hooks/use-site';
import { managementEnquiryUrl } from '@/lib/management-enquiry';
import { cn } from '@/lib/utils';
import { index as propertiesIndex } from '@/routes/properties';
import type { SelectOption } from '@/types/site';

/**
 * The tabs above the fields: three listing searches, and management, which turns
 * the panel into a short request for us to take on and manage a property.
 */
const modeOptions = [
    { value: '', label: 'All' },
    { value: 'for-sale', label: 'For Sale' },
    { value: 'for-rent', label: 'For Rent' },
    { value: 'management', label: 'Management' },
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
                'flex min-w-0 items-center gap-4 px-4 py-3 text-left sm:px-5',
                className,
            )}
        >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-plum-600 shadow-[0_6px_18px_-6px_rgba(46,23,96,0.35)] ring-1 ring-plum-100">
                <Icon
                    aria-hidden="true"
                    fill="currentColor"
                    fillOpacity={0.14}
                    className="size-5"
                />
            </span>
            <span className="relative min-w-0 flex-1">
                <span className="block text-[13px] text-soft">{label}</span>
                {children}
                {withChevron && (
                    <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 bottom-1 size-4 text-ink/60"
                    />
                )}
            </span>
        </label>
    );
}

const controlClasses =
    'mt-0.5 block h-7 w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[15.5px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-soft/80';

/**
 * The property search in the hero. It sends the visitor to the listings page with
 * their filters applied, or to a ready-filled management request on the contact page.
 */
export function HeroSearch({
    budgets,
    className,
}: {
    budgets: SelectOption[];
    className?: string;
}) {
    const site = useSite();
    const [mode, setMode] = useState('');
    const [type, setType] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [keyword, setKeyword] = useState('');
    const [managedType, setManagedType] = useState('');
    const [managedCity, setManagedCity] = useState('');
    const isManagement = mode === 'management';

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (isManagement) {
            router.visit(
                managementEnquiryUrl({
                    propertyType: managedType,
                    city: managedCity,
                }),
            );

            return;
        }

        const query = Object.fromEntries(
            Object.entries({
                status: mode,
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
            aria-label={
                isManagement
                    ? 'Property management request'
                    : 'Search properties'
            }
            className={cn(
                'rounded-[32px] bg-white/12 p-2 shadow-[0_40px_90px_-30px_rgba(8,3,20,0.75)] ring-1 ring-white/25 backdrop-blur-xl lg:rounded-[44px] lg:px-2.5',
                className,
            )}
        >
            <div className="flex items-center justify-between gap-4 px-2 pt-1 pb-2.5 lg:px-4">
                <div
                    role="group"
                    aria-label="What are you looking for?"
                    className="grid w-full grid-cols-2 gap-1.5 sm:flex sm:w-auto sm:flex-wrap"
                >
                    {modeOptions.map((option) => {
                        const isActive = mode === option.value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setMode(option.value)}
                                className={cn(
                                    'h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors duration-200 sm:px-5',
                                    isActive
                                        ? 'bg-white text-plum-800 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)]'
                                        : 'text-white/80 ring-1 ring-white/15 hover:bg-white/10 hover:text-white',
                                )}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
                {isManagement && (
                    <p className="hidden text-[13.5px] text-white/85 lg:block">
                        We take on your property and manage it end to end.
                    </p>
                )}
            </div>
            <div
                className={cn(
                    'grid overflow-hidden rounded-[26px] bg-white p-1.5 sm:grid-cols-2 lg:items-center lg:rounded-full',
                    isManagement
                        ? 'lg:grid-cols-[1fr_1fr_auto]'
                        : 'lg:grid-cols-[1.05fr_1fr_1.25fr_auto]',
                )}
            >
                {isManagement ? (
                    <>
                        <SearchField
                            label="Property type"
                            icon={Building2}
                            withChevron
                            className="border-b border-hairline lg:border-r lg:border-b-0"
                        >
                            <select
                                name="property_type"
                                value={managedType}
                                onChange={(event) =>
                                    setManagedType(event.target.value)
                                }
                                className={controlClasses}
                            >
                                <option value="">Select type</option>
                                {site.property_categories.map((category) => (
                                    <optgroup
                                        key={category.value}
                                        label={category.label}
                                    >
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
                            label="City"
                            icon={MapPin}
                            withChevron
                            className="border-b border-hairline sm:border-l lg:border-b-0 lg:border-l-0"
                        >
                            <select
                                name="city"
                                value={managedCity}
                                onChange={(event) =>
                                    setManagedCity(event.target.value)
                                }
                                className={controlClasses}
                            >
                                <option value="">Select city</option>
                                {site.cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </SearchField>
                    </>
                ) : (
                    <>
                        <SearchField
                            label="Property type"
                            icon={Building2}
                            withChevron
                            className="border-b border-hairline lg:border-r lg:border-b-0"
                        >
                            <select
                                name="type"
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
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
                            className="border-b border-hairline sm:border-l lg:border-r lg:border-b-0 lg:border-l-0"
                        >
                            <select
                                name="max_price"
                                value={maxPrice}
                                onChange={(event) =>
                                    setMaxPrice(event.target.value)
                                }
                                className={controlClasses}
                            >
                                <option value="">Any budget</option>
                                {budgets.map((budget) => (
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
                                name="keyword"
                                value={keyword}
                                maxLength={100}
                                onChange={(event) =>
                                    setKeyword(event.target.value)
                                }
                                placeholder="Arjan, Al Quoz, Marina…"
                                className={cn(controlClasses, 'cursor-text')}
                            />
                        </SearchField>
                    </>
                )}
                <div className="p-1 sm:col-span-2 lg:col-span-1">
                    <button
                        type="submit"
                        className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-plum-600),var(--color-plum-800))] px-10 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(46,23,96,0.9)] transition-[filter] duration-200 hover:brightness-115 lg:h-[60px]"
                    >
                        {isManagement ? (
                            <>
                                Get Started
                                <ArrowRight
                                    aria-hidden="true"
                                    className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                            </>
                        ) : (
                            <>
                                <Search
                                    aria-hidden="true"
                                    className="size-[18px] transition-transform duration-300 group-hover:scale-110"
                                />
                                Search
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
