import { useEffect, useState } from 'react';
import { WhatsAppIcon } from '@/components/site/brand-icons';
import { useSite, whatsAppUrl } from '@/hooks/use-site';
import { cn } from '@/lib/utils';

/**
 * The floating chat button. It steps aside over the footer, which carries the same link.
 */
export function WhatsAppButton() {
    const site = useSite();
    const [isOverFooter, setIsOverFooter] = useState(false);

    useEffect(() => {
        const footer = document.querySelector('footer');

        if (footer === null) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsOverFooter(entry.isIntersecting),
            { rootMargin: '0px 0px -72px 0px' },
        );

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    return (
        <a
            href={whatsAppUrl(site)}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with us on WhatsApp"
            aria-hidden={isOverFooter ? true : undefined}
            tabIndex={isOverFooter ? -1 : undefined}
            className={cn(
                'fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-200 hover:scale-105 sm:right-6 sm:bottom-6 sm:size-14',
                isOverFooter && 'pointer-events-none translate-y-3 opacity-0',
            )}
        >
            <WhatsAppIcon className="size-6 sm:size-7" />
        </a>
    );
}
