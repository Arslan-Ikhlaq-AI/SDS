import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatReceivedAt } from '@/lib/admin';
import { show } from '@/routes/admin/enquiries';
import type { AdminEnquiry } from '@/types/admin';

export function EnquiryList({ enquiries }: { enquiries: AdminEnquiry[] }) {
    return (
        <ul className="divide-y overflow-hidden rounded-xl border bg-card">
            {enquiries.map((enquiry) => (
                <li key={enquiry.id}>
                    <Link
                        href={show(enquiry.id)}
                        className="flex items-center gap-4 px-4 py-3.5 outline-none hover:bg-muted/60 focus-visible:bg-muted"
                    >
                        <div className="grid min-w-0 flex-1 gap-x-6 gap-y-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center">
                            <div className="min-w-0">
                                <p className="flex items-center gap-2 font-medium">
                                    <span className="truncate">
                                        {enquiry.name}
                                    </span>
                                    {!enquiry.is_handled && <Badge>New</Badge>}
                                </p>
                                <p className="truncate text-sm text-muted-foreground">
                                    {enquiry.phone}
                                </p>
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm">
                                    {enquiry.purpose_label ??
                                        enquiry.property?.title ??
                                        enquiry.source_label}
                                </p>
                                <p className="truncate text-sm text-muted-foreground">
                                    {enquiry.message ??
                                        [
                                            enquiry.property_type,
                                            enquiry.area,
                                            enquiry.city,
                                        ]
                                            .filter(Boolean)
                                            .join(', ')}
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground md:text-right">
                                {formatReceivedAt(enquiry.received_at)}
                            </p>
                        </div>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
