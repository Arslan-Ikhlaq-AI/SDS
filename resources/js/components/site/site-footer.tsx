import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    WhatsAppIcon,
    YouTubeIcon,
} from '@/components/site/brand-icons';
import { Logo } from '@/components/site/logo';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
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
        { label: 'Property Management', href: contact.url() },
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

    return (
        <footer className="bg-navy text-white/75">
            <div className="site-container">
                <div className="flex flex-col gap-7 border-b border-white/15 py-9 lg:flex-row lg:items-center lg:justify-between">
                    <Link href={home()} aria-label="Home" className="w-fit">
                        <Logo variant="light" />
                    </Link>

                    <nav aria-label="Footer">
                        <ul className="flex flex-wrap items-center gap-y-2 text-sm font-medium text-white">
                            {navigation.map((item) => (
                                <li
                                    key={item.label}
                                    className="flex items-center after:mx-4 after:h-4 after:w-px after:bg-white/30 last:after:hidden sm:after:mx-5"
                                >
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-tangerine-400"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="flex items-center gap-2.5">
                        {socialLinks.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="flex size-9 items-center justify-center rounded-full border border-tangerine-500 text-white transition-colors hover:bg-tangerine-500 hover:text-plum-950"
                                >
                                    <social.icon className="size-4" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid gap-10 border-b border-white/15 py-11 sm:grid-cols-2 lg:grid-cols-[1.35fr_1.15fr_0.95fr_1.1fr] lg:gap-8 xl:gap-12">
                    <p className="text-sm leading-relaxed">
                        {site.name} is Dubai’s leading real estate company,
                        aiming to provide the best possible buying, selling, and
                        rental services. We have a team of professionals who
                        offer the best real estate solutions in Dubai. If you’re
                        looking for a dream home or labor accommodations, we are
                        here to guide you every step of the way.
                    </p>

                    <div>
                        <h2 className="font-display text-lg font-medium text-white">
                            Contact
                        </h2>
                        <ul className="mt-3.5 flex flex-col gap-3 text-sm">
                            <li>
                                <a
                                    href={`tel:${site.phone}`}
                                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                                >
                                    <Phone
                                        aria-hidden="true"
                                        className="size-4 shrink-0 text-tangerine-500"
                                    />
                                    {site.phone_display}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={whatsAppUrl(site)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                                >
                                    <WhatsAppIcon
                                        aria-hidden="true"
                                        className="size-4 shrink-0 text-tangerine-500"
                                    />
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="flex items-center gap-2.5 [overflow-wrap:anywhere] transition-colors hover:text-white"
                                >
                                    <Mail
                                        aria-hidden="true"
                                        className="size-4 shrink-0 text-tangerine-500"
                                    />
                                    {site.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={site.address.map_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-start gap-2.5 transition-colors hover:text-white"
                                >
                                    <MapPin
                                        aria-hidden="true"
                                        className="mt-0.5 size-4 shrink-0 text-tangerine-500"
                                    />
                                    <span>
                                        {site.address.line_one}
                                        <br />
                                        {site.address.line_two}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-display text-lg font-medium text-white">
                            Services
                        </h2>
                        <ul className="mt-3.5 flex flex-col gap-2.5 text-sm">
                            {serviceLinks.map((service) => (
                                <li key={service.label}>
                                    <Link
                                        href={service.href}
                                        className="transition-colors hover:text-white"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-display text-lg font-medium text-white">
                            Stay in the Loop
                        </h2>
                        <p className="mt-3.5 mb-3.5 text-sm leading-relaxed">
                            News and insight straight to your inbox. We don’t
                            spam.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="flex flex-col gap-3 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {site.legal_name}. All
                        rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                        <Link
                            href={terms()}
                            className="transition-colors hover:text-white"
                        >
                            Terms and Conditions
                        </Link>
                        <Link
                            href={privacy()}
                            className="transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-white">{site.tagline}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
