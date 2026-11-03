export type PropertyCategoryOption = {
    value: string;
    label: string;
    types: string[];
};

export type SiteDetails = {
    name: string;
    legal_name: string;
    legal_name_arabic: string;
    tagline: string;
    cities: string[];
    phone: string;
    phone_display: string;
    whatsapp: string;
    email: string;
    address: {
        line_one: string;
        line_two: string;
        map_url: string;
    };
    social: {
        facebook: string;
        instagram: string;
        linkedin: string;
        youtube: string;
    };
    listing_agent: {
        name: string;
        title: string;
        photo: string;
    };
    url: string;
    property_categories: PropertyCategoryOption[];
};

export type Property = {
    id: number;
    slug: string;
    reference: string;
    title: string;
    badge: string;
    status_label: string | null;
    category_label: string;
    type: string;
    price_label: string;
    payment_plan: string | null;
    size_sqft: number | null;
    land_area_sqft: number | null;
    bedrooms: number | null;
    location: string;
    map_url: string | null;
    summary_title: string | null;
    highlights: string[];
    features: string[];
    images: string[];
    floor_plan_image: string | null;
};

export type PropertyFilters = {
    status?: string | null;
    type?: string | null;
    max_price?: string | number | null;
    keyword?: string | null;
    sort?: string | null;
};

export type SelectOption = {
    value: string | number;
    label: string;
};

export type PaginatedProperties = {
    data: Property[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};
