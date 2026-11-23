import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const accent = 'var(--color-tangerine-500)';

function DuotoneIcon({
    children,
    ...props
}: IconProps & { children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="var(--color-plum-700)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

export function HouseInHandIcon(props: IconProps) {
    return (
        <DuotoneIcon {...props}>
            <path d="M10.5 20.5 24 7.5l13.5 13" />
            <path d="M14.5 17.5v11h19v-11" />
            <path d="M21 28.5v-6.25h6v6.25" />
            <path d="M32 8.5v5.5" stroke={accent} />
            <path
                d="M5 33.5h6.5l4.5-2.5h8.75a2.75 2.75 0 0 1 0 5.5H18"
                stroke={accent}
            />
            <path
                d="m24.75 36.5 11.75-4.6a2.9 2.9 0 0 1 2.7 5.1L27.5 43.5H14L11 42H5"
                stroke={accent}
            />
            <path d="M4.5 31v14" />
        </DuotoneIcon>
    );
}

export function OfficeBuildingIcon(props: IconProps) {
    return (
        <DuotoneIcon {...props}>
            <path d="M5 43h38" />
            <path d="M17 43V8.5A1.5 1.5 0 0 1 18.5 7h11A1.5 1.5 0 0 1 31 8.5V43" />
            <path d="M17 19H9.5A1.5 1.5 0 0 0 8 20.5V43" />
            <path d="M31 15h7.5a1.5 1.5 0 0 1 1.5 1.5V43" stroke={accent} />
            <path d="M21 13h1M26 13h1M21 19.5h1M26 19.5h1M21 26h1M26 26h1M21 32.5h1M26 32.5h1" />
            <path d="M12.5 25.5v.5M12.5 31.5v.5M12.5 37.5v.5" />
            <path d="M35.5 21.5v.5M35.5 27.5v.5M35.5 33.5v.5" stroke={accent} />
            <path d="M22 43v-5h4v5" />
        </DuotoneIcon>
    );
}

export function HouseKeyIcon(props: IconProps) {
    return (
        <DuotoneIcon {...props}>
            <path d="M7.5 23 24 8l16.5 15" />
            <path d="M12 19.5V42h24V19.5" />
            <path d="M33 10.5v5.75" />
            <circle cx="24" cy="23" r="3.5" />
            <path d="M24 26.5v3.75" />
            <circle
                cx="11.5"
                cy="37.5"
                r="5.25"
                fill="var(--icon-backdrop, var(--color-tile))"
                stroke={accent}
            />
            <path d="M16.75 37.5H38" stroke={accent} />
            <path d="M31 37.5v4.25M36 37.5v3.25" stroke={accent} />
        </DuotoneIcon>
    );
}

export function HouseGearIcon(props: IconProps) {
    return (
        <DuotoneIcon {...props}>
            <path d="M5.5 21.5 22 7l16.5 14.5" />
            <path d="M10 17.5V40h11" />
            <path d="M34 17.5v3" />
            <path d="M15 40v-7h5v7" />
            <circle cx="34" cy="34.5" r="5.25" stroke={accent} />
            <path
                d="M40.25 34.5h3M38.42 38.92l2.12 2.12M34 40.75v3M29.58 38.92l-2.12 2.12M27.75 34.5h-3M29.58 30.08l-2.12-2.12M34 28.25v-3M38.42 30.08l2.12-2.12"
                stroke={accent}
                strokeWidth="3.5"
                strokeLinecap="butt"
            />
        </DuotoneIcon>
    );
}
