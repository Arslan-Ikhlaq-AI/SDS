<?php

namespace App\Mail;

use App\Models\Enquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Enquiry $enquiry) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [new Address($this->enquiry->email, $this->enquiry->name)],
            subject: $this->subjectLine(),
        );
    }

    /**
     * Get the subject, naming what the visitor wants when they said so.
     */
    private function subjectLine(): string
    {
        $purpose = $this->enquiry->purpose ? " ({$this->enquiry->purpose->label()})" : '';

        return "{$this->enquiry->source->label()}{$purpose} from {$this->enquiry->name}";
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.enquiry-received',
        );
    }
}
