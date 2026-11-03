import { Award, HeartHandshake, ShieldCheck } from 'lucide-react';
import { CtaBand } from '@/components/site/cta-band';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { PageHero } from '@/components/site/page-hero';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
    SectionHeading,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite } from '@/hooks/use-site';

const reasons = [
    {
        title: 'Trustworthy',
        description:
            'Being one of the best real estate companies in Dubai, we prioritize trust in every deal. Our transparent processes and expert guidance ensure you make the right property decisions.',
        icon: ShieldCheck,
    },
    {
        title: 'Experienced',
        description:
            'We make it easy to buy and sell property in Dubai, offering expert guidance at every step. Explore the best Dubai properties for sale with a team that knows the market inside out.',
        icon: Award,
    },
    {
        title: 'Committed',
        description:
            'Our commitment goes beyond transactions—we help you find the right space. Dubai properties for sale and labor accommodation in Dubai are handled with expertise and care.',
        icon: HeartHandshake,
    },
];

const teamMembers = [
    {
        name: 'Sara Al Amin',
        title: 'Sales Executive',
        photo: '/images/team/sara-al-amin.webp',
    },
    {
        name: 'Yousef Rahman',
        title: 'Sales Executive',
        photo: '/images/team/yousef-rahman.webp',
    },
];

