<?php

namespace App\Mail\User;

use App\Http\Controllers\Api\UsersController;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use App\Mail\BaseMail;

class ActivationAccount extends BaseMail
{
    use Queueable, SerializesModels;
    public $name;

    protected $viewName = 'user.activation_account';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $verifyUrl = action([UsersController::class, 'verifyUser'], ['email' => $user->email, 'active_token' => $user->active_token]);
        $this->data = ['user' => $user, 'verifyUrl' => $verifyUrl];
        parent::__construct();
    }
}
