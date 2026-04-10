<?php

namespace Modules\GlobalSetting\app\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Modules\GlobalSetting\app\Models\Currency;
use Modules\GlobalSetting\app\Models\SubscriptionPackage;
use Modules\GlobalSetting\app\Repositories\Contracts\SubscriptionPackageInterface;
use Modules\GlobalSetting\app\Http\Requests\StoreSubscriptionPackageRequest;
use Modules\GlobalSetting\app\Http\Requests\UpdateSubscriptionPackageRequest;
use Modules\GlobalSetting\app\Http\Requests\DeleteSubscriptionPackageRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use App\Models\PackageTrx;

class SubscriptionPackageController extends Controller
{
    public function __construct(
        protected SubscriptionPackageInterface $subscriptionPackageRepository
    ) {
    }

    public function index(): JsonResponse
    {
        $filters = request()->only(['subscriptiontype', 'order_by', 'sort_by']);
        $subscriptions = $this->subscriptionPackageRepository->index($filters);

        if ($subscriptions->isEmpty()) {
            return $this->jsonResponse(200, 'Package Not Found!', []);
        }

        $currency = Cache::remember('currency_details', 86400, function () {
            return Currency::orderBy('id', 'DESC')->where('is_default', 1)->first();
        });

        $currencySymbol = $currency->symbol ?? '$';
        $authUserId = request('authid') ?? Auth::id();

        $latestRegularSubscription = PackageTrx::where('package_transactions.provider_id', $authUserId)
            ->where('package_transactions.status', 1)
            ->where('package_transactions.payment_status', 2)
            ->whereNull('package_transactions.deleted_at')
            ->join('subscription_packages', 'subscription_packages.id', '=', 'package_transactions.package_id')
            ->where('subscription_packages.subscription_type', 'regular')
            ->orderBy('package_transactions.id', 'desc')
            ->select('package_transactions.*', 'subscription_packages.subscription_type')
            ->first();
        
        $latestTopupSubscription = PackageTrx::where('package_transactions.provider_id', $authUserId)
            ->where('package_transactions.status', 1)
            ->where('package_transactions.payment_status', 2)
            ->whereNull('package_transactions.deleted_at')
            ->join('subscription_packages', 'subscription_packages.id', '=', 'package_transactions.package_id')
            ->where('subscription_packages.subscription_type', 'topup')
            ->orderBy('package_transactions.id', 'desc')
            ->select('package_transactions.*', 'subscription_packages.subscription_type')
            ->first();

        $data = $subscriptions->map(function ($subscription) use ($currencySymbol, $latestRegularSubscription, $latestTopupSubscription) {
            return [
                'id' => $subscription->id,
                'package_title' => $subscription->package_title,
                'price' => $subscription->price,
                'package_term' => $subscription->package_term,
                'package_duration' => $subscription->package_duration,
                'number_of_service' => $subscription->number_of_service,
                'number_of_feature_service' => $subscription->number_of_feature_service,
                'number_of_product' => $subscription->number_of_product,
                'number_of_service_order' => $subscription->number_of_service_order,
                'number_of_locations' => $subscription->number_of_locations,
                'number_of_staff' => $subscription->number_of_staff,
                'subscription_type' => $subscription->subscription_type,
                'description' => $subscription->description,
                'status' => $subscription->status,
                'currency' => $currencySymbol,
                'subscribedstatus' => $latestRegularSubscription && $latestRegularSubscription->package_id == $subscription->id ? 1 : 0,
                'topup_subscribedstatus' => $latestTopupSubscription && $latestTopupSubscription->package_id == $subscription->id ? 1 : 0
            ];
        })->toArray(); // Convert the Collection to array here

        return $this->jsonResponse(200, 'Subscription details retrieved successfully.', $data);
    }

    public function store(StoreSubscriptionPackageRequest $request): JsonResponse
    {
        $existing = SubscriptionPackage::where('package_title', $request->package_title)->first();

        if ($existing) {
            return $this->jsonResponse(422, 'Package Title already exists!');
        }

        $data = $request->validated();
        $save = $this->subscriptionPackageRepository->store($data);

        if (!$save) {
            return $this->jsonResponse(500, 'Something went wrong while saving the package!');
        }

        return $this->jsonResponse(200, __('subscription_package_create_success'));
    }

    public function update(UpdateSubscriptionPackageRequest $request): JsonResponse
    {
        $data = [
            'package_title' => $request->edit_package_title,
            'price' => $request->edit_price,
            'package_term' => $request->edit_package_term,
            'package_duration' => $request->edit_package_term == 'yearly' ? 1 : $request->edit_package_duration,
            'number_of_service' => $request->edit_number_of_service,
            'number_of_feature_service' => $request->edit_number_of_feature_service,
            'number_of_product' => $request->edit_number_of_product,
            'number_of_service_order' => $request->edit_number_of_service_order,
            'number_of_locations' => $request->edit_number_of_locations,
            'number_of_staff' => $request->edit_number_of_staff,
            'subscription_type' => $request->edit_subscription_type,
            'description' => $request->edit_description,
            'status' => $request->status,
        ];

        $update = $this->subscriptionPackageRepository->update($request->edit_id, $data);

        if (!$update) {
            return $this->jsonResponse(500, 'Something went wrong while updating the package!');
        }

        return $this->jsonResponse(200, __('subscription_package_update_success'));
    }

    public function delete(DeleteSubscriptionPackageRequest $request): JsonResponse
    {
        $this->subscriptionPackageRepository->delete($request->id);
        return $this->jsonResponse(200, __('subscription_package_delete_success'));
    }

    protected function jsonResponse(int $code, string $message, $data = []): JsonResponse
    {
        $responseData = $data instanceof \Illuminate\Support\Collection ? $data->toArray() : $data;
        
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $responseData
        ], $code);
    }
}