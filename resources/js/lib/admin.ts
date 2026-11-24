const receivedAtFormat = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dubai',
});

/**
 * Show when a request arrived, in Dubai time wherever the admin is.
 */
export function formatReceivedAt(receivedAt: string | null): string {
    return receivedAt === null
        ? ''
        : receivedAtFormat.format(new Date(receivedAt));
}
