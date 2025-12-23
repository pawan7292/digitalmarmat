<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\SubscriptionInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

class SubscriptionController extends Controller
{
    protected $subscriptionRepository;

    public function __construct(SubscriptionInterface $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    public function index(): View
    {
        return view('provider.subscription.list');
    }

    public function historyindex(): View
    {
        $authUserId = Auth::id() ?? Cache::get('provider_auth_id');
        
        $data = [
            'standardplan' => $this->subscriptionRepository->getActiveSubscription($authUserId, 'regular'),
            'topupplan' => $this->subscriptionRepository->getActiveSubscription($authUserId, 'topup'),
            'currency' => $this->subscriptionRepository->getCurrencySymbol()->symbol ?? '$'
        ];

        return view('provider.subscription.subscriptionhistory', compact('data'));
    }

    public function storepacktrx(Request $request): JsonResponse
    {
        try {
            $authUserId = Auth::id() ?? $request->provider_id ?? Cache::get('provider_auth_id');
            
            $data = [
                'provider_id' => $authUserId,
                'package_id' => $request->package_id,
                'amount' => $request->amount,
                'type' => $request->type ?? 'paid',
                'subscribetype' => $request->subscribetype ?? null
            ];

            $transactionId = $this->subscriptionRepository->createPackageTransaction($data);

            return response()->json([
                'code' => 200,
                'message' => 'Success',
                'data' => $transactionId
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getpaymentmethod(): JsonResponse
    {
        try {
            $methods = $this->subscriptionRepository->getPaymentMethods();
            return response()->json($methods->isNotEmpty() ? $methods : []);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while saving!'
            ], 500);
        }
    }

    public function getpaymentmethodProvider(): JsonResponse
    {
        try {
            $methods = $this->subscriptionRepository->getPaymentMethods(true);
            return response()->json($methods);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while fetching payment methods!'
            ], 500);
        }
    }

    public function getsubscriptionlist(): JsonResponse
    {
        try {
            $subscriptions = $this->subscriptionRepository->getAllSubscriptions();
            return response()->json([
                'code' => 200,
                'message' => __('Data retrieved successfully.'),
                'data' => $subscriptions,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getsubscriptionhistorylist(Request $request): JsonResponse
    {
        try {
            $authId = Auth::id() ?? $request->user_id;
            $data = $this->subscriptionRepository->getUserSubscriptionHistory($authId);
            
            return response()->json([
                'code' => 200,
                'message' => __('Data retrieved successfully.'),
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
