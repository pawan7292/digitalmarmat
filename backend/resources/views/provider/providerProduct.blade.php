@extends('provider.provider')

@section('content')
<div class="page-wrapper">
    <div class="content bg-white">
        <div class="d-md-flex d-block align-items-center justify-content-between border-bottom pb-3">
            <div class="my-auto mb-2">
                <div class="skeleton label-skeleton label-loader"></div>
                <h3 class="page-title mb-1 d-none real-label">{{ __('Product') }}</h3>
                <nav>
                    <div class="skeleton label-skeleton label-loader"></div>
                    <ol class="breadcrumb mb-0 d-none real-label">
                        <li class="breadcrumb-item">
                            <a href="{{ Auth::user()->user_type == 2 ? route('provider.dashboard') : route('staff.dashboard') }}" class="d-none real-label">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item active d-none real-label" aria-current="page">{{ __('Product') }}</li>
                    </ol>
                </nav>
            </div>
            <div class="mb-2">
                <div class="skeleton label-skeleton label-loader"></div>
                <button class="btn btn-primary add_service fixed-size-btn d-none real-label" id="providerAddProduct">
                    {{ __('Add Product') }}
                    <input type="hidden" name="auth_id" id="auth_id" value="{{ $userId }}">
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-12 col-xl-12">
                <div class="">
                    <div class="">
                        <div class="p-0">
                            <div class="custom-datatable-filter p-1 border-0">
                                <div class="table-responsive p-2">
                                    <table class="table border-0" id="datatable_product">
                                        <thead class="thead-light d-none real-label">
                                            <tr>
                                                <th>{{ __('#') }}</th>
                                                <th>{{ __('Product Name') }}</th>
                                                <th>{{ __('Slug') }}</th>
                                                <th>{{ __('Status') }}</th>
                                                <th>{{ __('Verify Status') }}</th>
                                                <th>{{ __('Action') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                    <!-- loader Datatable Start-->
                                    <table id="loader-table" class="table table-striped table-bordered">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>
                                                    <div class="skeleton label-skeleton label-loader"></div>
                                                    <p class="d-none real-label">ID</p>
                                                </th>
                                                <th>
                                                    <div class="skeleton label-skeleton label-loader"></div>
                                                    <p class="d-none real-label">Name</p>
                                                </th>
                                                <th>
                                                    <div class="skeleton label-skeleton label-loader"></div>
                                                    <p class="d-none real-label">Email</p>
                                                </th>
                                                <th>
                                                    <div class="skeleton label-skeleton label-loader"></div>
                                                    <p class="d-none real-label">Role</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @for ($i = 0; $i < 5; $i++)
                                                <tr>
                                                <td>
                                                    <div class="skeleton data-skeleton data-loader"></div>
                                                    <p class="d-none real-data">{{$i+1}}</p>
                                                </td>
                                                <td>
                                                    <div class="skeleton data-skeleton data-loader"></div>
                                                    <p class="d-none real-data">Product {{$i+1}}</p>
                                                </td>
                                                <td>
                                                    <div class="skeleton data-skeleton data-loader"></div>
                                                    <p class="d-none real-data">Details</p>
                                                </td>
                                                <td>
                                                    <div class="skeleton data-skeleton data-loader"></div>
                                                    <p class="d-none real-data">Active</p>
                                                </td>
                                                </tr>
                                                @endfor
                                        </tbody>
                                    </table>
                                    <!-- loader Datatable End -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<div class="modal fade" id="delete-modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form>
                <div class="modal-body text-center">
                    <span class="delete-icon">
                        <i class="ti ti-trash-x"></i>
                    </span>
                    <h4>Confirm Deletion</h4>
                    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div class="d-flex justify-content-center">
                        <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                        <button type="submit" class="btn btn-danger" id="confirmDelete">Yes, Delete</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Subscription Modals - Reused or Adapted -->
<div class="modal fade" id="no_sub" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="mb-4">
                    <span class="warning-icon mx-auto mb-4">
                        <i class="ti ti-alert-circle"></i>
                    </span>
                    <h4 class="mb-1">No Active Subscription Found</h4>
                    <p class="text-muted">
                        It seems like you do not have an active subscription. Please purchase a subscription to add products and manage your account effectively.
                    </p>
                    <a href="{{ route('provider.subscription') }}" class="btn btn-linear-primary">Get a Subscription</a>
                    <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-outline-secondary">Close</a>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="sub_count_end" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="mb-4">
                    <span class="warning-icon mx-auto fs-2 mb-4">
                        <i class="ti ti-alert-circle"></i>
                    </span>
                    <h4 class="mb-1">Your Product Limit Has Been Reached</h4>
                    <p class="text-muted">
                        You have reached the maximum allowed product count for your subscription. To continue using the products or add new features, please upgrade your subscription.
                    </p>
                    <a href="{{ route('provider.subscription') }}" class="btn btn-linear-primary">Renew Subscription</a>
                    <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-outline-secondary text-end">Close</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="sub_end" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="mb-4">
                    <span class="warning-icon mx-auto fs-2 mb-4">
                        <i class="ti ti-alert-circle"></i>
                    </span>
                    <h4 class="mb-1">Your Subscription Has Ended</h4>
                    <p class="text-muted">
                        Your subscription period has ended. To continue using the products and adding new features, please renew or purchase a new subscription.
                    </p>
                    <a href="{{ route('provider.subscription') }}" class="btn btn-linear-primary">Renew Subscription</a>
                    <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-outline-secondary text-end">Close</a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JS will need to handle #providerAddProduct click -->
@endsection

@push('scripts')

@endpush