<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendCustomerEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $status;
    private $reason;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $status, $reason)
    {
        $this->name = $name;
        $this->status = $status;
        $this->reason = $reason;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Damage Report Information')->view('emails.report')->with([
            'name' => $this->name,
            'status' => $this->status,
            'reason' => $this->reason,
        ]);
    }
}
