@extends('provider.provider')
@section('content')

<div class="page-wrapper">
    <div class="content container-fluid">
        <div class="row">
            <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                <div class="my-auto mb-2">
                    <div class="skeleton label-skeleton label-loader"></div>
                    <h3 class="page-title mb-1 d-none real-label">{{ __('Subscription') }}</h3>
                    <div class="skeleton label-skeleton label-loader"></div>
                    <nav class="d-none real-label">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <a href="{{route('provider.dashboard')}}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Subscription') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-xxl-12 col-lg-12">
                    <!-- Tabs -->
                    <div class="tabs mb-4">
                        <div class="skeleton label-skeleton label-loader"></div>
                        <button class="tab-link btn btn-primary me-2 d-none real-label" id="regularTab" onclick="loadTabData('regular')">{{ __('Subscription') }}</button>
                        <div class="skeleton label-skeleton label-loader"></div>
                        <button class="tab-link btn btn-secondary d-none real-label" id="topupTab" onclick="loadTabData('topup')">{{ __('topup') }}</button>
                    </div>
                    <!-- Subscription Cards -->
                    <div id="subscriptionCards" class="row g-3 d-none real-label" data-empty_topup="{{ __('no_topup_found') }}" data-empty_subscription="{{ __('no_subscription_found') }}">
                        <!-- Cards will be dynamically rendered here -->
                    </div>

                    <div class="d-flex gap-5">
                        <div id="subscriptionCards" class="row w-100 g-3">
                            <div class="skeleton subscription-skeleton subscription-loader"></div>
                        </div>
                        <div id="subscriptionCards" class="row w-100 g-3">
                            <div class="skeleton subscription-skeleton subscription-loader"></div>
                        </div>
                        <div id="subscriptionCards" class="row w-100 g-3">
                            <div class="skeleton subscription-skeleton subscription-loader"></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentModalLabel">{{ __('Select Payment Method') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="payment" enctype="multipart/form-data" name="paybook">
                        {{ csrf_field() }}
                        <input type="hidden" name="package_id" class="package_id" value="">
                        <input type="hidden" name="package_name" class="package_name" value="">
                        <input type="hidden" name="package_amount" class="package_amount" value="">
                        <input type="hidden" name="trx_id" class="trx_id" value="">
                        <div class="mb-3" id="paymentmethoddiv">

                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    @endsection