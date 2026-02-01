@extends('admin.admin')

@section('content')
<div class="page-wrapper">
    <div class="content bg-white">
        <div class="d-md-flex d-block align-items-center justify-content-between -bottom pb-3">
            <div class="my-auto mb-2">
                <h3 class="page-title mb-1">{{ __('Services') }}</h3>
                <nav>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="javascript:void(0);">{{ __('Services') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Services') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
        @php $isVisible = 0; @endphp
        @if(isset($permission))
            @if(hasPermission($permission, 'Service', 'delete'))
                @php $delete = 1; $isVisible = 1; @endphp
            @else
                @php $delete = 0; @endphp
            @endif
            @if(hasPermission($permission, 'Service', 'edit'))
                @php $edit = 1; $isVisible = 1; @endphp
            @else
                @php $edit = 0; @endphp
            @endif
            <div id="has_permission" data-delete="{{ $delete }}" data-edit="{{ $edit }}" data-visible="{{ $isVisible }}"></div>
        @else
            <div id="has_permission" data-delete="1" data-edit="1"></div>
        @endif
        <div class="row">
            <div class="col-xxl-12 col-xl-12">
                <div class="-start ">
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
                                <table class="table d-none" id="currency_table">
                                    <thead class="thead-light">
                                        <tr>
											<th>{{ __('name') }}</th>
											<th>{{ __('Category') }}</th>
											<th>{{ __('Code') }}</th>                                                   
											@if ($edit == 1)
                                            <th>{{ __('Status') }}</th>
                                            <th>{{ __('verify_status') }}</th>
                                            @endif
                                        </tr>
                                    </thead>
                                    <tbody class="currency_list"></tbody>
                                </table>
                                <nav class="mx-3 mt-3">
                                    <ul class="pagination" id="pagination">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="save_category">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title category_modal_title"></h4>
                                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                        <i class="ti ti-x"></i>
                                    </button>
                                </div>
                                <form>
                                    <div class="modal-body">
                                        <div class="row">
                                            <input type="hidden" name="id" id="save_category_id">
                                            <div class="col-md-12">
                                                <div class="mb-3 d-none" id="parent_category_section">
                                                    <label class="form-label">{{ __('Parent Category') }}</label>
                                                    <select name="parent_id" id="save_parent_id" class="form-control">
                                                        <option value="">{{ __('Select') }}</option>
                                                    </select>
                                                </div>
                                                <input type="hidden" name="parent_id" id="parent_id" class="form-control parent_id" placeholder="{{ __('Enter Parent Category ID') }}">

                                                <div class="mb-3">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class="form-label"><span class="subcategory_title">{{ __('Category') }}</span> {{ __('Name') }}</label>
                                                            <input type="text" id="save_category_name" name="name" class="form-control" placeholder="{{ __('Enter Category Name') }}" required>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="form-label">{{ __('Slug') }}</label>
                                                            <input type="text" id="save_category_slug" name="slug" class="form-control" placeholder="{{ __('Enter Slug') }}">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class="form-label">{{ __('Image') }}</label>
                                                            <div class="d-flex justify-content-between mb-3">
                                                                <div class="d-flex align-items-center">
                                                                    <span class="avatar avatar-xl border rounded d-flex align-items-center justify-content-center p-2 me-2">
                                                                        <img id="save_category_image_view"  src="" alt="{{ __('Category Image') }}">
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-uploader profile-uploader-two mb-0">
                                                                <span class="d-block text-center lh-1 fs-24 mb-1"><i class="ti ti-upload"></i></span>
                                                                <div class="drag-upload-btn bg-transparent me-0 border-0">
                                                                    <p class="fs-12 mb-2"><span class="text-primary">{{ __('Click to Upload') }}</span> {{ __('or drag and drop') }}</p>
                                                                    <h6>{{ __('JPG or PNG') }}</h6>
                                                                    <h6>{{ __('(Max 450 x 450 px)') }}</h6>
                                                                </div>
                                                                <input type="file" class="form-control" accept="image/*" id="save_category_image">
                                                                <div id="frames"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="form-label">{{ __('Icon') }}</label>
                                                            <div class="d-flex justify-content-between mb-3">
                                                                <div class="d-flex align-items-center">
                                                                    <span class="avatar avatar-xl border rounded d-flex align-items-center justify-content-center p-2 me-2">
                                                                        <img id="save_category_icon_view"  src="" alt="{{ __('Category Icon') }}">
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-uploader profile-uploader-two mb-0">
                                                                <span class="d-block text-center lh-1 fs-24 mb-1"><i class="ti ti-upload"></i></span>
                                                                <div class="drag-upload-btn bg-transparent me-0 border-0">
                                                                    <p class="fs-12 mb-2"><span class="text-primary">{{ __('Click to Upload') }}</span> {{ __('or drag and drop') }}</p>
                                                                    <h6>{{ __('JPG or PNG') }}</h6>
                                                                    <h6>{{ __('(Max 450 x 450 px)') }}</h6>
                                                                </div>
                                                                <input type="file" class="form-control" accept="image/*" id="save_category_icon">
                                                                <div id="frames"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3">

                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">{{ __('Description') }}</label>
                                                    <textarea class="form-control" name="description" id="save_category_description" cols="3" rows="3" placeholder="{{ __('Enter Description') }}"></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="modal-satus-toggle d-flex align-items-center justify-content-between mb-3">
                                                                <div class="status-title">
                                                                    <h5>{{ __('Status') }}</h5>
                                                                </div>
                                                                <div class="status-toggle modal-status">
                                                                    <input type="checkbox" id="save_category_status" name="status" class="check">
                                                                    <label for="save_category_status" class="checktoggle"> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="modal-satus-toggle d-flex align-items-center justify-content-between">
                                                                <div class="status-title">
                                                                    <h5>{{ __('Featured') }}</h5>
                                                                </div>
                                                                <div class="status-toggle modal-status">
                                                                    <input type="checkbox" id="save_category_featured" name="featured" class="check">
                                                                    <label for="save_category_featured" class="checktoggle"> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <a href="#" class="btn btn-light me-2" data-bs-dismiss="modal">{{ __('Cancel') }}</a>
                                        <button type="submit" class="btn btn-primary category_save_btn">{{ __('Add Category') }}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="delete-modal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <form>
                                    <input type="hidden" name="delte_ser_id" id="delte_ser_id" />
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
                    <div class="modal fade" id="verifyServiceModal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <form method="POST" id="verifyServiceForm">
                                    @csrf
                                    <input type="hidden" name="service_id" id="service_id">
                                    <div class="modal-body text-center">
                                        <span class="fs-30 text-success">
                                            <i class="ti ti-shield-check"></i>
                                        </span>
                                        <h4>{{ __('confirm_verification') }}</h4>
                                        <p>{{ __('confirm_service_verification_info') }}</p>
                                        <div class="d-flex justify-content-center">
                                            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">{{ __('Cancel') }}</button>
                                            <button type="button" class="btn btn-success" id="confirmVerifyBtn" data-verifying="{{ __('verifying') }}" data-yes_verify="{{ __('Yes, Verify') }}">{{ __('Yes, Verify') }}</button>
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
