import { Form, Head, Link } from '@inertiajs/react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatReceivedAt } from '@/lib/admin';
import { index, update } from '@/routes/admin/enquiries';
import { edit as editProperty } from '@/routes/admin/properties';
import type { AdminEnquiry } from '@/types/admin';

export default function EnquiryShow({ enquiry }: { enquiry: AdminEnquiry }) {
    const phoneDigits = enquiry.phone.replace(/\D/g, '');

    const details: [string, ReactNode][] = [
        ['Form', enquiry.source_label],
        ['Wants to', enquiry.purpose_label],
        ['They are', enquiry.role_label],
        ['Property type', enquiry.property_type],
        ['City', enquiry.city],
        ['Area', enquiry.area],
        ['Bedrooms', enquiry.bedrooms],
        ['Bathrooms', enquiry.bathrooms],
        [enquiry.budget_title, enquiry.budget_label],
        [enquiry.date_title, enquiry.date_label],
        [
            'About the listing',
            enquiry.property && (
                <Link
                    href={editProperty(enquiry.property.id)}
                    className="text-primary underline underline-offset-4"
                >
                    {enquiry.property.reference}, {enquiry.property.title}
                </Link>
            ),
        ],
    ];

    return (
        <>
            <Head title={`Request from ${enquiry.name}`} />
            <div className="flex max-w-4xl flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={enquiry.name}
                    description={`Received ${formatReceivedAt(enquiry.received_at)}, Dubai time`}
                >
                    <Badge
                        variant={enquiry.is_handled ? 'secondary' : 'default'}
                    >
                        {enquiry.is_handled ? 'Handled' : 'New'}
                    </Badge>
                    <Form
                        {...update.form(enquiry.id)}
                        transform={() => ({ handled: !enquiry.is_handled })}
                        options={{ preserveScroll: true }}
                    >
                        {({ processing }) => (
                            <Button
                                variant={
                                    enquiry.is_handled ? 'outline' : 'default'
                                }
                                disabled={processing}
                            >
                                {enquiry.is_handled
                                    ? 'Mark as new'
                                    : 'Mark as handled'}
                            </Button>
                        )}
                    </Form>
                </PageHeader>

                <div className="grid gap-3 sm:grid-cols-3">
                    <ContactLink
                        href={`tel:${enquiry.phone.replace(/[^\d+]/g, '')}`}
                        icon={<Phone />}
                        label="Call"
                        value={enquiry.phone}
                    />
                    <ContactLink
                        href={`https://wa.me/${toWhatsAppNumber(phoneDigits)}`}
                        icon={<MessageCircle />}
                        label="WhatsApp"
                        value={enquiry.phone}
                        isExternal
                    />
                    <ContactLink
                        href={`mailto:${enquiry.email}`}
                        icon={<Mail />}
                        label="Email"
                        value={enquiry.email}
                    />
                </div>

                <section className="rounded-xl border bg-card p-5">
                    <h2 className="font-semibold">Details</h2>
                    <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        {details
                            .filter(
                                ([, value]) =>
                                    value !== null && value !== undefined,
                            )
                            .map(([label, value]) => (
                                <div key={label}>
                                    <dt className="text-sm text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="mt-0.5 font-medium break-words">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                    </dl>
                </section>

                {enquiry.message !== null && (
                    <section className="rounded-xl border bg-card p-5">
                        <h2 className="font-semibold">Message</h2>
                        <p className="mt-3 leading-relaxed break-words whitespace-pre-line">
                            {enquiry.message}
                        </p>
                    </section>
                )}
            </div>
        </>
    );
}

/**
 * WhatsApp links need the country code, so a local number such as 050 123 4567 becomes 971501234567.
 */
function toWhatsAppNumber(digits: string): string {
    if (digits.startsWith('00')) {
        return digits.slice(2);
    }

    return digits.startsWith('0') ? `971${digits.slice(1)}` : digits;
}

function ContactLink({
    href,
    icon,
    label,
    value,
    isExternal = false,
}: {
    href: string;
    icon: ReactNode;
    label: string;
    value: string;
    isExternal?: boolean;
}) {
    return (
        <a
            href={href}
            {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            className="flex min-w-0 items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary/40 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-tangerine-500"
        >
            {icon}
            <span className="min-w-0">
                <span className="block text-sm text-muted-foreground">
                    {label}
                </span>
                <span className="block truncate font-medium">{value}</span>
            </span>
        </a>
    );
}

EnquiryShow.layout = {
    breadcrumbs: [
        { title: 'Requests', href: index() },
        { title: 'Request', href: index() },
    ],
};
