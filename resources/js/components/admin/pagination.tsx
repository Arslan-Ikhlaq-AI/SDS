import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { Paginated } from '@/types/admin';

export function Pagination({
    page,
}: {
    page: Pick<Paginated<unknown>, 'links' | 'meta'>;
}) {
    if (page.meta.last_page <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Pages"
            className="flex items-center justify-between gap-4 text-sm"
        >
            <PageLink href={page.links.prev} label="Previous" />
            <span className="text-muted-foreground">
                Page {page.meta.current_page} of {page.meta.last_page}
            </span>
            <PageLink href={page.links.next} label="Next" />
        </nav>
    );
}

function PageLink({ href, label }: { href: string | null; label: string }) {
    if (href === null) {
        return (
            <Button variant="outline" size="sm" disabled>
                {label}
            </Button>
        );
    }

    return (
        <Button variant="outline" size="sm" asChild>
            <Link href={href} preserveScroll>
                {label}
            </Link>
        </Button>
    );
}
