import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BedDouble,
    Building2,
    KeyRound,
    Landmark,
    LayoutGrid,
    Mail,
    MapPin,
    Menu,
    Phone,
    Search,
    Store,
    Tag,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    WhatsAppIcon,
    YouTubeIcon,
} from '@/components/site/brand-icons';
import { Logo } from '@/components/site/logo';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import type { SiteDetails } from '@/types/site';
import { cn } from '@/lib/utils';
import { about, contact, home, services } from '@/routes';
import { index as propertiesIndex } from '@/routes/properties';

type Tone = 'light' | 'dark';

type MenuEntry = {
    label: string;
    description?: string;
    href: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const serviceEntries: MenuEntry[] = [
    {
        label: 'Off-Plan Properties',
        description: 'Invest early with flexible payment plans.',
        href: `${services.url()}#off-plan`,
        icon: Landmark,
    },
    {
        label: 'Primary & Secondary',
        description: 'Brand-new homes and ready resale properties.',
        href: `${services.url()}#primary-secondary`,
        icon: Building2,
    },
    {
        label: 'Labor Accommodation',
        description: 'Labor camps and staff housing for rent.',
        href: `${services.url()}#labor-accommodation`,
        icon: BedDouble,
    },
    {
        label: 'Residential & Commercial',
        description: 'Apartments, shops, offices and warehouses.',
        href: `${services.url()}#residential-commercial`,
        icon: Store,
    },
];

const propertyEntries: MenuEntry[] = [
    {
        label: 'All Properties',
        description: 'Browse every current listing.',
        href: propertiesIndex.url(),
        icon: LayoutGrid,
    },
    {
        label: 'For Sale',
        description: 'Apartments, villas and plots to own.',
        href: propertiesIndex.url({ query: { status: 'for-sale' } }),
        icon: Tag,
    },
    {
        label: 'For Rent',
        description: 'Homes and spaces ready to move into.',
        href: propertiesIndex.url({ query: { status: 'for-rent' } }),
        icon: KeyRound,
    },
    {
        label: 'Off-Plan Projects',
        description: 'New developments with payment plans.',
        href: propertiesIndex.url({ query: { type: 'off-plan' } }),
        icon: Landmark,
    },
    {
        label: 'Labor Camps',
        description: 'Staff accommodation across Dubai.',
        href: propertiesIndex.url({ query: { type: 'Labor Camp' } }),
        icon: BedDouble,
    },
    {
        label: 'Commercial',
        description: 'Shops, offices and warehouses.',
        href: propertiesIndex.url({ query: { type: 'commercial' } }),
        icon: Store,
    },
];

/**
 * The social profiles, in the order they appear everywhere on the site.
 */
function socialLinksFor(site: SiteDetails): {
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] {
    return [
        { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedInIcon },
        { label: 'Facebook', href: site.social.facebook, icon: FacebookIcon },
        {
            label: 'Instagram',
            href: site.social.instagram,
            icon: InstagramIcon,
        },
        { label: 'YouTube', href: site.social.youtube, icon: YouTubeIcon },
    ];
}

function navItemClasses(tone: Tone, isActive: boolean): string {
    return cn(
        'relative inline-flex h-10 items-center text-[13.5px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-200',
        'after:absolute after:inset-x-0 after:bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-tangerine-500 after:transition-transform after:duration-300 after:content-[""] hover:after:scale-x-100',
        tone === 'light'
            ? 'text-white/80 hover:text-white'
            : 'text-ink/75 hover:text-plum-800',
        isActive && 'after:scale-x-100',
        isActive && (tone === 'light' ? 'text-white' : 'text-plum-800'),
    );
}

function HouseIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            className={className}
        >
            <path
                fillRule="evenodd"
                d="M8 1.2 15.4 7.4 14.5 8.5 13.5 7.7V14.2H2.5V7.7L1.5 8.5.6 7.4 8 1.2ZM6.6 8.6a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 0 0-2.8 0ZM6 14.2h4v-2.4a2 2 0 0 0-4 0v2.4Z"
            />
        </svg>
    );
}

