import { ChevronDown } from 'lucide-react';
import type {
    InputHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';

const controlClasses =
    'w-full rounded-lg border border-plum-900/15 bg-white text-[15px] text-ink transition-colors outline-none placeholder:text-soft/70 hover:border-plum-900/30 focus:border-plum-700 focus:ring-3 focus:ring-plum-700/10 aria-invalid:border-red-500';

function Field({
    label,
    error,
    className,
    children,
}: {
    label: string;
    error?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <label className={cn('flex flex-col gap-1.5', className)}>
            <span className="text-[13px] font-medium text-plum-900">
                {label}
            </span>
            {children}
            <InputError
                message={error}
                className="text-[13px] dark:text-red-600"
            />
        </label>
    );
}

export function TextField({
    label,
    error,
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
}) {
    return (
        <Field label={label} error={error} className={className}>
            <input
                {...props}
                aria-invalid={error ? true : undefined}
                className={cn(controlClasses, 'h-12 px-4')}
            />
        </Field>
    );
}

export function TextAreaField({
    label,
    error,
    className,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
}) {
    return (
        <Field label={label} error={error} className={className}>
            <textarea
                rows={4}
                {...props}
                aria-invalid={error ? true : undefined}
                className={cn(
                    controlClasses,
                    'resize-y px-4 py-3 leading-relaxed',
                )}
            />
        </Field>
    );
}

export function NativeSelect({
    className,
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <span className="relative block">
            <select
                {...props}
                className={cn(
                    controlClasses,
                    'h-12 cursor-pointer appearance-none pr-10 pl-4',
                    className,
                )}
            >
                {children}
            </select>
            <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-soft"
            />
        </span>
    );
}

export function SelectField({
    label,
    error,
    className,
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    error?: string;
}) {
    return (
        <Field label={label} error={error} className={className}>
            <NativeSelect {...props} aria-invalid={error ? true : undefined}>
                {children}
            </NativeSelect>
        </Field>
    );
}

/**
 * A field real visitors never see. Automated submissions fill it in and get rejected.
 */
export function HoneypotField() {
    return (
        <div
            aria-hidden="true"
            className="absolute -left-[9999px] size-px overflow-hidden"
        >
            <label>
                Website
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </label>
        </div>
    );
}
