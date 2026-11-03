import type { ReactNode } from 'react';
import { PageHero } from '@/components/site/page-hero';
import { SeoHead } from '@/components/site/seo-head';

export default function LegalDocument({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <>
            <SeoHead title={title} description={description} />
            <PageHero
                image="/images/services/dubai-panorama.webp"
                eyebrow="Legal"
                title={title}
            />
            <div className="site-container py-14 lg:py-20">
                <article className="legal-prose mx-auto max-w-3xl">
                    {children}
                </article>
            </div>
        </>
    );
}
