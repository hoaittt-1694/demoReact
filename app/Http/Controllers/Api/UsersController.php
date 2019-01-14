<?php

namespace App\Http\Controllers\Api;

use App\Mail\User\WelcomeMail;
use App\Models\User;
use App\Services\Api\UserService;
use App\Services\Helpers\EmailService;
use Illuminate\Http\Request;
use JWTAuth;

use App\Http\Requests\Api\UserRegisterRequest;
use App\Http\Requests\Api\UserUpdateRequest;
use App\Services\Api\Contracts\UserServiceInterface;

class UsersController extends BaseController
{
    protected $service;

    public function __construct(UserServiceInterface $service)
    {
        parent::__construct();

        $this->service = $service;
    }

    /**
     * @api {post} /user/register Register user by email
     * @apiName Register
     * @apiGroup User
     *
     *
     * @apiParam {String} name (Required) name, max 20 character
     * @apiParam {String} email (Required) Unique email
     * @apiParam {String} password (Required) Password: min 6 chararacter
     *
     * @apiSuccess {Array} user User's infomations.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "200",
     *       "user": {
     *          "name": "name",
     *          "email": "email@framgia.com",
     *          "updated_at": "2017-06-19 10:21:15",
     *          "created_at": "2017-06-19 10:21:15",
     *          "id": 3
     *       }
     *     }
     *
     * @apiError 600 Validate failed
     * @apiError 601 Cannot save
     * @apiError 701 Email exists
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "600",
     *       "message": "Validate failed!"
     *     }
     */
    public function register(UserRegisterRequest $request)
    {
        $inputs = $request->only('name', 'email', 'password');

        $user = $this->service->create($inputs);
        if ($user) {
            //Send welcome email
            EmailService::send(new WelcomeMail($user), $user->email);

            return $this->responseSuccess(compact('user'));
        }

        return $this->responseErrors(config('code.basic.save_failed'), trans('messages.validate.save_failed'));
    }

    /**
     * @api {put} /user/me Update user's profile
     * @apiName Update user's profile
     * @apiGroup User
     *
     * @apiUse RequireAuthHeader
     *
     * @apiParam {String} name (Required) name, max 20 character
     * @apiParam {String} birthday  birthday, format: Y-m-
     * @apiParam {String} job job, max 255 character
     *
     * @apiSuccess {String} code 200
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "200",
     *     }
     *
     * @apiError 600 Validate failed
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "600",
     *       "message": "Validate failed!"
     *     }
     */
    public function updateProfile(UserUpdateRequest $request)
    {
        $inputs = $request->only('name');

        $updated = $this->service->update(auth()->user(), $inputs);
        if ($updated) {
            return $this->responseSuccess([]);
        }

        return $this->responseErrors(config('code.basic.save_failed'), trans('messages.validate.save_failed'));
    }

    /**
     * @api {get} /user/me Get current user
     * @apiName Get current user
     * @apiGroup User
     *
     * @apiUse RequireAuthHeader
     *
     * @apiSuccess {Array} user user info
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "200",
     *       "user": {
     *          "id": 2,
     *          "email": 'user@email.com',
     *          "name": "Abc",
     *          "created_at": "2017-06-28 08:54:27",
     *          "updated_at": "2017-07-13 10:28:12",
     *          "birthday": "1993-07-27",
     *       }
     *     }
     *
     * @apiError 706 User not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": "706",
     *       "message": "User not found"
     *     }
     */
    public function getCurrentUser(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            return $this->responseSuccess(compact('user'));
        }

        return $this->responseErrors(config('code.user.user_not_found'), trans('messages.user.user_not_found'));
    }
}
