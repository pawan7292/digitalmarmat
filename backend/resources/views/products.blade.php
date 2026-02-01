@extends('front')
@section('canonical')
<link rel="canonical" href="{{ route('products.list') }}">
@endsection

@section('content')
<!-- Breadcrumb -->
<div class="breadcrumb-bar text-center">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-12">
                <h2 class="breadcrumb-title mb-2">{{ __('Products') }}</h2>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center mb-0">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}"><i class="ti ti-home-2"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Products') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="breadcrumb-bg">
            <img src="{{ asset('front/img/bg/breadcrumb-bg-01.png') }}" class="breadcrumb-bg-1" alt="Img">
            <img src="{{ asset('front/img/bg/breadcrumb-bg-02.png') }}" class="breadcrumb-bg-2" alt="Img">
        </div>
    </div>
</div>
<!-- /Breadcrumb -->
<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-4 theiaStickySidebar">
                    <div class="card mb-4 mb-lg-0">
                        <div class="card-body">
                            <form action="{{ route('products.list') }}" method="GET" id="filterForm">
                                <div class="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <h5><i class="ti ti-filter-check me-2"></i>{{ __('Filters') }}</h5>
                                    <a href="{{ route('products.list') }}">{{ __('Reset Filter') }}</a>
                                </div>
                                <div class="mb-3 pb-3 border-bottom">
                                    <label class="form-label">{{ __('Search By Keyword') }}</label>
                                    <input type="text" name="keywords" id="keywords" class="form-control" maxlength="50" placeholder="{{ __('what are you looking for') }}">
                                </div>
                                <div class="accordion border-bottom mb-3">
                                    <div class="accordion-item mb-3">
                                        <div class="accordion-header" id="accordion-headingThree">
                                            <div class="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseThree" aria-expanded="true" aria-controls="accordion-collapseThree" role="button">
                                                {{ __('Categories') }}
                                            </div>
                                        </div>
                                        <div id="accordion-collapseThree" class="accordion-collapse collapse show" aria-labelledby="accordion-headingThree">
                                            <div class="content-list mb-3" id="fill-more">
                                                <div class="form-check mb-2">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" id="all_categories" type="checkbox">
                                                        {{ __('All Category') }}
                                                    </label>
                                                </div>
                                                <?php
                                                if (isset($productscategory)) {
                                                    foreach ($productscategory as $productscategoryValues) {
                                                ?>
                                                        <div class="form-check mb-2">
                                                            <label class="form-check-label">
                                                                <input name="cate[]" value="<?php echo $productscategoryValues->id; ?>" class="form-check-input filter_category" data-slug="{{ $productscategoryValues->slug ?? '' }}" type="checkbox">
                                                                <?php echo $productscategoryValues->name; ?>
                                                            </label>
                                                        </div>
                                                <?php
                                                    }
                                                }
                                                ?>

                                            </div>
                                            @if (isset($productscategory) && count($productscategory) > 4)
                                            <a href="javascript:void(0);" id="more" class="more-view text-primary fs-14">{{ __('View more') }} <i class="ti ti-chevron-down ms-1"></i></a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion border-bottom mb-3">
                                    <div class="accordion-header" id="accordion-headingFour">
                                        <div class="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseFour" aria-expanded="true" aria-controls="accordion-collapseFour" role="button">
                                            {{ __('Sub Category') }}
                                        </div>
                                    </div>
                                    <div id="accordion-collapseFour" class="accordion-collapse collapse show" aria-labelledby="accordion-headingFour">
                                        <div class="mb-3">
                                            <select class="select" name="subcategory" id="subcategory">
                                                <option selected disabled> {{ __('select_sub_category') }}</option>
                                                @if(isset($subcategories))
                                                @foreach($subcategories as $sub)
                                                <option value="{{ $sub->id }}" {{ request('subcategory') == $sub->id ? 'selected' : '' }}>{{ $sub->name }}</option>
                                                @endforeach
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion border-bottom mb-3">
                                    <div class="accordion-header" id="accordion-headingFive">
                                        <div class="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseFive" aria-expanded="true" aria-controls="accordion-collapseFive" role="button">
                                            {{ __('Location') }}
                                        </div>
                                    </div>
                                    <div id="accordion-collapseFive" class="accordion-collapse collapse show" aria-labelledby="accordion-headingFive">
                                        <div class="mb-3">
                                            <div class="position-relative">
                                                <select class="select" name="location" id="location">
                                                    <option value="" selected>{{ __('Select') }} {{ __('Location') }}</option>
                                                    @if (isset($cities))
                                                    @foreach ($cities as $city)
                                                    <option value="{{ $city->city }}">{{ $city->showcities() }}</option>
                                                    @endforeach
                                                    @endif
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion">
                                    <div class="accordion-item mb-3">
                                        <div class="accordion-header" id="accordion-headingTwo">
                                            <div class="accordion-button fs-18 p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseTwo" aria-expanded="true" aria-controls="accordion-collapseTwo" role="button">
                                                {{ __('Ratings') }}
                                            </div>
                                        </div>
                                        <div id="accordion-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="accordion-headingTwo">
                                            <div class="mb-3">
                                                <div class="form-check mb-2">
                                                    <label class="form-check-label d-block">
                                                        <input class="form-check-input rating_filter" name="rating[]" value="5" type="checkbox">
                                                        <span class="rating">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i><span class="float-end"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <!-- Add other ratings if needed -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-dark w-100" id="searchServiceBtn">{{ __('Search') }}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                    <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        @if (isset($products) && !$products->isEmpty())
                        <h4>{{ __('Found') }} <span class="text-primary"><?php echo $products->total(); ?> {{ __('Products') }}</span></h4>
                        @else
                        <h4></h4>
                        @endif
                        <form action="{{ route('products.list') }}" method="GET" id="sortform">
                            <div class="d-flex align-items-center">
                                <span class="text-dark me-2">{{ __('Sort') }}</span>
                                <select class="select" name="sortprice" id="sortprice" onchange="this.form.submit()">
                                    <option value="">{{ __('Price Low to High') }}</option>
                                    <option value="highl" {{ request('sortprice') == 'highl' ? 'selected' : '' }}>
                                        {{ __('Price High to Low') }}
                                    </option>
                                </select>
                                <input type="hidden" name="category" value="{{ request('category') ?? request()->segment(2) }}">
                            </div>
                        </form>
                    </div>
                    <div class="row align-items-center">
                        @if (!isset($products) || $products->isEmpty())
                        <h4 class="text-center"><span>{{ __('No products available') }}</span></h4>
                        @endif
                        <?php
                        if (isset($products)) {
                            foreach ($products as $productdetail) {
                        ?>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card p-0">
                                        <div class="card-body p-0">
                                            <div class="img-sec w-100">
                                                <a href="{{ route('product.detail', $productdetail->slug) }}" class="serv_img">
                                                    @php
                                                    $productImage = Modules\Product\app\Models\Productmeta::select('source_Values','source_key')
                                                    ->where('product_id', '=', $productdetail->id)
                                                    ->where('source_key', 'product_image')
                                                    ->first();
                                                    @endphp
                                                    @if ($productImage)
                                                    <img src="{{ $productImage->showImage() }}" class="img-fluid rounded-top w-100" alt="img">
                                                    @else
                                                    <img src="{{ asset('front/img/default-placeholder-image.png') }}" class="img-fluid rounded-top w-100" alt="img">
                                                    @endif
                                                </a>
                                                <div class="image-tag d-flex justify-content-end align-items-center">
                                                    <span class="trend-tag">{{ $productdetail->name }}</span>
                                                    <a href="javascript:void(0);" onclick="addfavour({{ $productdetail->id }})" class="fav-icon like-icon"><i class="ti ti-heart"></i></a>
                                                </div>

                                            </div>
                                            <div class="p-3">
                                                <h5 class="mb-2">
                                                    <a href="{{ route('product.detail', $productdetail->slug) }}">{{ $productdetail->source_name }}</a>
                                                </h5>
                                                <div class="d-flex justify-content-between align-items-center mb-3">
                                                    <div class="d-flex align-items-center">
                                                        @php
                                                        $userDetail = App\Models\UserDetail::select('city', 'state', 'country')
                                                        ->where('user_id', '=', $productdetail->user_id)
                                                        ->first();
                                                        @endphp
                                                        @if ($userDetail && $userDetail->showaaddress())
                                                        <i class="ti ti-map-pin me-2"></i>
                                                        <span class="fs-14">{{ $userDetail->showaaddress() }}</span>
                                                        @endif
                                                    </div>
                                                    <span class="rating text-gray fs-14"><i class="fa fa-star filled me-1"></i>{{ number_format(Modules\Product\app\Models\Rating::where(['product_id' => $productdetail->id, 'parent_id' => 0])->avg('rating'), 1) }}</span>
                                                </div>

                                                <div class="d-flex justify-content-between align-items-center">
                                                    @php
                                                    $priceMeta = Modules\Product\app\Models\Productmeta::select('source_Values','source_key')
                                                    ->where('product_id', $productdetail->id)
                                                    ->whereIn('source_key', ['Fixed', 'Minitue', 'Minute', 'Squre-metter', 'Hourly', 'Square-feet'])
                                                    ->first();
                                                    @endphp

                                                    @if($priceMeta)
                                                    <h5>{{ $currecy_details->symbol ?? '$' }}{{ $priceMeta->showPrice() }}</h5>
                                                    @endif
                                                    @if (@session('user_id') && $productdetail->user_id != @session('user_id'))
                                                    <button type="button" onclick="myreFunction('{{ $productdetail->slug }}')" class="btn bg-primary-transparent">{{ __('Order Now') }}</button>
                                                    @elseif (@session('user_id') && $productdetail->user_id == @session('user_id') && auth()->user()->user_type == 2)
                                                    <a href="{{ route('provider.product') }}" class="btn bg-primary-transparent">{{ __('My Product') }}</a>
                                                    @else
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#login-modal" class="btn bg-primary-transparent">{{ __('Order Now') }}</a>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <?php
                            }
                        }
                        ?>
                    </div>
                    @if (isset($products) && $products->hasPages())
                    <nav aria-label="Page navigation">
                        {{ $products->links() }}
                    </nav>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /Page Wrapper -->

@section('scripts')

@endsection

@endsection