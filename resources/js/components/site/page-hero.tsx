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
                'relative isolate overflow-hidden bg-plum-900 pt-32 pb-24 sm:pb-32 lg:pt-40 lg:pb-40',
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
                className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(37,16,75,0.96)_0%,rgba(46,23,96,0.9)_38%,rgba(58,29,113,0.55)_72%,rgba(58,29,113,0.3)_100%)]"
            />
            <div className="site-container">
                {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
                <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.125rem,4.4vw,3.5rem)] leading-[1.08] font-medium text-white">
                    {title}
                </h1>
                {children && (
                    <div className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
                        {children}
                    </div>
                )}
            </div>
            <HeroWave />
        </section>
    );
}
