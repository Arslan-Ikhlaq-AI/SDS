import { Form, Head, Link, router } from '@inertiajs/react';
import { ImageOff, Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/admin/empty-state';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { SelectInput } from '@/components/admin/select-input';
import { Switch } from '@/components/admin/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, edit, index } from '@/routes/admin/properties';
import { update as updatePublished } from '@/routes/admin/properties/published';
import type { AdminOption, AdminProperty, Paginated } from '@/types/admin';

export default function PropertiesIndex({
    properties,
    filters,
    statuses,
}: {
    properties: Paginated<AdminProperty>;
    filters: { status?: string | null; keyword?: string | null };
    statuses: AdminOption[];
}) {
    const isFiltered = Object.values(filters).some(Boolean);

    return (
        <>
            <Head title="Properties" />
            <div className="flex flex-1 flex-col gap-5 p-4 md:p-6">
                <PageHeader
                    title="Properties"
                    description="Switch a property on when you want it on the website."
                >
                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Add property
                        </Link>
                    </Button>
                </PageHeader>

                <Form
                    {...index.form()}
                    key={JSON.stringify(filters)}
                    className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]"
                >
                    <Input
                        type="search"
                        name="keyword"
                        aria-label="Search properties"
                        placeholder="Title, location or reference"
                        defaultValue={filters.keyword ?? ''}
                    />
                    <SelectInput
                        name="status"
                        aria-label="Listing type"
                        defaultValue={filters.status ?? ''}
                    >
                        <option value="">Any listing type</option>
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </SelectInput>
                    <div className="flex gap-2">
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                        {isFiltered && (
                            <Button variant="ghost" asChild>
                                <Link href={index()}>Clear</Link>
                            </Button>
                        )}
                    </div>
                </Form>

                {properties.data.length > 0 ? (
                    <ul className="divide-y overflow-hidden rounded-xl border bg-card">
                        {properties.data.map((property) => (
                            <PropertyRow
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </ul>
                ) : (
                    <EmptyState
                        title={
                            isFiltered
                                ? 'No matching properties'
                                : 'No properties yet'
                        }
                        description={
                            isFiltered
                                ? 'Try a different search, or clear it to see every property.'
                                : 'Add the first property to get started.'
                        }
                    />
                )}

                <Pagination page={properties} />
            </div>
        </>
    );
}

function PropertyRow({ property }: { property: AdminProperty }) {
    const setPublished = (isPublished: boolean) => {
        router.put(
            updatePublished(property.id).url,
            { is_published: isPublished },
            {
                preserveScroll: true,
                onError: (errors) => {
                    toast.error(errors.is_published ?? 'Could not be saved.');
                },
            },
        );
    };

    return (
        <li className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3.5">
            <div className="flex min-w-0 flex-1 basis-72 items-center gap-4">
                {property.images[0] ? (
                    <img
                        src={property.images[0]}
                        alt=""
                        className="h-14 w-20 shrink-0 rounded-md object-cover"
                    />
                ) : (
                    <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
                        <ImageOff className="size-5 text-muted-foreground" />
                    </span>
                )}
                <div className="min-w-0">
                    <Link
                        href={edit(property.id)}
                        className="block truncate font-medium underline-offset-4 hover:underline"
                    >
                        {property.title}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">
                        {property.reference}, {property.type},{' '}
                        {property.location}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 sm:w-60">
                <Badge variant="secondary">
                    {property.status_label ?? 'Not set'}
                </Badge>
                <span className="text-sm whitespace-nowrap">
                    {property.price_label}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <label className="flex w-36 items-center gap-2.5 text-sm whitespace-nowrap">
                    <Switch
                        checked={property.is_published}
                        onCheckedChange={setPublished}
                        aria-label={`Show ${property.title} on the website`}
                    />
                    {property.is_published ? 'On website' : 'Hidden'}
                </label>
                <Button variant="outline" size="sm" asChild>
                    <Link href={edit(property.id)}>
                        <Pencil />
                        Edit
                    </Link>
                </Button>
            </div>
        </li>
    );
}

PropertiesIndex.layout = {
    breadcrumbs: [{ title: 'Properties', href: index() }],
};
