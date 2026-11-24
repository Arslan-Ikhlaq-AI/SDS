import { cn } from '@/lib/utils';

export function Switch({
    checked,
    onCheckedChange,
    ...props
}: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                checked ? 'bg-tangerine-500' : 'bg-muted-foreground/30',
            )}
            {...props}
        >
            <span
                className={cn(
                    'size-5 rounded-full bg-white shadow-sm transition-transform',
                    checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5',
                )}
            />
        </button>
    );
}
