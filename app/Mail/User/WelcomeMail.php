<?php

namespace App\Mail\User;

use App\Mail\BaseMail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends BaseMail
{
    use Queueable, SerializesModels;

    protected $viewName = 'user.welcome';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->data = ['user' => $user];
        parent::__construct();
    }
}
