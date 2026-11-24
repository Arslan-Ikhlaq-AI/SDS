import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function SelectInput({ className, ...props }: ComponentProps<'select'>) {
    return (
        <select
            className={cn(
                'h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm',
                className,
            )}
            {...props}
        />
    );
}

export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
    return (
        <textarea
            className={cn(
                'min-h-28 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm',
                className,
            )}
            {...props}
        />
    );
}
