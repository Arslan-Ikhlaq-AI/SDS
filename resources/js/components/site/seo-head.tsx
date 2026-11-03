import { Head, usePage } from '@inertiajs/react';
import { useSite } from '@/hooks/use-site';

export function SeoHead({
    title,
    description,
    image = '/images/home-hero.webp',
}: {
    title: string;
    description: string;
    image?: string;
}) {
    const site = useSite();
    const { url } = usePage();

    return (
        <Head title={title}>
            <meta
                head-key="description"
                name="description"
                content={description}
            />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={site.name}
            />
            <meta
                head-key="og:title"
                property="og:title"
                content={`${title} - ${site.name}`}
            />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            <meta
                head-key="og:url"
                property="og:url"
                content={`${site.url}${url}`}
            />
            <meta
                head-key="og:image"
                property="og:image"
                content={`${site.url}${image}`}
            />
        </Head>
    );
}
