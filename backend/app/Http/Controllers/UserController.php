<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProviderRegistrationRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UserRegistrationRequest;
use App\Models\ProviderDetail;
use App\Models\User;
use App\Models\Bookings;
use App\Repositories\Contracts\UserInterface;
// use Redirect;
use App\Models\BranchStaffs;
use App\Models\PackageTrx;
use Illuminate\Support\Str;
use App\Models\UserDetail;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Modules\Service\app\Models\Productmeta;
use Modules\Product\app\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Modules\GlobalSetting\app\Models\Currency;
use Modules\GlobalSetting\Entities\GlobalSetting;
use Modules\GlobalSetting\app\Models\Templates;
use Illuminate\Support\Facades\Cache;
use Modules\Categories\app\Models\Categories;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\View\View;
use Modules\GlobalSetting\app\Models\SubscriptionPackage;
use Modules\GlobalSetting\app\Models\Language;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Modules\Communication\app\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();
        return redirect('/');
    }

    public function register(UserRegistrationRequest $request): JsonResponse
    {
        $regStatus = DB::table('general_settings')->where('key', 'register')->value('value');

        if ($regStatus === "0") {
            $result = $this->userRepository->register($request->all());
            $user = $result['user'];

            if ($result['is_mobile'] ?? false) {
                $token = $user->createToken('MobileLoginToken')->plainTextToken;
                $this->userRepository->sendWelcomeEmail($request->all());

                return response()->json([
                    'code' => 200,
                    'message' => 'Registration Successful',
                    'data' => [
                        'user_id' => $user->id,
                        'name' => $user->name,
                        'token' => $token
                    ],
                ]);
            }

            Auth::login($user);
            session(['user_id' => $user->id]);
            Cache::forever('user_auth_id', $user->id);
            $this->userRepository->sendWelcomeEmail($request->all());

            return response()->json([
                'code' => 200,
                'message' => 'Login Successful',
                'register_status' => $regStatus,
            ]);
        }

        $settings = GlobalSetting::whereIn('key', ['otp_digit_limit', 'otp_expire_time', 'otp_type'])
            ->pluck('value', 'key');

        $otpData = $this->userRepository->generateOtp($request->email, (int) $settings['otp_digit_limit']);
        $template = $this->getOtpTemplate($settings['otp_type']);

        return response()->json([
            'code' => 200,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'password' => $request->password,
            'otp_digit_limit' => $settings['otp_digit_limit'],
            'otp_expire_time' => $settings['otp_expire_time'],
            'otp_type' => $settings['otp_type'],
            'otp' => $otpData['otp'],
            'expires_at' => $otpData['expires_at'],
            'email_subject' => $template['subject'] ?? '',
            'email_content' => $template['content'] ?? '',
            'register_status' => $regStatus,
        ]);
    }

    private function getOtpTemplate(string $otpType): array
    {
        $notificationType = 2;
        $type = $otpType === 'email' ? 1 : 2;

        $template = Templates::select('subject', 'content')
            ->where('type', $type)
            ->where('notification_type', $notificationType)
            ->first();

        return $template ? $template->toArray() : [];
    }

    public function login(Request $request)
    {
        $recaptchaSetting = DB::table('general_settings')->where('key', 'recaptcha_status')->first();
        $reSetting = $recaptchaSetting && $recaptchaSetting->value == 1;
        $providerApprovalStatus = providerApprovalStatus();

        $rules = [
            'email' => 'required|email',
            'password' => 'required|string',
        ];

        if ($reSetting) {
            $rules['g-recaptcha-response'] = 'required';
        }

        $request->validate($rules);

        if ($reSetting) {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => config('services.recaptcha.secret_key'), // now from env
                'response' => $request->input('g-recaptcha-response'),
                'remoteip' => $request->ip(),
            ]);

            $captchaValidation = $response->json();

            if (!isset($captchaValidation['success']) || $captchaValidation['success'] !== true) {
                return response()->json([
                    'errors' => [
                        'recaptcha' => ['reCAPTCHA validation failed.']
                    ]
                ], 422);
            }
        }

        $user = User::where('email', $request->email)->first();

        if ($user && ($user->status == 0)) {
            return response()->json([
                'status'  => false,
                'code'    => 403,
                'message' => __('account_blocked_info'),
            ], 403);
        }

        if ($user && ($user->user_type == 1 || $user->user_type == 5)) {
            return response()->json([
                'status'  => false,
                'code'    => 422,
                'message' => __('Admin access is not allowed!'),
            ], 422);
        }

        if ($user && $user->user_type == 2 && $user->provider_verified_status == 0 && $providerApprovalStatus == 1) {
            return response()->json([
                'code'    => 200,
                'message' => __('provider_not_verified_info'),
                'provider_verified_status' => 0,
            ], 200);
        }

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $userId = Auth::id();
            session(['user_id' => $userId]);

            $userType = Auth::user()->user_type;
            $redirectUrl = '/';

            if ($userType == 3) {
                $redirectUrl = session('link');
                Cache::forget('user_auth_id');
                Cache::forever('user_auth_id', $userId);
            } elseif (in_array($userType, [2])) {
                Cache::forget('provider_auth_id');
                Cache::forever('provider_auth_id', $userId);
                $redirectUrl = route('provider.dashboard');
            } elseif ($userType == 4) {
                Cache::forget('staff_auth_id');
                Cache::forever('staff_auth_id', $userId);
                $redirectUrl = route('staff.dashboard');
            } else {
                $redirectUrl = session('link');
            }

            if ($userType == 1) {
                return Redirect::to($redirectUrl);
            }

            return response()->json([
                'code' => 200,
                'message' => 'Login successfully',
                'redirect_url' => $redirectUrl,
                'provider_verified_status' => 1,
            ]);
        } else {
            return response()->json(['message' => 'Invalid credentials. Please try again.'], 422);
        }
    }

    public function saveProfileDetails(Request $request): JsonResponse
    {
        $data = $request->except(['user_name', 'email', 'profile_image', 'phone_number', 'category', 'status']);
        $id = $request->id ?? "";

        $addUserData = [];

        $user = User::find($id);
        $userType = $user->user_type ?? '';

        $rules = [
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
                    ->ignore($id)
                    ->whereNull('deleted_at'),
            ],
            'user_name' => [
                'required',
                'max:255',
                Rule::unique('users', 'name')
                    ->ignore($id)
                    ->whereNull('deleted_at'),
            ],
            'profile_image' => 'mimes:jpeg,jpg,png|max:2048',
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'international_phone_number' => 'required',
            'gender' => 'required',
            'bio' => 'nullable|string|max:5000',
            'address' => 'required|string|max:150',
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
            'postal_code' => 'required',
        ];

        $messages = [
            'email.required' => __('email_required'),
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
            'international_phone_number.numeric' => __('Phone number must contain only numbers.'),
            'international_phone_number.digits_between' => __('Phone number must be between 10 and 12 digits.'),
            'gender.required' => __('gender_required'),
            'dob.required' => __('dob_required'),
            'address.required' => __('address_required'),
            'address.max' => __('address_maxlength'),
            'country.required' => __('country_required'),
            'state.required' => __('state_required'),
            'city.required' => __('city_required'),
            'postal_code.required' => __('postal_code_required'),
        ];

        $success_msg = __("profile_update_success");
        $error_msg = __('profile_update_error');
        $validator = null;

        if ($userType == 3) {
            $extraRules = [];
            $extraMessages = [];
            $rules = array_merge($rules, $extraRules);
            $messages = array_merge($messages, $extraMessages);
            $validator = Validator::make($request->all(), $rules, $messages);
        } else if ($userType == 4 || $request->has('parent_id')) {
            $extraRules = [
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')
                        ->ignore($id)
                        ->whereNull('deleted_at'),
                ],
                'user_name' => [
                    'required',
                    'max:255',
                    Rule::unique('users', 'name')
                        ->ignore($id)
                        ->whereNull('deleted_at'),
                ],
                'profile_image' => 'mimes:jpeg,jpg,png|max:2048',
                'first_name' => 'required|string|max:100',
                'last_name' => 'required|string|max:100',
                'international_phone_number' => 'required',
                'gender' => 'required'
            ];
            $extraMessages = [
                'email.required' => __('email_required'),
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
                'gender.required' => __('gender_required'),
                'dob.required' => __('dob_required'),
                'category.required' => __('category_required'),
                'role_id.required' => __('Role is required.'),
            ];
            $addUserData = [
                'user_type' => 4
            ];

            if ($request->has('role_id') && $request->role_id != '') {
                $addUserData['role_id'] = $request->role_id;
            }
            if ($request->has('status') && $request->status != '') {
                $addUserData['status'] = $request->status;
            }

            if ($request->has('category') && $request->category != '') {
                $data['category_id'] = $request->category;
            }

            if ($request->has('subcategory_id') && $request->subcategory_id != '') {
                $data['subcategory_id'] = $request->subcategory_id;
            }
            $success_msg = __("Staff saved successfully.");
            $error_msg = __('Error! while saving staff');

            $validator = Validator::make($request->all(), $extraRules, $extraMessages);
        } else if ($userType == 2) {
            $extraRules = [
                'company_image' => 'mimes:jpeg,jpg,png|max:2048',
                'company_name' => 'max:100',
                'company_address' => 'max:150',
                'company_website' => 'url',
            ];
            $extraMessages = [
                'company_image.mimes' => __('image_extension'),
                'company_image.max' => __('image_filesize'),
                'company_name.required' => __('company_name_required'),
                'company_name.max' => __('company_name_maxlength'),
                'company_address.required' => __('company_address_required'),
                'company_address.max' => __('company_address_maxlength'),
                'company_website.required' => __('company_website_required'),
                'company_website.url' => __('url_valid'),
            ];

            $rules = array_merge($rules, $extraRules);
            $messages = array_merge($messages, $extraMessages);

            $validator = Validator::make($request->all(), $rules, $messages);
        }

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 422,
                'errors' => $validator->messages()->toArray(),
            ], 422);
        }

        try {
            $latitude = "";
            $longitude = "";

            $address = $request->address;
            $apikey = GlobalSetting::where('key', 'goglemapkey')->value('value');
            $url = "https://maps.google.com/maps/api/geocode/json?address=" . urlencode($address) . "&key=" . $apikey;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $responseJson = curl_exec($ch);
            curl_close($ch);

            $response = json_decode($responseJson);

            if ($response && $response->status == 'OK') {
                $latitude = $response->results[0]->geometry->location->lat;
                $longitude = $response->results[0]->geometry->location->lng;
            }

            $data['lat'] = $latitude;
            $data['lang'] = $longitude;

            $userData = [
                'name' => $request->user_name,
                'email' => $request->email,
                'phone_number' => $request->international_phone_number
            ];
            $userData = array_merge($userData, $addUserData);

            $result = User::updateOrCreate(['id' => $id], $userData);
            $id = $result->id;

            $user_detail = UserDetail::where('user_id', $id)->first();
            $oldImage = $oldCompanyImage = '';
            if ($user_detail) {
                $oldImage = $user_detail->profile_image ?? '';
                $oldCompanyImage = $user_detail->company_image ?? '';
            }

            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                if ($file instanceof UploadedFile && $file->isValid()) {
                    if (Storage::disk('public')->exists('profile/' . $oldImage)) {
                        Storage::disk('public')->delete('profile/' . $oldImage);
                    }
                    $filename = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('profile', $filename, 'public');
                    $data['profile_image'] = $filename;
                }
            }

            if ($request->hasFile('company_image')) {
                $file = $request->file('company_image');

                if ($file instanceof UploadedFile && $file->isValid()) {
                    if (Storage::disk('public')->exists('company-image/' . $oldCompanyImage)) {
                        Storage::disk('public')->delete('company-image/' . $oldCompanyImage);
                    }
                    $filename = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('company-image', $filename, 'public');
                    $data['company_image'] = $filename;
                }
            }

            UserDetail::updateOrCreate(['user_id' => $id], $data);

            if ($userType == 4 || $request->has('parent_id')) {
                $branchIds = $request->branch_id ?? [];
                if (!empty($id)) {
                    DB::table('branch_staffs')
                        ->where('staff_id', $id)
                        ->whereNotIn('branch_id', $branchIds)
                        ->delete();
                }

                if (is_array($branchIds) && !empty($branchIds)) {
                    foreach ($branchIds as $branchId) {
                        BranchStaffs::updateOrCreate(['branch_id' => $branchId, 'staff_id' => $id]);
                    }
                }
                
                if (empty($request->id ?? "")) {
                    $user = User::where('email', $request->email)->first();
                    $token = Password::createToken($user);

                    $resetLink = url(route('password.reset', [
                        'token' => $token,
                        'email' => $user->email,
                    ], false));

                    $this->sendStaffResetPasswordEmail($request, 'Provider Staff Reset Password Email', $resetLink, $user->id);
                }
            }

            return response()->json([
                'code' => 200,
                'message' => $success_msg,
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $error_msg,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function sendStaffResetPasswordEmail(Request $request, $notificationType = '', $resetLink = '', $id = '')
    {
        $template = Templates::select('templates.subject', 'templates.content')
            ->leftjoin('notification_types', 'notification_types.id', '=', 'templates.notification_type')
            ->where('notification_types.type', $notificationType)
            ->where('templates.type', 1)
            ->where('templates.status', 1)
            ->first();
        
        if ($template) {
            $settings = getCommonSettingData(['company_name', 'site_email', 'phone_no', 'site_address', 'postal_code', 'website']);
            $companyName = $settings['company_name'] ?? '';
            $companyWebsite = $settings['website'] ?? '';
            $companyPhone = $settings['phone_no'] ?? '';
            $companyEmail = $settings['site_email'] ?? '';
            $contact = $companyEmail . ' | ' . $companyPhone;
            $customerName = $request->first_name . ' ' . $request->last_name;

            $parentId = UserDetail::where('id', $id)->value('parent_id');
            $provider = UserDetail::find($parentId);
            $providerName = $provider && $provider->first_name
                ? $provider->first_name . ' ' . $provider->last_name
                : 'Provider';

            // Prepare email data
            $subject = str_replace(
                ['{{user_name}}', '{{first_name}}', '{{last_name}}', '{{customer_name}}', '{{phone_number}}', '{{email_id}}', '{{company_name}}', 
                '{{website_link}}', '{{contact}}', '{{provider_name}}', '{{link}}'],
                [$customerName, $request->first_name, $request->last_name, $customerName, $request->international_phone_number, $request->email, $companyName, 
                $companyWebsite, $contact, $providerName, $resetLink],
                $template->subject
            );
            
            $content = str_replace(
                ['{{user_name}}', '{{first_name}}', '{{last_name}}', '{{customer_name}}', '{{phone_number}}', '{{email_id}}', '{{company_name}}', 
                '{{website_link}}', '{{contact}}', '{{provider_name}}', '{{link}}'],
                [$customerName, $request->first_name, $request->last_name, $customerName, $request->international_phone_number, $request->email, $companyName,
                $companyWebsite, $contact, $providerName, $resetLink],
                $template->content
            );

            $emailData = [
                'to_email' => $request->email,
                'subject' => $subject,
                'content' => $content
            ];

            try {
                $emailRequest = new Request($emailData);
                $emailController = new EmailController();
                $emailController->sendEmail($emailRequest);
            } catch (\Exception $e) {
                Log::error('Failed to send password reset email: ' . $e->getMessage());
            }
        }
    }


    protected function getCoordinatesFromAddress(string $address): array
    {
        $apikey = GlobalSetting::where('key', 'goglemapkey')->value('value');
        if (!$apikey) {
            return [];
        }

        $url = "https://maps.google.com/maps/api/geocode/json?address=" . urlencode($address) . "&key=" . $apikey;

        try {
            $response = file_get_contents($url);
            $response = json_decode($response);

            if ($response && $response->status == 'OK') {
                return [
                    'lat' => $response->results[0]->geometry->location->lat,
                    'lang' => $response->results[0]->geometry->location->lng,
                ];
            }
        } catch (\Exception $e) {
            logger()->error('Geocoding API error: ' . $e->getMessage());
        }

        return [];
    }

    protected function storeFile(UploadedFile $file, string $directory): string
    {
        $filename = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->storeAs($directory, $filename, 'public');
        return $filename;
    }

    public function getProfileDetails(Request $request): JsonResponse|View
    {
        try {
            $id = $request->has('is_mobile') && $request->get('is_mobile') === "yes"
                ? $request->provider_id
                : (Auth::id() ?? $request->id);

            $user = $this->userRepository->getProfileDetails($id);
            $currencyDetails = Currency::all();

            $this->processProfileImages($user);

            if ($request->has('is_mobile') || $request->has('isMobile')) {
                return response()->json([
                    'code' => 200,
                    'message' => __('user_detail_retrieved'),
                    'data' => $user,
                ], 200);
            }

            return $this->renderProfileView($user, $currencyDetails);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => 404,
                'message' => __('User not found.'),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error retrieving user details.'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function processProfileImages(User $user): void
    {
        if ($user->userDetails) {
            // Process profile image
            $profileImage = $user->userDetails->profile_image;
            $user->userDetails->profile_image = $profileImage
                ? (Storage::disk('public')->exists('profile/' . $profileImage)
                    ? url('storage/profile/' . $profileImage)
                    : asset('assets/img/profile-default.png'))
                : asset('assets/img/profile-default.png');

            // Process company image for providers/staff
            if (in_array($user->user_type, [1, 2, 4])) {
                $companyImage = $user->userDetails->company_image;
                $user->userDetails->company_image = $companyImage
                    ? (Storage::disk('public')->exists('company-image/' . $companyImage)
                        ? url('storage/company-image/' . $companyImage)
                        : asset('assets/img/default-image.png'))
                    : asset('assets/img/default-image.png');
            }
        }
    }

    protected function renderProfileView(User $user, $currencyDetails): View
    {
        $viewMap = [
            3 => 'user-profile',
            2 => 'provider.provider-profile',
            4 => 'provider.provider-profile',
            1 => 'provider.provider-profile',
        ];

        $view = $viewMap[$user->user_type] ?? null;

        if (!$view) {
            abort(400, __('Invalid user type or missing data.'));
        }

        return view($view, [
            'data' => $user,
            'currencyDetails' => $currencyDetails
        ]);
    }

    public function getProfileDetailssearch(Request $request): JsonResponse|View
    {
        // Similar implementation as getProfileDetails but with different view names
        try {
            $id = $request->has('is_mobile') && $request->get('is_mobile') === "yes"
                ? $request->provider_id
                : (Auth::id() ?? $request->id);

            $user = $this->userRepository->getProfileDetails($id);
            $currencyDetails = Currency::all();

            $this->processProfileImages($user);

            if ($request->has('is_mobile') || $request->has('isMobile')) {
                return response()->json([
                    'code' => 200,
                    'message' => __('user_detail_retrieved'),
                    'data' => $user,
                ], 200);
            }

            return $this->renderSearchProfileView($user, $currencyDetails);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => 404,
                'message' => __('User not found.'),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error retrieving user details.'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function renderSearchProfileView(User $user, $currencyDetails): View
    {
        $viewMap = [
            3 => 'user-profilesearch',
            2 => 'provider.provider-profile',
            4 => 'provider.provider-profile',
        ];

        $view = $viewMap[$user->user_type] ?? null;

        if (!$view) {
            abort(400, __('Invalid user type or missing data.'));
        }

        return view($view, [
            'data' => $user,
            'currencyDetails' => $currencyDetails
        ]);
    }

    /* get provider and user details*/
    public function index()
    {
        $currentRouteName = Route::currentRouteName();
        if ($currentRouteName == 'admin.providerslist') {
            $title = 'Providers';
        } else {
            $title = 'Users';
        }
        return view('people.list', compact('title')); // Return the view for the dashboard
    }

    public function getUserList(Request $request): JsonResponse
    {
        try {
            $languages = Language::select('id', 'code')
                ->where('status', 1)
                ->whereNull('deleted_at')
                ->get();

            $languageId = $this->getLanguageId($languages);

            $providers = $this->userRepository->getUserList(
                $request['type'],
                $request['category_id'] ?? null,
                $request['keywords'] ?? null,
                $request['location'] ?? null,
                $request['ratings'] ?? null,
                $request['listtype'] ?? null,
                $languageId
            );

            return response()->json([
                'code' => 200,
                'message' => __('User detail retrieved successfully.'),
                'data' => $providers,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error! while getting user details'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function getLanguageId($languages)
    {
        if (Auth::check()) {
            return Auth::user()->user_language_id;
        }

        if (Cookie::get('languageId')) {
            return Cookie::get('languageId');
        }

        $defaultLanguage = $languages->firstWhere('is_default', 1);
        return $defaultLanguage ? $defaultLanguage->id : 1;
    }

    public function getUserFavour(Request $request): View
    {
        $userId = Auth::id();
        $favourList = $this->userRepository->getUserFavorites($userId);
        return view('user-favourites', compact('favourList'));
    }

    public function addFavour(Request $request): void
    {
        $userId = Auth::id();
        echo $request->id . "_" . $userId;
    }

    public function getUserViewDetails(Request $request)
    {
        try {
            $id = $request['id'];
            $data = $this->userRepository->getUserDetails($id);
            Session::put('userData', $data);
            return redirect()->route('user.viewdetails.page');
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error! while getting user details'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function renderUserViewPage(Request $request): View
    {
        $id = $request['id'];
        $data['userlist'] = $this->userRepository->getUserDetails($id);
        $dateformatSetting = GlobalSetting::where('key', 'date_format_view')->first();
        $dateFormat = $dateformatSetting->value ?? 'd-m-Y';
        $data['DateFormat'] = $dateFormat;

        return view('people.viewdetails', compact('data'));
    }

    public function verifyProvider(Request $request): JsonResponse
    {
        $languageCode = $request->language_code ?? app()->getLocale();

        try {
            $verified = $this->userRepository->verifyProvider($request->id);

            if (!$verified) {
                throw new \Exception('Provider verification failed');
            }

            $data = User::with('userDetails')
                ->where('id', $request->id)
                ->first();

            $this->sendProviderVerificationEmail($data, 31);

            return response()->json([
                'code' => 200,
                'message' => __('provider_verification_status_update_success', [], $languageCode),
                'data' => $request->status
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('provider_verification_status_update_error', [], $languageCode),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function sendProviderVerificationEmail($data, $notificationType): void
    {
        $template = Templates::select('subject', 'content')
            ->where('type', 1)
            ->where('notification_type', $notificationType)
            ->first();

        if ($template) {
            $settings = GlobalSetting::whereIn('key', ['company_name', 'website', 'phone_no', 'site_email'])
                ->pluck('value', 'key');

            $companyName = $settings['company_name'] ?? '';
            $companyWebsite = $settings['website'] ?? '';
            $companyPhone = $settings['phone_no'] ?? '';
            $companyEmail = $settings['site_email'] ?? '';
            $contact = $companyEmail . ' | ' . $companyPhone;
            $customerName = $data['userDetails']['first_name'] . ' ' . $data['userDetails']['last_name'];

            $subject = str_replace(
                ['{{user_name}}', '{{first_name}}', '{{last_name}}', '{{customer_name}}', '{{phone_number}}',
                 '{{email_id}}', '{{company_name}}', '{{website_link}}', '{{contact}}'],
                [$customerName, $data['userDetails']['first_name'], $data['userDetails']['last_name'],
                 $customerName, $data['phone_number'], $data['email'], $companyName, $companyWebsite, $contact],
                $template->subject
            );

            $content = str_replace(
                ['{{user_name}}', '{{first_name}}', '{{last_name}}', '{{customer_name}}', '{{phone_number}}',
                 '{{email_id}}', '{{company_name}}', '{{website_link}}', '{{contact}}', '{{signup_date}}'],
                [$customerName, $data['userDetails']['first_name'], $data['userDetails']['last_name'],
                 $customerName, $data['phone_number'], $data['email'], $companyName, $companyWebsite, $contact],
                $template->content
            );

            $emailData = [
                'to_email' => $data['email'],
                'subject' => $subject,
                'content' => $content
            ];

            try {
                $emailRequest = new Request($emailData);
                $emailController = new EmailController();
                $emailController->sendEmail($emailRequest);
            } catch (\Exception $e) {
                Log::error('Failed to send registration email: ' . $e->getMessage());
            }
        }
    }

    public function getPeopleStatus(Request $request): JsonResponse
    {
        try {
            $updated = $this->userRepository->updateUserStatus(
                $request->input('id'),
                $request->input('status')
            );

            if (!$updated) {
                throw new \Exception('User not found');
            }

            return response()->json([
                'code' => 200,
                'message' => 'Status Updated Successfully',
                'data' => $request->input('status')
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error! while updating user status'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $deleted = $this->userRepository->deleteUser($request->input('id'));

            if (!$deleted) {
                throw new \Exception('Failed to delete user');
            }

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'User deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => 'Failed to delete user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkUnique(Request $request): JsonResponse
    {
        $isUnique = $this->userRepository->checkUniqueField([
            'id' => $request->input('id'),
            'user_name' => $request->input('user_name'),
            'provider_name' => $request->input('provider_name'),
            'email' => $request->input('email'),
            'subscriber_email' => $request->input('subscriber_email')
        ]);

        return response()->json($isUnique);
    }

    public function providerRegister(ProviderRegistrationRequest $request): JsonResponse
    {
        $isParentCategory = $this->isParentCategory($request->category_id);

        if ($isParentCategory && empty($request->subcategory_ids)) {
            return response()->json([
                'code' => 422,
                'message' => 'Please select at least one subcategory!'
            ], 422);
        }

        $isMobile = $request->has('is_mobile') && $request->get('is_mobile') === "yes";
        $regStatus = $this->userRepository->getRegistrationStatus();

        if ($regStatus == 0) {
            $providerData = $this->prepareProviderData($request);
            $companyDetails = $this->prepareCompanyDetails($request);

            $providerFullData = array_merge($providerData, $companyDetails);

            $result = $this->userRepository->registerProvider(
                $providerData,
                $request->subcategory_ids,
                $companyDetails,
                $isMobile
            );

            $signupDate = formatDateTime($result['user']->created_at);

            if ($isMobile) {
                if ($result['providerApprovalStatus'] == 1) {
                    $this->userRepository->sendProviderSignupEmailToAdmin($providerFullData, 32, $signupDate);

                    return response()->json([
                        'code' => 200,
                        'message' => 'Registration Successful',
                        'register_status' => $result['regStatus'],
                        'provider_verified_status' => $result['provider_verified_status']
                    ], 200);
                } else {
                    $this->userRepository->sendProviderWelcomeEmail($providerFullData, 1, $signupDate);
                    $this->userRepository->sendProviderSignupEmailToAdmin($providerFullData, 32, $signupDate);

                    return response()->json([
                        'code' => 200,
                        'message' => 'Provider Registration Successful',
                        'data' => [
                            'user_id' => $result['user']->id,
                            'name' => $result['user']->name,
                            'token' => $result['token'],
                            'provider_verified_status' => 1
                        ]
                    ], 200);
                }
            } else {
                if ($result['providerApprovalStatus'] == 1) {
                    $this->userRepository->sendProviderSignupEmailToAdmin($providerFullData, 32, $signupDate);

                    return response()->json([
                        'code' => 200,
                        'message' => 'Registration Successful',
                        'register_status' => $result['regStatus'],
                        'provider_approval_status' => $result['providerApprovalStatus']
                    ], 200);
                } else {
                    $this->userRepository->sendProviderWelcomeEmail($providerFullData, 1, $signupDate);
                    $this->userRepository->sendProviderSignupEmailToAdmin($providerFullData, 32, $signupDate);

                    Auth::login($result['user']);
                    session(['user_id' => $result['user']->id]);
                    Cache::forget('provider_auth_id');
                    Cache::forever('provider_auth_id', $result['user']->id);

                    return response()->json([
                        'code' => 200,
                        'message' => 'Login Successful',
                        'register_status' => $result['regStatus'],
                        'provider_approval_status' => 0
                    ], 200);
                }
            }
        } else {
            $otpResult = $this->userRepository->generateOtpVerification(
                $request->provider_email,
                $request->provider_name,
                $request->provider_phone_number,
                $request->provider_password,
                $request->category_id,
                $request->subcategory_ids,
                $request->company_name,
                $request->company_website,
                $request->sub_service_type
            );

            return response()->json([
                'code' => 200,
                ...$otpResult['provider_data'],
                'otp_digit_limit' => $otpResult['otp_digit_limit'],
                'otp_expire_time' => $otpResult['otp_expire_time'],
                'otp_type' => $otpResult['otp_type'],
                'otp' => $otpResult['otp'],
                'expires_at' => $otpResult['expires_at'],
                'email_subject' => $otpResult['email_subject'],
                'email_content' => $otpResult['email_content'],
                'register_status' => $regStatus
            ]);
        }
    }

    protected function isParentCategory(int $categoryId): bool
    {
        return \App\Models\Categories::where('parent_id', $categoryId)->exists();
    }

    protected function prepareProviderData($request): array
    {
        return [
            'name' => $request->provider_name,
            'email' => $request->provider_email,
            'phone_number' => $request->provider_phone_number,
            'password' => $request->provider_password,
            'category_id' => $request->category_id,
            'sub_service_type' => $request->sub_service_type ?? 'individual',
            'provider_terms_policy' => $request->provider_terms_policy
        ];
    }

    protected function prepareCompanyDetails($request): array
    {
        return [
            'first_name' => $request->provider_first_name,
            'last_name' => $request->provider_last_name,
            'company_name' => $request->company_name,
            'company_website' => $request->company_website
        ];
    }

    public function userProviderList()
    {
        $categories = Categories::where('parent_id', 0) // Only categories with parent_id as 0
            ->get()
            ->map(function ($category) {
                $category->name = Str::limit($category->name, 20); // Limit name to 20 characters
                return $category;
            });
        $userIds = User::select('id')->where('user_type', 2)->get();
        $cities = UserDetail::whereIn('user_id', $userIds)->select('city')->whereNotNull('city')->distinct()->get();

        return view('user-providerlist', compact('categories', 'cities'));
    }

    public function userProvider()
    {
        $categories = Categories::where('parent_id', 0) // Only categories with parent_id as 0
            ->get()
            ->map(function ($category) {
                $category->name = Str::limit($category->name, 20); // Limit name to 20 characters
                return $category;
            });
        $userIds = User::select('id')->where('user_type', 2)->get();
        $cities = UserDetail::whereIn('user_id', $userIds)->select('city')->whereNotNull('city')->distinct()->get();

        return view('user-provider', compact('categories', 'cities'));
    }

  public function getStaffList(Request $request): JsonResponse
    {
        try {
            $staffList = $this->userRepository->getStaffList($request->id);

            return response()->json([
                'code' => 200,
                'message' => __('Staff details retrieved successfully.'),
                'data' => $staffList,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error! while retrieving staff details'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteStaff(Request $request): JsonResponse
    {
        try {
            $success = $this->userRepository->deleteStaff($request->id);

            if (!$success) {
                throw new \Exception('Failed to delete staff');
            }

            return response()->json([
                'code' => 200,
                'message' => __('Staff deleted successfully.'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => __('Error while deleting staff'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUserDashboardapi(Request $request): JsonResponse
    {
        try {
            $userId = Auth::id();
            $dashboardData = $this->userRepository->getUserDashboardData($userId);

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Dashboard data retrieved successfully',
                'data' => $dashboardData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => 'An error occurred while retrieving dashboard data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUserDashboard(Request $request): JsonResponse
    {
        try {
            $dashboardData = $this->userRepository->getUserDashboardData($request->user_id);

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Dashboard data retrieved successfully',
                'data' => $dashboardData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => 'An error occurred while retrieving dashboard data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
   public function forgotPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email_id' => 'required|email|exists:users,email',
            'new_password' => 'required|string|min:8',
        ], [
            'email_id.required' => 'Email is required.',
            'email_id.email' => 'Please provide a valid email address.',
            'email_id.exists' => 'The provided email does not exist.',
            'new_password.required' => 'Password is required.',
            'new_password.min' => 'Password must be at least 8 characters.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $success = $this->userRepository->updatePassword(
            $request->email_id,
            $request->new_password
        );

        if (!$success) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        return response()->json([
            'code' => 200,
            'message' => 'Password updated successfully.'
        ], 200);
    }

    public function forgotPasswordApi(Request $request): JsonResponse
    {
        return $this->forgotPassword($request);
    }

    public function deleteAccount(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'password' => 'required',
        ], [
            'id.required' => __('id_required', [], $request->language_code ?? 'en')
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 422,
                'errors' => $validator->messages()->toArray(),
            ], 422);
        }

        try {
            $success = $this->userRepository->deleteAccount(
                $request->id,
                $request->password,
                $request->language_code ?? 'en'
            );

            if (!$success) {
                throw new \Exception('Failed to delete account');
            }

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Account deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function userSecuritySettings()
    {
        $data = Auth::id();

        $passwordLastSeen = User::select('updated_at')->where('id', $data)->first();
        $dateformatSetting = GlobalSetting::where('key', 'date_format_view')->first();
        $timeformatSetting = GlobalSetting::where('key', 'time_format_view')->first();

        $passwordLastSeenFormatted = \Carbon\Carbon::parse($passwordLastSeen->updated_at)
            ->timezone('Asia/Kolkata')
            ->format($dateformatSetting->value . ', ' . $timeformatSetting->value);

        $devices = DB::table('user_devices')
            ->where('user_id', Auth::id())
            ->orderBy('last_seen', 'desc')
            ->get()
            ->map(function ($device) {
                $dateformatSetting = GlobalSetting::where('key', 'date_format_view')->first();
                $timeformatSetting = GlobalSetting::where('key', 'time_format_view')->first();
                $device->last_seen_formatted = \Carbon\Carbon::parse($device->last_seen)
                    ->timezone('Asia/Kolkata')
                    ->format($dateformatSetting->value . ', ' . $timeformatSetting->value);

                return $device;
            });


        return view('user_security', compact('data', 'devices', 'passwordLastSeenFormatted'));
    }

    public function providerSecuritySettings()
    {
        $data = Auth::id();

        $passwordLastSeen = User::select('updated_at')->where('id', $data)->first();
        $passwordLastSeenFormatted = \Carbon\Carbon::parse($passwordLastSeen->updated_at)
            ->timezone('Asia/Kolkata')
            ->format('d M Y, h:i:s A');

        $devices = DB::table('user_devices')
            ->where('user_id', Auth::id())
            ->orderBy('last_seen', 'desc')
            ->get()
            ->map(function ($device) {
                $device->last_seen_formatted = \Carbon\Carbon::parse($device->last_seen)
                    ->timezone('Asia/Kolkata')
                    ->format('d M Y, h:i:s A');

                return $device;
            });

        return view('provider.provider_security', compact('data', 'devices', 'passwordLastSeenFormatted'));
    }


  public function devideDelete(Request $request): JsonResponse
    {
        $deviceId = $request->device_id;

        try {
            $deleted = $this->userRepository->deleteDevice($deviceId);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Device not found.'
                ]);
            }

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Device deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete the device.'
            ]);
        }
    }

    public function checkPassword(Request $request): JsonResponse
    {
        $isValid = $this->userRepository->verifyPassword(
            $request->email,
            $request->current_password
        );

        return response()->json(!$isValid);
    }

    public function setPassword(Request $request)
    {
        try {
            User::findOrFail(Crypt::decrypt($request->id));
            return view('admin.set_password');
        } catch (DecryptException $e) {
            abort(404, 'The link is invalid or has expired.');
        } catch (ModelNotFoundException $e) {
            abort(404, 'The user associated with this link could not be found.');
        } catch (\Exception $e) {
            abort(500, 'An unexpected error occurred. Please try again later.');
        }
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'new_password' => 'required|string|min:8|different:current_password',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 422,
                'errors' => $validator->messages()->toArray(),
            ], 422);
        }

        try {
            $updated = $this->userRepository->updateUserPassword(
                $request->id,
                $request->new_password
            );

            if (!$updated) {
                throw new \Exception('Failed to update password');
            }

            return response()->json([
                'code' => 200,
                'success' => true,
                'redirectUrl' => route('login'),
                'message' => 'Password updated successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => 'An error occurred while updating password.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUserDevices(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id'
            ]);

            $devices = $this->userRepository->getUserDevices($request->user_id);

            return response()->json([
                'success' => true,
                'code' => 200,
                'devices' => $devices
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'code' => 500,
                'message' => $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function mapDateFormatToSQL($phpFormat): string
    {
        $replacements = [
            'd' => '%d',
            'D' => '%a',
            'j' => '%e',
            'l' => '%W',
            'F' => '%M',
            'm' => '%m',
            'M' => '%b',
            'n' => '%c',
            'Y' => '%Y',
            'y' => '%y',
        ];

        return strtr($phpFormat, $replacements);
    }
    
    public function showResetForm(Request $request, string $token): View
    {
        $email = $request->query('email');

        $user = User::where('email', $email)->first();

        if (!$user || !Password::tokenExists($user, $token)) {
            abort(404, 'Invalid or expired password reset token.');
        }

        return view('reset-password');
    }
}
