@extends('admin.admin')

@section('content')
<div class="page-wrapper">
    <div class="content bg-white">
        <div class="d-md-flex d-block align-items-center justify-content-between -bottom pb-3">
            <div class="my-auto mb-2">
                <h3 class="page-title mb-1">{{ __('Products') }}</h3>
                <nav>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="javascript:void(0);">{{ __('Products') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Products') }}</li>
                    </ol>
                </nav>
            </div>
            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
            </div>
        </div>

        <div class="row">
            <div class="col-xxl-12 col-xl-12">
                <div class="-start ">
                    <div class="card">
                        <div class="card-body p-0 py-3">
                            <div class="custom-datatable-filter table-responsive">
                                <table class="table" id="datatable_product_admin">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>{{ __('Name') }}</th>
                                            <th>{{ __('Category') }}</th>
                                            <th>{{ __('Code') }}</th>
                                            <th>{{ __('Status') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
@foreach($products as $product)
<tr>
    <td>{{ $product->source_name }}</td>
    <td>{{ $product->category->name ?? 'N/A' }}</td>
    <td>{{ $product->source_code }}</td>
    <td>
        @if($product->status == 1)
            <span class="badge bg-success">Active</span>
        @else
            <span class="badge bg-danger">Inactive</span>
        @endif
    </td>
</tr>
@endforeach
                                    </tbody>
                                </table>
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
            <div class="modal-body text-center">
                <span class="delete-icon">
                    <i class="ti ti-trash-x"></i>
                </span>
                <h4>{{ __('Confirm Deletion') }}</h4>
                <p>{{ __('Are you sure you want to delete this product? This action cannot be undone.') }}</p>
                <div class="d-flex justify-content-center">
                    <a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">{{ __('Cancel') }}</a>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">{{ __('Yes, Delete') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

@section('scripts')
<script>
    $(document).ready(function() {
        var table = $('#datatable_product_admin').DataTable({
            processing: true,
            serverSide: false,
            ajax: {
                url: "{{ route('api.admin.product.list') }}",
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataSrc: 'data'
            },
            columns: [{
                    data: 'source_name',
                    name: 'source_name'
                },
                {
                    data: 'name',
                    name: 'category',
                    defaultContent: 'N/A'
                },
                {
                    data: 'source_code',
                    name: 'source_code'
                },
                {
                    data: 'status',
                    name: 'status',
                    render: function(data, type, row) {
                        return data == 1 ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-danger">Inactive</span>';
                    }
                },
                {
                    data: 'id',
                    name: 'action',
                    orderable: false,
                    searchable: false,
                    render: function(data, type, row) {
                        let editUrl = "{{ route('admin.edit.product', ':id') }}".replace(':id', data);
                        return `
                        <a href="${editUrl}" class="me-2"><i class="ti ti-pencil fs-20"></i></a>
                        <a href="javascript:void(0);" class="delete-btn" data-id="${data}" data-bs-toggle="modal" data-bs-target="#delete-modal"><i class="ti ti-trash fs-20"></i></a>
                    `;
                    }
                }
            ]
        });

        // Delete Logic
        var deleteId;
        $(document).on('click', '.delete-btn', function() {
            deleteId = $(this).data('id');
        });

        $('#confirmDeleteBtn').on('click', function() {
            $.ajax({
                url: "{{ route('admin.product.delete') }}", // Need to define
                type: "POST",
                data: {
                    id: deleteId
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {
                    $('#delete-modal').modal('hide');
                    if (response.success) {
                        toastr.success(response.message);
                        table.ajax.reload();
                    } else {
                        toastr.error(response.message);
                    }
                }
            });
        });
    });
</script>
@endsection
@endsection