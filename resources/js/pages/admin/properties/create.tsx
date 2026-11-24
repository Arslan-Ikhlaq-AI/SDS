import { Head } from '@inertiajs/react';
import { PageHeader } from '@/components/admin/page-header';
import { PropertyForm } from '@/components/admin/property-form';
import { create, index } from '@/routes/admin/properties';
import type { AdminOption } from '@/types/admin';
import type { PropertyCategoryOption } from '@/types/site';

export default function PropertyCreate({
    statuses,
    categories,
}: {
    statuses: AdminOption[];
    categories: PropertyCategoryOption[];
}) {
    return (
        <>
            <Head title="Add property" />
            <div className="flex max-w-4xl flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Add property"
                    description="It stays hidden until you switch on “Show on website”."
                />
                <PropertyForm statuses={statuses} categories={categories} />
            </div>
        </>
    );
}

PropertyCreate.layout = {
    breadcrumbs: [
        { title: 'Properties', href: index() },
        { title: 'Add property', href: create() },
    ],
};
