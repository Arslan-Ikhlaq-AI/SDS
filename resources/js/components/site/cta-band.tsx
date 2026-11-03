import { Link } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import { pillClasses } from '@/components/site/pill-link';
import { Highlight } from '@/components/site/section-heading';
import { contact } from '@/routes';

export function CtaBand() {
    return (
        <section className="site-container pb-5">
            <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-[14px] bg-plum-700 px-6 py-8 sm:px-9 lg:-mx-2.5 lg:flex-row lg:items-center lg:justify-between lg:py-6">
                <img
                    src="/images/services/dubai-night-view.webp"
                    alt=""
                    loading="lazy"
                    className="absolute inset-y-0 right-0 -z-10 h-full w-2/3 [mask-image:linear-gradient(to_right,transparent,black_60%)] object-cover object-[50%_38%] opacity-30 mix-blend-luminosity"
                />
                <div>
                    <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-medium text-white">
                        Get in Touch <Highlight>with Us</Highlight>
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">
                        Reach out to our team of experts to get personalized
                        assistance and guidance on your real estate journey.
                        Let’s connect and make your experience smooth and
                        successful.
                    </p>
                </div>
                <Link
                    href={contact()}
                    className={pillClasses('tangerine', 'w-fit shrink-0')}
                >
                    <Mail aria-hidden="true" className="size-4" />
                    Contact Us
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
            </div>
        </section>
    );
}
