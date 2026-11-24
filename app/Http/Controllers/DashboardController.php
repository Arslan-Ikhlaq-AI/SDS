<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\EnquiryResource;
use App\Models\Enquiry;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the dashboard, with the latest requests for admins.
     */
    public function __invoke(Request $request): Response
    {
        if (! $request->user()?->can('access-admin')) {
            return Inertia::render('dashboard', ['overview' => null]);
        }

        return Inertia::render('dashboard', [
            'overview' => [
                'new_enquiries' => Enquiry::query()->unhandled()->count(),
                'total_enquiries' => Enquiry::query()->count(),
                'total_properties' => Property::query()->count(),
                'published_properties' => Property::query()->published()->count(),
                'latest_enquiries' => EnquiryResource::collection(
                    Enquiry::query()->with('property')->latest()->latest('id')->limit(5)->get()
                )->resolve($request),
            ],
        ]);
    }
}
