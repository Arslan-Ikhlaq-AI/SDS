import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';

type LogoVariant = 'color' | 'light';

/**
 * The SDS monogram, drawn as one ribbon forming both S shapes with the D in tangerine.
 */
export function LogoMark({
    variant = 'color',
    className,
}: {
    variant?: LogoVariant;
    className?: string;
}) {
    const ribbon =
        variant === 'color' ? 'var(--color-plum-700)' : 'var(--color-white)';
    const upperStroke =
        variant === 'color'
            ? 'var(--color-plum-700)'
            : 'var(--color-tangerine-500)';
    const accent = 'var(--color-tangerine-500)';

    return (
        <svg
            viewBox="40 50 1000 345"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M50 367H345C395 367 420 335 420 297C420 258 395 226 345 226H130C90 226 70 190 70 153C70 116 90 80 130 80H555C610 80 640 110 665 150C690 195 715 226 770 226H945C990 226 1012 258 1012 297C1012 335 990 367 945 367H690"
                stroke={ribbon}
                strokeWidth="48"
            />
            <path d="M690.5 343V391H645Z" fill={ribbon} />
            <path
                d="M672 102C690 72 722 56 760 56H965C1005 56 1032 86 1032 128C1015 110 992 104 965 104H748C725 104 706 114 694 128Z"
                fill={upperStroke}
            />
            <path
                d="M668 238C676 300 640 367 540 367H462"
                stroke={accent}
                strokeWidth="48"
            />
            <path d="M462.5 343V391H418Z" fill={accent} />
            <path d="M372 130H430V226C420 208 395 190 372 182Z" fill={accent} />
        </svg>
    );
}

export function Logo({
    variant = 'color',
    className,
}: {
    variant?: LogoVariant;
    className?: string;
}) {
    const site = useSite();

    return (
        <span
            role="img"
            aria-label={site.legal_name}
            className={cn('flex items-center gap-3', className)}
        >
            <LogoMark variant={variant} className="h-[33px] w-auto shrink-0" />
            <span
                className={cn(
                    'flex flex-col gap-1 leading-none',
                    variant === 'color' ? 'text-ink' : 'text-white',
                )}
            >
                <span className="text-[11.5px] font-bold tracking-[0.01em] whitespace-nowrap">
                    S D S REAL ESTATE L.L.C
                </span>
                <span
                    lang="ar"
                    dir="rtl"
                    className="text-left font-arabic text-[11.5px] font-medium whitespace-nowrap"
                >
                    {site.legal_name_arabic}
                </span>
            </span>
        </span>
    );
}
