<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\UserLoginRequest;
use App\Http\Requests\Api\UserRegisterRequest;
use App\Mail\User\ActivationAccount;
use App\Models\User;
use Carbon\Carbon;
use App\Services\Helpers\EmailService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends BaseController
{
    public function register(UserRegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'active_token' => str_random(30),
            'active_token_expire' => Carbon::now()->addDay()
        ]);

        if ($user) {
            EmailService::send(new ActivationAccount($user), $user->email);

            return response()->json(compact('user'), 201);
        }
        return response()->json(['error' => 'register_fail'], 400);
    }

    public function login(UserLoginRequest $request)
    {
        $credentialsRequest = $request->only('email', 'password');
        $credentials = [
            'email' => strtolower($credentialsRequest['email']),
            'password' => $credentialsRequest['password'],
        ];
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json(['error' => 'user_not_exist'], 404);
        }

        if ($user->is_active == 0) {
            //return response()->json(['error' => 'email_not_activated'], 403);
            // redirect to page check mail or resend mail.
        }

        $credentials['is_active'] = 1;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function verifyCode($email, $verificationCode)
    {
        $user = User::where('email', $email)
                ->where('active_token', $verificationCode)->first();

        if (!$user) {
            return response()->json(['token_expired_or_old'], 403);
        }
        if ($user->active_token_expire <= Carbon::now()
            && !is_null($user->active_token) && $user->is_active == 0) {
            $user->update(['active_token_expire' => null]);

            return response()->json(['token_activation_expired'], 410);
        }
        if (!is_null($user->active_token)) {
            if ($user->is_active) {
                return response()->json(['token_activated'], 200);
            }
            $user->update([
                'is_active' => 1,
                'active_token_expire' => null,
            ]);

            return redirect('/login');
        }

        return response()->json(['token_activation_expired'], 400);
    }

    public function resendVerifyCode(Request $request)
    {
        $messages = [
            'email.required' => 'email is required',
            'email.max' => 'email is too long',
        ];
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:255',
        ], $messages);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $email = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL);
        $user = User::where($email, strtolower($request->email))->first();
        if (!$user) {
            return response()->json(['error' => 'email_not_available'], 403);
        }
        if ($user->is_active) {
            return response()->json(['message' => 're_email_activated'], 200);
        }
        $user->update([
            'active_token' => str_random(30),
            'active_token_expire' => Carbon::now()->addDay(),
        ]);
        EmailService::send(new ActivationAccount($user), $user->email);
        return $this->responseSuccess(['message' =>'resend_activation_success']);
    }
}
