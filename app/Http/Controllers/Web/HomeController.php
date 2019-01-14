<?php

namespace App\Http\Controllers\Web;

use App\Mail\User\WelcomeMail;
use App\Models\User;
use App\Services\Helpers\EmailService;

class HomeController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        $this->viewData['title'] = trans('home.title');
    }

    public function index()
    {
        return view('web.index', $this->viewData);
    }
}
