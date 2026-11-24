import type { ReactNode } from 'react';
import { HeroWave } from '@/components/site/hero-wave';
import { Eyebrow } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

/**
 * The opening band of an inner page, carrying the homepage hero's treatment at a smaller scale.
 */
export function PageHero({
    image,
    imagePosition = 'center',
    eyebrow,
    title,
    children,
    className,
}: {
    image: string;
    imagePosition?: string;
    eyebrow?: ReactNode;
    title: ReactNode;
    children?: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cn(
                'relative isolate overflow-hidden bg-plum-950 pt-36 pb-28 sm:pt-40 sm:pb-36 lg:pt-[13.25rem] lg:pb-48',
                className,
            )}
        >
            <img
                src={image}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 -z-20 size-full object-cover"
                style={{ objectPosition: imagePosition }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.72)_0%,rgba(27,14,54,0.2)_45%,rgba(27,14,54,0.55)_100%),linear-gradient(95deg,rgba(27,14,54,0.9)_0%,rgba(37,16,75,0.74)_42%,rgba(46,23,96,0.3)_78%,rgba(46,23,96,0.16)_100%)]"
            />
            <div className="site-container">
                {eyebrow && (
                    <Eyebrow
                        tone="light"
                        className="text-[13px] font-bold tracking-[0.24em]"
                    >
                        {eyebrow}
                    </Eyebrow>
                )}
                <h1 className="mt-4 max-w-[58rem] font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-balance text-white lining-nums">
                    {title}
                </h1>
                {children && (
                    <div className="mt-5 max-w-[42rem] text-[15.5px] leading-[1.75] text-pretty text-white/90 sm:text-[17px]">
                        {children}
                    </div>
                )}
            </div>
            <HeroWave />
        </section>
    );
}
