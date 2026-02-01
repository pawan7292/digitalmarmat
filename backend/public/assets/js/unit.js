/* global $, document, FormData */

$(document).ready(function () {
    initUnitTable();
    initUnitEvents();
});

let unitTable;

function initUnitTable() {
    loadUnits();
}

const baseUnitMap = {
    1: 'Kilogram (KG)',
    2: 'Box Piece',
};

function loadUnits(search = '') {
    $('.table-loader').show();
    $('.real-table').addClass('d-none');

    // Destroy previous DataTable instance if exists
    if ($.fn.DataTable.isDataTable('#unitsTable')) {
        $('#unitsTable').DataTable().destroy();
        $('#unitsTable tbody').empty();
    }

    $.ajax({
        url: '/admin/units/list',
        type: 'GET',
        data: { search },
        success: function (response) {
            if (response.code === 200) {
                let tbody = '';
                $.each(response.data.data, function (index, unit) {
                    tbody += `
                        <tr>
                            <td>${unit.code}</td>
                            <td>${unit.name}</td>
                            <td>${unit.status === 1
                                ? '<span class="badge badge-soft-success">Active</span>'
                                : '<span class="badge badge-soft-danger">Inactive</span>'}
                            </td>
                            <td>
                                <a href="#" class="editUnit" data-id="${unit.id}" title="Edit">
                                    <i class="ti ti-pencil m-2 fs-20 text-dark"></i>
                                </a>
                                <a href="#" class="deleteUnit" data-id="${unit.id}" data-name="${unit.name}" title="Delete">
                                    <i class="ti ti-trash m-2 fs-20 text-dark"></i>
                                </a>
                            </td>
                        </tr>
                    `;
                });

                $('#unitsTable tbody').html(tbody);

                // Initialize DataTable
                unitTable = $('#unitsTable').DataTable({
                    paging: true,
                    searching: true,
                    ordering: false,
                    pageLength: 10,
                    language: {
                        search: "Search:",
                        paginate: {
                            previous: "Previous",
                            next: "Next"
                        },
                        lengthMenu: "Show _MENU_ entries",
                        info: "Showing _START_ to _END_ of _TOTAL_ entries",
                        infoEmpty: "No entries to show"
                    }
                });

                $('.table-loader').hide();
                $('.real-table').removeClass('d-none');
            } else {
                showAlert('error', 'Failed to load units: ' + (response.message || 'Unknown error'));
                $('.table-loader').hide();
                $('.real-table').removeClass('d-none');
            }
        },
        error: function (xhr) {
            showAlert('error', 'Failed to load units: ' + (xhr.responseJSON?.message || 'Server error'));
            $('.table-loader').hide();
            $('.real-table').removeClass('d-none');
        }
    });
}

function initUnitEvents() {
    $(document).on('click', '.add-new-unit', function () {
        resetUnitForm();
        $('#add_unit_modal .modal-title').text('Add Unit');
        $('.submitbtn').text('Create Unit');
        $('#add_unit_modal').modal('show');
    });

    $('#addUnitForm').on('submit', function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        let id = $('#unit_id').val();
        let url = id ? `/admin/units/update/${id}` : '/admin/units/store';
        let method = 'POST';

        if (id) {
            formData.append('_method', 'POST');
        }

        $.ajax({
            url: url,
            type: method,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.submitbtn').attr('disabled', true).html(`<span class="spinner-border spinner-border-sm"></span> ${id ? 'Updating...' : 'Saving...'}`);
            },
            success: function (res) {
                if (res.code === 200) {
                    $('#add_unit_modal').modal('hide');
                    showAlert('success', res.message);
                    // Clear search and refresh table
                    $('input[name="search"]').val('');
                    loadUnits();
                } else {
                    showAlert('error', res.message || 'Operation failed');
                }
            },
            error: function (xhr) {
                $('.error-text').text('');
                if (xhr.responseJSON?.errors) {
                    $.each(xhr.responseJSON.errors, function (key, val) {
                        $(`#${key}_error`).text(val[0]);
                    });
                    showAlert('error', 'Please fix the form errors');
                } else {
                    showAlert('error', xhr.responseJSON?.message || 'Something went wrong');
                }
            },
            complete: function () {
                $('.submitbtn').attr('disabled', false).text(id ? 'Update Unit' : 'Create Unit');
            }
        });
    });

    $(document).on("click", ".editUnit", function (e) {
        e.preventDefault();
        const id = $(this).data("id");

        if (!id) {
            showAlert('error', 'Invalid unit ID');
            return;
        }

        $.ajax({
            type: "GET",
            url: `/admin/units/edit/${id}`,
            success: function (res) {
                if (res.code === 200 && res.data) {
                    const unit = res.data;

                    resetUnitForm();
                    $("#unit_id").val(unit.id);
                    $("#unit_code").val(unit.code);
                    $("#unit_name").val(unit.name);
                    $("#unit_base_unit").val(unit.base_unit_id || '');
                    $("#unit_operator").val(unit.operator || '*');
                    $("#unit_operation_value").val(unit.operation_value || '1');

                    $("#unit_status_active").prop("checked", unit.status == 1);
                    $("#unit_status_inactive").prop("checked", unit.status != 1);

                    $('#add_unit_modal .modal-title').text('Edit Unit');
                    $('.submitbtn').text('Update Unit');
                    $('#add_unit_modal').modal('show');
                } else {
                    showAlert("error", res.message || "Unit not found");
                }
            },
            error: function (xhr) {
                showAlert("error", xhr.responseJSON?.message || "Failed to load unit details");
            }
        });
    });

    $(document).on('click', '.deleteUnit', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        const name = $(this).data('name') || 'this unit';

        $('#delete-modal input[name="delete_id"]').val(id);
        $('#deleteMessage').text(`Are you sure you want to delete the unit "${name}"?`);

        const deleteModal = new bootstrap.Modal(document.getElementById('delete-modal'));
        deleteModal.show();
    });

    $(document).on('click', '#confirmDelete', function () {
        const id = $('#delete-modal input[name="delete_id"]').val();
        if (!id) return showAlert('error', 'No unit selected');

        $(this).attr('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Deleting...');

        $.ajax({
            url: '/admin/units/delete',
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                id: id
            },
            success: function (res) {
                if (res.code === 200) {
                    showAlert('success', res.message);
                    $('#delete-modal').modal('hide');
                    // Clear search and refresh table
                    $('input[name="search"]').val('');
                    loadUnits();
                } else {
                    showAlert('error', res.message || 'Failed to delete unit');
                }
            },
            error: function (xhr) {
                showAlert('error', xhr.responseJSON?.message || 'Failed to delete unit');
            },
            complete: function () {
                $('#confirmDelete').attr('disabled', false).text('Delete');
            }
        });
    });

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        loadUnits($('input[name="search"]').val());
    });

    $('#clearSearch').on('click', function () {
        $('input[name="search"]').val('');
        loadUnits();
    });

    $('#refreshTable').on('click', function () {
        loadUnits($('input[name="search"]').val());
    });
}

function resetUnitForm() {
    $('#addUnitForm')[0].reset();
    $('#unit_id').val('');
    $('.error-text').text('');
    $('#addUnitForm input[name="status"]').prop('checked', false);
    $('#unit_status_active').prop('checked', true);
}

function showAlert(type, message) {
    if (typeof Swal !== 'undefined') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: type,
            title: message
        });
    } else if (typeof bootstrap !== 'undefined') {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        $('#alertContainer').html(alertHtml);

        setTimeout(() => {
            $('.alert').alert('close');
        }, 3000);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}