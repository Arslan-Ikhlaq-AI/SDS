import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    WhatsAppIcon,
    YouTubeIcon,
} from '@/components/site/brand-icons';
import { ContactEnquiryForm } from '@/components/site/contact-enquiry-form';
import type { EnquiryPath } from '@/components/site/contact-enquiry-form';
import { PageHero } from '@/components/site/page-hero';
import { PillAnchor } from '@/components/site/pill-link';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import {
    ENQUIRY_SECTION_ID,
    managementEnquiryDefaults,
} from '@/lib/management-enquiry';
import { services } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';
import type { SiteDetails } from '@/types/site';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const frequentlyAskedQuestions = [
    {
        question: 'What services do you offer in purchasing properties?',
        answer: 'We provide personalized consultation for purchasing luxury properties, including custom property searches, negotiation assistance, and support throughout the entire acquisition process, including connections with industry professionals such as lawyers and notaries.',
    },
    {
        question: 'How can I list my property on your website?',
        answer: 'You can contact us directly through our contact form or by phone to schedule an appointment with one of our experts. We will evaluate your property and create a customized marketing strategy to ensure you get the best possible return.',
    },
    {
        question: 'Do you offer property management services?',
        answer: 'Yes, we offer comprehensive property management services for luxury homes, including maintenance, rental management, and oversight of daily operations to ensure your investment is always in top condition.',
    },
    {
        question: 'What are the advantages of purchasing a property?',
        answer: 'Purchasing a property in these areas means investing in some of the most prestigious and sought-after locations, offering a unique blend of luxury, security, and high quality of life. These areas are known for their natural beauty, exclusive amenities, and strong property value retention.',
    },
    {
        question:
            "Can I arrange a virtual tour for a property I'm interested in?",
        answer: 'Absolutely. We offer detailed and personalized virtual tours for every property, allowing you to explore homes from anywhere in the world. Contact us to schedule a virtual tour appointment.',
    },
];

/**
 * What the team does for each kind of visitor, shown beside the form.
 */
const promises: Record<
    EnquiryPath,
    { title: string; highlight: string; points: string[] }
> = {
    find: {
        title: 'Rent smart,',
        highlight: 'live comfortably.',
        points: [
            'Apartments, villas, offices, shops and labor camps',
            'Properties looked after by our own team',
            'Guidance at every step, with zero hassle',
        ],
    },
    offer: {
        title: 'You own the property.',
        highlight: 'We make it perform.',
        points: [
            'We find reliable tenants',
            'We collect rent on time',
            'We look after maintenance',
            'We keep every contract and renewal in order',
        ],
    },
};

/**
 * The embedded map of the office's area. It leaves out the building number,
 * which Google treats as a search and answers with pins for other businesses.
 */
function officeMapEmbedUrl(site: SiteDetails): string {
    return `https://maps.google.com/maps?q=${encodeURIComponent(site.address.line_two)}&t=m&z=15&output=embed&iwloc=near`;
}

