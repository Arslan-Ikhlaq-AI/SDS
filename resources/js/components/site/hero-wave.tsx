/**
 * The curved edge at the base of every hero: a tangerine sweep on the right, a
 * plum crescent in the middle, and the page colour rising over the photograph.
 */
export function HeroWave() {
    return (
        <svg
            viewBox="0 0 1440 116"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px block h-[clamp(44px,8vw,116px)] w-full"
        >
            <path
                d="M210 86C330 62 420 42 520 42C660 42 790 72 950 90C790 88 650 62 506 62C400 62 300 74 210 86Z"
                fill="var(--color-plum-700)"
            />
            <path
                d="M938 90C1100 84 1270 48 1440 0V40C1300 76 1120 96 938 90Z"
                fill="var(--color-tangerine-500)"
            />
            <path
                d="M0 110C150 98 330 62 506 62C640 62 800 88 938 90C1120 96 1300 76 1440 40V116H0Z"
                fill="var(--color-paper)"
            />
        </svg>
    );
}
