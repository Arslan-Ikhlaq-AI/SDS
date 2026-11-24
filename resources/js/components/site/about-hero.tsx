import { HeroWave } from '@/components/site/hero-wave';
import { Eyebrow, Highlight } from '@/components/site/section-heading';
import { useSite } from '@/hooks/use-site';

/**
 * The About page's banner: label, title and tagline over the SDS tower at dusk. The sign sits right of
 * the copy on wide screens and above it on small ones, so it is never covered by text.
 */
export function AboutHero() {
    const site = useSite();

    return (
        <section className="relative isolate flex flex-col justify-end overflow-hidden bg-plum-950 pt-[max(15rem,62vw)] pb-20 sm:pb-28 lg:min-h-[clamp(32rem,36vw,44rem)] lg:justify-center lg:pt-[10rem] lg:pb-32">
            <picture>
                <source
                    media="(min-width: 64rem)"
                    srcSet="/images/about-hero.webp"
                    width={2400}
                    height={1250}
                />
                <img
                    src="/images/about-hero-mobile.webp"
                    alt={`The ${site.name} sign lit up on a tower above the Dubai skyline at dusk`}
                    width={960}
                    height={960}
                    fetchPriority="high"
                    className="absolute inset-x-0 top-0 -z-20 aspect-square w-full object-cover lg:inset-0 lg:aspect-auto lg:size-full lg:object-[100%_16%]"
                />
            </picture>
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,14,54,0.6)_0,rgba(27,14,54,0)_36vw,rgba(27,14,54,0.88)_74vw,var(--color-plum-950)_98vw)] lg:bg-[linear-gradient(180deg,rgba(27,14,54,0.6)_0%,rgba(27,14,54,0)_38%),linear-gradient(95deg,rgba(27,14,54,0.9)_0%,rgba(37,16,75,0.7)_30%,rgba(46,23,96,0.2)_54%,rgba(46,23,96,0)_70%)]"
            />
            <div className="site-container">
                <Eyebrow
                    tone="light"
                    className="text-[13px] font-bold tracking-[0.24em]"
                >
                    {site.name}
                </Eyebrow>
                <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-white">
                    About <Highlight>Us</Highlight>
                </h1>
                <p className="mt-5 max-w-[34rem] text-[15.5px] leading-[1.75] text-pretty text-white/90 sm:text-[17px] lg:max-w-[min(34rem,42vw)]">
                    Your trusted real estate partner in Dubai for buying,
                    selling, renting and managing property.
                </p>
            </div>
            <HeroWave />
        </section>
    );
}
