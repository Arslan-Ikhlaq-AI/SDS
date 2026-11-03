import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The label above a heading: a tangerine rule either side when centred, one rule before it otherwise.
 */
export function Eyebrow({
    children,
    centered = false,
    tone = 'plum',
    className,
}: {
    children: ReactNode;
    centered?: boolean;
    tone?: 'plum' | 'light';
    className?: string;
}) {
    return (
        <p
            className={cn(
                'flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase',
                tone === 'plum' ? 'text-plum-800' : 'text-white',
                centered && 'justify-center',
                className,
            )}
        >
            <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-tangerine-500 sm:w-12"
            />
            {children}
            {centered && (
                <span
                    aria-hidden="true"
                    className="h-px w-8 shrink-0 bg-tangerine-500 sm:w-12"
                />
            )}
        </p>
    );
}

export function DisplayHeading({
    as: Tag = 'h2',
    className,
    children,
}: {
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    children: ReactNode;
}) {
    return (
        <Tag
            className={cn(
                'font-display text-[clamp(1.625rem,2.65vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.01em] text-ink',
                className,
            )}
        >
            {children}
        </Tag>
    );
}

export function Highlight({ children }: { children: ReactNode }) {
    return <span className="text-tangerine-500">{children}</span>;
}

export function SectionHeading({
    eyebrow,
    title,
    intro,
    className,
}: {
    eyebrow: ReactNode;
    title: ReactNode;
    intro?: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mx-auto max-w-3xl text-center', className)}>
            <Eyebrow centered>{eyebrow}</Eyebrow>
            <DisplayHeading className="mt-2.5">{title}</DisplayHeading>
            {intro && (
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-body xl:text-[15px]">
                    {intro}
                </p>
            )}
        </div>
    );
}
