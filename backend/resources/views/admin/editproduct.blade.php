@extends('admin.admin')

@section('content')
<div class="page-wrapper">
    <div class="content">
        <div class="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div class="my-auto mb-2">
                <h3 class="page-title mb-1">{{ __('Edit Product') }}</h3>
                <nav>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.products') }}">{{ __('Products') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Edit Product') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-12 col-xl-12">
                <div class="flex-fill border-start ps-3">
                    <div class="tab-content">

                        <div class="tab-pane fade show active" id="general_tab" role="tabpanel" aria-labelledby="general-tab">
                            <form id="adminEditProduct" enctype="multipart/form-data" method="POST" action="{{ route('admin.product.update') }}">
                                @csrf
                                <input type="hidden" name="id" value="{{ $product->id }}">

                                <div class="d-md-flex d-block">
                                    <div class="flex-fill">

                                        <?php
                                        if ($errors->any()) {
                                            foreach ($errors->all() as $error) {

                                        ?>
                                                <div class="alert alert-solid-danger alert-dismissible fade show">
                                                    {{ $error }}
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="fas fa-xmark"></i></button>
                                                </div>

                                        <?php
                                            }
                                        }
                                        ?>
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>{{ __('Product Information') }}</h5>
                                            </div>
                                            <div class="card-body pb-1">
                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill me-xl-3 me-0">
                                                        <label class="form-label">{{ __('Product Name') }}</label>
                                                        <input type="text" name="product_name" id="product_name" class="form-control" value="{{ $product->source_name }}" required>
                                                    </div>
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Product Code') }}</label>
                                                        <input type="text" name="product_code" id="product_code" class="form-control" value="{{ $product->source_code }}">
                                                    </div>
                                                </div>
                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill me-xl-3 me-0">
                                                        <label class="form-label">{{ __('Category') }}</label>
                                                        <select id="category_fied" name="category_fied" class="form-control" required>
                                                            <option value="">{{ __('Select Category') }}</option>
                                                            @foreach ($categoriesLang as $category)
                                                            <option value="{{ $category->id }}" {{ $product->source_category == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Sub Category') }}</label>
                                                        <select id="Subcategory_fied" name="Subcategory_fied" class="form-control">
                                                            @foreach ($subCategoriesLang as $subcategory)
                                                            <option value="{{ $subcategory->id }}" {{ $product->source_subcategory == $subcategory->id ? 'selected' : '' }}>{{ $subcategory->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Description') }}</label>
                                                        <textarea class="form-control" name="product_desc" rows="6" id="product_desc">{!! $product->source_description !!}</textarea>
                                                    </div>
                                                </div>

                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Stock Quantity') }}</label>
                                                        <input type="number" name="source_stock" id="source_stock" class="form-control" value="{{ $product->source_stock }}" min="0">
                                                    </div>
                                                </div>

                                                @php
                                                $videoMeta = Modules\Product\app\Models\Productmeta::where('product_id', $product->id)->where('source_key', 'video_link')->first();
                                                $videoLink = $videoMeta ? $videoMeta->source_Values : '';
                                                @endphp
                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Video Link') }}</label>
                                                        <input type="text" name="video" id="video" class="form-control" value="{{ $videoLink }}">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card-header bg-light">
                                                <h5>{{ __('Pricing') }}</h5>
                                            </div>
                                            <div class="card-body pb-1">
                                                @php
                                                $priceMeta = Modules\Product\app\Models\Productmeta::where('product_id', $product->id)->whereIn('source_key', ['Fixed', 'Hourly'])->first();
                                                $price = $priceMeta ? $priceMeta->source_Values : $product->source_price;
                                                @endphp
                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill me-xl-3 me-0">
                                                        <label class="form-label">{{ __('Price Type') }}</label>
                                                        <select name="price_type" class="form-control" required>
                                                            <option value="Fixed" {{ $product->price_type == 'Fixed' ? 'selected' : '' }}>{{ __('Fixed') }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 flex-fill me-xl-3">
                                                        <label class="form-label">{{ __('Price') }}</label>
                                                        <input type="text" name="fixed_price" id="fixed_price" maxlength="10" class="form-control" value="{{ $price }}" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Image Upload -->
                                        <div class="card">
                                            <div class="card-header bg-light">
                                                <h5>{{ __('Images') }}</h5>
                                            </div>
                                            <div class="card-body pb-1">
                                                <div class="row">
                                                    @foreach(Modules\Product\app\Models\Productmeta::where('product_id', $product->id)->where('source_key', 'product_image')->get() as $img)
                                                    <div class="col-md-2 mb-3 relative">
                                                        <img src="{{ $img->source_Values }}" class="img-thumbnail" style="height: 100px; width: 100px; object-fit: cover;">
                                                        <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 delete-img" data-id="{{ $img->id }}">x</button>
                                                    </div>
                                                    @endforeach
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">{{ __('Add More Images') }}</label>
                                                    <input type="file" name="product_images[]" class="form-control" multiple accept="image/*">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- SEO -->
                                        <div class="card">
                                            <div class="card-header bg-light">
                                                <h5>{{ __('SEO') }}</h5>
                                            </div>
                                            <div class="card-body pb-1">
                                                <div class="d-block d-xl-flex">
                                                    <div class="mb-3 flex-fill me-xl-3 me-0">
                                                        <label class="form-label">{{ __('Meta Title') }}</label>
                                                        <input type="text" name="meta_title" id="meta_title" class="form-control" value="{{ $product->seo_title }}">
                                                    </div>
                                                    <div class="mb-3 flex-fill">
                                                        <label class="form-label">{{ __('Meta Keywords') }}</label>
                                                        <input type="text" name="meta_keywords" id="meta_keywords" class="form-control" value="{{ $product->tags }}">
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">{{ __('Meta Description') }}</label>
                                                    <textarea class="form-control" name="meta_description" id="meta_description" rows="3">{{ $product->source_description }}</textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-primary w-100">{{ __('Update Product') }}</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    $('#category_fied').on('change', function() {
        var category_id = $(this).val();
        $('#Subcategory_fied').empty();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            url: "{{ url('api/provider/subcategory-list') }}",
            data: {
                category_id: category_id
            },
            success: function(res) {
                if (res.code == 200) {
                    $.each(res.data, function(key, value) {
                        $('#Subcategory_fied').append('<option value="' + value.id + '">' + value.name + '</option>');
                    });
                }
            }
        });
    });

    // Delete Image
    $('.delete-img').on('click', function() {
        var id = $(this).data('id');
        var parent = $(this).closest('.col-md-2');
        if (confirm('Are you sure?')) {
            $.ajax({
                url: "{{ route('product.image.delete', ':id') }}".replace(':id', id),
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(res) {
                    if (res.code == 200) {
                        parent.remove();
                        toastr.success(res.message);
                    } else {
                        toastr.error(res.message);
                    }
                }
            });
        }
    });
</script>
@endsection