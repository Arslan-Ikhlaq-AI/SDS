import { useEffect, useState } from 'react';

/**
 * Whether a media query matches. It is false until the component has mounted,
 * so the server and the first client render agree.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const update = (): void => setMatches(mediaQuery.matches);

        update();
        mediaQuery.addEventListener('change', update);

        return () => mediaQuery.removeEventListener('change', update);
    }, [query]);

    return matches;
}
