import type { ReactNode } from 'react';

export function EmptyState({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children?: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-dashed px-6 py-14 text-center">
            <p className="font-medium">{title}</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
            {children && <div className="mt-5">{children}</div>}
        </div>
    );
}