function UtilityBar() {
    const site = useSite();
    const socialLinks = socialLinksFor(site);

    return (
        <div className="hidden h-[38px] border-b border-white/10 bg-plum-950/55 text-[12px] text-white/70 backdrop-blur-md lg:block">
            <div className="site-container flex h-full items-center justify-between gap-6">
                <ul className="flex items-center gap-6">
                    <li>
                        <a
                            href={site.address.map_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <MapPin
                                aria-hidden="true"
                                className="size-3.5 text-tangerine-400"
                            />
                            {site.address.line_one}, {site.address.line_two}
                        </a>
                    </li>
                    <li>
                        <a
                            href={`mailto:${site.email}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <Mail
                                aria-hidden="true"
                                className="size-3.5 text-tangerine-400"
                            />
                            {site.email}
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-5">
                    <p className="tracking-[0.1em] uppercase">
                        {site.cities.join(' • ')}
                    </p>
                    <span aria-hidden="true" className="h-4 w-px bg-white/15" />
                    <ul className="flex items-center gap-3.5">
                        {socialLinks.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="block transition-colors hover:text-tangerine-400"
                                >
                                    <social.icon className="size-3.5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/**
 * A dropdown panel centred under its trigger, with a small caret pointing back at it.
 */
function MenuPanel({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <NavigationMenuContent
            className={cn(
                'left-1/2! mt-3! -translate-x-1/2 overflow-visible! rounded-2xl! border-hairline! bg-white! p-2! text-body shadow-[0_30px_70px_-24px_rgba(27,14,54,0.45)]!',
                'before:absolute before:-top-[7px] before:left-1/2 before:size-3.5 before:-translate-x-1/2 before:rotate-45 before:rounded-tl-[3px] before:border-t before:border-l before:border-hairline before:bg-white before:content-[""]',
                className,
            )}
        >
            {children}
        </NavigationMenuContent>
    );
}

function MenuEntryLink({ entry }: { entry: MenuEntry }) {
    return (
        <NavigationMenuLink asChild>
            <Link
                href={entry.href}
                className="group flex flex-row items-start gap-3 rounded-xl p-3 transition-colors hover:bg-plum-50 focus:bg-plum-50"
            >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-700 transition-colors group-hover:bg-tangerine-500 group-hover:text-plum-950">
                    {entry.icon && (
                        <entry.icon
                            aria-hidden="true"
                            strokeWidth={1.75}
                            className="size-[18px]"
                        />
                    )}
                </span>
                <span>
                    <span className="block text-[13.5px] font-semibold text-plum-900">
                        {entry.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-soft">
                        {entry.description}
                    </span>
                </span>
            </Link>
        </NavigationMenuLink>
    );
}

function triggerClasses(tone: Tone, isActive: boolean): string {
    return cn(
        navItemClasses(tone, isActive),
        'h-10! rounded-none! bg-transparent! px-0! py-0! hover:bg-transparent! focus:bg-transparent! data-[state=open]:bg-transparent! data-[state=open]:after:scale-x-100',
        tone === 'light'
            ? 'focus:text-white data-[state=open]:text-white'
            : 'focus:text-plum-800 data-[state=open]:text-plum-800',
    );
}

function DesktopNavigation({ tone }: { tone: Tone }) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <NavigationMenu
            viewport={false}
            delayDuration={120}
            skipDelayDuration={400}
            className="hidden lg:flex"
        >
            <NavigationMenuList className="gap-[clamp(1.25rem,2.4vw,2.25rem)]">
                <NavigationMenuItem>
                    <Link
                        href={home()}
                        prefetch
                        aria-current={isCurrentUrl(home()) ? 'page' : undefined}
                        className={navItemClasses(tone, isCurrentUrl(home()))}
                    >
                        Home
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem value="services">
                    <NavigationMenuTrigger
                        className={triggerClasses(
                            tone,
                            isCurrentUrl(services()),
                        )}
                    >
                        Services
                    </NavigationMenuTrigger>
                    <MenuPanel className="md:w-[680px]">
                        <div className="grid grid-cols-[1.5fr_1fr] gap-2">
                            <ul className="grid grid-cols-2 gap-1">
                                {serviceEntries.map((entry) => (
                                    <li key={entry.label}>
                                        <MenuEntryLink entry={entry} />
                                    </li>
                                ))}
                            </ul>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={services()}
                                    className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-plum-900 p-4 text-white"
                                >
                                    <img
                                        src="/images/services/dubai-skyline.webp"
                                        alt=""
                                        loading="lazy"
                                        className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,14,54,0.1)_0%,rgba(27,14,54,0.92)_100%)]"
                                    />
                                    <span className="relative text-[10.5px] font-semibold tracking-[0.16em] text-tangerine-400 uppercase">
                                        Our Services
                                    </span>
                                    <span className="relative mt-1 font-display text-lg leading-tight">
                                        Your property journey starts here.
                                    </span>
                                    <span className="relative mt-3 flex items-center gap-1.5 text-xs font-semibold">
                                        Explore all services
                                        <ArrowRight
                                            aria-hidden="true"
                                            className="size-3.5 transition-transform group-hover:translate-x-0.5"
                                        />
                                    </span>
                                </Link>
                            </NavigationMenuLink>
                        </div>
                    </MenuPanel>
                </NavigationMenuItem>

                <NavigationMenuItem value="properties">
                    <NavigationMenuTrigger
                        className={triggerClasses(
                            tone,
                            isCurrentOrParentUrl(propertiesIndex()),
                        )}
                    >
                        Properties
                    </NavigationMenuTrigger>
                    <MenuPanel className="md:w-[560px]">
                        <ul className="grid grid-cols-2 gap-1">
                            {propertyEntries.map((entry) => (
                                <li key={entry.label}>
                                    <MenuEntryLink entry={entry} />
                                </li>
                            ))}
                        </ul>
                        <div className="mt-1 flex items-center justify-between gap-4 rounded-xl bg-plum-50 px-4 py-2.5 text-xs text-soft">
                            <span>Looking for something specific?</span>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={contact()}
                                    className="group flex flex-row items-center gap-1.5 font-semibold text-plum-800 hover:text-plum-600"
                                >
                                    Ask our team
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </NavigationMenuLink>
                        </div>
                    </MenuPanel>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link
                        href={about()}
                        prefetch
                        aria-current={
                            isCurrentUrl(about()) ? 'page' : undefined
                        }
                        className={navItemClasses(tone, isCurrentUrl(about()))}
                    >
                        About
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        href={contact()}
                        prefetch
                        aria-current={
                            isCurrentUrl(contact()) ? 'page' : undefined
                        }
                        className={navItemClasses(
                            tone,
                            isCurrentUrl(contact()),
                        )}
                    >
                        Contact
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MobileNavigation({ tone }: { tone: Tone }) {
    const site = useSite();
    const [isOpen, setIsOpen] = useState(false);
    const close = (): void => setIsOpen(false);

    const primaryLinks = [
        { label: 'Home', href: home() },
        { label: 'Services', href: services() },
        { label: 'Properties', href: propertiesIndex() },
        { label: 'About', href: about() },
        { label: 'Contact', href: contact() },
    ];

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
                aria-label="Open menu"
                className={cn(
                    'flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden',
                    tone === 'light'
                        ? 'border-white/30 text-white hover:bg-white/10'
                        : 'border-plum-700/20 text-plum-800 hover:bg-plum-50',
                )}
            >
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
                side="right"
                className="site-sheet w-full gap-0 overflow-y-auto border-0 bg-plum-950 p-0 text-white sm:max-w-md [&>button]:top-5 [&>button]:right-5 [&>button]:text-white"
            >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                    Site navigation and contact details
                </SheetDescription>
                <div className="flex min-h-full flex-col px-7 pt-5 pb-8">
                    <Link href={home()} onClick={close} className="w-fit">
                        <Logo variant="light" />
                    </Link>

                    <nav className="mt-10">
                        <ul className="flex flex-col">
                            {primaryLinks.map((link, position) => (
                                <li
                                    key={link.label}
                                    style={{
                                        animationDelay: `${80 + position * 60}ms`,
                                    }}
                                    className="animate-in border-b border-white/10 duration-500 fill-mode-both fade-in slide-in-from-right-4"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={close}
                                        className="group flex items-center justify-between py-4 font-display text-[26px] text-white"
                                    >
                                        {link.label}
                                        <ArrowRight
                                            aria-hidden="true"
                                            className="size-5 text-tangerine-400 transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-7 text-[10.5px] font-semibold tracking-[0.16em] text-tangerine-400 uppercase">
                            Services
                        </p>
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14px] text-white/80">
                            {serviceEntries.map((entry) => (
                                <li key={entry.label}>
                                    <Link
                                        href={entry.href}
                                        onClick={close}
                                        className="transition-colors hover:text-white"
                                    >
                                        {entry.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-[10.5px] font-semibold tracking-[0.16em] text-tangerine-400 uppercase">
                            Properties
                        </p>
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14px] text-white/80">
                            {propertyEntries.slice(1).map((entry) => (
                                <li key={entry.label}>
                                    <Link
                                        href={entry.href}
                                        onClick={close}
                                        className="transition-colors hover:text-white"
                                    >
                                        {entry.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-auto pt-10">
                        <ul className="flex flex-col gap-3 text-[14px] text-white/80">
                            <li>
                                <a
                                    href={`tel:${site.phone}`}
                                    className="flex items-center gap-3"
                                >
                                    <Phone className="size-4 text-tangerine-400" />
                                    {site.phone_display}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={whatsAppUrl(site)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3"
                                >
                                    <WhatsAppIcon className="size-4 text-tangerine-400" />
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="flex items-center gap-3 [overflow-wrap:anywhere]"
                                >
                                    <Mail className="size-4 shrink-0 text-tangerine-400" />
                                    {site.email}
                                </a>
                            </li>
                        </ul>
                        <Link
                            href={contact()}
                            onClick={close}
                            className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-tangerine-500 text-[14px] font-semibold text-plum-950 transition-colors hover:bg-tangerine-400"
                        >
                            <HouseIcon className="size-4" />
                            Get in Touch
                        </Link>
                        <ul className="mt-6 flex items-center gap-2.5">
                            {socialLinksFor(site).map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-tangerine-400 hover:text-tangerine-400"
                                    >
                                        <social.icon className="size-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export function SiteHeader() {
    const site = useSite();
    const [isScrolled, setIsScrolled] = useState(false);
    const tone: Tone = isScrolled ? 'dark' : 'light';

    useEffect(() => {
        const updateScrolled = (): void => setIsScrolled(window.scrollY > 40);

        updateScrolled();
        window.addEventListener('scroll', updateScrolled, { passive: true });

        return () => window.removeEventListener('scroll', updateScrolled);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div
                className={cn(
                    'transition-transform duration-500 ease-out',
                    isScrolled && 'lg:-translate-y-[38px]',
                )}
            >
                <UtilityBar />
                <div
                    className={cn(
                        'border-b transition-[background-color,border-color,box-shadow] duration-500',
                        isScrolled
                            ? 'border-hairline bg-white/95 shadow-[0_18px_50px_-30px_rgba(27,14,54,0.5)] backdrop-blur-xl'
                            : 'border-white/10 bg-plum-950/25 backdrop-blur-md',
                    )}
                >
                    <div
                        className={cn(
                            'site-container flex items-center justify-between gap-6 transition-[height] duration-500',
                            isScrolled ? 'h-[64px]' : 'h-[76px]',
                        )}
                    >
                        <Link
                            href={home()}
                            aria-label="Home"
                            className="shrink-0"
                        >
                            <Logo
                                variant={tone === 'light' ? 'light' : 'color'}
                            />
                        </Link>

                        <DesktopNavigation tone={tone} />

                        <div className="flex items-center gap-3 xl:gap-4">
                            <Link
                                href={propertiesIndex()}
                                aria-label="Search properties"
                                className={cn(
                                    'hidden size-10 items-center justify-center rounded-full border transition-colors lg:flex',
                                    tone === 'light'
                                        ? 'border-white/25 text-white hover:bg-white/10'
                                        : 'border-plum-700/20 text-plum-800 hover:bg-plum-50',
                                )}
                            >
                                <Search aria-hidden="true" className="size-4" />
                            </Link>
                            <a
                                href={`tel:${site.phone}`}
                                className={cn(
                                    'hidden items-center gap-3 xl:flex',
                                    tone === 'light'
                                        ? 'text-white'
                                        : 'text-ink',
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex size-10 items-center justify-center rounded-full border',
                                        tone === 'light'
                                            ? 'border-white/25'
                                            : 'border-plum-700/20',
                                    )}
                                >
                                    <Phone
                                        aria-hidden="true"
                                        className="size-4 text-tangerine-400"
                                    />
                                </span>
                                <span className="leading-tight">
                                    <span className="block text-[10.5px] tracking-[0.14em] uppercase opacity-60">
                                        Call us
                                    </span>
                                    <span className="text-[13.5px] font-semibold">
                                        {site.phone_display}
                                    </span>
                                </span>
                            </a>
                            <Link
                                href={contact()}
                                className="group hidden h-10 items-center gap-2 rounded-full bg-tangerine-500 pr-4 pl-5 text-[13px] font-semibold whitespace-nowrap text-plum-950 transition-colors duration-200 hover:bg-tangerine-400 sm:inline-flex"
                            >
                                <HouseIcon className="size-3.5" />
                                Get in Touch
                                <ArrowRight
                                    aria-hidden="true"
                                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                            </Link>
                            <MobileNavigation tone={tone} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
