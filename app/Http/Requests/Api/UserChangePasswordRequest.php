<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UserChangePasswordRequest extends FormRequest
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
            'old_password' => ['required', 'string', 'min:6'],
            'new_password' => ['required', 'string', 'min:6'],
            'new_password_confirm' => ['required_with:new_password', 'same:new_password', 'min:6']
        ];
    }
}
