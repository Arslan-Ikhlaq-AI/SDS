import { Link, useForm } from '@inertiajs/react';
import type { ReactNode, SubmitEvent } from 'react';
import { PhotoPicker } from '@/components/admin/photo-picker';
import { SelectInput, TextArea } from '@/components/admin/select-input';
import { Switch } from '@/components/admin/switch';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { index, store, update } from '@/routes/admin/properties';
import type { AdminOption, AdminProperty } from '@/types/admin';
import type { PropertyCategoryOption } from '@/types/site';

type PropertyFormData = {
    title: string;
    reference: string;
    status: string;
    category: string;
    type: string;
    price: string;
    payment_plan: string;
    size_sqft: string;
    land_area_sqft: string;
    bedrooms: string;
    location: string;
    map_url: string;
    highlights: string;
    features: string;
    is_published: boolean;
    kept_images: string[];
    photos: File[];
};

export function PropertyForm({
    property,
    statuses,
    categories,
}: {
    property?: AdminProperty;
    statuses: AdminOption[];
    categories: PropertyCategoryOption[];
}) {
    const form = useForm<PropertyFormData>({
        title: property?.title ?? '',
        reference: property?.reference ?? '',
        status: property?.status ?? '',
        category: property?.category ?? categories[0].value,
        type: property?.type ?? '',
        price: toText(property?.price),
        payment_plan: property?.payment_plan ?? '',
        size_sqft: toText(property?.size_sqft),
        land_area_sqft: toText(property?.land_area_sqft),
        bedrooms: toText(property?.bedrooms),
        location: property?.location ?? '',
        map_url: property?.map_url ?? '',
        highlights: property?.highlights.join('\n') ?? '',
        features: property?.features.join('\n') ?? '',
        is_published: property?.is_published ?? false,
        kept_images: property?.images ?? [],
        photos: [],
    });
    const { data, setData, errors, clearErrors } = form;

    const change = <Field extends keyof PropertyFormData>(
        field: Field,
        value: PropertyFormData[Field],
    ) => {
        setData((values) => ({ ...values, [field]: value }));
        clearErrors(
            ...(Object.keys(errors) as (keyof PropertyFormData)[]).filter(
                (key) =>
                    key === field ||
                    String(key).startsWith(`${field}.`) ||
                    (field === 'kept_images' && key === 'photos'),
            ),
        );
    };

    const types =
        categories.find((category) => category.value === data.category)
            ?.types ?? [];

    const photoError = Object.entries(errors).find(
        ([field]) =>
            field.startsWith('photos') || field.startsWith('kept_images'),
    )?.[1];

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Browsers only send files with POST, so an edit is a POST marked as PUT.
        form.transform((values) => ({
            ...values,
            ...(property ? { _method: 'put' } : {}),
        }));

        form.post(property ? update(property.id).url : store().url, {
            forceFormData: true,
            preserveScroll: 'errors',
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6" noValidate>
            <Section title="Listing">
                <Field
                    label="Title"
                    id="title"
                    error={errors.title}
                    className="sm:col-span-2"
                    required
                >
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(event) =>
                            change('title', event.target.value)
                        }
                        placeholder="2 bedroom apartment in Al Nahda"
                        aria-invalid={Boolean(errors.title)}
                    />
                </Field>
                <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-sm font-medium">
                        Listing type <RequiredMark />
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <label
                                key={status.value}
                                className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value={status.value}
                                    checked={data.status === status.value}
                                    onChange={() =>
                                        change('status', status.value)
                                    }
                                    className="sr-only"
                                />
                                {status.label}
                            </label>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.status} />
                </fieldset>
                <Field
                    label="Category"
                    id="category"
                    error={errors.category}
                    required
                >
                    <SelectInput
                        id="category"
                        value={data.category}
                        onChange={(event) =>
                            setData((values) => ({
                                ...values,
                                category: event.target.value,
                                type: '',
                            }))
                        }
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </SelectInput>
                </Field>
                <Field
                    label="Property type"
                    id="type"
                    error={errors.type}
                    required
                >
                    <SelectInput
                        id="type"
                        value={data.type}
                        onChange={(event) => change('type', event.target.value)}
                        aria-invalid={Boolean(errors.type)}
                    >
                        <option value="">Choose a type</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </SelectInput>
                </Field>
                <Field
                    label="Location"
                    id="location"
                    error={errors.location}
                    required
                >
                    <Input
                        id="location"
                        value={data.location}
                        onChange={(event) =>
                            change('location', event.target.value)
                        }
                        placeholder="Arjan, Dubai"
                        aria-invalid={Boolean(errors.location)}
                    />
                </Field>
                <Field
                    label="Google Maps link"
                    id="map_url"
                    error={errors.map_url}
                >
                    <Input
                        id="map_url"
                        type="url"
                        value={data.map_url}
                        onChange={(event) =>
                            change('map_url', event.target.value)
                        }
                        placeholder="https://maps.google.com/…"
                        aria-invalid={Boolean(errors.map_url)}
                    />
                </Field>
                <Field
                    label="Reference"
                    id="reference"
                    error={errors.reference}
                    hint="Leave empty to get the next number."
                >
                    <Input
                        id="reference"
                        value={data.reference}
                        onChange={(event) =>
                            change('reference', event.target.value)
                        }
                        aria-invalid={Boolean(errors.reference)}
                    />
                </Field>
            </Section>

            <Section title="Price and size">
                <Field
                    label="Price (AED)"
                    id="price"
                    error={errors.price}
                    hint="Leave empty to show “Price on request”."
                >
                    <NumberInput
                        id="price"
                        value={data.price}
                        onValueChange={(value) => change('price', value)}
                        invalid={Boolean(errors.price)}
                    />
                </Field>
                <Field
                    label="Payment plan"
                    id="payment_plan"
                    error={errors.payment_plan}
                >
                    <Input
                        id="payment_plan"
                        value={data.payment_plan}
                        onChange={(event) =>
                            change('payment_plan', event.target.value)
                        }
                        placeholder="40% x 60%"
                    />
                </Field>
                <Field
                    label="Size (sq ft)"
                    id="size_sqft"
                    error={errors.size_sqft}
                >
                    <NumberInput
                        id="size_sqft"
                        value={data.size_sqft}
                        onValueChange={(value) => change('size_sqft', value)}
                        invalid={Boolean(errors.size_sqft)}
                    />
                </Field>
                <Field
                    label="Land area (sq ft)"
                    id="land_area_sqft"
                    error={errors.land_area_sqft}
                >
                    <NumberInput
                        id="land_area_sqft"
                        value={data.land_area_sqft}
                        onValueChange={(value) =>
                            change('land_area_sqft', value)
                        }
                        invalid={Boolean(errors.land_area_sqft)}
                    />
                </Field>
                <Field label="Bedrooms" id="bedrooms" error={errors.bedrooms}>
                    <NumberInput
                        id="bedrooms"
                        value={data.bedrooms}
                        onValueChange={(value) => change('bedrooms', value)}
                        invalid={Boolean(errors.bedrooms)}
                    />
                </Field>
            </Section>

            <Section title="Description">
                <Field
                    label="Highlights"
                    id="highlights"
                    error={errors.highlights}
                    hint="One per line."
                >
                    <TextArea
                        id="highlights"
                        value={data.highlights}
                        onChange={(event) =>
                            change('highlights', event.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Features"
                    id="features"
                    error={errors.features}
                    hint="One per line, such as Gym or Parking."
                >
                    <TextArea
                        id="features"
                        value={data.features}
                        onChange={(event) =>
                            change('features', event.target.value)
                        }
                    />
                </Field>
            </Section>

            <Section title="Photos">
                <div className="sm:col-span-2">
                    <PhotoPicker
                        images={data.kept_images}
                        onImagesChange={(images) =>
                            change('kept_images', images)
                        }
                        photos={data.photos}
                        onPhotosChange={(photos) => change('photos', photos)}
                    />
                    <InputError className="mt-2" message={photoError} />
                </div>
            </Section>

            <section className="flex items-center justify-between gap-6 rounded-xl border bg-card p-5">
                <div>
                    <Label htmlFor="is_published" className="font-semibold">
                        Show on website
                    </Label>
                    <p
                        id="is_published_hint"
                        className="mt-1 text-sm text-muted-foreground"
                    >
                        When this is off, only admins can see the property.
                    </p>
                </div>
                <Switch
                    id="is_published"
                    aria-describedby="is_published_hint"
                    checked={data.is_published}
                    onCheckedChange={(checked) =>
                        change('is_published', checked)
                    }
                />
            </section>

            <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={form.processing}>
                    {form.processing && <Spinner />}
                    {property ? 'Save changes' : 'Add property'}
                </Button>
                <Button variant="ghost" asChild>
                    <Link href={index()}>Cancel</Link>
                </Button>
                {form.progress && (
                    <span className="text-sm text-muted-foreground">
                        Uploading {form.progress.percentage ?? 0}%
                    </span>
                )}
                {form.hasErrors && (
                    <p role="alert" className="text-sm text-destructive">
                        Some details need fixing. Check the messages above.
                    </p>
                )}
            </div>
        </form>
    );
}

function toText(value: number | null | undefined): string {
    return value === null || value === undefined ? '' : String(value);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">{title}</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
        </section>
    );
}

function RequiredMark() {
    return (
        <span className="text-destructive" aria-hidden="true">
            *
        </span>
    );
}

function Field({
    label,
    id,
    error,
    hint,
    required = false,
    className,
    children,
}: {
    label: string;
    id: string;
    error?: string;
    hint?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('grid content-start gap-2', className)}>
            <Label htmlFor={id}>
                {label} {required && <RequiredMark />}
            </Label>
            {children}
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            <InputError message={error} />
        </div>
    );
}

function NumberInput({
    id,
    value,
    onValueChange,
    invalid,
}: {
    id: string;
    value: string;
    onValueChange: (value: string) => void;
    invalid: boolean;
}) {
    return (
        <Input
            id={id}
            inputMode="numeric"
            value={value}
            onChange={(event) =>
                onValueChange(event.target.value.replace(/\D/g, ''))
            }
            aria-invalid={invalid}
        />
    );
}
