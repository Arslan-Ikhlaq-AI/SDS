import { Form, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { pillClasses } from '@/components/site/pill-link';
import {
    HoneypotField,
    SelectField,
    TextAreaField,
    TextField,
} from '@/components/site/form-controls';
import { useSite } from '@/hooks/use-site';
import { terms } from '@/routes';
import { store } from '@/routes/enquiries';
import type { Property } from '@/types/site';

const generalRoles = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'property-owner', label: 'Property owner' },
    { value: 'agent', label: 'Agent' },
    { value: 'other', label: 'Other' },
];

const listingRoles = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'agent', label: 'Agent' },
    { value: 'other', label: 'Other' },
];

function SuccessNotice({ message }: { message: string }) {
    return (
        <p
            role="status"
            className="flex items-start gap-2.5 rounded-lg bg-plum-50 px-4 py-3 text-sm text-plum-900"
        >
            <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-tangerine-600"
            />
            {message}
        </p>
    );
}

function FormGroupLabel({ children }: { children: string }) {
    return (
        <p className="border-b border-hairline pb-2 font-display text-lg font-medium text-ink sm:col-span-2">
            {children}
        </p>
    );
}

/**
 * The full enquiry form, used for general contact and for valuation requests.
 */
export function EnquiryForm({
    source,
    submitLabel = 'Submit',
}: {
    source: 'contact' | 'valuation';
    submitLabel?: string;
}) {
    const site = useSite();

    return (
        <Form
            {...store.form()}
            resetOnSuccess
            options={{ preserveScroll: true }}
            className="relative grid gap-4 sm:grid-cols-2"
        >
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <input type="hidden" name="source" value={source} />
                    <HoneypotField />

                    <FormGroupLabel>Personal Information</FormGroupLabel>
                    <TextField
                        label="Full name"
                        name="name"
                        autoComplete="name"
                        required
                        error={errors.name}
                    />
                    <SelectField
                        label="I'm a"
                        name="role"
                        defaultValue=""
                        error={errors.role}
                    >
                        <option value="">Select</option>
                        {generalRoles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </SelectField>
                    <TextField
                        label="Email address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        error={errors.email}
                    />
                    <TextField
                        label="Phone number"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        error={errors.phone}
                    />

                    <FormGroupLabel>Property Information</FormGroupLabel>
                    <SelectField
                        label="Type"
                        name="property_type"
                        defaultValue=""
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
                        label="City"
                        name="city"
                        defaultValue=""
                        error={errors.city}
                    >
                        <option value="">Select</option>
                        {site.cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </SelectField>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="Bedrooms"
                            name="bedrooms"
                            type="number"
                            min={0}
                            max={50}
                            inputMode="numeric"
                            error={errors.bedrooms}
                        />
                        <TextField
                            label="Bathrooms"
                            name="bathrooms"
                            type="number"
                            min={0}
                            max={50}
                            inputMode="numeric"
                            error={errors.bathrooms}
                        />
                    </div>
                    <TextField
                        label="Your budget (AED)"
                        name="budget"
                        type="number"
                        min={0}
                        inputMode="numeric"
                        error={errors.budget}
                    />
                    <TextAreaField
                        label="Message"
                        name="message"
                        className="sm:col-span-2"
                        error={errors.message}
                    />

                    <div className="flex flex-col gap-4 sm:col-span-2">
                        {wasSuccessful && (
                            <SuccessNotice message="Thank you. Your details have been sent and our team will be in touch shortly." />
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className={pillClasses(
                                'plum',
                                'w-full cursor-pointer disabled:opacity-60 sm:w-fit',
                            )}
                        >
                            {processing ? 'Sending…' : submitLabel}
                        </button>
                    </div>
                </>
            )}
        </Form>
    );
}

/**
 * The short form beside a listing.
 */
export function PropertyEnquiryForm({ property }: { property: Property }) {
    return (
        <Form
            {...store.form()}
            resetOnSuccess
            options={{ preserveScroll: true }}
            className="relative flex flex-col gap-3.5"
        >
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <input type="hidden" name="source" value="property" />
                    <input
                        type="hidden"
                        name="property_id"
                        value={property.id}
                    />
                    <HoneypotField />

                    <TextField
                        label="Name"
                        name="name"
                        autoComplete="name"
                        required
                        error={errors.name}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        error={errors.phone}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        error={errors.email}
                    />
                    <SelectField
                        label="I'm a"
                        name="role"
                        defaultValue=""
                        error={errors.role}
                    >
                        <option value="">Select</option>
                        {listingRoles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </SelectField>
                    <TextAreaField
                        label="Message"
                        name="message"
                        rows={3}
                        defaultValue={`Hello, I am interested in [${property.title}]`}
                        error={errors.message}
                    />
                    {wasSuccessful && (
                        <SuccessNotice message="Thank you. Your enquiry has been sent and our team will be in touch shortly." />
                    )}
                    <button
                        type="submit"
                        disabled={processing}
                        className={pillClasses(
                            'plum',
                            'w-full cursor-pointer disabled:opacity-60',
                        )}
                    >
                        {processing ? 'Sending…' : 'Request Information'}
                    </button>
                    <p className="text-center text-xs text-soft">
                        By submitting this form I agree to{' '}
                        <Link
                            href={terms()}
                            className="underline underline-offset-2 hover:text-plum-700"
                        >
                            Terms of Use
                        </Link>
                    </p>
                </>
            )}
        </Form>
    );
}
