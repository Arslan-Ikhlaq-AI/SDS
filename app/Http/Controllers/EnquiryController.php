<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEnquiryRequest;
use App\Mail\EnquiryReceived;
use App\Models\Enquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    /**
     * Save the enquiry and notify the sales team.
     *
     * The enquiry is saved first and a failed email is only reported, so a mail
     * outage never loses a lead or shows the visitor an error.
     */
    public function store(StoreEnquiryRequest $request): RedirectResponse
    {
        $enquiry = Enquiry::create($request->safe()->except('website'));

        rescue(fn () => Mail::to((string) config('site.enquiries_email'))->send(new EnquiryReceived($enquiry)));

        return back();
    }
}
