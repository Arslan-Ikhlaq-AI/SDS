import { ImagePlus, Star, X } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function PhotoPicker({
    images,
    onImagesChange,
    photos,
    onPhotosChange,
}: {
    images: string[];
    onImagesChange: (images: string[]) => void;
    photos: File[];
    onPhotosChange: (photos: File[]) => void;
}) {
    const fileInput = useRef<HTMLInputElement>(null);
    const previews = useMemo(
        () => photos.map((photo) => URL.createObjectURL(photo)),
        [photos],
    );

    useEffect(
        () => () => previews.forEach((preview) => URL.revokeObjectURL(preview)),
        [previews],
    );

    const makeMain = (image: string) => {
        onImagesChange([image, ...images.filter((other) => other !== image)]);
    };

    return (
        <div className="space-y-4">
            {images.length + photos.length > 0 && (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {images.map((image, position) => (
                        <Photo
                            key={image}
                            src={image}
                            isMain={position === 0}
                            onMakeMain={() => makeMain(image)}
                            onRemove={() =>
                                onImagesChange(
                                    images.filter((other) => other !== image),
                                )
                            }
                        />
                    ))}
                    {previews.map((preview, position) => (
                        <Photo
                            key={preview}
                            src={preview}
                            isMain={images.length === 0 && position === 0}
                            onRemove={() =>
                                onPhotosChange(
                                    photos.filter(
                                        (_, other) => other !== position,
                                    ),
                                )
                            }
                        />
                    ))}
                </ul>
            )}

            <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                tabIndex={-1}
                aria-label="Choose photos"
                onChange={(event) => {
                    onPhotosChange([
                        ...photos,
                        ...Array.from(event.target.files ?? []),
                    ]);
                    event.target.value = '';
                }}
            />
            <Button
                type="button"
                variant="outline"
                onClick={() => fileInput.current?.click()}
            >
                <ImagePlus />
                Add photos
            </Button>
            <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP, up to 8 MB each and 15 at a time. The first
                photo is the main one.
            </p>
        </div>
    );
}

function Photo({
    src,
    isMain,
    onMakeMain,
    onRemove,
}: {
    src: string;
    isMain: boolean;
    onMakeMain?: () => void;
    onRemove: () => void;
}) {
    return (
        <li className="relative overflow-hidden rounded-lg border">
            <img
                src={src}
                alt=""
                className="aspect-[4/3] w-full object-cover"
            />
            <button
                type="button"
                onClick={onRemove}
                aria-label="Remove photo"
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black"
            >
                <X className="size-4" />
            </button>
            {isMain ? (
                <span className="absolute bottom-2 left-2 rounded-md bg-tangerine-500 px-2 py-0.5 text-xs font-semibold text-plum-950">
                    Main photo
                </span>
            ) : (
                onMakeMain && (
                    <button
                        type="button"
                        onClick={onMakeMain}
                        className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/65 px-2 py-0.5 text-xs font-medium text-white hover:bg-black"
                    >
                        <Star className="size-3" />
                        Make main
                    </button>
                )
            )}
        </li>
    );
}
