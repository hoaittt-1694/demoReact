<?php

namespace App\Http\Requests\Api;

class UserLoginRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'required|min:6',
            'email' => 'required',
        ];
    }

    public function messages()
    {
        return array_merge(parent::messages(), []);
    }
}
