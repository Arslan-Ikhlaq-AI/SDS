<x-mail::message>
# {{ $enquiry->source->label() }}

**Name:** {{ $enquiry->name }}<br>
**Email:** {{ $enquiry->email }}<br>
**Phone:** {{ $enquiry->phone }}<br>
@if ($enquiry->role)
**Enquiring as:** {{ $enquiry->role->label() }}<br>
@endif
@if ($enquiry->property)
**Listing:** {{ $enquiry->property->title }} ({{ $enquiry->property->reference }})<br>
@endif
@if ($enquiry->property_type)
**Property type:** {{ $enquiry->property_type }}<br>
@endif
@if ($enquiry->city)
**City:** {{ $enquiry->city }}<br>
@endif
@if ($enquiry->bedrooms !== null)
**Bedrooms:** {{ $enquiry->bedrooms }}<br>
@endif
@if ($enquiry->bathrooms !== null)
**Bathrooms:** {{ $enquiry->bathrooms }}<br>
@endif
@if ($enquiry->budget !== null)
**Budget:** AED {{ number_format($enquiry->budget) }}<br>
@endif

@if ($enquiry->message)
<x-mail::panel>
{{ $enquiry->message }}
</x-mail::panel>
@endif

Reply to this email to respond directly to {{ $enquiry->name }}.
</x-mail::message>
