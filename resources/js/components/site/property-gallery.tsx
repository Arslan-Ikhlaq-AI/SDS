import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Content } from '@radix-ui/react-dialog';
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const roundButtonClasses =
    'flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-plum-950/60 text-white transition-colors duration-200 hover:border-tangerine-500 hover:bg-tangerine-500 hover:text-plum-950';

/**
 * The listing's photos: the first three laid out as a spread, and every photo in a full-screen viewer.
 */
export function PropertyGallery({
    title,
    images,
}: {
    title: string;
    images: string[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const spread = images.slice(0, images.length === 2 ? 2 : 3);

    return (
        <div className="relative">
            <ul
                className={cn(
                    'grid gap-2.5 sm:gap-4',
                    spread.length > 1 && 'grid-cols-2',
                    spread.length === 3 &&
                        'lg:grid-cols-[minmax(0,2.05fr)_minmax(0,1fr)] lg:grid-rows-2',
                )}
            >
                {spread.map((image, position) => (
                    <li
                        key={image}
                        className={cn(
                            spread.length === 3 &&
                                position === 0 &&
                                'col-span-2 lg:col-span-1 lg:row-span-2',
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(position)}
                            aria-label={`Open photo ${position + 1} of ${images.length}`}
                            className="group block size-full cursor-pointer overflow-hidden rounded-[20px] bg-plum-100 shadow-[0_34px_70px_-46px_rgba(27,14,54,0.8)] sm:rounded-[28px]"
                        >
                            <img
                                src={image}
                                alt={`${title}, photo ${position + 1}`}
                                fetchPriority={position === 0 ? 'high' : 'auto'}
                                className={cn(
                                    'size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none',
                                    spread.length === 1
                                        ? 'aspect-[16/10] lg:aspect-[21/9]'
                                        : 'aspect-[3/2]',
                                )}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {images.length > 1 && (
                <button
                    type="button"
                    onClick={() => setOpenIndex(0)}
                    className="absolute right-3 bottom-3 flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-plum-900 shadow-[0_14px_30px_-14px_rgba(27,14,54,0.7)] transition-colors hover:bg-tangerine-500 sm:right-6 sm:bottom-6 sm:h-11 sm:px-5 sm:text-[14px]"
                >
                    <Images aria-hidden="true" className="size-[18px]" />
                    View all {images.length} photos
                </button>
            )}

            <PhotoViewer
                title={title}
                images={images}
                openIndex={openIndex}
                onOpenIndexChange={setOpenIndex}
            />
        </div>
    );
}

function PhotoViewer({
    title,
    images,
    openIndex,
    onOpenIndexChange,
}: {
    title: string;
    images: string[];
    openIndex: number | null;
    onOpenIndexChange: (index: number | null) => void;
}) {
    const current = openIndex ?? 0;
    const hasSeveral = images.length > 1;

    const move = (step: number): void => {
        onOpenIndexChange((current + step + images.length) % images.length);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'ArrowLeft') {
            move(-1);
        }

        if (event.key === 'ArrowRight') {
            move(1);
        }
    };

    return (
        <Dialog
            open={openIndex !== null}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onOpenIndexChange(null);
                }
            }}
        >
            <DialogPortal>
                <DialogOverlay className="bg-plum-950/95" />
                <Content
                    onKeyDown={handleKeyDown}
                    className="site-sheet fixed inset-0 z-50 flex flex-col text-white outline-none"
                >
                    <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8">
                        <div className="min-w-0">
                            <DialogTitle className="truncate font-display text-[19px] leading-tight font-medium lining-nums">
                                {title}
                            </DialogTitle>
                            <DialogDescription
                                aria-live="polite"
                                className="mt-1 text-[13px] text-white/70 tabular-nums"
                            >
                                Photo {current + 1} of {images.length}
                            </DialogDescription>
                        </div>
                        <DialogClose
                            aria-label="Close photos"
                            className={roundButtonClasses}
                        >
                            <X aria-hidden="true" className="size-5" />
                        </DialogClose>
                    </div>

                    <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
                        <img
                            src={images[current]}
                            alt={`${title}, photo ${current + 1} of ${images.length}`}
                            className="max-h-full w-full max-w-[1240px] rounded-[16px] object-contain"
                        />
                        {hasSeveral && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => move(-1)}
                                    aria-label="Previous photo"
                                    className={cn(
                                        roundButtonClasses,
                                        'absolute bottom-3 left-5 sm:bottom-auto sm:left-6',
                                    )}
                                >
                                    <ChevronLeft
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => move(1)}
                                    aria-label="Next photo"
                                    className={cn(
                                        roundButtonClasses,
                                        'absolute right-5 bottom-3 sm:right-6 sm:bottom-auto',
                                    )}
                                >
                                    <ChevronRight
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </button>
                            </>
                        )}
                    </div>

                    {hasSeveral && (
                        <ul className="flex gap-2.5 overflow-x-auto px-5 py-5 sm:justify-center sm:px-8">
                            {images.map((image, position) => (
                                <li key={image} className="shrink-0">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onOpenIndexChange(position)
                                        }
                                        aria-label={`Show photo ${position + 1}`}
                                        aria-current={
                                            position === current
                                                ? 'true'
                                                : undefined
                                        }
                                        className={cn(
                                            'block cursor-pointer overflow-hidden rounded-[10px] border-2 transition-opacity',
                                            position === current
                                                ? 'border-tangerine-500'
                                                : 'border-transparent opacity-60 hover:opacity-100',
                                        )}
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="h-14 w-20 object-cover"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Content>
            </DialogPortal>
        </Dialog>
    );
}
