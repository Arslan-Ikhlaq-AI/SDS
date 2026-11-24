<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EnquiryPurpose;
use App\Enums\EnquirySource;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EnquiryIndexRequest;
use App\Http\Resources\Admin\EnquiryResource;
use App\Models\Enquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnquiryController extends Controller
{
    /**
     * Show the requests sent through the website, newest first.
     */
    public function index(EnquiryIndexRequest $request): Response
    {
        /** @var array{state?: string|null, purpose?: string|null, source?: string|null, keyword?: string|null} $filters */
        $filters = $request->validated();

        $enquiries = Enquiry::query()
            ->with('property')
            ->matchingFilters($filters)
            ->latest()
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/enquiries/index', [
            'enquiries' => EnquiryResource::collection($enquiries),
            'filters' => $filters,
            'filterOptions' => [
                'purposes' => EnquiryPurpose::options(),
                'sources' => EnquirySource::options(),
            ],
        ]);
    }

    /**
     * Show everything the visitor sent.
     */
    public function show(Request $request, Enquiry $enquiry): Response
    {
        return Inertia::render('admin/enquiries/show', [
            'enquiry' => (new EnquiryResource($enquiry->load('property')))->resolve($request),
        ]);
    }

    /**
     * Mark the request as handled, or as new again.
     */
    public function update(Request $request, Enquiry $enquiry): RedirectResponse
    {
        $validated = $request->validate([
            'handled' => ['required', 'boolean'],
        ]);

        $isHandled = (bool) $validated['handled'];

        $enquiry->handled_at = $isHandled ? now() : null;
        $enquiry->save();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $isHandled ? 'Marked as handled.' : 'Marked as new.',
        ]);

        return back();
    }
}
