@extends('front')
@section('content')
<div class="breadcrumb-bar text-center">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-12">
                <h2 class="breadcrumb-title mb-2">{{ __('Product Details') }}</h2>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center mb-0">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}"><i class="ti ti-home-2"></i></a></li>
                        <li class="breadcrumb-item"><a href="{{ route('products.list') }}">{{ __('Products') }}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Product Details') }}</li>
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

<div class="page-wrapper">
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-xl-8">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="service-head mb-2">
                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3 class="mb-2"><?php echo $product->source_name ?></h3>
                                    <span class="badge badge-purple-transparent mb-2"><i class="ti ti-calendar-check me-1"></i>0+ {{ __('Orders') }}</span>
                                </div>
                                <div class="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                    <div class="d-flex align-items-center flex-wrap">
                                        <p class="me-3 mb-2">
                                            <i class="ti ti-map-pin me-2"></i>
                                            {{ optional(App\Models\UserDetail::select('city', 'state', 'country')->where('user_id', $product->user_id)->first())->showaaddress() ?? '' }}
                                        </p>
                                        <!-- Ratings logic might need adjustment if Ratings table uses service_id or product_id. Assuming product_id which is shared ID -->
                                        <!-- <p class="mb-2"><i class="ti ti-star-filled text-warning me-2"></i><span class="text-gray-9">{{ $ratings['avg_rating'] ?? 0.0 }} </span>({{ $ratings['total_count'] ?? 0 }} {{ __('reviews') }})</p> -->
                                    </div>

                                    <!-- Share Now Button -->
                                    <a href="javascript:void(0)" id="shareNowBtn" class="d-flex align-items-center m-0" data-bs-toggle="modal" data-bs-target="#shareModal">
                                        <i class="ti ti-share me-2 text-gray "></i>
                                        {{ __('share_now') }}
                                    </a>

                                    <!-- Share Modal -->
                                    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content border-0 rounded-4">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="shareModalLabel">{{ __('share_now') }}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    @if (!empty($socialMediaShares) && count($socialMediaShares))
                                                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                                                        @foreach ($socialMediaShares as $share)
                                                        @php
                                                        $currentUrl = urlencode(url()->current());
                                                        $platform = strtolower($share->platform_name);
                                                        $targetUrl = "#";
                                                        switch ($platform) {
                                                        case 'facebook':
                                                        $targetUrl = "https://www.facebook.com/sharer/sharer.php?u=$currentUrl";
                                                        break;
                                                        case 'twitter':
                                                        $targetUrl = "https://twitter.com/intent/tweet?url=$currentUrl";
                                                        break;
                                                        case 'linkedin':
                                                        $targetUrl = "https://www.linkedin.com/sharing/share-offsite/?url=$currentUrl";
                                                        break;
                                                        case 'whatsapp':
                                                        $targetUrl = "https://api.whatsapp.com/send?text=$currentUrl";
                                                        break;
                                                        case 'telegram':
                                                        $targetUrl = "https://t.me/share/url?url=$currentUrl";
                                                        break;
                                                        default:
                                                        $targetUrl = $share->url ?? "#";
                                                        }
                                                        @endphp

                                                        <a href="{{ $targetUrl }}" target="_blank" class="rounded-circle d-flex align-items-center justify-content-center"
                                                            title="Share on {{ ucfirst($platform) }}"
                                                            style="width: 40px; height: 40px; background-color: #3b5998;">
                                                            <i class="{{ $share->icon }} text-white" style="font-size: 18px;"></i>
                                                        </a>
                                                        @endforeach
                                                    </div>
                                                    @else
                                                    <p class="text-center text-muted">{{ __('No Product Links Available') }}</p>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center flex-wrap">
                                        <p class="me-3 mb-2"><i class="ti ti-eye me-2"></i>{{$product->views}} {{ __('Views') }}</p>
                                    </div>
                                </div>
                            </div>


                            <div class="service-wrap mb-4">
                                <div class="slider-wrap">
                                    <div class="owl-carousel service-carousel nav-center mb-3" id="large-img">
                                        @if(isset($meta) && $meta->count())
                                        @foreach($meta as $m)
                                        @if($m->source_key == 'product_image')
                                        <img src="{{ $m->source_Values }}" class="img-fluid img_one" alt="Slider Img">
                                        @endif
                                        @endforeach
                                        @else
                                        <img src="{{ asset('front/img/default-placeholder-image.png') }}" class="img-fluid" alt="Default Slider Img">
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <div class="accordion service-accordion">
                                <div class="accordion-item mb-4">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#overview" aria-expanded="false">
                                            {{ __('Product Overview') }}
                                        </button>
                                    </h2>
                                    <div id="overview" class="accordion-collapse collapse show">
                                        <div class="accordion-body border-0 p-0 pt-3">
                                            <div class="more-text">
                                                <p>{!! $product->source_description !!} </p>

                                            </div>
                                            <a href="javascript:void(0);" class="link-primary text-decoration-underline more-btn mb-4">{{ __('Read More') }}</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Gallery -->
                                <div class="accordion-item mb-4">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#gallery" aria-expanded="false">
                                            {{ __('Gallery') }}
                                        </button>
                                    </h2>
                                    <div id="gallery" class="accordion-collapse collapse show">
                                        <div class="accordion-body border-0 p-0 pt-3">
                                            <div class="gallery-slider owl-carousel nav-center gallery-img">
                                                @if(isset($meta) && $meta->count())
                                                @foreach($meta as $m)
                                                @if($m->source_key == 'product_image')
                                                <a href="{{ $m->source_Values }}" data-fancybox="gallery" class="gallery-item">
                                                    <img src="{{ $m->source_Values }}" alt="img">
                                                </a>
                                                @endif
                                                @endforeach
                                                @else
                                                <a href="{{ asset('front/img/default-placeholder-image.png') }}" data-fancybox="gallery" class="gallery-item">
                                                    <img src="{{ asset('front/img/default-placeholder-image.png') }}" alt="img">
                                                </a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Video -->
                                @php
                                $videoMeta = $meta->where('source_key', 'video_link')->first();
                                $videolink = $videoMeta ? $videoMeta->source_Values : "";
                                @endphp
                                @if ($videolink != "")
                                @php
                                preg_match('/(?:youtu\.be\/|v=)([^&?]+)/', $videolink, $matches);
                                $videoId = $matches[1] ?? null;
                                $thumbnail = $videoId ? "https://img.youtube.com/vi/$videoId/maxresdefault.jpg" : null;
                                @endphp
                                <div class="accordion-item mb-4">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button p-0" type="button" data-bs-toggle="collapse" data-bs-target="#video" aria-expanded="false">
                                            {{ __('Video') }}
                                        </button>
                                    </h2>
                                    <div id="video" class="accordion-collapse collapse show">
                                        <div class="accordion-body border-0 p-0 pt-3">
                                            <div class="video-wrap" @if ($thumbnail) style="background-image: url('{{ $thumbnail }}'); background-size: cover; " @endif>
                                                <a class="video-btn video-effect" data-fancybox="" href="{{$videolink}}">
                                                    <i class="fa-solid fa-play"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>

                    <!-- Reviews Section Omitted for brevity, can be added if Products have reviews -->
                </div>

                <div class="col-xl-4 theiaStickySidebar">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between border-bottom mb-3">
                                <div class="d-flex align-items-center">
                                    <div class="mb-3">
                                        @php
                                        $priceMeta = $meta->whereIn('source_key', ['Fixed', 'Minitue', 'Minute', 'Squre-metter', 'Hourly', 'Square-feet'])->first();
                                        $price = $priceMeta ? $priceMeta->source_Values : $product->source_price;
                                        @endphp
                                        <h4><span class="display-6 fw-bold">{{$currecy_details->symbol ?? '$'}}{{ $price }}</span> / <span class="text-default">{{ $product->price_type }}</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- my booking -->
                    @if (@session('user_id'))
                    <input type="hidden" id="product_slug" value="{{ $product->slug }}">
                    <?php
                    if (auth()->user()->user_type == 3) {
                    ?>
                        @php
                        // WhatsApp configuration for logged-in users
                        $whatsappNumber = env('WHATSAPP_BOOKING_NUMBER', '9779800000000');
                        $serviceName = $product->source_name;
                        $serviceUrl = url('/productdetail/' . $product->slug);
                        $whatsappMessage = "I would like to order {$serviceName}. URL: {$serviceUrl}";
                        $whatsappLink = "https://wa.me/{$whatsappNumber}?text=" . urlencode($whatsappMessage);
                        @endphp
                        <a href="{{ $whatsappLink }}" target="_blank" class="btn btn-lg btn-success w-100 d-flex align-items-center justify-content-center mb-3">
                            <i class="ti ti-brand-whatsapp me-2"></i>{{ __('Order via WhatsApp') }}
                        </a>
                    <?php } ?>
                    <?php
                    if (auth()->user()->user_type == 2 && auth()->user()->id == $product->user_id) {
                    ?>
                        <a href="{{ route('provider.product') }}">
                            <button type="button" class="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center mb-3"><i class="ti ti-calendar me-2"></i>{{__('My Product')}} </button>
                        </a>
                    <?php } ?>
                    @else
                    <a class="nav-link btn btn-light mb-3" href="#" data-bs-toggle="modal" data-bs-target="#login-modal"><i class="ti ti-calendar me-2"></i>{{ __('Order Product') }}</a>
                    @endif
                    <div class="card border-0">
                        <div class="card-body">
                            <h4 class="mb-3">{{ __('Product Vendor') }}</h4>
                            <div class="provider-info text-center bg-light-500 p-3 mb-3">
                                <div class="avatar avatar-xl mb-3">
                                    <img src="{{ optional(App\Models\UserDetail::select('first_name', 'last_name', 'profile_image')->where('user_id', $product->user_id)->first())->showprofilepic() ?? asset('assets/img/profile-default.png') }}"
                                        alt="img" class="img-fluid rounded-circle">
                                    <span class="service-active-dot"><i class="ti ti-check"></i></span>
                                </div>
                                <h5>{{ ucfirst(optional($product->createdBy)->first_name ?? '') }} {{ optional($product->createdBy)->last_name ?? '' }}</h5>
                            </div>
                        </div>
                    </div>

                    <div class="card border-0">
                        <div class="card-body">
                            <h4 class="mb-3">{{ __('Location') }}</h4>
                            <div class="map-wrap">
                                <!-- Map Logic if needed -->
                                <div class="text-muted fw-bold fs-12">
                                    {{ __('Map Location Available') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection