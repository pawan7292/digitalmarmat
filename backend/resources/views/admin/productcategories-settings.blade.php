@extends('admin.admin')

@section('content')
<div class="page-wrapper">
    <div class="content bg-white">
        <div class="d-md-flex d-block align-items-center justify-content-between -bottom pb-3">
            <div class="my-auto mb-2">
                <h3 class="page-title mb-1">{{ __('Category') }}</h3>
                <nav>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="javascript:void(0);">{{ __('Products') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Category') }}</li>
                    </ol>
                </nav>
            </div>
            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <div class="mb-3 me-2">
                    @php
                    $langCode = \App::getLocale();
                    $language = \Modules\GlobalSetting\app\Models\Language::where('code', $langCode)->first();
                    @endphp
                    <div class="skeleton input-skeleton input-loader"></div>
                    <select class="form-select d-none real-input" name="language" id="language">
                        <option value="">{{ __('Select') }}</option>
                        @if ($allLanguages->isNotEmpty())
                        @foreach ($allLanguages as $allLanguage)
                        <option value="{{ $allLanguage->id }}" {{ $allLanguage->id == $language->id ? 'selected' : '' }}>{{ $allLanguage->name }}</option>
                        @endforeach
                        @endif
                    </select>
                </div>
                <div class="mb-3">
                    @if(isset($permission))
                    @if(hasPermission($permission, 'Categories', 'create'))
                    <div class="skeleton label-skeleton label-loader"></div>
                    <a href="#" class="btn btn-primary d-none real-label" id="add_category_btn" data-bs-toggle="modal" data-bs-target="#save_category_modal" data-id=""><i class="ti ti-square-rounded-plus-filled me-2"></i>{{ __('Add Category') }}</a>
                    @endif
                    @endif
                </div>
            </div>
        </div>
        @php $isVisible = 0; @endphp
        @if(isset($permission))
        @if(hasPermission($permission, 'Categories', 'delete'))
        @php $delete = 1; $isVisible = 1; @endphp
        @else
        @php $delete = 0; @endphp
        @endif
        @if(hasPermission($permission, 'Categories', 'edit'))
        @php $edit = 1; $isVisible = 1; @endphp
        @else
        @php $edit = 0; @endphp
        @endif
        @if(hasPermission($permission, 'Categories', 'view'))
        @php $view = 1; $isVisible = 1; @endphp
        @else
        @php $view = 0; @endphp
        @endif
        <div id="has_permission" data-view="{{ $view }}" data-delete="{{ $delete }}" data-edit="{{ $edit }}" data-visible="{{ $isVisible }}"></div>
        @else
        <div id="has_permission" data-delete="1" data-edit="1"></div>
        @endif
        <div class="row">
            <div class="col-xxl-12 col-xl-12">
                <div class="-start">
                    <div class="card">
                        <div class="card-body p-0 py-3">
                            <div class="custom-datatable-filter table-responsive">
                                <table id="loader-table" class="table table-bordered">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>
                                                <div class="skeleton label-skeleton label-loader"></div>
                                            </th>
                                            <th>
                                                <div class="skeleton label-skeleton label-loader"></div>
                                            </th>
                                            <th>
                                                <div class="skeleton label-skeleton label-loader"></div>
                                            </th>
                                            <th>
                                                <div class="skeleton label-skeleton label-loader"></div>
                                            </th>
                                            <th>
                                                <div class="skeleton label-skeleton label-loader"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="skeleton data-skeleton data-loader"></div>
                                            </td>
                                            <td>
                                                <div class="skeleton data-skeleton data-loader"></div>
                                            </td>
                                            <td>
                                                <div class="skeleton data-skeleton data-loader"></div>
                                            </td>
                                            <td>
                                                <div class="skeleton data-skeleton data-loader"></div>
                                            </td>
                                            <td>
                                                <div class="skeleton data-skeleton data-loader"></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="categories_table" class="table table-bordered d-none "
                                    data-empty="{{ __('no_data_found') }}">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>{{ __('Id') }}</th>
                                            <th>{{ __('Category') }}</th>
                                            <th>{{ __('Slug') }}</th>
                                            <th>{{ __('Status') }}</th>
                                            @if($edit == 1)
                                            <th>{{ __('Featured') }}</th>
                                            @endif
                                            @if($isVisible == 1)
                                            <th>{{ __('Action') }}</th>
                                            @endif
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="save_category_modal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title category_modal_title" data-add_category="{{ __('Add Category') }}" data-edit_category="{{ __('Edit Category') }}">{{ __('Add Category') }}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form id="categoryForm" enctype="multipart/form-data">
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <input type="hidden" id="id" name="id">
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="language">{{ __('Language') }}</label>
                                                    <select class="form-select" name="language_id" id="language_id">
                                                        <option value="">{{ __('Select') }}</option>
                                                        @if ($allLanguages->isNotEmpty())
                                                        @foreach ($allLanguages as $allLanguage)
                                                        <option value="{{ $allLanguage->id }}">{{ $allLanguage->name }}</option>
                                                        @endforeach
                                                        @endif
                                                    </select>
                                                    <span class="error-text text-danger" id="language_id_error" data-required="{{ __('language_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="category_name">{{ __('Category Name') }}</label>
                                                    <input type="text" class="form-control" name="category_name" id="category_name">
                                                    <span class="error-text text-danger" id="category_name_error" data-required="{{ __('category_name_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="slug">{{ __('Slug') }}</label>
                                                    <input type="text" class="form-control" name="slug" id="slug">
                                                    <span class="error-text text-danger" id="slug_error" data-required="{{ __('slug_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="category_image">{{ __('Category Image') }}</label>
                                                    <div class="d-flex align-items-center justify-content-center border border-dashed rounded p-3" style="min-height: 150px; background-color: #f8f9fa;">
                                                        <div class="text-center w-100">
                                                            <div class="upload_icon mb-2">
                                                                <i class="ti ti-cloud-upload fs-1 text-muted"></i>
                                                            </div>
                                                            <img id="category_image_view" src="#" alt="Category Image" class="img-fluid rounded" style="display: none; max-height: 150px; width: auto;">
                                                            <div class="mt-2">
                                                                <label class="btn btn-sm btn-outline-primary cursor-pointer w-100">
                                                                    {{ __('Choose File') }}
                                                                    <input type="file" class="d-none" name="category_image" id="category_image" accept="image/*">
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="error-text text-danger" id="category_image_error" data-required="{{ __('category_image_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="category_icon">{{ __('Category Icon') }}</label>
                                                    <div class="d-flex align-items-center justify-content-center border border-dashed rounded p-3" style="min-height: 150px; background-color: #f8f9fa;">
                                                        <div class="text-center w-100">
                                                            <div class="upload_icon_2 mb-2">
                                                                <i class="ti ti-cloud-upload fs-1 text-muted"></i>
                                                            </div>
                                                            <img id="category_icon_view" src="#" alt="Category Icon" class="img-fluid rounded" style="display: none; max-height: 150px; width: auto;">
                                                            <div class="mt-2">
                                                                <label class="btn btn-sm btn-outline-primary cursor-pointer w-100">
                                                                    {{ __('Choose File') }}
                                                                    <input type="file" class="d-none" name="category_icon" id="category_icon" accept="image/*">
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="error-text text-danger" id="category_icon_error" data-required="{{ __('category_icon_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="description">{{ __('Description') }}</label>
                                                    <textarea class="form-control" name="description" id="description" cols="3" rows="3"></textarea>
                                                    <span class="error-text text-danger" id="description_error" data-required="{{ __('description_required') }}"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="seo_title">{{ __('SEO Title') }}</label>
                                                    <input type="text" class="form-control" name="seo_title" id="seo_title" placeholder="{{ __('SEO Title') }}">
                                                    <span class="error-text text-danger" id="seo_title_error"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="seo_description">{{ __('SEO Description') }}</label>
                                                    <textarea class="form-control" name="seo_description" id="seo_description" cols="3" rows="2" placeholder="{{ __('SEO Description') }}"></textarea>
                                                    <span class="error-text text-danger" id="seo_description_error"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" data-translate="seo_tags">{{ __('SEO Tags') }}</label>
                                                    <input type="text" class="form-control" name="seo_tags" id="seo_tags" placeholder="{{ __('Enter tags separated by comma') }}">
                                                    <span class="error-text text-danger" id="seo_tags_error"></span>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="modal-satus-toggle d-flex align-items-center justify-content-between mb-3">
                                                                <div class="status-title">
                                                                    <h5>{{ __('Status') }}</h5>
                                                                </div>
                                                                <div class="status-toggle modal-status">
                                                                    <input type="checkbox" id="status" name="status" class="check translatable" checked>
                                                                    <label for="status" class="checktoggle translatable" data-translate="status_toggle"> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="modal-satus-toggle d-flex align-items-center justify-content-between">
                                                                <div class="status-title">
                                                                    <h5 class="translatable" data-translate="featured">{{ __('Featured') }}</h5>
                                                                </div>
                                                                <div class="status-toggle modal-status">
                                                                    <input type="checkbox" id="featured" name="featured" class="check translatable" checked>
                                                                    <label for="featured" class="checktoggle translatable" data-translate="featured_toggle"> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <a href="#" class="btn btn-light me-2 translatable" data-bs-dismiss="modal" data-translate="cancel">{{ __('Cancel') }}</a>
                                        <button type="submit" class="btn btn-primary category_save_btn" data-save="{{ __('Save') }}">{{ __('Save') }}</button>
                                    </div>
                                </form>
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
                                        <h4>{{ __('Confirm Deletion') }}</h4>
                                        <p>{{ __('You want to delete all the marked items, this can\'t be undone once you delete.') }}</p>
                                        <div class="d-flex justify-content-center">
                                            <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">{{ __('Cancel') }}</a>
                                            <button type="submit" class="btn btn-danger category_delete_btn">{{ __('Yes, Delete') }}</button>
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
</div>
@endsection