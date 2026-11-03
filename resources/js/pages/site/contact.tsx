import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { WhatsAppIcon } from '@/components/site/brand-icons';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { PageHero } from '@/components/site/page-hero';
import {
    DisplayHeading,
    Eyebrow,
    Highlight,
} from '@/components/site/section-heading';
import { SeoHead } from '@/components/site/seo-head';
import { useSite, whatsAppUrl } from '@/hooks/use-site';

const OFFICE_MAP_EMBED_URL =
    'https://maps.google.com/maps?q=Business%20Bay%2C%20Dubai&t=m&z=13&output=embed&iwloc=near';

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

function ContactDetail({
    href,
    icon: Icon,
    label,
    external = false,
    children,
}: {
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    external?: boolean;
    children: ReactNode;
}) {
    return (
        <li>
            <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="group flex items-start gap-3.5"
            >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-tangerine-400 text-tangerine-400 transition-colors group-hover:bg-tangerine-400 group-hover:text-plum-950">
                    <Icon aria-hidden="true" className="size-4" />
                </span>
                <span>
                    <span className="block text-xs text-white/65">{label}</span>
                    <span className="mt-0.5 block text-[15px] break-words text-white">
                        {children}
                    </span>
                </span>
            </a>
        </li>
    );
}

export default function Contact() {
    const site = useSite();

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
                title="Contact us"
            >
                Dubai • Abu Dhabi • Sharjah • Ajman
            </PageHero>

            <section className="site-container pt-12 pb-16 lg:pt-16 lg:pb-24">
                <div className="grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
                    <div>
                        <DisplayHeading>
                            Get in Touch <Highlight>with Us</Highlight>
                        </DisplayHeading>
                        <p className="mt-3.5 mb-8 max-w-2xl text-[15px] leading-relaxed text-body">
                            Reach out to our team of experts to get personalized
                            assistance and guidance on your real estate journey.
                            Let’s connect and make your experience smooth and
                            successful.
                        </p>
                        <EnquiryForm source="contact" />
                    </div>
                    <aside className="rounded-[14px] bg-plum-700 p-7 sm:p-8 lg:sticky lg:top-24">
                        <h2 className="font-display text-2xl font-medium text-white">
                            {site.legal_name}
                        </h2>
                        <p
                            lang="ar"
                            dir="rtl"
                            className="mt-1 text-right font-arabic text-sm text-white/70"
                        >
                            {site.legal_name_arabic}
                        </p>
                        <ul className="mt-7 flex flex-col gap-5">
                            <ContactDetail
                                href={`tel:${site.phone}`}
                                icon={Phone}
                                label="Phone"
                            >
                                {site.phone_display}
                            </ContactDetail>
                            <ContactDetail
                                href={whatsAppUrl(site)}
                                icon={WhatsAppIcon}
                                label="WhatsApp"
                                external
                            >
                                {site.phone_display}
                            </ContactDetail>
                            <ContactDetail
                                href={`mailto:${site.email}`}
                                icon={Mail}
                                label="Email"
                            >
                                {site.email}
                            </ContactDetail>
                            <ContactDetail
                                href={site.address.map_url}
                                icon={MapPin}
                                label="Office"
                                external
                            >
                                {site.address.line_one}
                                <br />
                                {site.address.line_two}
                            </ContactDetail>
                        </ul>
                    </aside>
                </div>
            </section>

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

            <section aria-label="Office location">
                <iframe
                    title={`Map showing the ${site.name} office`}
                    src={OFFICE_MAP_EMBED_URL}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[380px] w-full border-0 lg:h-[460px]"
                />
            </section>
        </>
    );
}
