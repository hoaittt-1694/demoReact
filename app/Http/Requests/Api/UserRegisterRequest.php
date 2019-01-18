<?php

namespace App\Http\Requests\Api;

class UserRegisterRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'required|confirmed|min:6',
            'email' => 'required|email|unique:users',
            'name' => 'max:20',
        ];
    }

    public function messages()
    {
        return array_merge(parent::messages(), [
            'password.required' => __('users.password.required'),
            'password.min' => __('users.password.min'),
            'password.confirmed' => __('users.password.confirmed'),
            'email.required' => __('users.email.required'),
            'email.unique' => __('users.email.unique'),
            'email.email' => __('users.email.email'),
            'name.max' => __('users.name.max'),
        ]);
    }
}