export default function About() {
    const site = useSite();

    return (
        <>
            <SeoHead
                title="About Us"
                description={`${site.name} is a well-established real estate company in Dubai, specialising in labor accommodation and in helping people buy and sell property.`}
                image="/images/services/dubai-night-view.webp"
            />
            <PageHero
                image="/images/services/dubai-night-view.webp"
                imagePosition="center 42%"
                eyebrow="About Us"
                title={
                    <>
                        About <Highlight>{site.name}</Highlight>
                    </>
                }
            >
                Dubai • Abu Dhabi • Sharjah • Ajman
            </PageHero>

            <section className="site-container pt-12 pb-16 lg:pt-16 lg:pb-24">
                <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
                    <div className="relative mx-auto w-full max-w-sm lg:mx-0">
                        <span
                            aria-hidden="true"
                            className="absolute -top-3 -left-3 h-[72%] w-1/2 rounded-[18px] bg-tangerine-500 sm:-top-3.5 sm:-left-3.5"
                        />
                        <div className="relative flex flex-col items-center rounded-[18px] bg-plum-50 px-8 pt-10 pb-9 text-center shadow-[0_18px_40px_-22px_rgba(27,14,54,0.35)]">
                            <img
                                src="/images/team/omar-haddad.webp"
                                alt="Omar Haddad, Managing Director"
                                loading="lazy"
                                className="size-44 rounded-full object-cover object-top ring-4 ring-white"
                            />
                            <p className="mt-6 font-display text-2xl font-medium text-ink">
                                Omar Haddad
                            </p>
                            <p className="mt-1 text-[13px] font-semibold tracking-[0.14em] text-plum-700 uppercase">
                                Managing Director
                            </p>
                            <p className="mt-5 border-t border-plum-900/10 pt-5 text-sm leading-relaxed text-body">
                                {site.name} · Dubai, UAE
                            </p>
                        </div>
                    </div>
                    <div>
                        <Eyebrow>Leadership</Eyebrow>
                        <DisplayHeading className="mt-3">
                            Omar Haddad,{' '}
                            <Highlight>Managing Director</Highlight>
                        </DisplayHeading>
                        <p className="mt-5 font-display text-xl leading-[1.45] text-ink">
                            With a vision as sharp as the Dubai skyline, Mr.
                            Omar Haddad leads the way with strategic foresight
                            and unwavering dedication. His profound
                            understanding of the real estate landscape guides
                            every decision, ensuring your experience is seamless
                            and successful.
                        </p>
                        <p className="mt-5 text-[15px] leading-[1.75] text-body">
                            At {site.name}, we believe every property decision
                            should be backed by trust and expertise. As a
                            well-established real estate company in Dubai, we
                            specialize in providing labor accommodation in Dubai
                            and offer staff accommodation in Dubai for rent that
                            balances comfort and affordability. If you want to
                            buy and sell property in Dubai, our expertise
                            ensures a smooth and successful transaction. We’re
                            not just in the business of real estate, we’re in
                            the business of helping people find the right fit.
                        </p>
                    </div>
                </div>
            </section>

            <section className="site-container pb-16 lg:pb-24">
                <SectionHeading eyebrow={site.name} title="Why Choose Us?" />
                <ul className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-hairline">
                    {reasons.map((reason) => (
                        <li
                            key={reason.title}
                            className="flex flex-col items-center px-2 text-center lg:px-9"
                        >
                            <span className="flex size-[62px] items-center justify-center rounded-2xl bg-tile">
                                <reason.icon
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                    className="size-8 text-plum-700"
                                />
                            </span>
                            <h3 className="mt-3.5 text-[17px] font-semibold text-plum-900">
                                {reason.title}
                            </h3>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-soft">
                                {reason.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="relative isolate overflow-hidden bg-plum-700">
                <img
                    src="/images/services/dubai-skyline.webp"
                    alt=""
                    loading="lazy"
                    className="absolute inset-y-0 right-0 -z-10 h-full w-1/2 [mask-image:linear-gradient(to_right,transparent,black_70%)] object-cover opacity-20 mix-blend-luminosity"
                />
                <div className="site-container grid gap-8 py-14 lg:grid-cols-[0.5fr_1fr] lg:gap-16 lg:py-20">
                    <DisplayHeading className="text-white">
                        Our <span className="text-tangerine-400">mission</span>
                    </DisplayHeading>
                    <div className="grid gap-6 text-[15px] leading-[1.75] text-white/90 md:grid-cols-2 md:gap-10">
                        <p>
                            Our mission is to make property decisions
                            effortless, rewarding, and built on trust. Searching
                            for houses for sale in Dubai or hoping to buy and
                            sell property in Dubai should be an exciting
                            journey, not a complicated process. We’ve seen how
                            confusing the real estate market can be, which is
                            why we simplify the process, offer honest advice,
                            and ensure every client walks away with confidence.
                            Every property tells a story, and we are here to
                            help you start yours the right way.
                        </p>
                        <p>
                            A living space is more than just four walls, it’s
                            where comfort, security, and a sense of belonging
                            come together. Staff accommodation in Dubai for rent
                            should feel like home, not just another temporary
                            stay. We take the time to understand needs, match
                            them with the best options, and create housing
                            solutions that truly make a difference. At{' '}
                            {site.name}, your space isn’t just a transaction,
                            it’s a part of your journey, and we are here to make
                            it a smooth one.
                        </p>
                    </div>
                </div>
            </section>

            <section className="site-container py-16 lg:py-24">
                <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div>
                        <Eyebrow>Our Team</Eyebrow>
                        <ul className="mt-6 grid grid-cols-2 gap-4">
                            {teamMembers.map((member) => (
                                <li key={member.name}>
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        loading="lazy"
                                        className="aspect-[4/5] w-full rounded-[14px] object-cover object-top"
                                    />
                                    <p className="mt-3 font-display text-lg font-medium text-ink">
                                        {member.name}
                                    </p>
                                    <p className="text-[13px] text-soft">
                                        {member.title}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="valuation" className="scroll-mt-24">
                        <DisplayHeading>
                            Request a free valuation{' '}
                            <Highlight>of your property</Highlight>
                        </DisplayHeading>
                        <p className="mt-3.5 mb-7 text-[15px] leading-relaxed text-body">
                            Have questions or need expert advice? Reach out to
                            us, and let’s find the perfect property solution for
                            you.
                        </p>
                        <EnquiryForm
                            source="valuation"
                            submitLabel="Request Valuation"
                        />
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
}
