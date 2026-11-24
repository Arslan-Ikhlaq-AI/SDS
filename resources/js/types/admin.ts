export type AdminEnquiry = {
    id: number;
    source_label: string;
    purpose_label: string | null;
    name: string;
    email: string;
    phone: string;
    role_label: string | null;
    message: string | null;
    property_type: string | null;
    city: string | null;
    area: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    budget_title: string;
    budget_label: string | null;
    date_title: string;
    date_label: string | null;
    property: { id: number; reference: string; title: string } | null;
    is_handled: boolean;
    received_at: string | null;
};

export type AdminProperty = {
    id: number;
    slug: string;
    reference: string;
    title: string;
    status: string | null;
    status_label: string | null;
    category: string;
    category_label: string;
    type: string;
    price: number | null;
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
    is_published: boolean;
};

export type AdminOption = {
    value: string;
    label: string;
};

export type Paginated<T> = {
    data: T[];
    links: {
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
};
