import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { EmptyState } from '@/components/admin/empty-state';
import { EnquiryList } from '@/components/admin/enquiry-list';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { index as enquiriesIndex } from '@/routes/admin/enquiries';
import {
    create as createProperty,
    index as propertiesIndex,
} from '@/routes/admin/properties';
import type { AdminEnquiry } from '@/types/admin';

type Overview = {
    new_enquiries: number;
    total_enquiries: number;
    total_properties: number;
    published_properties: number;
    latest_enquiries: AdminEnquiry[];
};

export default function Dashboard({ overview }: { overview: Overview | null }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {overview === null ? (
                    <EmptyState
                        title="No admin access"
                        description="Your account is signed in, but it cannot manage the website. Ask an admin to give you access."
                    />
                ) : (
                    <AdminOverview overview={overview} />
                )}
            </div>
        </>
    );
}

function AdminOverview({ overview }: { overview: Overview }) {
    return (
        <>
            <PageHeader title="Dashboard">
                <Button asChild>
                    <Link href={createProperty()}>
                        <Plus />
                        Add property
                    </Link>
                </Button>
            </PageHeader>

            <dl className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                <Figure
                    label="New requests"
                    value={overview.new_enquiries}
                    href={enquiriesIndex({ query: { state: 'new' } })}
                />
                <Figure
                    label="All requests"
                    value={overview.total_enquiries}
                    href={enquiriesIndex()}
                />
                <Figure
                    label="Properties"
                    value={overview.total_properties}
                    href={propertiesIndex()}
                />
                <Figure
                    label="On the website"
                    value={overview.published_properties}
                    href={propertiesIndex()}
                />
            </dl>

            <section className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-semibold">Latest requests</h2>
                    <Link
                        href={enquiriesIndex()}
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                        See all
                    </Link>
                </div>
                {overview.latest_enquiries.length > 0 ? (
                    <EnquiryList enquiries={overview.latest_enquiries} />
                ) : (
                    <EmptyState
                        title="No requests yet"
                        description="Requests sent through the website forms appear here."
                    />
                )}
            </section>
        </>
    );
}

function Figure({
    label,
    value,
    href,
}: {
    label: string;
    value: number;
    href: ReturnType<typeof enquiriesIndex>;
}) {
    return (
        <div className="relative rounded-xl border bg-card p-4 hover:border-primary/40">
            <dt className="text-sm text-muted-foreground">
                <Link href={href} className="after:absolute after:inset-0">
                    {label}
                </Link>
            </dt>
            <dd className="mt-2 text-3xl font-semibold tabular-nums">
                {value}
            </dd>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
