import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HeroSearch } from '@/components/site/hero-search';
import { HeroWave } from '@/components/site/hero-wave';
import { Eyebrow, Highlight } from '@/components/site/section-heading';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSite } from '@/hooks/use-site';
import { index as propertiesIndex } from '@/routes/properties';
import type { SelectOption } from '@/types/site';

const POSTER = '/images/home-hero-poster.webp';

const heroStats = [
    { value: '80+', label: 'Properties' },
    { value: '5k+', label: 'Happy Clients' },
    { value: '80+', label: 'Team Members' },
];

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

    const scrollToContent = (): void => {
        document
            .getElementById('what-we-offer')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-plum-950 pt-[82px] lg:pt-[120px]">
            <HeroFilm />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.62)_0%,rgba(27,14,54,0.38)_38%,rgba(27,14,54,0.5)_70%,rgba(27,14,54,0.82)_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(14,7,30,0.45)_100%)]"
            />

            <div className="relative site-container flex flex-1 flex-col items-center justify-center pt-12 pb-10 text-center lg:pt-9 lg:pb-6">
                <Eyebrow tone="light" centered>
                    {site.legal_name}
                </Eyebrow>
                <h1 className="mt-4 flex flex-col items-center">
                    <span className="font-display text-[clamp(1.25rem,1.8vw,1.625rem)] font-normal text-tangerine-400 italic">
                        Welcome to {site.name},
                    </span>
                    <span className="mt-1.5 max-w-[22ch] font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-white">
                        The Best Real Estate
                        <br className="hidden sm:inline" />{' '}
                        <Highlight>Agency</Highlight> in Dubai
                    </span>
                </h1>
                <p className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-white/82 sm:text-base">
                    {site.name} Brokerage makes real estate in Dubai effortless.
                    Either it’s buying and selling property in Dubai, exploring
                    premium Dubai Off Plan Projects, or finding labor camps,
                    Shops, Offices, Residential &amp; Commercial Apartments for
                    rent, we bring you the best deals with zero hassle.
                </p>

                <HeroSearch
                    budgets={budgets}
                    className="mt-7 w-full max-w-5xl"
                />

                <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[12.5px]">
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

            <div className="relative site-container hidden items-center justify-between pb-[clamp(3.5rem,8.2vw,7.75rem)] text-[12.5px] text-white/80 lg:flex">
                <dl className="flex items-center divide-x divide-white/20">
                    {heroStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-baseline gap-1.5 px-4 first:pl-0 last:pr-0"
                        >
                            <dd className="font-display text-xl text-white lining-nums">
                                {stat.value}
                            </dd>
                            <dt className="text-white/70">{stat.label}</dt>
                        </div>
                    ))}
                </dl>
                <button
                    type="button"
                    onClick={scrollToContent}
                    className="flex cursor-pointer items-center gap-3 transition-colors hover:text-white"
                >
                    <span
                        aria-hidden="true"
                        className="flex h-[34px] w-[21px] justify-center rounded-full border border-white/70 pt-1.5"
                    >
                        <span className="h-1.5 w-0.5 animate-scroll-cue rounded-full bg-white motion-reduce:animate-none" />
                    </span>
                    Scroll to Discover
                </button>
                <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 transition-colors hover:text-white"
                >
                    <span className="relative flex size-11 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-plum-800">
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 animate-soft-ping rounded-full border border-white/40 motion-reduce:animate-none"
                        />
                        <Play
                            aria-hidden="true"
                            className="relative ml-0.5 size-4 fill-current"
                        />
                    </span>
                    Watch our story
                </a>
            </div>
            <HeroWave />
        </section>
    );
}
