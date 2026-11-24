import { Link } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import { pillClasses } from '@/components/site/pill-link';
import { Highlight } from '@/components/site/section-heading';
import { contact } from '@/routes';

export function CtaBand() {
    return (
        <section className="site-container pb-5">
            <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-[28px] bg-plum-700 px-7 py-9 sm:px-11 sm:py-11 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                <img
                    src="/images/services/dubai-night-view.webp"
                    alt=""
                    loading="lazy"
                    className="absolute inset-y-0 right-0 -z-10 h-full w-2/3 [mask-image:linear-gradient(to_right,transparent,black_60%)] object-cover object-[50%_38%] opacity-30 mix-blend-luminosity"
                />
                <div>
                    <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight font-medium text-white">
                        Get in Touch <Highlight>with Us</Highlight>
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-white/85">
                        Reach out to our team of experts to get personalized
                        assistance and guidance on your real estate journey.
                        Let’s connect and make your experience smooth and
                        successful.
                    </p>
                </div>
                <Link
                    href={contact()}
                    className={pillClasses(
                        'tangerine',
                        'h-12 w-fit shrink-0 px-7 xl:h-12 xl:px-7',
                    )}
                >
                    <Mail aria-hidden="true" className="size-4" />
                    Contact Us
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
            </div>
        </section>
    );
}
