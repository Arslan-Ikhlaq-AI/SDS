import { Form, Head } from '@inertiajs/react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { PropertyForm } from '@/components/admin/property-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { destroy, index } from '@/routes/admin/properties';
import { show as showOnWebsite } from '@/routes/properties';
import type { AdminOption, AdminProperty } from '@/types/admin';
import type { PropertyCategoryOption } from '@/types/site';

export default function PropertyEdit({
    property,
    statuses,
    categories,
}: {
    property: AdminProperty;
    statuses: AdminOption[];
    categories: PropertyCategoryOption[];
}) {
    return (
        <>
            <Head title={`Edit ${property.reference}`} />
            <div className="flex max-w-4xl flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={property.title}
                    description={property.reference}
                >
                    {property.is_published && (
                        <Button variant="outline" asChild>
                            <a
                                href={showOnWebsite(property.slug).url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink />
                                View on website
                            </a>
                        </Button>
                    )}
                    <DeleteProperty property={property} />
                </PageHeader>
                <PropertyForm
                    key={property.id}
                    property={property}
                    statuses={statuses}
                    categories={categories}
                />
            </div>
        </>
    );
}

function DeleteProperty({ property }: { property: AdminProperty }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Trash2 />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete {property.reference}?</DialogTitle>
                <DialogDescription>
                    “{property.title}” and its uploaded photos will be deleted.
                    This cannot be undone. To take it off the website but keep
                    it, switch off “Show on website” instead.
                </DialogDescription>
                <Form {...destroy.form(property.id)}>
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                Delete property
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

PropertyEdit.layout = {
    breadcrumbs: [
        { title: 'Properties', href: index() },
        { title: 'Edit property', href: index() },
    ],
};
