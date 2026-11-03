import { usePage } from '@inertiajs/react';
import type { SiteDetails } from '@/types/site';

export function useSite(): SiteDetails {
    return usePage().props.site;
}

export function whatsAppUrl(site: SiteDetails, message?: string): string {
    const base = `https://wa.me/${site.whatsapp}`;

    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
