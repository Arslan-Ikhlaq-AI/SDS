import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { WhatsAppButton } from '@/components/site/whatsapp-button';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="site-theme flex min-h-screen flex-col font-sans antialiased">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <WhatsAppButton />
        </div>
    );
}
