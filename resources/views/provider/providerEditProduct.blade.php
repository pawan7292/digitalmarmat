@extends('provider.provider')

@section('content')
<div class="page-wrapper">
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="service-wizard mb-4">
                        <ul class="d-flex align-items-center flex-wrap row-gap-2" id="progressbar">
                            <li class="active me-2">
                                <span class="me-2"><i class="ti ti-info-circle"></i></span>
                                <h6 class="translatable" data-translate="product_information">
                                    {{ __('Product Information') }}
                                </h6>
                            </li>
                            <li class="me-2 location_tab d-none">
                                <span class="me-2"><i class="ti ti-map-pin"></i></span>
                                <h6 class="translatable" data-translate="">{{ __('Branch Information') }}
                                </h6>
                            </li>
                            <li class="me-2">
                                <span class="me-2"><i class="ti ti-photo"></i></span>
                                <h6 class="translatable" data-translate="gallery">{{ __('Gallery') }}</h6>
                            </li>
                            <li class="me-2">
                                <span class="me-2"><i class="ti ti-shield"></i></span>
                                <h6 class="translatable" data-translate="seo">{{ __('Seo') }}</h6>
                            </li>
                        </ul>
                    </div>

                    <fieldset id="first-field" style="display: block;">
                        <form id="product-form">
                            <input type="hidden" name="id" id="id" value="{{ $product->id }}" readonly>
                            <input type="hidden" name="userLangId" id="userLangId" value="{{ $userLangId ?? 1 }}">
                            <!-- Use PHP to pass formatted images to JS if needed, or render them -->

                            <div class="skeleton label-skeleton label-loader"></div>
                            <h4 class="mb-3 translatable d-none real-label" data-translate="product">{{ __('Edit Product Information') }}</h4>
                            <div class="card">
                                <div class="card-body">
                                    <div class="accordion" id="accordionPanelsStayOpenExample">
                                        <div class="accordion-item mb-3">
                                            <div class="accordion-header" id="accordion-headingOne">
                                                <div class="skeleton label-skeleton label-loader"></div>
                                                <div class="accordion-button p-0 translatable d-none real-label"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#accordion-collapseOne" aria-expanded="true"
                                                    data-translate="basic" aria-controls="accordion-collapseOne"
                                                    role="button">
                                                    {{ __('Basic Information') }}
                                                </div>
                                            </div>
                                            <div id="accordion-collapseOne" class="accordion-collapse collapse show"
                                                aria-labelledby="accordion-headingOne">
                                                <div class="accordion-body p-0 mt-3 pb-1">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    data-translate="product_name_label"
                                                                    for="product_name">
                                                                    {{ __('Product Name') }}<span class="text-danger">*</span>
                                                                </label>
                                                                <input type="text" name="product_name" id="product_name" class="form-control field-input translatable d-none real-input"
                                                                    value="{{ $product->source_name }}"
                                                                    data-translate="product_name_placeholder"
                                                                    placeholder="{{ __('Enter Product Name') }}">
                                                                <span class="invalid-feedback translatable" id="product_name_error"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    data-translate="product_code_label"
                                                                    for="product_code">
                                                                    {{ __('Product Code') }}<span class="text-danger">*</span>
                                                                </label>
                                                                <input type="text" name="product_code"
                                                                    id="product_code"
                                                                    value="{{ $product->source_code }}"
                                                                    class="form-control field-input translatable d-none real-input"
                                                                    data-translate="product_code_placeholder"
                                                                    placeholder="{{ __('Enter Product Code') }}">
                                                                <span class="invalid-feedback"
                                                                    id="product_code_error"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    for="category" data-translate="category">
                                                                    {{ __('Category') }} <span class="text-danger">*</span>
                                                                </label>
                                                                <select name="category" id="category"
                                                                    class="form-control d-none real-input categoryProviderSelect">
                                                                    <option value="" data-translate="select_category">{{ __('Select Category') }}</option>
                                                                    <!-- Assuming categories loaded via JS or passed -->
                                                                    @foreach($categoriesLang as $category)
                                                                    <option value="{{ $category->id }}" {{ $product->source_category == $category->id ? 'selected' : '' }}>
                                                                        {{ $category->name }}
                                                                    </option>
                                                                    @endforeach
                                                                </select>
                                                                <span class="invalid-feedback" id="category_error"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    for="sub_category"
                                                                    data-translate="sub_category">
                                                                    {{ __('Sub Category') }} <span class="text-danger"> *</span>
                                                                </label>
                                                                <select name="sub_category" id="sub_category"
                                                                    class="form-control subcategories d-none real-input">
                                                                    <option value="" data-translate="select_sub_category">{{ __('select_sub_category') }}</option>
                                                                    <!-- Subcategories loaded via JS, but we can pre-render if available -->
                                                                    @if(isset($subCategoriesLang))
                                                                    @foreach($subCategoriesLang as $sub)
                                                                    <option value="{{ $sub->id }}" {{ $product->source_subcategory == $sub->id ? 'selected' : '' }}>{{ $sub->name }}</option>
                                                                    @endforeach
                                                                    @endif
                                                                </select>
                                                                <span class="invalid-feedback" id="sub_category_error"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="mb-3 d-none real-input">
                                                                <div class="d-flex align-items-basline justify-content-between">
                                                                    <label class="form-label">{{ __('Description') }} <span class="text-danger"> </span></label>
                                                                    @if($chat_status === "1")
                                                                    <div class="mb-1" id="chat">
                                                                        <img src="{{ asset('front/img/stat.png') }}" alt="">
                                                                        <a href="javascript:void(0)" id="openChatModal" class="form-label text-light px-2 py-1 fw-medium">Genarate AI Content</a>
                                                                    </div>
                                                                    @endif
                                                                </div>
                                                                <textarea name="description" id="description" class="form-control" rows="4" placeholder="{{ __('Enter Description') }}">{{ $product->source_description }}</textarea>
                                                                <span class="invalid-feedback" id="description_error"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item mb-3">
                                            <div class="accordion-header" id="accordion-headingTwo">
                                                <div class="accordion-button p-0 translatable d-none real-label"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#accordion-collapseTwo" aria-expanded="true"
                                                    aria-controls="accordion-collapseTwo" data-translate="pricing">
                                                    {{ __('Pricing & Stock') }}
                                                </div>
                                            </div>
                                            <div id="accordion-collapseTwo" class="accordion-collapse collapse show"
                                                aria-labelledby="accordion-headingTwo">
                                                <div class="accordion-body p-0 mt-3 pb-1">
                                                    <div class="row">
                                                        <div class="col-xl-3 col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    data-translate="price_type"
                                                                    for="price_type">{{ __('Price Type') }}
                                                                    <span class="text-danger">*</span>
                                                                </label>
                                                                <select name="price_type" id="price_type"
                                                                    class="form-control field-input d-none real-input">
                                                                    <option value="fixed" {{ $product->price_type == 'fixed' ? 'selected' : '' }}
                                                                        data-translate="price_type_fixed">Fixed
                                                                    </option>
                                                                </select>
                                                                <span class="invalid-feedback" id="price_type_error"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3 col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    for="service_price" data-translate="price">{{ __('Price') }}
                                                                    <span class="text-danger">*</span></label>
                                                                <input type="text" name="service_price"
                                                                    id="service_price" maxlength="6"
                                                                    value="{{ $product->source_price }}"
                                                                    class="form-control field-input translatable d-none real-input"
                                                                    placeholder="{{ __('Enter Product Price') }}">
                                                                <span class="invalid-feedback" id="service_price_error"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3 col-md-6">
                                                            <div class="mb-3">
                                                                <label class="form-label text-name translatable d-none real-label"
                                                                    for="source_stock" data-translate="stock">{{ __('Stock Quantity') }}
                                                                    <span class="text-danger"></span></label>
                                                                <input type="number" name="source_stock"
                                                                    id="source_stock"
                                                                    value="{{ $product->source_stock }}"
                                                                    class="form-control field-input translatable d-none real-input"
                                                                    placeholder="{{ __('Enter Stock') }}">
                                                                <span class="invalid-feedback" id="source_stock_error"></span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <div class="skeleton label-skeleton label-loader"></div>
                                        <button id="service_btn" class="btn btn-dark translatable d-none real-label" type="button"
                                            data-translate="continue">{{ __('Continue') }}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>

                    <fieldset id="second-field" style="display: none;">
                        <form id="branch-info-dummy">
                            <div class="card">
                                <div class="card-body">
                                    <p class="text-muted">Skipping Branch Info for Product...</p>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <a id="location_prv" class="btn btn-light me-3 translatable" data-translate="back">{{ __('Back') }}</a>
                                        <a id="location_btn" class="btn btn-dark translatable" data-translate="continue">{{ __('Continue') }}</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>

                    <fieldset id="third-field" style="display: none;">
                        <form id="image-form">
                            <h4 class="mb-3 translatable" data-translate="gallery">{{ __('Gallery') }}</h4>
                            <div class="card">
                                <div class="card-body">
                                    <div class="border-bottom mb-3 pb-3">
                                        <h4 class="fs-20 translatable" data-translate="add_images_heading">{{ __('Add Images') }}</h4>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label class="form-label text-name translatable"
                                                    data-translate="add_product_images_label" for="product_images">
                                                    {{ __('Add Product Images') }} <span class="text-danger">*</span>
                                                </label>
                                                <div class="d-flex align-items-center flex-wrap row-gap-3 gap-2">
                                                    @if(isset($product_images))
                                                    @foreach($product_images as $img)
                                                    <div class="existing-image">
                                                        <img src="{{ $img }}" style="width:100px; height:100px; object-fit:cover;">
                                                        <!-- Delete logic needed via JS? -->
                                                    </div>
                                                    @endforeach
                                                    @endif
                                                    <div class="file-upload d-flex align-items-center justify-content-center flex-column">
                                                        <i class="ti ti-photo mb-2"></i>
                                                        <label class="form-label translatable" data-translate="image_label">{{ __('Image') }}</label>
                                                        <input type="file" name="product_images[]"
                                                            id="product_images"
                                                            class="form-control field-input translatable"
                                                            accept="image/*" multiple>
                                                        <span class="invalid-feedback" id="product_images_error"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end border-top pt-3">
                                        <a id="image_prv" class="btn btn-light me-3 translatable" data-translate="back">{{ __('Back') }}</a>
                                        <button id="image_btn" class="btn btn-dark translatable" type="button" data-translate="continue">{{ __('Continue') }}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>

                    <fieldset id="forth-field" style="display: none;">
                        <form id="seo-form">
                            <input type="hidden" name="language_id" id="language_id_input" value="1">
                            <h4 class="mb-3 translatable" data-translate="ser_seo">{{ __('Seo') }}</h4>
                            <div class="card">
                                <div class="card-body">
                                    <div class="border-bottom mb-3 pb-3">
                                        <h4 class="fs-20 translatable" data-translate="add_seo">{{ __('Add Seo') }}</h4>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label class="form-label text-name translatable"
                                                    data-translate="seo_title_label" for="seo_title">
                                                    {{ __('SEO Title') }} <span class="text-danger">*</span>
                                                </label>
                                                <input type="text" name="seo_title" id="seo_title"
                                                    value="{{ $product->seo_title }}"
                                                    class="form-control field-input translatable"
                                                    placeholder="{{ __('Enter SEO Title') }}">
                                                <span class="invalid-feedback" id="seo_title_error"></span>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label class="form-label text-name translatable"
                                                    data-translate="seo_description_label" for="seo_description">
                                                    {{ __('SEO Description') }} <span class="text-danger">*</span>
                                                </label>
                                                <textarea name="seo_description" id="seo_description"
                                                    class="form-control field-input translatable" rows="4"
                                                    placeholder="{{ __('Enter SEO Description') }}">{{ $product->seo_description }}</textarea>
                                                <span class="invalid-feedback" id="seo_description_error"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <a id="seo_prv" class="btn btn-light me-3 translatable" data-translate="back">{{ __('Back') }}</a>
                                        <button id="seo_btn" class="btn btn-dark add_btn translatable" type="button" data-translate="update">{{ __('Update Product') }}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>

                </div>
            </div>
        </div>
    </div>
