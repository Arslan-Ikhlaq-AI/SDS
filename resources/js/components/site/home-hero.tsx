import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { HeroSearch } from '@/components/site/hero-search';
import { HeroWave } from '@/components/site/hero-wave';
import { Eyebrow, Highlight } from '@/components/site/section-heading';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSite } from '@/hooks/use-site';
import { index as propertiesIndex } from '@/routes/properties';
import type { SelectOption } from '@/types/site';

const POSTER = '/images/home-hero-poster.webp';

const quickLinks = [
    { label: 'Off-Plan Projects', query: { type: 'off-plan' } },
    { label: 'Labor Camps', query: { type: 'Labor Camp' } },
    { label: 'Commercial', query: { type: 'commercial' } },
    { label: 'Residential', query: { type: 'residential' } },
    { label: 'For Rent', query: { status: 'for-rent' } },
];

/**
 * The background film: a slow drift over Dubai, muted and looping, with the poster underneath
 * until it plays. Visitors who prefer reduced motion get the poster alone.
 */
function HeroFilm() {
    const [isMounted, setIsMounted] = useState(false);
    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)',
    );
    const isSmallScreen = useMediaQuery('(max-width: 767px)');

    useEffect(() => setIsMounted(true), []);

    return (
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-plum-950">
            <img
                src={POSTER}
                alt=""
                width={1920}
                height={1080}
                fetchPriority="high"
                className="absolute inset-0 size-full object-cover"
            />
            {isMounted && !prefersReducedMotion && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    preload="metadata"
                    poster={POSTER}
                    className="absolute inset-0 size-full object-cover"
                >
                    <source
                        src={
                            isSmallScreen
                                ? '/videos/dubai-hero-540.mp4'
                                : '/videos/dubai-hero.mp4'
                        }
                        type="video/mp4"
                    />
                </video>
            )}
        </div>
    );
}

export function HomeHero({ budgets }: { budgets: SelectOption[] }) {
    const site = useSite();

    return (
        <section className="relative isolate flex min-h-[calc(100svh+clamp(44px,8vw,116px))] flex-col overflow-hidden bg-plum-950 pt-[82px] lg:pt-[134px]">
            <HeroFilm />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.62)_0%,rgba(27,14,54,0.38)_38%,rgba(27,14,54,0.5)_70%,rgba(27,14,54,0.82)_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(14,7,30,0.45)_100%)]"
            />

            <div className="relative site-container flex flex-1 flex-col items-center justify-center pt-14 pb-[calc(clamp(44px,8vw,116px)+3rem)] text-center lg:pt-[clamp(1.5rem,5vh,4.5rem)] lg:pb-[calc(clamp(44px,8vw,116px)+clamp(2rem,5vh,3.5rem))]">
                <Eyebrow
                    tone="light"
                    centered
                    className="text-[13px] font-bold tracking-[0.24em] [text-shadow:0_1px_12px_rgba(14,7,30,0.7)] sm:text-[14px]"
                >
                    {site.legal_name}
                </Eyebrow>
                <h1 className="mt-4 flex flex-col items-center lg:mt-[clamp(0.625rem,1.8vh,1rem)]">
                    <span className="font-display text-[clamp(1.375rem,2.1vw,1.875rem)] font-medium text-[#ffc56f] italic [text-shadow:0_2px_18px_rgba(14,7,30,0.75)] lg:text-[clamp(1.25rem,min(2.1vw,3.6vh),1.875rem)]">
                        Welcome to {site.name},
                    </span>
                    <span className="mt-1.5 max-w-[22ch] font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-white lg:text-[clamp(2.5rem,min(4.5vw,6.2vh),4rem)]">
                        The Best Real Estate
                        <br className="hidden sm:inline" />{' '}
                        <Highlight>Agency</Highlight> in Dubai
                    </span>
                </h1>
                <p className="mt-5 max-w-[45rem] text-[15.5px] leading-[1.75] tracking-[0.005em] text-pretty text-white/90 [text-shadow:0_1px_14px_rgba(14,7,30,0.65)] sm:text-[17px] lg:mt-[clamp(0.75rem,2.2vh,1.25rem)] lg:[@media(max-height:820px)]:max-w-[54rem] lg:[@media(max-height:820px)]:text-[15.5px] lg:[@media(max-height:820px)]:leading-[1.6]">
                    <span className="font-semibold text-white">
                        {site.name}
                    </span>{' '}
                    makes real estate in Dubai effortless. Either it’s buying
                    and selling property in Dubai, exploring premium Dubai Off
                    Plan Projects, or finding labor camps, Shops, Offices,
                    Residential &amp; Commercial Apartments for rent, we bring
                    you the best deals with zero hassle.
                </p>

                <HeroSearch
                    budgets={budgets}
                    className="mt-7 w-full max-w-5xl lg:mt-[clamp(0.875rem,2.6vh,1.75rem)]"
                />

                <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[12.5px] lg:mt-[clamp(0.75rem,2vh,1.25rem)]">
                    <li className="mr-1 text-white/55">Popular:</li>
                    {quickLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={propertiesIndex.url({
                                    query: link.query,
                                })}
                                className="inline-flex h-8 items-center rounded-full border border-white/20 px-3.5 font-medium text-white/85 transition-colors duration-200 hover:border-tangerine-400 hover:bg-tangerine-400/10 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <HeroWave />
        </section>
    );
}
