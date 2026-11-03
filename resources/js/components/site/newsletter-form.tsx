import { Form } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { store } from '@/routes/newsletter';

export function NewsletterForm() {
    return (
        <Form
            {...store.form()}
            resetOnSuccess
            options={{ preserveScroll: true }}
        >
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1 pl-4 transition-colors focus-within:border-tangerine-400">
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            aria-label="Subscribe"
                            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-tangerine-500 text-plum-950 transition-colors hover:bg-tangerine-400 disabled:opacity-60"
                        >
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </button>
                    </div>
                    <InputError
                        message={errors.email}
                        className="mt-2 text-[13px] text-tangerine-400 dark:text-tangerine-400"
                    />
                    {wasSuccessful && (
                        <p
                            role="status"
                            className="mt-2 text-[13px] text-tangerine-400"
                        >
                            Thank you for subscribing.
                        </p>
                    )}
                </>
            )}
        </Form>
    );
}
