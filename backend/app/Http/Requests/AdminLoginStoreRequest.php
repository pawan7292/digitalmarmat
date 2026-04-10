<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class AdminLoginStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $data = $this->except(['id', 'email', 'user_name', 'profile_image', 'phone_number', 'status', 'role_id']);
        $id = $this->id ?? '';
        $method = $id == '' ? 'add' : 'update';

        $addUserData = [];

        $user = User::find($id);
        $userType = $user->user_type ?? '';

        return [
            'email' => 'required|email|unique:users,email,' . $id . ',id',
            'user_name' => 'required|max:255|unique:users,name,' . $id . ',id',
            'profile_image' => 'mimes:jpeg,jpg,png|max:2048',
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'international_phone_number' => 'required',
            'address' => 'required',
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
            'postal_code' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'email.rquired' => __('email_required'),
            'email.unique' => __('email_exists'),
            'email.email' => __('email_format'),
            'user_name.required' => __('user_name_required'),
            'user_name.max' => __('user_name_maxlength'),
            'user_name.unique' => __('user_name_exists'),
            'profile_image.mimes' => __('image_extension'),
            'profile_image.max' => __('image_filesize'),
            'first_name.required' => __('first_name_required'),
            'first_name.max' => __('first_name_maxlength'),
            'last_name.required' => __('last_name_required'),
            'last_name.max' => __('last_name_maxlength'),
            'international_phone_number.required' => __('phone_number_required'),
        ];
    }
}