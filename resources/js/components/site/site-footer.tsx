import { Link } from '@inertiajs/react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentProps, ComponentType, ReactNode, SVGProps } from 'react';
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    WhatsAppIcon,
    YouTubeIcon,
} from '@/components/site/brand-icons';
import { Logo, LogoMark } from '@/components/site/logo';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import { managementEnquiryUrl } from '@/lib/management-enquiry';
import { about, contact, home, privacy, services, terms } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

export function SiteFooter() {
    const site = useSite();

    const navigation = [
        { label: 'Home', href: home() },
        { label: 'Services', href: services() },
        { label: 'Properties', href: propertiesIndex() },
        { label: 'About', href: about() },
        { label: 'Contact', href: contact() },
    ];

    const serviceLinks = [
        {
            label: 'Residential Sales',
            href: `${services.url()}#residential-commercial`,
        },
        {
            label: 'Residential Leasing',
            href: `${services.url()}#residential-commercial`,
        },
        { label: 'Off Plan', href: `${services.url()}#off-plan` },
        {
            label: 'Commercial Properties',
            href: `${services.url()}#residential-commercial`,
        },
        {
            label: 'Labor Accommodation',
            href: `${services.url()}#labor-accommodation`,
        },
        { label: 'Property Management', href: managementEnquiryUrl() },
        {
            label: 'Instant Property Valuation',
            href: `${about.url()}#valuation`,
        },
    ];

    const socialLinks: {
        label: string;
        href: string;
        icon: ComponentType<SVGProps<SVGSVGElement>>;
    }[] = [
        { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedInIcon },
        { label: 'Facebook', href: site.social.facebook, icon: FacebookIcon },
        {
            label: 'Instagram',
            href: site.social.instagram,
            icon: InstagramIcon,
        },
        { label: 'YouTube', href: site.social.youtube, icon: YouTubeIcon },
    ];

    const contactLinks: {
        label: string;
        value: string;
        href: string;
        isExternal?: boolean;
        icon: ComponentType<SVGProps<SVGSVGElement>>;
    }[] = [
        {
            label: 'Call us',
            value: site.phone_display,
            href: `tel:${site.phone}`,
            icon: Phone,
        },
        {
            label: 'WhatsApp',
            value: site.whatsapp_display,
            href: whatsAppUrl(site),
            isExternal: true,
            icon: WhatsAppIcon,
        },
        {
            label: 'Email us',
            value: site.email,
            href: `mailto:${site.email}`,
            icon: Mail,
        },
    ];

    return (
        <footer className="relative isolate overflow-hidden bg-plum-950 text-white/70">
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-tangerine-500)_50%,transparent)] opacity-70"
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_100%_0%,rgba(76,45,143,0.5),transparent_70%),radial-gradient(ellipse_45%_55%_at_0%_100%,rgba(246,152,28,0.08),transparent_70%)]"
            />
            <LogoMark
                variant="light"
                className="pointer-events-none absolute -right-28 -bottom-20 -z-10 w-[min(720px,120vw)] opacity-[0.04]"
            />

            <div className="site-container">
                <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:py-16 xl:gap-24">
                    <div>
                        <Link
                            href={home()}
                            aria-label="Home"
                            className="block w-fit"
                        >
                            <Logo variant="light" />
                        </Link>
                        <p className="mt-8 font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-snug text-white italic">
                            {site.tagline}
                            <span className="text-tangerine-500">.</span>
                        </p>
                        <p className="mt-4 max-w-xl text-[14.5px] leading-[1.85]">
                            {site.name} is Dubai’s leading real estate company,
                            aiming to provide the best possible buying, selling,
                            and rental services. We have a team of professionals
                            who offer the best real estate solutions in Dubai.
                            If you’re looking for a dream home or labor
                            accommodations, we are here to guide you every step
                            of the way.
                        </p>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-9">
                        <p className="text-[12px] font-bold tracking-[0.24em] text-tangerine-400 uppercase">
                            Newsletter
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight font-medium text-white">
                            Stay in the Loop
                        </h2>
                        <p className="mt-2 mb-6 text-sm leading-relaxed">
                            News and insight straight to your inbox. We don’t
                            spam.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:gap-x-8 lg:grid-cols-[0.75fr_1fr_1.25fr_1.1fr] lg:py-16 xl:gap-x-14">
                    <nav aria-label="Footer">
                        <FooterHeading>Explore</FooterHeading>
                        <ul className="mt-6 flex flex-col gap-3.5">
                            {navigation.map((item) => (
                                <li key={item.label}>
                                    <FooterLink href={item.href}>
                                        {item.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <FooterHeading>Services</FooterHeading>
                        <ul className="mt-6 flex flex-col gap-3.5">
                            {serviceLinks.map((service) => (
                                <li key={service.label}>
                                    <FooterLink href={service.href}>
                                        {service.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <FooterHeading>Get in Touch</FooterHeading>
                        <ul className="mt-6 flex flex-col gap-5">
                            {contactLinks.map((contactLink) => (
                                <li key={contactLink.label}>
                                    <a
                                        href={contactLink.href}
                                        {...(contactLink.isExternal && {
                                            target: '_blank',
                                            rel: 'noreferrer',
                                        })}
                                        className="group flex items-center gap-4"
                                    >
                                        <FooterIconChip
                                            icon={contactLink.icon}
                                        />
                                        <span className="min-w-0 text-[11.5px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                                            {contactLink.label}
                                            <span className="mt-1 block text-[14.5px] font-medium tracking-normal [overflow-wrap:anywhere] text-white normal-case transition-colors duration-300 group-hover:text-tangerine-400">
                                                {contactLink.value}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <FooterHeading>Visit Us</FooterHeading>
                        <a
                            href={site.address.map_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-6 flex items-start gap-4"
                        >
                            <FooterIconChip icon={MapPin} />
                            <span className="text-[14.5px] leading-[1.7] text-white/80">
                                {site.address.line_one}
                                <br />
                                {site.address.line_two}
                                <span className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-tangerine-400">
                                    Get Directions
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </span>
                            </span>
                        </a>

                        <p className="mt-9 text-[11.5px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                            Follow Us
                        </p>
                        <ul className="mt-4 flex items-center gap-2.5">
                            {socialLinks.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-[background-color,border-color,color,translate] duration-300 hover:-translate-y-0.5 hover:border-tangerine-500 hover:bg-tangerine-500 hover:text-plum-950"
                                    >
                                        <social.icon className="size-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] text-white/55 lg:flex-row lg:items-center lg:justify-between">
                    <p>
                        © {new Date().getFullYear()} {site.legal_name}. All
                        rights reserved.
                    </p>
                    <ul className="flex flex-wrap items-center gap-y-2">
                        {[
                            { label: 'Terms and Conditions', href: terms() },
                            { label: 'Privacy Policy', href: privacy() },
                        ].map((legalLink) => (
                            <li
                                key={legalLink.label}
                                className="flex items-center after:mx-4 after:size-1 after:rounded-full after:bg-tangerine-500/70 last:after:hidden"
                            >
                                <Link
                                    href={legalLink.href}
                                    className="transition-colors hover:text-white"
                                >
                                    {legalLink.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({ children }: { children: ReactNode }) {
    return (
        <h2 className="flex items-center gap-3 text-[12px] font-bold tracking-[0.22em] text-white uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-tangerine-500" />
            {children}
        </h2>
    );
}

/**
 * A footer link whose tangerine rule slides in on hover.
 */
function FooterLink({
    href,
    children,
}: {
    href: ComponentProps<typeof Link>['href'];
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className="group inline-flex items-center text-[14.5px] transition-colors duration-300 hover:text-white"
        >
            <span
                aria-hidden="true"
                className="h-px w-0 bg-tangerine-500 transition-[width,margin] duration-300 ease-out group-hover:mr-2.5 group-hover:w-4"
            />
            {children}
        </Link>
    );
}

function FooterIconChip({
    icon: Icon,
}: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
    return (
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-tangerine-500 transition-colors duration-300 group-hover:border-tangerine-500 group-hover:bg-tangerine-500 group-hover:text-plum-950">
            <Icon aria-hidden="true" className="size-[18px]" />
        </span>
    );
}
