<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\UserChangePasswordRequest;
use App\Http\Requests\Api\UserLoginRequest;
use App\Http\Requests\Api\UserRegisterRequest;
use App\Http\Requests\Api\UserUpdateRequest;
use App\Mail\User\ActivationAccount;
use App\Models\User;
use Carbon\Carbon;
use App\Services\Helpers\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends BaseController
{
    public function register(UserRegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' =>$request->get('password'),
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
            'email' => $credentialsRequest['email'],
            'password' => $credentialsRequest['password'],
        ];

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }

            $user = Auth::user();
            if (!$user->is_active) {
                return response()->json(['error' => 'email_is_not_activated'], 403);
            }

        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function getProfile()
    {
        $user = Auth::user();
        return response()->json(compact('user'));
    }

    public function updateProfile(UserUpdateRequest $request)
    {
        $name = $request->input('name');
        $user = Auth::user();

        $updated = $user->update([
            'name' => $name
        ]);
        if ($updated) {
            return response()->json(compact('user'));
        }
        return response()->json(['error' => 'save fail']);
    }

    public function changePasswordUser(UserChangePasswordRequest $request) {
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');
        $newPasswordConfirm = $request->input('new_password_confirm');

        $user = Auth::User();
        $currentPassword = $user->password;
        if(Hash::check($oldPassword, $currentPassword)) {
            $updated = $user->update(['password' => $newPassword]);
            if ($updated) {
                return response()->json(compact('user'));
            }
        }
        
        return response()->json(['errors' => ['old_password' => 'The old password is not correct']]);
    }


    public function verifyCode($email, $verificationCode)
    {
        $user = User::where('email', $email)
                ->where('active_token', $verificationCode)->first();

        if (!$user) {
            return redirect('/token-expired');
        }
        if ($user->active_token_expire <= Carbon::now()
            && !is_null($user->active_token) && $user->is_active == 0) {
            return redirect('/token-expired');
        }

        if (!is_null($user->active_token)) {
            if ($user->is_active) {
                return redirect('/login');
            }
            $user->update([
                'is_active' => 1,
                'active_token_expire' => null,
            ]);

            return redirect('/login');
        }

        return redirect('/resend-verify');
    }

    public function resendVerifyCode(Request $request)
    {
        $email = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL);
        $user = User::where('email', $email)->first();

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

        return response()->json(['message' => 'resend_activation_success'], 200);
    }
}
