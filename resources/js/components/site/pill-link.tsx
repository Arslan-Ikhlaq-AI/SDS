import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PillVariant = 'tangerine' | 'plum' | 'outline-light' | 'outline-plum';

const baseClasses =
    'group/pill inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200';

const sizeClasses = 'h-10 px-[22px] text-[13px] xl:h-11 xl:px-6 xl:text-sm';

const variantClasses: Record<PillVariant, string> = {
    tangerine:
        'bg-tangerine-500 text-plum-950 hover:bg-tangerine-400 focus-visible:bg-tangerine-400',
    plum: 'bg-plum-700 text-white hover:bg-plum-800',
    'outline-light':
        'border border-white/85 text-white hover:bg-white hover:text-plum-800',
    'outline-plum':
        'border border-plum-700/30 text-plum-800 hover:border-plum-700 hover:bg-plum-700 hover:text-white',
};

function PillArrow() {
    return (
        <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5"
        />
    );
}

export function pillClasses(variant: PillVariant, className?: string): string {
    return cn(baseClasses, sizeClasses, variantClasses[variant], className);
}

export function PillLink({
    variant = 'tangerine',
    withArrow = true,
    className,
    children,
    ...props
}: InertiaLinkProps & {
    variant?: PillVariant;
    withArrow?: boolean;
    children: ReactNode;
}) {
    return (
        <Link {...props} className={pillClasses(variant, className)}>
            {children}
            {withArrow && <PillArrow />}
        </Link>
    );
}

export function PillAnchor({
    variant = 'tangerine',
    withArrow = false,
    className,
    children,
    ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: PillVariant;
    withArrow?: boolean;
    children: ReactNode;
}) {
    return (
        <a {...props} className={pillClasses(variant, className)}>
            {children}
            {withArrow && <PillArrow />}
        </a>
    );
}
