<?php

namespace App\Http\Requests\Api;

class UserUpdateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255', 'min:3'],
        ];
    }

    public function messages()
    {
        return array_merge(parent::messages(), []);
    }
}
