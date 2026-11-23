import { contact } from '@/routes';
import type { SiteDetails } from '@/types/site';

/**
 * The `enquiry` query value that opens the contact form as a property management request.
 */
const MANAGEMENT_ENQUIRY = 'management';

/**
 * The id of the contact page's enquiry section, which management links scroll to.
 */
export const ENQUIRY_SECTION_ID = 'enquiry';

/**
 * The values the contact form can start with.
 */
export type EnquiryDefaults = {
    role?: string;
    property_type?: string;
    city?: string;
    message?: string;
};

/**
 * A link to the contact form, set up as a property management request and
 * carrying any property type or city the visitor has already chosen.
 *
 * The query is written the way Laravel reports the URL back (keys in
 * alphabetical order, RFC 3986 encoding). Inertia only keeps the `#enquiry`
 * fragment, and so only scrolls down to the form, when the two match exactly.
 */
export function managementEnquiryUrl(
    details: { propertyType?: string; city?: string } = {},
): string {
    const query = Object.entries({
        city: details.city,
        enquiry: MANAGEMENT_ENQUIRY,
        property_type: details.propertyType,
    })
        .filter((entry): entry is [string, string] => Boolean(entry[1]))
        .sort(([first], [second]) => first.localeCompare(second))
        .map(([key, value]) => `${key}=${encodeRfc3986(value)}`)
        .join('&');

    return `${contact.url()}?${query}#${ENQUIRY_SECTION_ID}`;
}

/**
 * Percent-encode a query value as PHP's rawurlencode() does.
 */
function encodeRfc3986(value: string): string {
    return encodeURIComponent(value).replace(
        /[!'()*]/g,
        (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    );
}

/**
 * The values to start the contact form with when the visitor arrived through a
 * management link, keeping only a property type and city the form offers.
 */
export function managementEnquiryDefaults(
    url: string,
    site: SiteDetails,
): EnquiryDefaults | undefined {
    const query = new URL(url, 'http://localhost').searchParams;

    if (query.get('enquiry') !== MANAGEMENT_ENQUIRY) {
        return undefined;
    }

    const propertyType = query.get('property_type') ?? '';
    const city = query.get('city') ?? '';
    const isOfferedType = site.property_categories.some((category) =>
        category.types.includes(propertyType),
    );

    return {
        role: 'property-owner',
        property_type: isOfferedType ? propertyType : '',
        city: site.cities.includes(city) ? city : '',
        message: `Hello, I would like ${site.name} to manage my property.`,
    };
}
