<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsletterSubscriberRequest;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class NewsletterSubscriberController extends Controller
{
    /**
     * Add the visitor to the newsletter list.
     *
     * An address already on the list gets the same response as a new one, so the
     * form never reveals who has subscribed.
     */
    public function store(StoreNewsletterSubscriberRequest $request): RedirectResponse
    {
        NewsletterSubscriber::firstOrCreate([
            'email' => Str::lower($request->string('email')->value()),
        ]);

        return back();
    }
}