</div>

<!-- Success Modal -->
<div class="modal fade" id="provider_service_success_modal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="mb-4">
                    <span class="success-icon mx-auto mb-4">
                        <i class="ti ti-check"></i>
                    </span>
                    <h4 class="mb-1">{{ __('Product Updated Successfully') }}</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <a href="{{ route('provider.product') }}" class="btn btn-primary">{{ __('Go to Dashboard') }}</a>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
    $(document).ready(function() {

        // Navigation Logic (Same as Add)
        $('#service_btn').on('click', function() {
            $('#first-field').hide();
            $('#second-field').hide();
            $('#third-field').show();
        });

        $('#location_btn').on('click', function() {
            $('#second-field').hide();
            $('#third-field').show();
        });

        $('#location_prv').on('click', function() {
            $('#second-field').hide();
            $('#first-field').show();
        });

        $('#image_btn').on('click', function() {
            $('#third-field').hide();
            $('#forth-field').show();
        });

        $('#image_prv').on('click', function() {
            $('#third-field').hide();
            $('#first-field').show();
        });

        $('#seo_prv').on('click', function() {
            $('#forth-field').hide();
            $('#third-field').show();
        });

        // Submit Logic (Update)
        $('#seo_btn').on('click', function() {
            let formData = new FormData();
            formData.append('id', $('#id').val());
            formData.append('product_name', $('#product_name').val());
            formData.append('product_code', $('#product_code').val());
            formData.append('category', $('#category').val());
            formData.append('sub_category', $('#sub_category').val());
            formData.append('description', $('#description').val());
            formData.append('price_type', $('#price_type').val());
            formData.append('service_price', $('#service_price').val());
            formData.append('source_stock', $('#source_stock').val());

            // New Images
            let files = $('#product_images')[0].files;
            for (let i = 0; i < files.length; i++) {
                formData.append('product_images[]', files[i]);
            }

            formData.append('seo_title', $('#seo_title').val());
            formData.append('seo_description', $('#seo_description').val());

            formData.append('_token', "{{ csrf_token() }}");

            $.ajax({
                url: "{{ route('provider.product.update') }}",
                type: "POST", // Update often POST with hidden method or just POST
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    $('#provider_service_success_modal').modal('show');
                },
                error: function(errors) {
                    console.log(errors);
                    alert('Error updating product.');
                }
            });
        });

    });
</script>
@endsection