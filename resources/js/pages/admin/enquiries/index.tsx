import { Form, Head, Link } from '@inertiajs/react';
import { EmptyState } from '@/components/admin/empty-state';
import { EnquiryList } from '@/components/admin/enquiry-list';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { SelectInput } from '@/components/admin/select-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { index } from '@/routes/admin/enquiries';
import type { AdminEnquiry, AdminOption, Paginated } from '@/types/admin';

type Filters = {
    state?: string | null;
    purpose?: string | null;
    source?: string | null;
    keyword?: string | null;
};

const states = [
    { value: undefined, label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'handled', label: 'Handled' },
];

export default function EnquiriesIndex({
    enquiries,
    filters,
    filterOptions,
}: {
    enquiries: Paginated<AdminEnquiry>;
    filters: Filters;
    filterOptions: { purposes: AdminOption[]; sources: AdminOption[] };
}) {
    const isFiltered = Object.values(filters).some(Boolean);

    return (
        <>
            <Head title="Requests" />
            <div className="flex flex-1 flex-col gap-5 p-4 md:p-6">
                <PageHeader
                    title="Requests"
                    description="Everything sent through the website forms, newest first."
                />

                <nav
                    aria-label="Request state"
                    className="flex w-fit gap-1 rounded-lg bg-muted p-1 text-sm"
                >
                    {states.map((state) => {
                        const isCurrent =
                            (filters.state ?? undefined) === state.value;

                        return (
                            <Link
                                key={state.label}
                                href={index({
                                    query: {
                                        ...filters,
                                        state: state.value,
                                    },
                                })}
                                aria-current={isCurrent ? 'page' : undefined}
                                className={cn(
                                    'rounded-md px-3 py-1.5 font-medium',
                                    isCurrent
                                        ? 'bg-background shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                {state.label}
                            </Link>
                        );
                    })}
                </nav>

                <Form
                    {...index.form()}
                    key={JSON.stringify(filters)}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                    {filters.state && (
                        <input
                            type="hidden"
                            name="state"
                            value={filters.state}
                        />
                    )}
                    <Input
                        type="search"
                        name="keyword"
                        aria-label="Search requests"
                        placeholder="Name, phone, email or message"
                        defaultValue={filters.keyword ?? ''}
                    />
                    <SelectInput
                        name="purpose"
                        aria-label="What they want"
                        defaultValue={filters.purpose ?? ''}
                    >
                        <option value="">Any purpose</option>
                        {filterOptions.purposes.map((purpose) => (
                            <option key={purpose.value} value={purpose.value}>
                                {purpose.label}
                            </option>
                        ))}
                    </SelectInput>
                    <SelectInput
                        name="source"
                        aria-label="Which form"
                        defaultValue={filters.source ?? ''}
                    >
                        <option value="">Any form</option>
                        {filterOptions.sources.map((source) => (
                            <option key={source.value} value={source.value}>
                                {source.label}
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

                {enquiries.data.length > 0 ? (
                    <EnquiryList enquiries={enquiries.data} />
                ) : (
                    <EmptyState
                        title={
                            isFiltered
                                ? 'No matching requests'
                                : 'No requests yet'
                        }
                        description={
                            isFiltered
                                ? 'Try a different search, or clear it to see every request.'
                                : 'Requests sent through the website forms appear here.'
                        }
                    />
                )}

                <Pagination page={enquiries} />
            </div>
        </>
    );
}

EnquiriesIndex.layout = {
    breadcrumbs: [{ title: 'Requests', href: index() }],
};
