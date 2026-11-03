import { cn } from '@/lib/utils';

/**
 * A photograph with the tangerine block offset behind its corner.
 */
export function ImageFrame({
    src,
    alt,
    corner = 'left',
    className,
    imageClassName,
}: {
    src: string;
    alt: string;
    corner?: 'left' | 'right';
    className?: string;
    imageClassName?: string;
}) {
    return (
        <div className={cn('relative', className)}>
            <span
                aria-hidden="true"
                className={cn(
                    'absolute -top-3 h-[72%] w-1/2 rounded-[18px] bg-tangerine-500 sm:-top-3.5',
                    corner === 'left'
                        ? '-left-3 sm:-left-3.5'
                        : '-right-3 sm:-right-3.5',
                )}
            />
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={cn(
                    'relative aspect-[16/10] w-full rounded-[18px] object-cover shadow-[0_18px_40px_-22px_rgba(27,14,54,0.55)]',
                    imageClassName,
                )}
            />
        </div>
    );
}