function ContactCards() {
    const site = useSite();

    const cards: {
        label: string;
        lines: string[];
        action: string;
        href: string;
        isExternal?: boolean;
        icon: Icon;
    }[] = [
        {
            label: 'Call us',
            lines: [site.phone_display],
            action: 'Call now',
            href: `tel:${site.phone}`,
            icon: Phone,
        },
        {
            label: 'WhatsApp',
            lines: [site.whatsapp_display],
            action: 'Start a chat',
            href: whatsAppUrl(site),
            isExternal: true,
            icon: WhatsAppIcon,
        },
        {
            label: 'Email',
            lines: [site.email],
            action: 'Send an email',
            href: `mailto:${site.email}`,
            icon: Mail,
        },
        {
            label: 'Office',
            lines: [site.address.line_one, site.address.line_two],
            action: 'Get directions',
            href: site.address.map_url,
            isExternal: true,
            icon: MapPin,
        },
    ];

    return (
        <section
            aria-label="Contact details"
            className="relative z-10 site-container -mt-20 sm:-mt-24 lg:-mt-28"
        >
            <ul className="grid gap-3.5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                {cards.map((card) => (
                    <li key={card.label}>
                        <a
                            href={card.href}
                            target={card.isExternal ? '_blank' : undefined}
                            rel={card.isExternal ? 'noreferrer' : undefined}
                            className="group relative flex h-full items-center gap-4 overflow-hidden rounded-[24px] border border-hairline bg-white p-5 shadow-[0_24px_60px_-38px_rgba(46,23,96,0.6)] transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-plum-100 hover:shadow-[0_40px_80px_-40px_rgba(46,23,96,0.6)] sm:flex-col sm:items-start sm:gap-0 sm:rounded-[28px] sm:p-7"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-b-full bg-[linear-gradient(90deg,var(--color-tangerine-500),var(--color-tangerine-400))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -top-20 -right-20 size-44 rounded-full bg-plum-50 transition-colors duration-500 group-hover:bg-tangerine-500/8"
                            />
                            <span className="relative flex size-13 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--color-plum-600),var(--color-plum-900))] text-white shadow-[0_12px_24px_-12px_rgba(46,23,96,0.85)] ring-[5px] ring-plum-50 transition-shadow duration-500 group-hover:ring-tangerine-500/15">
                                <card.icon
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </span>
                            <span className="relative min-w-0 flex-1 sm:mt-5">
                                <span className="block text-[11.5px] font-semibold tracking-[0.16em] text-soft uppercase">
                                    {card.label}
                                </span>
                                <span className="mt-1.5 block text-[15.5px] leading-snug font-semibold [overflow-wrap:anywhere] text-plum-900">
                                    {card.lines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <span className="relative hidden w-full items-center justify-between border-t border-hairline pt-4 text-[13px] font-semibold text-plum-700 sm:mt-5 sm:flex">
                                {card.action}
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                                />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function EnquiryAside({ path }: { path: EnquiryPath }) {
    const site = useSite();
    const promise = promises[path];

    const quickLinks = [
        {
            label: 'Properties for rent',
            href: propertiesIndex.url({ query: { status: 'for-rent' } }),
        },
        {
            label: 'Properties for sale',
            href: propertiesIndex.url({ query: { status: 'for-sale' } }),
        },
        { label: 'Our services', href: services.url() },
    ];

    const socialLinks: { label: string; href: string; icon: Icon }[] = [
        { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedInIcon },
        { label: 'Facebook', href: site.social.facebook, icon: FacebookIcon },
        {
            label: 'Instagram',
            href: site.social.instagram,
            icon: InstagramIcon,
        },
        { label: 'YouTube', href: site.social.youtube, icon: YouTubeIcon },
    ];

    return (
        <aside className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(155deg,var(--color-plum-700),var(--color-plum-950))] p-7 text-white sm:p-9 lg:sticky lg:top-28">
            <span
                aria-hidden="true"
                className="absolute -top-24 -right-24 size-64 rounded-full border border-white/10"
            />
            <div className="relative">
                <h3 className="font-display text-[28px] leading-[1.2] font-medium">
                    {promise.title}{' '}
                    <span className="text-tangerine-400">
                        {promise.highlight}
                    </span>
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5 text-[15px] leading-relaxed text-white/85">
                    {promise.points.map((point) => (
                        <li key={point} className="flex items-start gap-3.5">
                            <span
                                aria-hidden="true"
                                className="mt-[11px] h-0.5 w-5 shrink-0 rounded-full bg-tangerine-400"
                            />
                            {point}
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/12 pt-8">
                    <PillAnchor href={`tel:${site.phone}`}>
                        <Phone aria-hidden="true" className="size-4" />
                        Call us
                    </PillAnchor>
                    <PillAnchor
                        href={whatsAppUrl(site)}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline-light"
                    >
                        <WhatsAppIcon className="size-4" />
                        WhatsApp
                    </PillAnchor>
                </div>

                <ul className="mt-8 flex flex-col border-t border-white/12 pt-4 text-[14.5px]">
                    {quickLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="group flex items-center justify-between py-2.5 text-white/85 transition-colors hover:text-tangerine-400"
                            >
                                {link.label}
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="mt-5 flex items-center gap-2.5 border-t border-white/12 pt-7">
                    {socialLinks.map((social) => (
                        <li key={social.label}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.label}
                                className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-colors duration-300 hover:border-tangerine-500 hover:bg-tangerine-500 hover:text-plum-950"
                            >
                                <social.icon className="size-4" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function OfficeLocation() {
    const site = useSite();

    return (
        <section
            aria-labelledby="office-heading"
            className="site-container pb-16 lg:pb-24"
        >
            <div className="grid overflow-hidden rounded-[28px] border border-hairline bg-white shadow-[0_24px_60px_-42px_rgba(46,23,96,0.5)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
                <div className="p-7 sm:p-10 lg:self-center lg:p-12">
                    <Eyebrow>Visit us</Eyebrow>
                    <DisplayHeading className="mt-4 text-plum-900">
                        <span id="office-heading">
                            Our <Highlight>Office</Highlight>
                        </span>
                    </DisplayHeading>
                    <p className="mt-5 text-[17px] font-semibold text-plum-900">
                        {site.legal_name}
                    </p>
                    <p
                        lang="ar"
                        dir="rtl"
                        className="mt-1 w-fit font-arabic text-sm text-soft"
                    >
                        {site.legal_name_arabic}
                    </p>
                    <address className="mt-4 text-[15px] leading-[1.8] text-body not-italic">
                        {site.address.line_one}
                        <br />
                        {site.address.line_two}
                    </address>
                    <PillAnchor
                        href={site.address.map_url}
                        target="_blank"
                        rel="noreferrer"
                        variant="plum"
                        withArrow
                        className="mt-7"
                    >
                        Get Directions
                    </PillAnchor>
                </div>
                <iframe
                    title={`Map showing the ${site.name} office`}
                    src={officeMapEmbedUrl(site)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[340px] w-full border-0 lg:h-full lg:min-h-[440px]"
                />
            </div>
        </section>
    );
}

export default function Contact() {
    const site = useSite();
    const { url } = usePage();
    const managementDefaults = managementEnquiryDefaults(url, site);
    const [path, setPath] = useState<EnquiryPath>(
        managementDefaults ? 'offer' : 'find',
    );

    return (
        <>
            <SeoHead
                title="Contact Us"
                description={`Reach out to the ${site.name} team for personalized assistance and guidance on your real estate journey in Dubai.`}
                image="/images/services/dubai-skyline.webp"
            />
            <PageHero
                image="/images/services/dubai-skyline.webp"
                imagePosition="center 55%"
                eyebrow={site.name}
                title={
                    <>
                        Get in Touch <Highlight>with Us</Highlight>
                    </>
                }
                className="pb-32 sm:pb-40 lg:pb-48"
            >
                Reach out to our team of experts to get personalized assistance
                and guidance on your real estate journey.
            </PageHero>

            <ContactCards />

            <section
                id={ENQUIRY_SECTION_ID}
                className="scroll-mt-10 bg-[radial-gradient(ellipse_75%_45%_at_50%_100%,var(--color-plum-50)_0%,transparent_72%)] pt-16 pb-16 lg:scroll-mt-6 lg:pt-24 lg:pb-24"
            >
                <div className="site-container">
                    <div className="mx-auto max-w-[46rem] text-center">
                        <Eyebrow
                            centered
                            className="text-[13px] font-bold tracking-[0.24em]"
                        >
                            Send us a message
                        </Eyebrow>
                        <DisplayHeading className="mt-4 text-[clamp(2.125rem,3.8vw,3.375rem)] leading-[1.08] text-plum-900">
                            How Can We <Highlight>Help You</Highlight>?
                        </DisplayHeading>
                        <p className="mt-5 text-[15.5px] leading-[1.8] text-pretty text-body sm:text-[17px]">
                            Looking for a property to rent, or have one you
                            would like us to rent out and manage? Choose below
                            and tell us what you need.
                        </p>
                    </div>
                    <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-8">
                        <div className="rounded-[28px] border border-hairline bg-white p-5 shadow-[0_24px_60px_-42px_rgba(46,23,96,0.5)] sm:p-8 xl:p-10">
                            <ContactEnquiryForm
                                path={path}
                                onPathChange={setPath}
                                defaults={managementDefaults}
                            />
                        </div>
                        <EnquiryAside path={path} />
                    </div>
                </div>
            </section>

            <OfficeLocation />

            <section className="bg-plum-50">
                <div className="site-container grid gap-10 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-24">
                    <div>
                        <Eyebrow>FAQ</Eyebrow>
                        <DisplayHeading className="mt-3">
                            Frequently Asked <Highlight>Questions</Highlight>
                        </DisplayHeading>
                    </div>
                    <div className="border-t border-plum-900/15">
                        {frequentlyAskedQuestions.map((item) => (
                            <details
                                key={item.question}
                                className="group border-b border-plum-900/15"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold text-plum-900 transition-colors hover:text-plum-600 [&::-webkit-details-marker]:hidden">
                                    {item.question}
                                    <ChevronDown
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-tangerine-600 transition-transform group-open:rotate-180"
                                    />
                                </summary>
                                <p className="max-w-3xl pb-6 text-[15px] leading-[1.75] text-body">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
