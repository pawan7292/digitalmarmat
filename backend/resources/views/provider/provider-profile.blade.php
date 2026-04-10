@extends('provider.provider')

@section('content')

<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content container-fluid">
        <!-- Profile settings -->
        <div class="row">
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h5>{{__('profile_settings')}}</h5>
                    </div>
                </div>
            </div>
            <div class="col-lg-10 mx-auto">
                <!-- Account Settings -->
                <div class="card mb-0">
                    <div class="card-body">
                        <form id="providerProfileForm">
                            <h6 class="user-title">{{__('profile_picture')}}</h6>
                            <input type="hidden" name="id" id="id" value="{{ $data->id ?? ''}}">
                            <div class="">
                                <div class="pro-picture d-flex flex-wrap gap-2">
                                    <div class="pro-img avatar avatar-xl flex-shrink-0">
                                        <img src="{{ $data->userDetails->profile_image ?? asset('assets/img/profile-default.png') }}"
                                            alt="user" class="img-fluid rounded-circle profileImagePreview">
                                    </div>
                                    <div class="pro-info">
                                        <div class="d-flex mb-2">
                                            <input type="file" class="" name="profile_image" id="profile_image">
                                        </div>
                                        <p class="fs-14">{{(__('image_size_note'))}}</p>
                                        <span class="text-danger error-text" id="profile_image_error"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 class="user-title">{{__('general_information')}}</h6>
                            <div class="general-info">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('first_name')}}<span class="text-danger">
                                                    *</span></label>
                                            <input type="text" class="form-control" name="first_name" id="first_name"
                                                value="{{ $data->userDetails->first_name ?? ''}}">
                                            <span class="text-danger error-text" id="first_name_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('last_name')}}<span class="text-danger">
                                                    *</span></label>
                                            <input type="text" class="form-control" id="last_name" name="last_name"
                                                value="{{ $data->userDetails->last_name ?? ''}}">
                                            <span class="text-danger error-text" id="last_name_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('email')}}<span class="text-danger">
                                                    *</span></label>
                                            <input type="text" class="form-control" name="email" id="email"
                                                value="{{ $data->email ?? ''}}">
                                            <span class="text-danger error-text" id="email_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('user_name')}}<span class="text-danger">
                                                    *</span></label>
                                            <input type="text" class="form-control" name="user_name" id="user_name"
                                                value="{{ $data->name ?? ''}}">
                                            <span class="text-danger error-text" id="user_name_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('phone_number')}}<span class="text-danger">
                                                    *</span></label>
                                            <input type="text" class="form-control provider_phone_number"
                                                name="phone_number" id="phone_number"
                                                value="{{ $data->phone_number ?? ''}}">
                                            <input type="hidden" id="provider_phone_number"
                                                name="international_phone_number">
                                            <span class="text-danger error-text" id="phone_number_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('gender')}}<span class="text-danger">
                                                    *</span></label>
                                            <select class="select form-control select2" id="gender" name="gender">
                                                <option value="">{{__('select_gender')}}</option>
                                                <option value="male" {{ ($data->userDetails->gender ?? '') == 'male' ? 'selected' : '' }}>{{__('male')}}</option>
                                                <option value="female" {{ ($data->userDetails->gender ?? '') == 'female' ? 'selected' : '' }}>{{__('female')}}</option>
                                            </select>
                                            <span class="text-danger error-text" id="gender_error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">{{__('date_of_birth')}}<span class="text-danger">
                                                    *</span></label>
                                            <div class=" input-icon position-relative">
                                                <input type="date" class="form-control" name="dob" id="dob"
                                                    placeholder="dd-mm-yyyy"
                                                    max="{{ date('Y-m-d', strtotime('-1 day')) }}"
                                                    value="{{ $data->userDetails->dob ?? ''}}">
                                                <span class="text-danger error-text" id="dob_error"></span>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div>
                                            <label class="form-label">{{__('your_bio')}}</label>
                                            <textarea class="form-control" rows="4" name="bio"
                                                id="bio">{{ $data->userDetails->bio ?? ''}}</textarea>
                                            <span class="text-danger error-text" id="bio_error"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 class="user-title">{{__('address_information')}}</h6>
                            <div class="row address-info mb-2">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('address')}}<span class="text-danger">
                                                *</span></label>
                                        <input type="text" class="form-control" id="address" name="address"
                                            value="{{ $data->userDetails->address ?? ''}}">
                                        <span class="text-danger error-text" id="address_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('country')}}<span class="text-danger">
                                                *</span></label>
                                        <select class="select form-control select2" id="country" name="country"
                                            data-placeholder="{{__('select_country')}}"
                                            data-country="{{ $data->userDetails->country ?? ''}}">
                                        </select>
                                        <span class="text-danger error-text" id="country_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('state')}}<span class="text-danger">
                                                *</span></label>
                                        <select class="select form-control select2" id="state" name="state"
                                            data-placeholder="{{__('select_state')}}"
                                            data-state="{{ $data->userDetails->state ?? ''}}">
                                        </select>
                                        <span class="text-danger error-text" id="state_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('city')}}<span class="text-danger">
                                                *</span></label>
                                        <select class="select form-control select2" id="city" name="city"
                                            data-placeholder="{{__('select_city')}}"
                                            data-city="{{ $data->userDetails->city ?? ''}}">
                                        </select>
                                        <span class="text-danger error-text" id="city_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('postal_code')}}<span class="text-danger">
                                                *</span></label>
                                        <input type="text" class="form-control" id="postal_code" name="postal_code"
                                            value="{{ $data->userDetails->postal_code ?? ''}}">
                                        <span class="text-danger error-text" id="postal_code_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6 d-none">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('currency_code')}}<span class="text-danger">
                                                *</span></label>
                                        <select class="select form-control select2" id="currency_code"
                                            name="currency_code" data-placeholder="Select Currency Code">
                                            @if ($currencyDetails)
                                                @foreach ($currencyDetails as $currency)
                                                    <option value="{{ $currency->code }}" {{ ($data->userDetails->currency_code ?? '') == $currency->code ? 'selected' : '' }}>{{ $currency->code }}
                                                    </option>
                                                @endforeach
                                            @endif
                                        </select>
                                        <span class="text-danger error-text" id="currency_code_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('language')}}</label>
                                        <input class="input-tags form-control" type="text" data-role="tagsinput"
                                            name="language" id="language"
                                            value="{{ $data->userDetails->language ?? ''}}">
                                    </div>
                                </div>
                            </div>
                            @if (Auth::check() && Auth::user()->sub_service_type == 'company')
                            <h6 class="user-title">{{__('company_information')}}</h6>
                            <div class="row">
                                <label class="form-label">{{__('company_image')}}</label>
                                <div class="pro-picture">
                                    <div class="pro-img avatar avatar-xl">
                                        <img src="{{ $data->userDetails->company_image ?? asset('assets/img/default-image.png') }}"
                                            alt="user" class="img-fluid rounded-circle" id="companyImagePreview">
                                    </div>
                                    <div class="pro-info">
                                        <div class="d-flex mb-2">
                                            <input type="file" name="company_image" id="company_image">
                                        </div>
                                        <p class="fs-14">{{__('image_size_note')}}</p>
                                        <span class="text-danger error-text" id="company_image_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('company_name')}}<span class="text-danger">
                                                *</span></label>
                                        <input type="text" class="form-control" id="company_name" name="company_name"
                                            value="{{ $data->userDetails->company_name ?? ''}}">
                                        <span class="text-danger error-text" id="company_name_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('company_website')}}<span class="text-danger">
                                                *</span></label>
                                        <input type="text" class="form-control" id="company_website"
                                            name="company_website"
                                            value="{{ $data->userDetails->company_website ?? ''}}">
                                        <span class="text-danger error-text" id="company_website_error"></span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">{{__('company_address')}}<span class="text-danger">
                                                *</span></label>
                                        <input type="text" class="form-control" id="company_address"
                                            name="company_address"
                                            value="{{ $data->userDetails->company_address ?? ''}}">
                                        <span class="text-danger error-text" id="company_address_error"></span>
                                    </div>
                                </div>
                            </div>
                            @endif
                            <div class="acc-submit d-flex justify-content-end">
                                <button type="submit" class="btn btn-dark" id="save_provider" data-save="{{ __('save_changes') }}">{{__('save_changes')}}</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <!-- /Account Settings -->

        </div>
        <!-- /profile-settings -->

    </div>
</div>
<!-- /Page Wrapper -->

@endsection