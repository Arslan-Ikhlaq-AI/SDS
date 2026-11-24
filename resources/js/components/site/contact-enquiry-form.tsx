import { Form, Link } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { HouseGearIcon, HouseKeyIcon } from '@/components/site/duotone-icons';
import { SuccessNotice } from '@/components/site/enquiry-form';
import {
    HoneypotField,
    SelectField,
    TextAreaField,
    TextField,
} from '@/components/site/form-controls';
import { pillClasses } from '@/components/site/pill-link';
import InputError from '@/components/input-error';
import { useSite } from '@/hooks/use-site';
import type { EnquiryDefaults } from '@/lib/management-enquiry';
import { cn } from '@/lib/utils';
import { terms } from '@/routes';
import { store } from '@/routes/enquiries';

/**
 * The two sides of the form: someone looking for a property, or someone who has one.
 */
export type EnquiryPath = 'find' | 'offer';

type Purpose = {
    value: string;
    label: string;
    amountLabel: string;
};

type PathContent = {
    title: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    purposeLabel: string;
    purposes: [Purpose, ...Purpose[]];
    detailsLabel: string;
    cityLabel: string;
    areaLabel: string;
    areaPlaceholder: string;
    dateLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
};

const paths: Record<EnquiryPath, PathContent> = {
    find: {
        title: 'I need a property',
        description: 'Rent or buy a home, office, shop or labor camp.',
        icon: HouseKeyIcon,
        purposeLabel: 'I would like to',
        purposes: [
            {
                value: 'rent',
                label: 'Rent',
                amountLabel: 'Yearly budget (AED)',
            },
            { value: 'buy', label: 'Buy', amountLabel: 'Budget (AED)' },
        ],
        detailsLabel: 'What you are looking for',
        cityLabel: 'Preferred city',
        areaLabel: 'Preferred area',
        areaPlaceholder: 'e.g. Al Quoz',
        dateLabel: 'Move-in date',
        messagePlaceholder:
            'Anything else that matters to you, such as parking or furnishing',
        submitLabel: 'Send My Request',
    },
    offer: {
        title: 'I have a property',
        description: 'Let us rent it out, manage it or sell it for you.',
        icon: HouseGearIcon,
        purposeLabel: 'I would like you to',
        purposes: [
            {
                value: 'rent-out-and-manage',
                label: 'Rent out & manage',
                amountLabel: 'Expected yearly rent (AED)',
            },
            {
                value: 'rent-out',
                label: 'Rent it out',
                amountLabel: 'Expected yearly rent (AED)',
            },
            {
                value: 'manage',
                label: 'Manage it',
                amountLabel: 'Expected yearly rent (AED)',
            },
            {
                value: 'sell',
                label: 'Sell it',
                amountLabel: 'Expected price (AED)',
            },
        ],
        detailsLabel: 'About your property',
        cityLabel: 'City',
        areaLabel: 'Area or building',
        areaPlaceholder: 'e.g. Arjan, building name',
        dateLabel: 'Available from',
        messagePlaceholder:
            'Anything we should know, such as current tenants or condition',
        submitLabel: 'Send My Property Details',
    },
};

function GroupLabel({ children }: { children: string }) {
    return (
        <h3 className="flex items-center gap-4 pt-2 font-display text-[21px] font-medium text-plum-900 after:h-px after:flex-1 after:bg-hairline sm:col-span-2">
            {children}
        </h3>
    );
}

function PathCard({
    content,
    isActive,
    onSelect,
}: {
    content: PathContent;
    isActive: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={isActive}
            onClick={onSelect}
            className={cn(
                'relative flex cursor-pointer items-center gap-4 rounded-[22px] border p-4 pr-11 text-left transition-[background-color,border-color,box-shadow] duration-300 sm:p-5 sm:pr-11',
                isActive
                    ? 'border-plum-700 bg-plum-50 shadow-[0_20px_44px_-32px_rgba(46,23,96,0.7)]'
                    : 'border-hairline bg-white hover:border-plum-600/40',
            )}
        >
            <span
                style={
                    {
                        '--icon-backdrop': 'var(--color-plum-700)',
                    } as CSSProperties
                }
                className="flex size-13 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))]"
            >
                <content.icon stroke="white" className="size-7" />
            </span>
            <span>
                <span className="block font-display text-[19px] leading-tight font-medium text-plum-900">
                    {content.title}
                </span>
                <span className="mt-1 block text-[13px] leading-normal text-body">
                    {content.description}
                </span>
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    'absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-colors duration-300',
                    isActive
                        ? 'border-tangerine-500 bg-tangerine-500 text-plum-950'
                        : 'border-plum-900/25',
                )}
            >
                {isActive && <Check strokeWidth={3} className="size-3" />}
            </span>
        </button>
    );
}

/**
 * The contact page's form. The visitor says whether they are looking for a
 * property or have one, and the questions follow from that. Answers shared by
 * both sides stay filled in when the visitor switches.
 */
