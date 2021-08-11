<?php

namespace App\Jobs;

use App\Jobs\Middleware\RateLimitingMiddleware;
use App\Mail\NewMessage;
use App\Message;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendMessageEmailNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 5;

    public $message;
    public $sender;
    public $receiver;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Message $message, User $sender)
    {
        $this->message = $message;
        $this->sender = $sender->email;
        $this->receiver = User::where('id', $message->to)->get();
    }

    public function middleware()
    {
        return [new RateLimitingMiddleware];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to('nedelkoyura@gmail.com')->send(new NewMessage($this->message));
    }
}