export function ContactEnquiryForm({
    path,
    onPathChange,
    defaults = {},
}: {
    path: EnquiryPath;
    onPathChange: (path: EnquiryPath) => void;
    defaults?: EnquiryDefaults;
}) {
    const site = useSite();
    const [purposes, setPurposes] = useState<Record<EnquiryPath, string>>({
        find: paths.find.purposes[0].value,
        offer: defaults.purpose ?? paths.offer.purposes[0].value,
    });
    const content = paths[path];
    const purpose =
        content.purposes.find((option) => option.value === purposes[path]) ??
        content.purposes[0];

    return (
        <Form
            {...store.form()}
            resetOnSuccess
            options={{ preserveScroll: true }}
            transform={(data) => ({
                ...data,
                source: 'contact',
                purpose: purpose.value,
            })}
            className="relative grid gap-x-5 gap-y-5 sm:grid-cols-2"
        >
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <HoneypotField />

                    <div
                        role="group"
                        aria-label="How can we help you?"
                        className="grid gap-3.5 sm:col-span-2 md:grid-cols-2"
                    >
                        {(Object.keys(paths) as EnquiryPath[]).map((key) => (
                            <PathCard
                                key={key}
                                content={paths[key]}
                                isActive={key === path}
                                onSelect={() => onPathChange(key)}
                            />
                        ))}
                    </div>

                    <div className="sm:col-span-2">
                        <p
                            id="enquiry-purpose"
                            className="text-[13px] font-medium text-plum-900"
                        >
                            {content.purposeLabel}
                        </p>
                        <div
                            role="group"
                            aria-labelledby="enquiry-purpose"
                            className="mt-2 flex flex-wrap gap-2"
                        >
                            {content.purposes.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={option === purpose}
                                    onClick={() =>
                                        setPurposes({
                                            ...purposes,
                                            [path]: option.value,
                                        })
                                    }
                                    className={cn(
                                        'h-11 cursor-pointer rounded-full px-5 text-[13.5px] font-semibold transition-colors duration-200',
                                        option === purpose
                                            ? 'bg-plum-700 text-white'
                                            : 'bg-plum-50 text-plum-800 hover:bg-plum-100',
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <InputError
                            message={errors.purpose}
                            className="mt-2 text-[13px] dark:text-red-600"
                        />
                    </div>

                    <GroupLabel>{content.detailsLabel}</GroupLabel>
                    <SelectField
                        label="Property type"
                        name="property_type"
                        defaultValue={defaults.property_type ?? ''}
                        error={errors.property_type}
                    >
                        <option value="">Select</option>
                        {site.property_categories.map((category) => (
                            <optgroup
                                key={category.value}
                                label={category.label}
                            >
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
                    </SelectField>
                    <SelectField
                        label={content.cityLabel}
                        name="city"
                        defaultValue={defaults.city ?? ''}
                        error={errors.city}
                    >
                        <option value="">Select</option>
                        {site.cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </SelectField>
                    <TextField
                        label={content.areaLabel}
                        name="area"
                        maxLength={120}
                        placeholder={content.areaPlaceholder}
                        error={errors.area}
                    />
                    <div
                        className={cn(
                            'grid gap-4',
                            path === 'offer' && 'grid-cols-2',
                        )}
                    >
                        <TextField
                            label="Bedrooms"
                            name="bedrooms"
                            type="number"
                            min={0}
                            max={50}
                            inputMode="numeric"
                            error={errors.bedrooms}
                        />
                        {path === 'offer' && (
                            <TextField
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                min={0}
                                max={50}
                                inputMode="numeric"
                                error={errors.bathrooms}
                            />
                        )}
                    </div>
                    <TextField
                        label={purpose.amountLabel}
                        name="budget"
                        type="number"
                        min={0}
                        inputMode="numeric"
                        error={errors.budget}
                    />
                    <TextField
                        label={content.dateLabel}
                        name="available_from"
                        type="date"
                        error={errors.available_from}
                    />

                    <GroupLabel>Your details</GroupLabel>
                    <TextField
                        label="Full name *"
                        name="name"
                        autoComplete="name"
                        required
                        error={errors.name}
                        className="sm:col-span-2"
                    />
                    <TextField
                        label="Phone number *"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        error={errors.phone}
                    />
                    <TextField
                        label="Email address *"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        error={errors.email}
                    />
                    <TextAreaField
                        label="Message"
                        name="message"
                        className="sm:col-span-2"
                        placeholder={content.messagePlaceholder}
                        error={errors.message}
                    />

                    <div className="flex flex-col gap-4 sm:col-span-2">
                        {wasSuccessful && (
                            <SuccessNotice message="Thank you. Your details have been sent and our team will be in touch shortly." />
                        )}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className={pillClasses(
                                    'tangerine',
                                    'h-13 cursor-pointer px-8 text-[15px] disabled:opacity-60 xl:h-13 xl:px-8 xl:text-[15px]',
                                )}
                            >
                                {processing ? 'Sending…' : content.submitLabel}
                            </button>
                            <p className="text-xs leading-relaxed text-soft">
                                By submitting this form I agree to the{' '}
                                <Link
                                    href={terms()}
                                    className="underline underline-offset-2 hover:text-plum-700"
                                >
                                    Terms of Use
                                </Link>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
