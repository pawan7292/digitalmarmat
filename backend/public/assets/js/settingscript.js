var pageValue = $('body').data('page');

var frontendValue = $('body').data('frontend');

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function initTooltip() {
    $('[data-tooltip="tooltip"]').tooltip({
        trigger: 'hover',
    });
}

//general-settings
if (pageValue === 'admin.general-settings') {
    $('#generalTab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    function validatePhoneNumber(input) {
        const minLength = 10;
        const maxLength = 12;
        const value = input.value;

        // Ensure the length doesn't exceed maxLength
        if (value.length > maxLength) {
            input.value = value.slice(0, maxLength);
        }

        // Show an error if the input isn't within the valid range
        const errorText = document.getElementById('phone_no_error');
        if (value.length >= minLength && value.length <= maxLength) {
            errorText.textContent = '';
        } else {
            errorText.textContent = 'Phone number must be between 10 and 12 digits.';
        }
    }

    function validateFaxNumber(input) {
        const minLength = 10;
        const maxLength = 12;
        const value = input.value;

        // Ensure the length doesn't exceed maxLength
        if (value.length > maxLength) {
            input.value = value.slice(0, maxLength);
        }

        // Show an error if the input isn't within the valid range
        const errorText = document.getElementById('fax_no_error');
        if (value.length >= minLength && value.length <= maxLength) {
            errorText.textContent = '';
        } else {
            errorText.textContent = 'Fax number must be between 10 and 12 digits.';
        }
    }

    $(document).ready(function() {
        $.getJSON('/timezone.json', function(data) {
            const timezoneSelect = $('#timezone');
            timezoneSelect.empty();
            $.each(data.timezones, function(index, timezone) {
                timezoneSelect.append($('<option>', {
                    value: timezone.value,
                    text: timezone.label
                }));
            });
            timezoneSelect.select2();
            const selectedTimezone = timezoneSelect.val();
            if (selectedTimezone) {
                timezoneSelect.trigger('change');
            }
        }).fail(function() {
            toastr.error('Error loading timezone data');
        });

        $('#country').on('change', function() {
            const selectedCountry = $(this).val();
            $.getJSON('/states.json', function(data) {
                const stateSelect = $('#state');
                stateSelect.empty();
                stateSelect.append($('<option>', {
                    value: '',
                    text: 'Select State',
                    disabled: true,
                    selected: true
                }));
                $.each(data.states, function(index, state) {
                    if (state.country_id === selectedCountry) {
                        stateSelect.append($('<option>', {
                            value: state.id,
                            text: state.name
                        }));
                    }
                });
                stateSelect.select2();
            }).fail(function() {
                toastr.error('Error loading state data');
            });
        });

        $('#state').on('change', function() {
            const selectedState = $(this).val();
            $.getJSON('/cities.json', function(data) {
                const citySelect = $('#city');
                citySelect.empty();
                citySelect.append($('<option>', {
                    value: '',
                    text: 'Select City',
                    disabled: true,
                    selected: true
                }));
                $.each(data.cities, function(index, city) {
                    if (city.state_id === selectedState) {
                        citySelect.append($('<option>', {
                            value: city.id,
                            text: city.name
                        }));
                    }
                });
                citySelect.select2({
                    placeholder: "Select City",

                });
            }).fail(function() {
                toastr.error('Error loading city data');
            });
        });

        // Define the loadCountries function
        async function loadCountries() {
            try {
                const data = await $.getJSON('/countries.json');
                const countrySelect = $('#country');
                countrySelect.empty();
                countrySelect.append($('<option>', {
                    value: '',
                    text: 'Select Country',
                    disabled: true,
                    selected: true
                }));

                $.each(data.countries, function(index, country) {
                    countrySelect.append($('<option>', {
                        value: country.id,
                        text: country.name
                    }));
                });

                countrySelect.select2({
                    placeholder: "Select Country",

                });
            } catch (error) {
                toastr.error('Error loading country data:', error);
            }
        }

        async function loadGeneralSettings() {
            const response = await $.ajax({
                url: '/api/admin/general-setting/list',
                type: 'POST',
                data: {'group_id': 1},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                }
            });

            if (response.code === 200) {
                const requiredKeys = [
                    'app_name', 'site_email', 'site_address',
                    'preloader_status', 'timezone', 'live_mail_send', 'is_queable', 'postal_code', 'phone_no',
                    'company_name', 'country', 'state', 'city', 'save_single_vendor_status', 'sso_status','fax_no', 'website',
                    'provider_approval_status', 'service_approval_status'
                ];

                const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                filteredSettings.forEach(setting => {
                    if (setting.key === 'is_queable') {
                        $('#' + setting.key).trigger('change');
                    } else if (setting.key === 'save_single_vendor_status') {
                        $("#save_single_vendor_status").val(setting.value).trigger('change');
                    } else if (setting.key === 'sso_status') {
                        $("#sso_status").val(setting.value).trigger('change');
                    } else if (setting.key == 'provider_approval_status' || setting.key == 'service_approval_status') {
                        $('#' + setting.key).prop('checked', setting.value == 1);
                    } else {
                        $('#' + setting.key).val(setting.value);
                    }

                });

                const timezoneSelect = $('#timezone');
                    const selectedTimezone = filteredSettings.find(setting => setting.key === 'timezone');
                    if (selectedTimezone) {
                        timezoneSelect.val(selectedTimezone.value).trigger('change');
                        timezoneSelect.select2(); // Ensure select2 is initialized after setting the value
                    }


                const countrySelect = $('#country');
                const selectedCountry = filteredSettings.find(setting => setting.key === 'country');
                const selectedState = filteredSettings.find(setting => setting.key === 'state');
                const selectedCity = filteredSettings.find(setting => setting.key === 'city');



                if (selectedCountry) {
                    countrySelect.val(selectedCountry.value).trigger('change');

                    // Directly call the loading of states after setting the country
                    loadStatesForSelectedCountry(selectedCountry.value).then(() => {
                        if (selectedState) {
                            $('#state').val(selectedState.value).trigger('change');

                            // Load cities after setting the state
                            loadCitiesForSelectedState(selectedState.value).then(() => {
                                if (selectedCity) {
                                    $('#city').val(selectedCity.value).trigger('change');
                                }
                            });
                        }
                    });
                }
            } else {
                toastr.error('Error fetching settings:', response.message);
            }
            
        }

        async function init() {
            await loadCountries();
            await loadGeneralSettings();
            $(".label-loader, .input-loader").hide();
            $('.real-label, .real-input').removeClass('d-none');
        }

        init().catch((error) => {
            toastr.error('Error during initialization:', error);
        });


        function loadStatesForSelectedCountry(countryId) {
            return new Promise((resolve, reject) => {
                $.getJSON('/states.json', function(data) {
                    const stateSelect = $('#state');
                    stateSelect.empty();
                    stateSelect.append($('<option>', {
                        value: '',
                        text: 'Select State',
                        disabled: true,
                        selected: true
                    }));

                    let statesLoaded = false; // Track if states are loaded

                    $.each(data.states, function(index, state) {
                        if (state.country_id === countryId) {
                            stateSelect.append($('<option>', {
                                value: state.id,
                                text: state.name
                            }));
                            statesLoaded = true; // Set to true if at least one state is added
                        }
                    });
                    stateSelect.select2();
                    resolve();
                }).fail(function() {
                    toastr.error('Error loading state data');
                    reject();
                });
            });
        }


        function loadCitiesForSelectedState(stateId) {
            return new Promise((resolve, reject) => {
                $.getJSON('/cities.json', function(data) {
                    const citySelect = $('#city');
                    citySelect.empty();
                    citySelect.append($('<option>', {
                        value: '',
                        text: 'Select City',
                        disabled: true,
                        selected: true
                    }));
                    $.each(data.cities, function(index, city) {
                        if (city.state_id === stateId) {
                            citySelect.append($('<option>', {
                                value: city.id,
                                text: city.name
                            }));
                        }
                    });
                    citySelect.select2({
                        placeholder: "Select City",

                    });
                    resolve();
                }).fail(function() {
                    toastr.error('Error loading city data');
                    reject();
                });
            });
        }


    });

   // Reusable validation function
    function validateField(field) {
        let isValid = true;
        let errorMessages = {
            'app_name': 'App Name is required.',
            'company_name': 'Company Name is required.',
            'phone_no': 'Phone Number is required and must be 10-12 digits.',
            'site_email': 'Valid Email is required.',
            'fax_no': 'Fax Number is required.',
            'website': 'Website is required and must be valid.',
            'timezone': 'Timezone is required.',
            'site_address': 'Address is required and must not exceed 150 characters.',
            'country': 'Country is required.',
            'state': 'State/Province is required.',
            'city': 'City is required.',
            'postal_code': 'Postal Code is required and must be 5-6 alphanumeric characters.',
        };

        let fieldName = field.attr('name');
        let value = field.val() ? field.val().trim() : '';

        $("#" + fieldName + "_error").text("");
        field.removeClass("is-invalid");

        if (errorMessages[fieldName] && value === '') {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text(errorMessages[fieldName]);
            return isValid;
        }

        if (fieldName === 'phone_no' && !/^\d{10,12}$/.test(value)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Phone Number must be 10-12 digits.');
        }

        if (fieldName === 'site_email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Enter a valid email address.');
        }

        if (fieldName === 'website' && !/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(value)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Enter a valid website URL (e.g., https://www.example.com).');
        }

        if (fieldName === 'site_address' && value.length > 150) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Address must not exceed 150 characters.');
        }

        if (fieldName === 'postal_code' && !/^[a-zA-Z0-9]{5,6}$/.test(value)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Postal Code must be 5-6 alphanumeric characters.');
        }

        if (fieldName === 'country' || fieldName === 'state' || fieldName === 'city') {
            if (value === '') {
                isValid = false;
                field.addClass("is-invalid");
                $("#" + fieldName + "_error").text(errorMessages[fieldName]);
            }
        }

        return isValid;
    }

    $('#generalSettingForm').on('change', 'input, select', function() {
        validateField($(this));
    });

    $('#generalSettingForm').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate all inputs and selects
        $('#generalSettingForm').find('input, select').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        // If the form is invalid, stop submission
        if (!isValid) {
            return;
        }

        let formData = new FormData(this);
        formData.set('service_approval_status', $('#service_approval_status').is(':checked') ? 1 : 0);
        formData.set('provider_approval_status', $('#provider_approval_status').is(':checked') ? 1 : 0);

        $.ajax({
            url: '/api/admin/update-general-setting',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json',
            },
            beforeSend: function() {
                $('.general_setting_btn').attr('disabled', true);
                $('.general_setting_btn').html('<div class="spinner-border spinner-border-sm text-light" role="status"></div>');
            }
        })
        .done((response) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $('.general_setting_btn').removeAttr("disabled").html("Update");

            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
            } else {
                toastr.error(response.message);
            }
        })
        .fail((error) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $('.general_setting_btn').removeAttr("disabled").html("Update");

            if (error.status === 422) {
                $.each(error.responseJSON.errors, function(key, val) {
                    $(`[name="${key}"]`).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message || 'Error updating general settings');
            }
        });
    });
}

//otp-settings

if (pageValue === 'admin.otp-settings') {

    loadOtpSettings();

    function loadOtpSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {'group_id': 9},
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['otp_type', 'otp_digit_limit', 'otp_expire_time', 'register', 'login'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    // Update values in Blade file
                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (setting.key === 'otp_type') {
                            const selectedTypes = Array.isArray(setting.value) ? setting.value : setting.value.split(',');
                            $('#otp_type').val(selectedTypes).trigger('change');
                        } else if (setting.key === 'register' || setting.key === 'login') {
                            $('#' + setting.key).prop('checked', setting.value === '1');
                        } else if (element.is('select')) {
                            element.val(setting.value).change();
                        } else {
                            element.val(setting.value);
                        }
                    });
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#otpsettingform').submit(function(event) {
        event.preventDefault();

        $(".error-text").text("");
        $(".form-control").removeClass("is-invalid");


        let isValid = true;


        if ($('#otp_type').val() === '') {
            $('#otp_type').addClass('is-invalid');
            $('#otp_type_error').text('OTP Type is required.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        let formData = new FormData();
        formData.append('otp_type', $('#otp_type').val());
        formData.append('otp_digit_limit', $('#otp_digit_limit').val());
        formData.append('otp_expire_time', $('#otp_expire_time').val());
        formData.append('group_id', $('#group_id').val());
        formData.append('register', $('#register').is(':checked') ? 1 : 0);
        formData.append('login', $('#login').is(':checked') ? 1 : 0);

        $.ajax({
            url: "/api/admin/update-otp-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.otp_save_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $(".otp_save_btn").removeAttr("disabled");
            $(".otp_save_btn").html("Update");
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
                loadOtpSettings();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.otp_save_btn').removeAttr('disabled').html('Update');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}


if (pageValue === 'admin.dt-settings') {

    $('.select2').select2();
    loadLocalizationSettings();

    $('#booking_prefix').on('input', function() {
        let value = $(this).val();
        value = value.replace(/[^a-zA-Z]/g, '');
        value = value.substring(0, 10);
        $(this).val(value);
    });

    function loadLocalizationSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {'group_id': 31},
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['date_format_view', 'time_format_view', 'timezone_format_view', 'booking_prefix'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    // Update values in Blade file
                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (element.is('select')) {
                            element.val(setting.value).change();
                        } else {
                            element.val(setting.value);
                        }
                    });
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#dtsettingform').submit(function(event) {
        event.preventDefault();

        $(".error-text").text("");
        $(".form-control").removeClass("is-invalid");


        let isValid = true;


        if ($('#otp_type').val() === '') {
            $('#otp_type').addClass('is-invalid');
            $('#otp_type_error').text('OTP Type is required.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        let formData = new FormData();
        formData.append('date_format_view', $('#date_format_view').val());
        formData.append('time_format_view', $('#time_format_view').val());
        formData.append('timezone_format_view', $('#timezone_format_view').val());
        formData.append('booking_prefix', $('#booking_prefix').val());
        formData.append('group_id', 31);

        $.ajax({
            url: "/api/admin/update-otp-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.dt_save_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $(".dt_save_btn").removeAttr("disabled");
            $(".dt_save_btn").html($('.dt_save_btn').data('update'));
            if (response.code === 200) {
                toastr.success(response.message);
                loadOtpSettings();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.dt_save_btn').removeAttr('disabled').html($('.dt_save_btn').data('update'));
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}



if (pageValue === 'admin.search-settings') {

    $('.select2').select2();
    loadOtpSettings();

    function loadOtpSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {'group_id': 32},
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['milesradious', 'goglemapkey'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    // Update values in Blade file
                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (setting.key === 'milesradious') {
                            $('#milesradius').val(setting.value);
                        }  else if (setting.key === 'goglemapkey') {
                            $('#goe_key').val(setting.value);
                        } else {
                            element.val(setting.value);
                        }
                    });
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#searchsettingform').submit(function(event) {
        event.preventDefault();

        $(".error-text").text("");
        $(".form-control").removeClass("is-invalid");


        let isValid = true;




        let formData = new FormData();
        formData.append('goe_key', $('#goe_key').val());
        formData.append('milesradius', $('#milesradius').val());
        formData.append('group_id', $('#group_id').val());

        $.ajax({
            url: "/api/admin/update-search-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.dt_save_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $(".dt_save_btn").removeAttr("disabled");
            $(".dt_save_btn").html($('.dt_save_btn').data('update'));
            if (response.code === 200) {
                toastr.success(response.message);
                loadOtpSettings();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.dt_save_btn').removeAttr('disabled').html($('.dt_save_btn').data('update'));
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}

//cookies-settings
if (pageValue === 'admin.cookies-settings') {
    function loadCookiesSettings(langId = '') {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {
                'group_id': 10,
                language_id: langId
             },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    // Extracting the language code from the keys in the response
                    const languageCode = response.data.settings.length > 0 ? response.data.settings[0].key.split('_').pop() : '';

                    response.data.settings.forEach(setting => {
                        // Remove the language code suffix to get the original key
                        const baseKey = setting.key.replace(`_${languageCode}`, '');
                        const element = $('#' + baseKey);

                        if (element.is('select')) {
                            element.val(setting.value).change();
                        } else if (element.is(':checkbox')) {
                            element.prop('checked', setting.value == 1);
                        } else if (baseKey === 'cookies_content_text') {
                            $('#summernote').summernote('code', setting.value);
                        } else {
                            element.val(setting.value);
                        }
                    });
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $(document).ready(function() {
        loadCookiesSettings($('#language_id').val());

        $('#language_id').on('change', function() {
            loadCookiesSettings($(this).val());
        });
    });

    function validateCookiesField(field) {
        let isValid = true;
        let errorMessages = {
            'group_id': 'Group ID is required.',
            'cookies_position': 'Cookies position is required.',
            'agree_button_text': 'Agree button text is required.',
            'decline_button_text': 'Decline button text is required.',
            'lin_for_cookies_page': 'Link for cookies page is required.',
        };

        let fieldName = field.attr('name');
        let value = field.val().trim();

        $("#" + fieldName + "_error").text("");
        field.removeClass("is-invalid");

        if (errorMessages[fieldName] && (value === '' || value === null)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text(errorMessages[fieldName]);
        }

        if (fieldName === 'lin_for_cookies_page' && value.length > 0 && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text('Please enter a valid URL.');
        }

        return isValid;
    }

    $('#cookies_setting_form').on('change', 'input, select', function() {
        validateCookiesField($(this));
    });

    $('#cookies_setting_form').submit(function(event) {
        event.preventDefault();

        let isValid = true;

        $('#cookies_setting_form').find('input, select').each(function() {
            if (!validateCookiesField($(this))) {
                isValid = false;
            }
        });

        let summernoteContent = $('#summernote').summernote('code').trim();
        if (!summernoteContent) {
            isValid = false;
            $('#summernote').addClass("is-invalid");
            $("#summernote_error").text("Cookies content is required.");
        } else {
            $('#summernote').removeClass("is-invalid");
            $("#summernote_error").text("");
        }

        if (!isValid) {
            return;
        }

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('cookies_content_text', summernoteContent);
        formData.append('cookies_position', $('#cookies_position').val());
        formData.append('agree_button_text', $('#agree_button_text').val());
        formData.append('decline_button_text', $('#decline_button_text').val());
        formData.append('show_decline_button', $('#show_decline_button').is(':checked') ? 1 : 0);
        formData.append('lin_for_cookies_page', $('#lin_for_cookies_page').val());
        formData.append('language_id', $('#language_id').val());

        $.ajax({
            url: "/api/admin/update-cookies-info-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function() {
                $('.cookies_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.cookies_update_btn').removeAttr('disabled').html('Save');
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.cookies_update_btn').removeAttr('disabled').html('Save');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function(key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

    $('#language_id').on('change', function() {
        var langId = $(this).val();

        languageTranslate(langId);
        loadCookiesSettings(langId);
    });

    function languageTranslate(lang_id) {
        $.ajax({
            url: "/api/translate",
            type: "POST",
            dataType: "json",
            data: {
                language_id: lang_id,
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("admin_token"),
                Accept: "application/json",
            },
            success: function (response) {
                const trans = response.translated_values;
                $(".error-text").text("");
                $(".form-control").removeClass("is-invalid is-valid");

                if (response.code === 200 && Object.keys(trans).length > 0) {

                    $('.cookies_settings').text(trans.cookies_settings);
                    $('.dashboard').text(trans.dashboard);
                    $('.Settings').text(trans.Settings);
                    $('.save').text(trans.save);
                    $('.cookies_content').text(trans.cookies_content);
                    $('.enter_cookies_content').text(trans.enter_cookies_content);
                    $('.lang_title').text(trans.available_translations);
                    $('.cook_po').text(trans.cookies_position);
                    $('.po_right').text(trans.right);
                    $('.po_left').text(trans.left);
                    $('.po_center').text(trans.center);
                    $('.aggree_txt').text(trans.agree_button_text);
                    $('.decline_txt').text(trans.decline_button_text);
                    $('.show_text').text(trans.show_decline_button);
                    $('.lint_txt').text(trans.link_for_cookies_page);

                }

            },
            error: function (error) {
                toastr.error(error.responseJSON.message);
            },
        });
    }
}

//copyright-settings
if (pageValue === 'admin.copyright-settings') {
    function loadCopyrightSettings(langId = '') {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {
                'group_id': 8,
                language_id: langId
             },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const settings = response.data.settings;

                    if (settings && Object.keys(settings).length > 0) {
                        $('#summernote').summernote('code', settings.value);
                    } else {
                        $('#summernote').summernote('code', '');
                    }
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                } else {
                    toastr.error('An error occurred:', xhr); // Log other errors
                }
            }
        });
    }

    $(document).ready(function() {
        loadCopyrightSettings($('#language_id').val());

        $('#language_id').on('change', function() {
            loadCopyrightSettings($(this).val());
        });
    });



    function validateField(field) {
        let isValid = true;
        let fieldName = field.attr('name');
        let value = field.val().trim();

        // Clear previous errors
        $("#" + fieldName + "_error").text("");
        field.removeClass("is-invalid");

        // Field-specific validations
        if (fieldName === 'copyright' && (value === '' || value === null)) {
            isValid = false;
            field.addClass("is-invalid");
            $("#" + fieldName + "_error").text("Copyright field is required.");
        }

        return isValid;
    }

    // Validate on field change
    $('#copyright_setting_form').on('change', 'textarea, input', function () {
        validateField($(this));
    });

    // Form submit handler
    $('#copyright_setting_form').submit(function (event) {
        event.preventDefault();

        let isValid = true;

        // Validate all form fields
        $('#copyright_setting_form').find('textarea, input').each(function () {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Prepare form data
        let formData = new FormData(this);
        formData.append('group_id', 8);

        $.ajax({
            url: "/api/admin/update-copyright-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.copyright_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.copyright_update_btn').removeAttr('disabled').html('Update');
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.copyright_update_btn').removeAttr('disabled').html('Update');
            if (error.status === 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("." + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message || 'Error updating copyright settings');
            }
        });
    });

    $('#language_id').on('change', function() {
        var langId = $(this).val();

        languageTranslate(langId);
        loadCopyrightSettings(langId);
    });

    function languageTranslate(lang_id) {
        $.ajax({
            url: "/api/translate",
            type: "POST",
            dataType: "json",
            data: {
                language_id: lang_id,
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("admin_token"),
                Accept: "application/json",
            },
            success: function (response) {
                const trans = response.translated_values;
                $(".error-text").text("");
                $(".form-control").removeClass("is-invalid is-valid");

                if (response.code === 200 && Object.keys(trans).length > 0) {

                    $('.dashboard').text(trans.dashboard);
                    $('.copyright_settings').text(trans.copyright_settings);
                    $('.Settings').text(trans.Settings);
                    $('.update').text(trans.update);
                    $('.Copyright').text(trans.Copyright);
                    $('.lang_title').text(trans.available_translations);

                }

            },
            error: function (error) {
                toastr.error(error.responseJSON.message);
            },
        });
    }
}

if (pageValue === 'admin.maintenance-settings') {
    loadMaintenanceSettings();

    function loadMaintenanceSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: { 'group_id': 11 },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['maintenance', 'maintenance_content']; // Include 'maintenance_content'
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);

                        if (element.is('select')) {
                            element.val(setting.value).change();  // Set value for select
                        } else if (element.is(':checkbox')) {
                            element.prop('checked', setting.value == 1);  // Set checkbox state
                        } else if (element.is('textarea')) {
                            element.val(setting.value);  // Set value for textarea
                        } else {
                            element.val(setting.value);  // Set value for input fields
                        }
                    });

                    // Load maintenance content into Summernote if applicable
                    const maintenanceContentSetting = filteredSettings.find(setting => setting.key === 'maintenance_content');
                    if (maintenanceContentSetting) {
                        $('#summernote').summernote('code', maintenanceContentSetting.value);
                    }

                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#maintenance_setting_form').submit(function(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('maintenance', $('#maintenance').is(':checked') ? 1 : 0);
        formData.append('maintenance_content', $('#summernote').summernote('code')); // Add maintenance content

        $.ajax({
            url: "/api/admin/update-otp-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.maintenance_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.maintenance_update_btn').removeAttr('disabled').html('Save');
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
                loadMaintenanceSettings();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.maintenance_update_btn').removeAttr('disabled').html('Save');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });
}

//logo-settings
if (pageValue === 'admin.logo-settings'){
    $(document).ready(function() {
        loadLogoSettings();

        function loadLogoSettings() {
            $.ajax({
                url: '/api/admin/index-logo-setting',
                type: 'POST',
                data: {'group_id': 6},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                success: function(response) {
                    if (response.code === 200) {
                        const settings = response.data.settings;

                        settings.forEach(setting => {
                            const imagePath = setting.value;
                            switch (setting.key) {
                                case 'site_logo':
                                    $('#logo-preview').attr('src', imagePath);
                                    break;
                                case 'site_favicon':
                                    $('#favicon-preview').attr('src', imagePath);
                                    break;
                                case 'site_mobile_icon':
                                    $('#mobile-icon-preview').attr('src', imagePath);
                                    break;
                                case 'site_icon':
                                    $('#icon-preview').attr('src', imagePath);
                                    break;
                                case 'site_dark_logo':
                                    $('#dark-logo-preview').attr('src', imagePath);
                                    break;
                            }
                        });
                    }
                    $(".label-loader, .input-loader").hide();
                    $('.real-label, .real-input').removeClass('d-none');
                },
                error: function(xhr) {
                    if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                        toastr.error(xhr.responseJSON.message);
                    }
                }
            });
        }

        $('.image-sign').on('change', function(event) {
            var input = event.target;
            var previewId = $(input).data('preview');
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#' + previewId).attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        });

        $('#logoSettingForm').submit(function(event) {
            event.preventDefault();


            $('#logo, #favicon, #icon, #dark_logo').removeClass('is-invalid');
            $('#logo_error, #favicon_error, #icon_error, #dark_logo_error').text('');

            const maxFileSize = 2048 * 1024;
            const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
            const files = [
                { id: 'logo', file: $('#logo')[0].files[0], name: 'Logo' },
                { id: 'favicon', file: $('#favicon')[0].files[0], name: 'Favicon' },
                { id: 'icon', file: $('#icon')[0].files[0], name: 'Icon' },
                { id: 'mobile_icon', file: $('#mobile_icon')[0].files[0], name: 'Mobile Icon' },
                { id: 'dark_logo', file: $('#dark_logo')[0].files[0], name: 'Dark Logo' },
            ];

            let isValid = true;
            let errorMessages = [];

            files.forEach(({ id, file, name }) => {
                if (file) {
                    if (file.size > maxFileSize) {
                        errorMessages.push(`${name}: File size must not exceed 2 MB.`);
                        isValid = false;
                    } else if (!validFileTypes.includes(file.type)) {
                        errorMessages.push(`${name}: Invalid file type. Only JPG, PNG, GIF, or SVG are allowed.`);
                        isValid = false;
                    }
                }
            });

            // If validation fails, show errors in Toastr and exit
            if (!isValid) {
                toastr.error(errorMessages.join('<br>'), 'Validation Error');
                return;
            }

            // Prepare FormData for submission
            let formData = new FormData();
            formData.append('group_id', 6);
            formData.append('logo', $('#logo')[0].files[0]);
            formData.append('favicon', $('#favicon')[0].files[0]);
            formData.append('icon', $('#icon')[0].files[0]);
            formData.append('mobile_icon', $('#mobile_icon')[0].files[0]);
            formData.append('dark_logo', $('#dark_logo')[0].files[0]);

            // Submit via AJAX
            $.ajax({
                url: "/api/admin/update-logo-setting",
                method: "POST",
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                dataType: "json",
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function() {
                    $('.general_setting_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
                },
            }).done((response) => {
                $('.general_setting_btn').removeAttr('disabled').html('Update');
                if (response.code === 200) {
                    // toastr.success(response.message);
                    if (languageId === 2) {
                        loadJsonFile(response.message, function (langtst) {
                            toastr.success(langtst);
                        });
                    }else{
                        toastr.success(response.message);
                    }
                    loadLogoSettings(); // Reload updated images
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                } else {
                    toastr.error(response.message);
                }
            }).fail((error) => {
                $('.general_setting_btn').removeAttr('disabled').html('Update');
                toastr.error("Error updating settings", "Error");

                if (error.status === 422) {
                    $.each(error.responseJSON.errors, function(key, val) {
                        toastr.error(val[0], `${key.replace('_', ' ').toUpperCase()} Error`);
                    });
                } else {
                    toastr.error(error.responseJSON.message || "Unknown error occurred", "Error");
                }
            });
        });

    });
}

//bread-image-settings
if (pageValue === 'admin.bread-image-settings'){

    $(document).ready(function() {
        loadBreadImageSettings();
        function loadBreadImageSettings() {
            $.ajax({
                url: '/api/admin/index-bread-image-setting',
                type: 'POST',
                data: { 'group_id': 7},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                success: function(response) {
                    if (response.code === 200) {
                        const settings = response.data.settings;

                        settings.forEach(setting => {
                            const imagePath = setting.value;
                            if (setting.key === 'bread_image') {
                                $('#bread-image-preview').attr('src', imagePath);
                            }
                        });
                    }
                    $(".label-loader, .input-loader").hide();
                    $('.real-label, .real-input').removeClass('d-none');
                },
                error: function(xhr) {
                    if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                        toastr.error(xhr.responseJSON.message);
                    }
                }
            });
        }

        $('.image-sign').on('change', function(event) {
            var input = event.target;
            var previewId = 'bread-image-preview';
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#' + previewId).attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        });

        $('#breadImageForm').submit(function(event) {
            event.preventDefault();

            $('#bread_image').removeClass('is-invalid');
            $('#bread_image_error').text('');

            const maxFileSize = 2048 * 1024;
            const breadImage = $('#bread_image')[0].files[0];
            let isValid = true;
            let errorMessages = '';

            if (breadImage) {
                if (breadImage.size > maxFileSize) {
                    $('#bread_image').addClass('is-invalid');
                    $('#bread_image_error').text('File size must not exceed 2 MB.');
                    errorMessages += `Bread Image: File size must not exceed 2 MB.<br>`;
                    isValid = false;
                } else if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(breadImage.type)) {
                    $('#bread_image').addClass('is-invalid');
                    $('#bread_image_error').text('Invalid file type. Only JPG, PNG, GIF, or SVG are allowed.');
                    errorMessages += `Bread Image: Invalid file type. Only JPG, PNG, GIF, or SVG are allowed.<br>`;
                    isValid = false;
                }
            }

            if (!isValid) {
                toastr.error(errorMessages, 'Validation Error');
                return;
            }

            let formData = new FormData();
            formData.append('group_id', 7);
            formData.append('bread_image', breadImage);

            $.ajax({
                url: "/api/admin/update-bread-image-setting",
                method: "POST",
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                dataType: "json",
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function() {
                    $('.general_setting_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
                },
            }).done((response) => {
                $('.general_setting_btn').removeAttr('disabled').html('Update');
                if (response.code === 200) {
                    // toastr.success(response.message);
                    if (languageId === 2) {
                        loadJsonFile(response.message, function (langtst) {
                            toastr.success(langtst);
                        });
                    }else{
                        toastr.success(response.message);
                    }
                    loadBreadImageSettings(); // Reload settings to update the preview
                } else {
                    toastr.error(response.message);
                }
            }).fail((error) => {
                $('.general_setting_btn').removeAttr('disabled').html('Update');
                toastr.error("Error updating settings", "Error");

                if (error.status === 422) {
                    $.each(error.responseJSON.errors, function(key, val) {
                        $("#" + key).addClass("is-invalid");
                        $("#" + key + "_error").text(val[0]);
                    });
                } else {
                    toastr.error(error.responseJSON.message, "Error");
                }
            });
        });
    });
}

if (pageValue === 'admin.preference'){
    loadLeadsSetting();
    function loadLeadsSetting() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {'group_id': 12},
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['leads_status', 'service_status', 'product_status'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (element.is(':checkbox')) {
                            element.prop('checked', setting.value == 1);
                        } else {
                            element.val(setting.value);
                        }
                    });

                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#product_setting_form').submit(function(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('leads_status', $('#leads_status').is(':checked') ? 1 : 0);
        formData.append('service_status', $('#service_status').is(':checked') ? 1 : 0);
        formData.append('product_status', $('#product_status').is(':checked') ? 1 : 0);
        $.ajax({
            url: "/api/admin/update-preference-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.leads_setting_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.leads_setting_btn').removeAttr('disabled').html('Save');
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
                loadLeadsSetting();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.leads_setting_btn').removeAttr('disabled').html('Save');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}

//apperance-settings
if (pageValue === 'settings.apperance-settings') {
    loadAppearanceSettings();

    function loadAppearanceSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: { 'group_id': 15 }, // Group ID for appearance settings
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['primary_color', 'secondary_color', 'button_color', 'button_hover_color'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (element.is('input[type="color"]')) {
                            element.val(setting.value); // Set color input values
                        }
                    });
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#apperance_setting_form').submit(function(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('primary_color', $('#primary_color').val());
        formData.append('secondary_color', $('#secondary_color').val());
        formData.append('button_color', $('#button_color').val());
        formData.append('button_hover_color', $('#button_hover_color').val());

        $.ajax({
            url: "/api/admin/update-otp-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.apperance_setting_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.apperance_setting_update_btn').removeAttr('disabled').html('Save');
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
                loadAppearanceSettings(); // Reload appearance settings if needed
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.apperance_setting_update_btn').removeAttr('disabled').html('Save');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });
}

//custom-settings
if (pageValue === 'settings.custom-settings') {
    $(document).ready(function() {
        loadCustomSettings();
    });

    function loadCustomSettings() {
        $.ajax({
            url: '/api/admin/index-custom-setting',
            type: 'POST',
            data: { 'group_id': 16 },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['custom_setting_content', 'custom_setting_content1'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    filteredSettings.forEach(setting => {
                        $('#' + setting.key).val(setting.value);
                    });
                }
                $(".label-loader, .input-loader").hide();
                $('.real-label, .real-input').removeClass('d-none');
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#custom_setting_form').submit(function(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('custom_setting_content', $('#custom_setting_content').val());
        formData.append('custom_setting_content1', $('#custom_setting_content1').val());

        $.ajax({
            url: "/api/admin/update-custom-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.custom_setting_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");
            $(".custom_setting_update_btn").removeAttr("disabled");
            $(".custom_setting_update_btn").html("Save");
            if (response.code === 200) {
                // toastr.success(response.message);
                if (languageId === 2) {
                    loadJsonFile(response.message, function (langtst) {
                        toastr.success(langtst);
                    });
                }else{
                    toastr.success(response.message);
                }
                loadCustomSettings();
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.custom_setting_update_btn').removeAttr('disabled').html('Save');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}

//language-settings
if (pageValue === 'listkeywords' || pageValue === 'savelangword') {
    if (!$.fn.dataTable.isDataTable('#languagesTableList')) {
        $('#languagesTableList').DataTable({
            ordering: true,
            autoWidth: false
        });
    }
}

if (pageValue === 'admin.db-settings') {

    var langCode = $('body').data('lang');

    $(document).ready(function () {
        fetchBackups(1);
    });

    function fetchBackups(page) {
        $("#loader-table,.label-loader").show();
        $(".real-table, .real-label").addClass('d-none');
        $.ajax({
            url: '/api/admin/dbbacklist',
            type: 'POST',
            dataType: 'json',
            data: {
                order_by: 'desc',
                sort_by: 'id',
                page: page,
                search: $('#searchLanguage').val()
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function (response) {
                if (response.code === '200') {
                    populateBackupTable(response.data, response.meta);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (error) {
                if (error.status === 422) {
                    var errors = error.responseJSON.errors;
                    if (errors) {
                        $.each(errors, function (key, messages) {
                            toastr.error(messages[0]);
                        });
                    } else {
                        toastr.error('An error occurred while fetching languages.');
                    }
                } else {
                    toastr.error('An error occurred while fetching languages.');
                }
                toastr.error('Error fetching languages:', error);
            },
            complete:function(){
                $("#loader-table, .label-loader").hide();
                $(".real-table, .real-label").removeClass('d-none');
            }
        });
    }

    function populateBackupTable(languages, meta) {
        let tableBody = '';
        let isEnglish = '';

        if (languages.length > 0) {
            languages.forEach(language =>  {
                tableBody += `
                    <tr>
                        <td>${language.name}</td>
                        <td>${language.show_date} ${language.show_time}</td>

                        <td>
                        <li class="d-flex align-items-center" style="list-style: none;">
                        <a href="/download-backup/${language.id}"> <i class="ti ti-cloud-download fs-20 m-2"></i></a>

                        </li>
                        </td>
                    </tr>
                `;
            });
        } else {
            tableBody = `
                <tr>
                    <td colspan="5" class="text-center">No backups found</td>
                </tr>
            `;
        }

        $('#databaseTable tbody').html(tableBody);
        if ((languages.length != 0) && !$.fn.DataTable.isDataTable('#databaseTable')) {
            $('#databaseTable').DataTable({
                ordering: true,
                language: datatableLang
            });
        }
    }
}

if (pageValue === 'admin.language-settings') {

    var langCode = $('body').data('lang');

    $(document).ready(function () {
        fetchLanguages();
        
        $('#addLanguageForm').validate({
            rules: {
                translation_language_id: {
                    required: true,
                },
            },
            messages: {
                translation_language_id: {
                    required: $('#translation_language_id_error').data('required'),
                },
            },
            errorPlacement: function (error, element) {
                var errorId = element.attr("id");
                $("#" + errorId + "_error").text(error.text());
            },
            highlight: function (element) {
                $(element).addClass("is-invalid").removeClass("is-valid");
            },
            unhighlight: function (element) {
                $(element).removeClass("is-invalid").addClass("is-valid");
            },
            onkeyup: function (element) {
                $(element).valid();
            },
            onchange: function (element) {
                $(element).valid();
            },
            submitHandler: function (form) {
                let formData = new FormData(form);

                $.ajax({
                    url: '/api/admin/languages/store',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                        'Accept': 'application/json'
                    },
                    beforeSend: function () {
                        $("#addLanguageBtn").attr("disabled", true).html(
                            '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span>'
                        );
                    },
                    success: function (response) {
                        $(".error-text").text("");
                        $(".form-control").removeClass("is-invalid");
                        $("#addLanguageBtn").removeAttr("disabled");
                        $('#addLanguageBtn').html($('#addLanguageBtn').data('save'));
                        if (response.success) {
                            toastr.success(response.message);
                            $('#add_language').modal('hide');
                            location.reload();
                        } else {
                            toastr.error(response.message);
                        }
                    },
                    error: function (error) {
                        $(".error-text").text("");
                        $(".form-control").removeClass("is-invalid");
                        $("#addLanguageBtn").removeAttr("disabled");
                        $('#addLanguageBtn').html($('#addLanguageBtn').data('save'));
                        if (error.responseJSON.errors) {
                            $.each(error.responseJSON.errors, function (key, val) {
                                $("#" + key).addClass("is-invalid");
                                $("#" + key + "_error").text(val[0]);
                            });
                        } else {
                            toastr.error(error.responseJSON.message || 'An error occurred while adding the language.');
                        }
                    }
                });
            }
        });
    });

    function fetchLanguages() {
        $.ajax({
            url: '/api/admin/languages',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function (response) {
                if (response.code == 200) {
                    populateLanguageTable(response.data, response.meta);
                }
            },
            error: function (error) {
                if (error.responseJSON.code == 500) {
                    toastr.error(error.responseJSON.message);
                } else {
                    toastr.error('An error occurred while fetching languages.');
                }
            }
        });
    }

    function populateLanguageTable(languages, meta) {
        let tableBody = '';
        let isEnglish = '';

        if (languages.length > 0) {
            languages.forEach(language =>  {
                tableBody += `
                    <tr>
                        <td>${language.name}</td>
                        <td>${language.code}</td>
                        ${ $('#has_permission').data('edit') == 1 ?
                        `<td>
                            <div class="form-check form-switch">
                                <input class="form-check-input status_change" data-id="${language.id}" data-status_type="rtl" type="checkbox" ${(language.direction == 'rtl') ? 'checked' : ''} role="switch">
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input status_change" data-id="${language.id}" data-status_type="default" type="checkbox" ${(language.is_default == '1') ? 'checked' : ''} ${(language.is_default == '1') ? 'disabled' : ''} role="switch">
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input status_change" data-id="${language.id}" data-status_type="status" type="checkbox" ${(language.status == '1') ? 'checked' : ''} ${(language.code == 'en') ? 'disabled' : ''} role="switch">
                            </div>
                        </td> ` : ''}
                         ${ $('#has_permission').data('visible') == 1 ?
                            `<td>
                                <li class="d-flex align-items-center">
                                    ${$('#has_permission').data('edit') == 1  ?
                                    `<a href="listwords/${language.id}"> 
                                        <i class="ti ti-plus fs-20 m-2"></i>
                                    </a> ` : ''}
                                    ${language.id != 1 && $('#has_permission').data('delete') == 1 ?
                                    `<a class="delete_language" href="#" data-bs-toggle="modal" data-bs-target="#delete-modal" data-id="${language.id}">
                                        <i class="ti ti-trash fs-20"></i>
                                    </a>` : ''}
                                </li>
                        </td>` : ''
                        }
                    </tr>
                `;
            });
        } else {
            tableBody = `
                <tr>
                    <td colspan="6" class="text-center">No languages found</td>
                </tr>
            `;
        }

        $('#languagesTable tbody').html(tableBody);

        $('#loader-table').addClass('d-none');
        $(".label-loader, .input-loader").hide();
        $('#languagesTable, .real-label, .real-input').removeClass('d-none');

        if (!$.fn.dataTable.isDataTable('#languagesTable')) {
            $('#languagesTable').DataTable({
                "ordering": true,
                "language": datatableLang
            });
        }
    }

    $(document).on('click', '.status_change', function(e) {
        e.preventDefault();

        let type = $(this).data('status_type');
        let languageId = $(this).data('id');
        let status = $(this).is(':checked') ? 1 : 0;

        $.ajax({
            url: '/admin/languages/set-default',
            type: 'POST',
            data: {
                id: languageId,
                language_code: langCode,
                status: status,
                type: type
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.success) {
                    toastr.success(response.message);
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    toastr.error(xhr.responseJSON.message);
                } else {
                    toastr.error('Failed to set default language. Please try again.');
                }
            }
        });
    });

    $(document).on('click', '.delete_language', function(e) {
        e.preventDefault();
        var languageId = $(this).data('id');
        $('#confirmDelete').data('id', languageId);
    });

    $(document).on('click', '#confirmDelete', function(e) {
        e.preventDefault();

        var languageId = $(this).data('id');
        $.ajax({
            url: '/api/admin/languages/deleteLanguage',
            type: 'POST',
            data: {
                id: languageId,
                language_code: langCode
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.success) {
                    toastr.success(response.message);
                    $('#delete-modal').modal('hide');
                    location.reload();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                toastr.error('An error occurred while trying to delete the language.');
            }
        });
    });

}
//invoice-settings
if (pageValue === 'admin.invoice-settings') {
    $(document).ready(function() {

        $('#image_sign').on('change', function (event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#invoice_company_logo_image').attr('src', e.target.result); // Set the image source
                };

                reader.readAsDataURL(input.files[0]);
            }
        });

        loadGeneralSettings();

        function loadGeneralSettings() {
            $.ajax({
                url: '/api/admin/index-invoice-setting',
                type: 'POST',
                data: {'group_id': 2},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                success: function(response) {
                    if (response.code === 200) {
                        const requiredKeys = ['invoice_prefix', 'invoice_starts', 'invoice_company_logo', 'invoice_company_name', 'invoice_header_terms', 'providerlogo', 'invoice_footer_terms'];

                        const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                        filteredSettings.forEach(setting => {
                            if (setting.key === 'invoice_company_logo') {
                                const imagePath = setting.value;
                                if (imagePath == 'http:\/\/127.0.0.1:8000\/storage\/') {
                                    $('#invoice_company_logo_image').attr('src', "/assets/img/logo-small.svg");
                                } else {
                                    $('#invoice_company_logo_image').attr('src', imagePath);
                                }
                            } else if(setting.key === 'providerlogo') {
                                const checkbox = $('#providerlogo');
                                checkbox.prop('checked', setting.value == 1);
                            }
                             else {
                                $('#' + setting.key).val(setting.value);
                            }
                        });
                    }
                    $(".label-loader, .input-loader").hide();
                    $('.real-label, .real-input').removeClass('d-none');
                },
                error: function(xhr) {
                    if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                        toastr.error(xhr.responseJSON.message);
                    }
                }
            });
        }

        $('#invoice_setting_form').submit(function(event) {
            event.preventDefault();

            // Validate form before submission
            if (!validateInvoiceForm()) {
                return; // Stop form submission if validation fails
            }

            let formData = new FormData();
            formData.append('invoice_logo', $('#image_sign')[0].files[0]); // Add image to formData

            // Add the other settings to formData
            formData.append('invoice_prefix', $('#invoice_prefix').val());
            formData.append('invoice_starts', $('#invoice_starts').val());
            formData.append('providerlogo', $('#providerlogo').is(':checked') ? 1 : 0);
            formData.append('group_id', $('#group_id').val());

            $.ajax({
                url: "/api/admin/update-invoice-setting",
                method: "POST",
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                    'Accept': 'application/json'
                },
                dataType: "json",
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function () {
                    $('.invoice_save_btn').attr('disabled', true);
                    $(".invoice_save_btn").html(
                        '<div class="spinner-border text-light" role="status"></div>'
                    );
                },
            }).done((response, statusText, xhr) => {
                $(".error-text").text("");
                $(".form-control").removeClass("is-invalid");
                $('.invoice_save_btn').removeAttr('disabled');
                $('.invoice_save_btn').html($('.invoice_save_btn').data('save'));
                if (response.code === 200) {
                    toastr.success(response.message);
                    // Reload the settings after successful update
                    loadGeneralSettings();
                } else {
                    toastr.error(response.message);
                }
            }).fail((error) => {
                $(".error-text").text("");
                $(".form-control").removeClass("is-invalid");
                $('.invoice_save_btn').removeAttr('disabled');
                $('.invoice_save_btn').html($('.invoice_save_btn').data('save'));

                if (error.status == 422) {
                    $.each(error.responseJSON.errors, function (key, val) {
                        $("#" + key).addClass("is-invalid");
                        $("#" + key + "_error").text(val[0]);
                    });
                } else {
                    toastr.error(error.responseJSON.message, "bg-danger");
                }
            });
        });

        function validateInvoiceForm() {
            let isValid = true;
            $(".error-text").text("");
            $(".form-control").removeClass("is-invalid");

            const maxFileSize = 5 * 1024 * 1024;
            const validFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

            const fileInput = $('#image_sign')[0].files[0];
            if (fileInput) {
                const fileSize = fileInput.size;
                const fileType = fileInput.type;

                if (fileSize > maxFileSize) {
                    $('#image_sign').addClass("is-invalid");
                    $('#image_sign_error').text($('#image_sign_error').data('image_size'));
                    isValid = false;
                } else if (!validFileTypes.includes(fileType)) {
                    $('#image_sign').addClass("is-invalid");
                    $('#image_sign_error').text($('#image_sign_error').data('image_format'));
                    isValid = false;
                }
            }

            if ($('#invoice_prefix').val().trim() === '') {
                $('#invoice_prefix').addClass("is-invalid");
                $('#invoice_prefix_error').text($('#invoice_prefix_error').data('empty'));
                isValid = false;
            }

            if ($('#invoice_starts').val().trim() === '') {
                $('#invoice_starts').addClass("is-invalid");
                $('#invoice_starts_error').text($('#invoice_starts_error').data('empty'));
                isValid = false;
            }

            return isValid;
        }

        $('#image_sign').on('change', function() {
            validateInvoiceForm();
        });

        $('#invoice_prefix').on('change', function() {
            validateInvoiceForm();
        });

        $('#invoice_starts').on('change', function() {
            validateInvoiceForm();
        });

        $('#invoice_company_name').on('change', function() {
            validateInvoiceForm();
        });

        $('#invoice_header_terms').on('change', function() {
            validateInvoiceForm();
        });

        $('#invoice_footer_terms').on('change', function() {
            validateInvoiceForm();
        });

    });
}

//invoice-template
if (pageValue === 'admin.invoice-template'){

    $(document).ready(function() {
        $('.summernote-add').summernote({
            height: 200
        });
        $('#summernote').summernote();

        loadInvoiceTemplates();
    });

    $('.add_placeholder_value').on('click', function() {
        var selectedContent = $(this).data('value');

        var summernoteEditor = $('.summernote-add');

        summernoteEditor.summernote('focus');
        summernoteEditor.summernote('editor.restoreRange');
        summernoteEditor.summernote('editor.insertText', selectedContent);
        summernoteEditor.summernote('editor.saveRange');
    });

    $('.placeholder_value').on('click', function() {
        var selectedContent = $(this).data('value');
        var summernoteEditor = $('#summernote');

        summernoteEditor.summernote('focus');
        summernoteEditor.summernote('editor.restoreRange');
        summernoteEditor.summernote('editor.insertText', selectedContent);
        summernoteEditor.summernote('editor.saveRange');
    });

    function loadInvoiceTemplates() {
        $.ajax({
            url: '/api/admin/index-invoice-template',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    let tableBody = '';

                    if (response.data.length > 0) {
                        response.data.forEach(template => {
                            tableBody += `
                                <tr>
                                    <td>${template.invoice_title}</td>
                                    <td>${template.invoice_type}</td>
                                     ${ 
                                        $('#has_permission').data('visible') == 1 ?
                                    `<td>
                                        <div class="d-flex align-items-center">
                                          ${ 
                                                $('#has_permission').data('edit') == 1 ?
                                                `  <a href="#" class=" bg-white btn-icon me-2 edit-template"
                                               data-bs-toggle="modal" data-bs-target="#edit_email_template"
                                               data-id="${template.id}">
                                                <i class="ti ti-pencil fs-20"></i>
                                                </a>` : ''
                                            }
                                          
                                              ${ 
                                                $('#has_permission').data('delete') == 1 ?
                                                `<a href="#" class=" bg-white btn-icon delete_invoice_template"
                                               data-bs-toggle="modal" data-bs-target="#delete-modal"
                                               data-id="${template.id}">
                                                <i class="ti ti-trash fs-20"></i>
                                                </a>` : ''
                                            }
                                            
                                        </div>
                                    </td>` : ''
                                    }
                                </tr>

                                </tr>
                            `;
                        });
                    } else {
                        tableBody = `
                            <tr>
                                <td colspan="2" class="text-center">No invoice templates found</td>
                            </tr>
                        `;
                    }

                    $('#invoiceTemplatesTable tbody').html(tableBody);

                    $('#loader-table').addClass('d-none');
                    $(".label-loader, .input-loader").hide();
                    $('#invoiceTemplatesTable, .real-label, .real-input').removeClass('d-none');

                    if (!$.fn.dataTable.isDataTable('#invoiceTemplatesTable')) {
                        $('#invoiceTemplatesTable').DataTable({
                            "ordering": true,
                            "language": datatableLang
                        });
                    }
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    //add
    $('#email_template_form').submit(function (event) {
        event.preventDefault();

        // Clear previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.error-text').text('');

        // Client-side validation
        let invoiceTitle = $('#invoice_title').val().trim();
        let invoiceType = $('#invoice_type').val().trim();
        let templateContent = $('.summernote-add').summernote('code').trim();

        let isValid = true;

        if (!invoiceTitle) {
            $('#invoice_title').addClass('is-invalid');
            $('#invoice_title_error').text('Invoice title is required.');
            isValid = false;
        }

        if (!invoiceType) {
            $('#invoice_type').addClass('is-invalid');
            $('#invoice_type_error').text('Invoice type is required.');
            isValid = false;
        }

        if (!templateContent || templateContent === '<p><br></p>') { // Check for empty Summernote content
            $('.email_template_summernote').addClass('is-invalid');
            $('#template_content_error').text('Template content is required.');
            isValid = false;
        }

        // If validation fails, stop the form submission
        if (!isValid) {
            return;
        }

        // Prepare form data
        let formData = new FormData();
        formData.append('invoice_title', invoiceTitle);
        formData.append('invoice_type', invoiceType);
        formData.append('template_content', templateContent);

        // AJAX request
        $.ajax({
            url: "/api/admin/add-invoice-template",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.email_template_save_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $('.email_template_save_btn').removeAttr('disabled').html('Submit');
            if (response.code === 200) {
                toastr.success(response.message);
                $('#add_email_template').modal('hide'); // Close modal if needed
                loadInvoiceTemplates(); // Reload the list if needed
            } else {
                toastr.error(response.message);
            }
        }).fail((error) => {
            $('.email_template_save_btn').removeAttr('disabled').html('Submit');
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

    $('#add_email_template').on('show.bs.modal', function () {
        $('.summernote-add').summernote('code', "");
        $('#email_template_form').trigger('reset');
        $('.error-text').text('');
        $('.form-control').removeClass('is-invalid is-valid');
    });

    //edit
    $(document).on('click', '.edit-template', function(e) {
        e.preventDefault();
        $('.error-text').text('');
        $('.form-control').removeClass('is-invalid is-valid');

        var templateId = $(this).data('id');

        $.ajax({
            url: '/api/admin/index-invoice-template',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            data: { id: templateId },
            success: function(response) {
                if (response.code === 200) {
                    const template = response.data;
                    $('#editTemplateForm input[name="template_id"]').val(template.id);
                    $('#edit_invoice_title').val(template.invoice_title);
                    $('#edit_invoice_type').val(template.invoice_type);
                    $('#summernote').summernote('code', template.template_content);

                    $('#edit_email_template').modal('show');
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    });

    $('#editTemplateForm').on('submit', function(e) {
        e.preventDefault();
        $('#edit_template_content').val($('#summernote').summernote('code'));

        var formData = $(this).serialize();

        $.ajax({
            url: '/api/admin/add-invoice-template',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            data: formData,
            success: function(response) {
                if (response.code === 200) {
                    toastr.success(response.message);
                    $('#edit_email_template').modal('hide');
                    loadInvoiceTemplates();
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    });
    //delete
    let templateIdToDelete;

    $(document).on('click', '.delete_invoice_template', function() {
        templateIdToDelete = $(this).data('id');
    });

    $('#deleteTemplateForm').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/api/admin/destroy-invoice-template',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            data: { id: templateIdToDelete },
            success: function(response) {
                if (response.code === 200) {
                    // Optionally, refresh the list of templates or remove the deleted template from the DOM
                    loadInvoiceTemplates();
                    $('#delete-modal').modal('hide'); // Hide the modal
                    toastr.success(response.message); // Show success message
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                } else if (xhr.responseJSON && xhr.responseJSON.code === 422) {
                    toastr.error(xhr.responseJSON.errors.id[0]); // Show specific validation error
                }
            }
        });
    });

    $(document).on('click', '.make_default', function(e) {
        e.preventDefault();

        var templateId = $(this).data('id');

        $.ajax({
            url: '/api/admin/invoice-template/set-default',
            type: 'POST',
            data: {
                id: templateId,
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.success) {
                    toastr.success(response.message);
                    loadInvoiceTemplates();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function(xhr) {
                toastr.error('Failed to set default language. Please try again.');
            }
        });
    });


}

//how-it-work
if (pageValue === 'admin.how-it-work') {
    loadHowItWorkSettings();

    function loadHowItWorkSettings(langId = '') {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {
                'group_id': 14,
                language_id: langId
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function (response) {
                if (response.code === 200) {

                    response.data.settings = response.data.settings.map(setting => {
                        if (setting.key.startsWith('how_it_work_content_')) {
                            const lastUnderscoreIndex = setting.key.lastIndexOf('_');
                            if (lastUnderscoreIndex !== -1) {
                                setting.key = setting.key.substring(0, lastUnderscoreIndex);
                            }
                        }
                        return setting;
                    });

                    const requiredKeys = ['how_it_work_content'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    if (filteredSettings.length > 0) {

                        filteredSettings.forEach(setting => {
                            const element = $('#' + setting.key);

                            if (element.is('select')) {
                                element.val(setting.value).change();
                            } else if (element.is(':checkbox')) {
                                element.prop('checked', setting.value == 1);
                            } else if (element.is('textarea')) {
                                element.val(setting.value);
                            } else {
                                element.val(setting.value);
                            }
                        });

                        const maintenanceContentSetting = filteredSettings.find(setting => setting.key === 'how_it_work_content');
                        if (maintenanceContentSetting) {
                            $('#summernote').summernote('code', maintenanceContentSetting.value);
                        }
                    } else {
                        $('#summernote').summernote('code', '');
                    }

                }
                $(".label-loader, .input-loader").hide();
                $(".real-label, .real-input").removeClass("d-none");
            },
            error: function (xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#how_it_work_setting_form').submit(function (event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('group_id', $('#group_id').val());
        formData.append('how_it_work_content', $('#summernote').summernote('code')); // Add maintenance content
        formData.append('language_id', $('#language_id').val());

        $.ajax({
            url: "/api/admin/update-otp-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.how_it_work_update_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
            success: function (response) {
                $('.how_it_work_update_btn').removeAttr('disabled').html('Save');
                if (response.code === 200) {
                    if (languageId === 2) {
                        loadJsonFile(response.message, function (langtst) {
                            toastr.success(langtst);
                        });
                    }else{
                        toastr.success(response.message);
                    }
                    var langId = $('#language_id').val();
                    loadHowItWorkSettings(langId);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (error) {
                $('.how_it_work_update_btn').removeAttr('disabled').html('Save');
                if (error.status == 422) {
                    $.each(error.responseJSON.errors, function (key, val) {
                        $("#" + key).addClass("is-invalid");
                        $("#" + key + "_error").text(val[0]);
                    });
                } else {
                    toastr.error(error.responseJSON.message || 'An error occurred while updating settings.');
                }
            }
        });
    });

    $('#language_id').on('change', function() {
        var langId = $(this).val();

        languageTranslate(langId);
        loadHowItWorkSettings(langId);
    });

    function languageTranslate(lang_id) {
        $.ajax({
            url: "/api/translate",
            type: "POST",
            dataType: "json",
            data: {
                language_id: lang_id,
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("admin_token"),
                Accept: "application/json",
            },
            success: function (response) {
                const trans = response.translated_values;
                $(".error-text").text("");
                $(".form-control").removeClass("is-invalid is-valid");

                if (response.code === 200 && Object.keys(trans).length > 0) {
                    $('.lang_title').text(trans.available_translations);
                }

            },
            error: function (error) {
                toastr.error(error.responseJSON.message);
            },
        });
    }
}

//transaction
if (pageValue === 'admin.transaction') {
    function truncateText(text, maxLength = 10) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    $(document).ready(function () {
        bookingTransactionList();
    });

    function bookingTransactionList() {

        $.ajax({
            url: '/api/transactionlist',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                order_by: 'desc',
                sort_by: "id",
            },
            success: function(response) {
                if (response.success && response.data && response.data.transactions) {
                    let transactions = response.data.transactions;
                    let tableBody = "";

                    if (transactions.length === 0) {
                        $('#transactionList').DataTable().destroy();
                        tableBody += `
                            <tr>
                                <td colspan="9" class="text-center">${$('#transactionList').data('empty')}</td>
                            </tr>`;
                    } else {

                        transactions.forEach((transaction, index) => {
                            let formattedDate = transaction.date;

                            let statusClass = '';
                            switch (transaction.payment.status) {
                                case 'Unpaid':
                                    statusClass = 'text-warning';
                                    break;
                                case 'Paid':
                                    statusClass = 'text-success';
                                    break;
                                case 'Refund':
                                    statusClass = 'text-danger';
                                    break;
                                case 'In Progress':
                                    statusClass = 'text-primary';
                                    break;
                                case 'Completed':
                                    statusClass = 'text-success';
                                    break;
                                default:
                                    statusClass = 'text-secondary';
                                    break;
                            }

                            const defaultImage = '/assets/img/profile-default.png';
                            const defaultImage1 = 'front/img/default-placeholder-image.png';

                            let customerImage = transaction.customer.image_url && transaction.customer.image_url !== ''
                                ? `${transaction.customer.image_url}`
                                : defaultImage;

                            let providerImage = transaction.provider.image_url && transaction.provider.image_url !== ''
                                ? `${transaction.provider.image_url}`
                                : defaultImage;

                            let serviceImage = transaction.service.service_image_url && transaction.service.service_image_url !== ''
                                ? `${transaction.service.service_image_url}`
                                : defaultImage1;

                            let currency = transaction.currencySymbol;
                            let paymentType = transaction.payment?.type || 'N/A';
                            let paymentStatus = transaction.payment?.status || 'N/A';

                            tableBody += `
                                <tr>
                                    <td>${transaction.order_id}</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="${customerImage}" class="transactionimg me-3 rounded-circle admin_provider_img" alt="Customer Image">
                                            <div>
                                                <span class="fw-bold d-block">${truncateText(transaction.customer.name)}</span>
                                                <small class="text-muted">${truncateText(transaction.customer.email)}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="${providerImage}" class="transactionimg me-3 rounded-circle admin_provider_img" alt="Provider Image">
                                            <div>
                                                <span class="fw-bold d-block">${truncateText(transaction.provider.name)}</span>
                                                <small class="text-muted">${truncateText(transaction.provider.email)}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" class="table-imgname d-flex align-items-center">
                                            <img src="${serviceImage}" class="transactionimg me-3 rounded-circle admin_provider_img" alt="Service Image">
                                            <span>${truncateText(transaction.service.name)}</span>
                                        </a>
                                    </td>
                                    <td>${currency}${transaction.amount.total_amount}</td>
                                    <td>${formattedDate}</td>
                                    <td class="text-center">${paymentType}</td>
                                    <td <h6 class="badge-active ${statusClass}">${paymentStatus}</td>
                                    <td>
                                        <div class="table-actions d-flex">
                                            <a class="delete-table view-transaction" href="javascript:void(0);"
                                            data-customer="${transaction.customer.name}"
                                            data-provider="${transaction.provider.name}"
                                            data-service="${transaction.service.name}"
                                            data-amount="${transaction.amount.service_amount}"
                                            data-tax="${transaction.amount.tax}"
                                            data-date="${formattedDate}"
                                            data-payment-type="${paymentType}"
                                            data-payment-status="${paymentStatus}"
                                            data-status="${transaction.status}"
                                            data-currency="${transaction.currencySymbol}"
                                            data-additional_services='${JSON.stringify(transaction.additional_services)}'>
                                                <i class="ti ti-eye fs-20 m-2"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            `;

                        });
                        
                    }
                    $('#transactionList tbody').html(tableBody);

                    $(document).on('click', '.view-transaction', function() {
                        let additionalServices = $(this).data("additional_services");
                        let currency = $(this).data("currency");
                        if (Array.isArray(additionalServices) && additionalServices.length > 0) {
                            let list = "<ul class='mb-0 ps-3'>";
                            additionalServices.forEach(service => {
                                list += `<li><bold>${service.name}</bold> - ${currency}${service.price}</li>`;
                            });
                            list += "</ul>";
                            $(".additional_service").removeClass('d-none');
                            $("#additional_service_list").html(list);
                        } else {
                            $(".additional_service").addClass('d-none');
                        }

                        let customer = $(this).data('customer');
                        let provider = $(this).data('provider');
                        let service = $(this).data('service');
                        let amount = $(this).data('amount');
                        let tax = $(this).data('tax');
                        let date = $(this).data('date');
                        let paymentType = $(this).data('payment-type');
                        let paymentStatus = $(this).data('payment-status');
                        let status = $(this).data('status');

                        $('#transactionCustomer').text(customer);
                        $('#transactionProvider').text(provider);
                        $('#transactionService').text(service);
                        $('#transactionAmount').text(currency + amount);
                        $('#transactionTax').text(currency + tax);
                        $('#transactionDate').text(date);
                        $('#transactionPaymentType').text(paymentType);
                        $('#transactionPaymentStatus').text(paymentStatus);
                        $('#transactionStatus').text(status);

                        $('#veiw_transaction').modal('show');
                    });

                    $('#loader-table').addClass('d-none');
                    $(".label-loader, .input-loader").hide();
                    $('#transactionList, .real-label, .real-input').removeClass('d-none');

                    if ((transactions.length != 0) && !$.fn.DataTable.isDataTable('#transactionList')) {
                        $('#transactionList').DataTable({
                            ordering: true,
                            pageLength: 10,
                            language: datatableLang,
                            order: [[0, "desc"]],
                        });
                    }
                }
            },
            error: function() {
                toastr.error('Unable to fetch session data. Please try again.');
            }
        });

    }

    $(document).on('click', '#leadsTransation', function() {
        $('#transactionList').addClass('d-none');
        $('#leadsTransactionTable').removeClass('d-none');
        if ($.fn.DataTable.isDataTable('#transactionList')) {
            $('#transactionList').DataTable().destroy();
        }
        if ($.fn.DataTable.isDataTable('#leadsTransactionTable')) {
            $('#leadsTransactionTable').DataTable().destroy();
        }
        $('#leadsTransactionTable tbody').empty();
        $('#loader-table').removeClass('d-none');
        $(".label-loader, .input-loader").show();
        $('#leadsTransactionTable, .real-label, .real-input').addClass('d-none');

        listLeadsTransaction();
    });

    $(document).on('click', '#bookingTransaction', function() {
        $('#leadsTransactionTable').addClass('d-none');
        $('#transactionList').removeClass('d-none');
        if ($.fn.DataTable.isDataTable('#leadsTransactionTable')) {
            $('#leadsTransactionTable').DataTable().destroy();
        }
        if ($.fn.DataTable.isDataTable('#transactionList')) {
            $('#transactionList').DataTable().destroy();
        }
        $('#transactionList tbody').empty();
        $('#loader-table').removeClass('d-none');
        $(".label-loader, .input-loader").show();
        $('#transactionList, .real-label, .real-input').addClass('d-none');
        bookingTransactionList();
    });


    function listLeadsTransaction() {
        
        $.ajax({
            url: "/api/leads/transaction-list",
            type: "POST",
            dataType: "json",
            data: {
                order_by: "desc",
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("admin_token"),
                Accept: "application/json",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if (response.code === 200) {
                    let transactions = response.data;
                    let tableBody = "";

                    if (transactions.length === 0) {
                        $('#leadsTransactionTable').DataTable().destroy();
                        tableBody += `
                            <tr>
                                <td colspan="9" class="text-center">${$('#leadsTransactionTable').data('empty')}</td>
                            </tr>`;
                    } else {
                        transactions.forEach((transaction, index) => {
                            tableBody += `
                                <tr>
                            <td>${index + 1}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="${transaction.customer.profile_image}" class="transactionimg me-3 rounded-circle admin_provider_img" alt="Customer Image">
                                    <div>
                                        <span class="fw-bold d-block">${truncateText(transaction.customer.full_name)}</span>
                                        <small class="text-muted">${truncateText(transaction.customer.email)}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="${transaction.provider.profile_image}" class="transactionimg me-3 rounded-circle admin_provider_img" alt="Provider Image">
                                    <div>
                                        <span class="fw-bold d-block">${truncateText(transaction.provider.full_name)}</span>
                                        <small class="text-muted">${truncateText(transaction.provider.email)}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                ${transaction.category}
                            </td>
                            <td>${transaction.currency}${transaction.payment.amount}</td>
                            <td>${transaction.payment.date}</td>
                            <td class="text-center">${transaction.payment.type}</td>
                            <td> 
                                <span class="badge ${transaction.payment.status == 'Paid' ? 'badge-soft-success' : 'badge-soft-danger'} d-flex align-items-center">
                                    <i class="ti ti-point-filled"></i> ${transaction.payment.status}
                                </span>
                            </td>
                            <td>
                                <div class="table-actions d-flex">
                                    <a class="view-leads-transaction" href="javascript:void(0);"
                                        data-customer="${transaction.customer.full_name}"
                                        data-provider="${transaction.provider.full_name}"
                                        data-category="${transaction.category}"
                                        data-amount="${transaction.payment.amount}"
                                        data-date="${transaction.payment.date}"
                                        data-payment_type="${transaction.payment.type}"
                                        data-payment_status="${transaction.payment.status}">
                                        <i class="ti ti-eye fs-20 m-2"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                            `;
                        });
                    }

                    $('#leadsTransactionTable tbody').html(tableBody);
                    $('#loader-table').addClass('d-none');
                    $(".label-loader, .input-loader").hide();
                    $('#leadsTransactionTable, .real-label, .real-input').removeClass('d-none');

                    if ((transactions.length != 0) && !$.fn.DataTable.isDataTable('#leadsTransactionTable')) {
                        $('#leadsTransactionTable').DataTable({
                            ordering: true,
                            language: datatableLang,
                            pageLength: 10
                        });
                    }
                }
            },
            error: function (error) {
                if (error.responseJSON.code === 500) {
                    toastr.error(error.responseJSON.message);
                }
            },
        });
    }

    $(document).on('click', '.view-leads-transaction', function() {
        let customer = $(this).data('customer');
        let provider = $(this).data('provider');
        let category = $(this).data('category');
        let amount = $(this).data('amount');
        let date = $(this).data('date');
        let paymentType = $(this).data('payment_type');
        let paymentStatus = $(this).data('payment_status');

        $('#leadsTransactionCustomer').text(customer);
        $('#leadsTransactionProvider').text(provider);
        $('#leadsTransactionService').text(category);
        $('#leadsTransactionAmount').text(amount);
        $('#leadsTransactionDate').text(date);
        $('#leadsTransactionPaymentType').text(paymentType);
        $('#leadsTransactionPaymentStatus').text(paymentStatus);

        $('#veiw_leads_transaction_modal').modal('show');
    });

}

if (pageValue === 'admin.providertransaction') {

    $('#provider_amount').on("input", function () {
        $(this).val($(this).val().replace(/[^a-zA-Z0-9]/g, ""));
    });

    $(document).on('click', '.transaction_histroy', function () {
        const providerId = $(this).data('provider-id');

        $('#payoutHistoryCards').html('');

        $.ajax({
            url: '/api/provider/get-payout-history',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
                'Accept': 'application/json',
            },
            data: {
                provider_id: providerId,
            },
            beforeSend: function () {
                // Optionally show a loading indicator
            },
        }).done((response) => {
            if (response.code === 200) {
                const historyData = response.data;

                if (historyData.length > 0) {
                    historyData.forEach((item, index) => {
                        let proofContent = '';

                        if (item.payment_proof_path) {
                            // Check if the payment proof is an image
                            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(item.payment_proof_path);
                            if (isImage) {
                                proofContent = `<img src="${item.payment_proof_path}" class="img-fluid rounded" style="max-height: 150px; max-width: 200px;" alt="Payment Proof">`;
                            } else {
                                proofContent = `<a href="${item.payment_proof_path}" target="_blank" class="btn btn-link">View Proof</a>`;
                            }
                        } else {
                            proofContent = `<span class="text-muted">N/A</span>`;
                        }

                        $('#payoutHistoryCards').append(`
                            <div class="col-12">
                                <div class="card shadow-sm border">
                                    <div class="card-body">
                                        <h5 class="card-title">Payout #${index + 1}</h5>
                                        <p class="mb-1"><strong>Total Amount:</strong> ${item.total_amount}</p>
                                        <p class="mb-1"><strong>Processed Amount:</strong> ${item.processed_amount}</p>
                                        <p class="mb-1"><strong>Available Amount:</strong> ${item.available_amount ?? 'N/A'}</p>
                                        <p class="mb-1"><strong>Payment Date:</strong> ${item.created_at}</p>
                                        <div>${proofContent}</div>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                } else {
                    $('#payoutHistoryCards').append(`
                        <div class="col-12 text-center">
                            <p class="text-muted">No payout history found.</p>
                        </div>
                    `);
                }
            } else {
                toastr.error(response.message);
            }

            $('#payoutHistoryModal').modal('show');
        }).fail((error) => {
            toastr.error('Failed to fetch payout history. Please try again.');
        });
    });

    $(document).on('click', '#uploadPaymentProof', function() {

        let providerId = $('#provider_id').val();
        let providerName = $('#provider_name').val(); // Set provider name in modal
        let providerEmail = $('#provider_email').val(); // Set provider email in modal
        let totalBookings = $('#total_bookings').val(); // Set total bookings in modal
        let totalEarnings = $('#total_gross_amount').val(); // Set total earnings in modal
        let adminEarnings = $('#total_commission_amount').val(); // Set admin earnings in modal
        let providerPayDue = $('#total_reduced_amount').val(); // The entered amount (provider amount)
        let enteredAmount = parseFloat($('#provider_amount').val()) || 0;
        let remainingAmount = parseFloat($('#remaining_amount').val()) || 0;

        // Check if the entered amount is valid
        if (enteredAmount > providerPayDue) {
            $('#amountError').show(); // Show error if amount exceeds
            return;
        } else {
            $('#amountError').hide();
        }

        // Get the file (payment proof)
        let paymentProof = $('#codFile')[0].files[0]; // The file selected for proof

        // Create FormData object to send data with the file
        let formData = new FormData();
        formData.append('provider_id', providerId);
        formData.append('provider_name', providerName);
        formData.append('provider_email', providerEmail);
        formData.append('total_bookings', totalBookings);
        formData.append('total_earnings', totalEarnings);
        formData.append('admin_earnings', adminEarnings);
        formData.append('provider_pay_due', providerPayDue);
        formData.append('entered_amount', enteredAmount);
        formData.append('payment_proof', paymentProof);
        formData.append('remaining_amount', (remainingAmount - enteredAmount));
        formData.append('payment_method', $("#payment_method").val());

        $.ajax({
            url: '/api/storePayoutHistroy',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    toastr.success('Payout history stored successfully!');
                    podiverEarning();
                    $('#veiw_transaction').modal('hide');
                } else {
                    toastr.error(response.message || 'Failed to store payout history.');
                }
            },
            error: function(xhr, status, error) {
                toastr.error('An error occurred while submitting the proof: ' + error);
            }
        });
    });
    podiverEarning();


    function podiverEarning(){
        $.ajax({
            url: '/api/providertransactionlist',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.success) {
                    let tableBody = $('.providertransactionlist');
                    tableBody.empty();

                    response.data.forEach((item, index) => {
                        let currency = item.currencySymbol;
                        let provider = item.provider;
                        let transactions = item.transactions;

                        let providerImage = provider.profile_image !== ''
                        ? `${provider.profile_image}`
                        : '/assets/img/profile-default.png';

                        let row = `
                            <tr>
                                <td>${index + 1}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="${providerImage}" class="transactionimg me-3 rounded-circle" alt="Provider Image" style="width: 50px; height: 50px; object-fit: cover;">
                                        <div>
                                            <span class="fw-bold d-block">${provider.name}</span>
                                            <small class="text-muted">${provider.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>${transactions.total_bookings}</td>
                                <td>${currency}${transactions.total_gross_amount.toFixed(2)}</td>
                                <td>${currency}${transactions.total_commission_amount.toFixed(2)}</td>
                                <td>${currency}${transactions.total_reduced_amount.toFixed(2)}</td>
                                <td>${currency}${transactions.remaining_amount.toFixed(2)}</td>
                                <td>
                                    <div class="table-actions d-flex justify-content-start align-items-center">
                                        <a class="delete-table view-transaction me-3" href="javascript:void(0);"
                                            data-provider-id="${provider.id}"
                                            data-provider-name="${provider.name}"
                                            data-provider-email="${provider.email}"
                                            data-total-bookings="${transactions.total_bookings}"
                                            data-total-gross-amount="${transactions.total_gross_amount.toFixed(2)}"
                                            data-total-commission-amount="${transactions.total_commission_amount.toFixed(2)}"
                                            data-total-reduced-amount="${transactions.total_reduced_amount.toFixed(2)}"
                                            data-remaining-amount="${transactions.remaining_amount.toFixed(2)}"
                                            data-payout-details='${JSON.stringify(item.payout_details).replace(/'/g, "&apos;")}'>
                                            <i class="ti ti-eye fs-20">view</i>
                                        </a>
                                        <a class="transaction_histroy" href="javascript:void(0);"
                                            data-provider-id="${provider.id}">
                                            <i class="ti ti-file fs-20">history</i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        `;

                        tableBody.append(row);
                    });

                    $(document).on('click', '.view-transaction', function () {
                        let totalReducedAmount = $(this).data('total-reduced-amount');
                        let providerId = $(this).data('provider-id');
                        let providerName = $(this).data('provider-name');
                        let providerEmail = $(this).data('provider-email');
                        let totalBookings = $(this).data('total-bookings');
                        let totalGrossAmount = $(this).data('total-gross-amount');
                        let totalCommissionAmount = $(this).data('total-commission-amount');
                        let remaining_amount = $(this).data('remaining-amount');
                        let payoutDetailRaw = $(this).attr('data-payout-details'); // always use attr when dealing with full JSON strings

                        try {
                            let payoutDetail = JSON.parse(payoutDetailRaw);
                            if (payoutDetail && Object.keys(payoutDetail).length > 0) {
                                $('#payout_type').text($('.provider_payout').data('payment_method') + ': ' + payoutDetail.payment_method);
                                $('#payment_method').val(payoutDetail.payment_method);
                                if (payoutDetail.payment_method == 'Bank Transfer') {
                                    $('#payout_details').html(`
                                        <p>${$('.provider_payout').data('holder_name')}: ${payoutDetail.payout_details.holder_name}</p>
                                        <p>${$('.provider_payout').data('bank_name')}: ${payoutDetail.payout_details.bank_name}</p>
                                        <p>${$('.provider_payout').data('account_number')}: ${payoutDetail.payout_details.account_number}</p>
                                        <p>${$('.provider_payout').data('ifsc')}: ${payoutDetail.payout_details.ifsc}</p>
                                    `);
                                } else {
                                    $('#payout_details').html(`
                                        <p>${$('.provider_payout').data('id')}: ${payoutDetail.payout_details}</p>
                                    `);
                                }
                                $('#no_payout_info').addClass('d-none');
                            } else {
                                $('#payout_type').text('');
                                $('#payout_details').html('');
                                $('#no_payout_info').removeClass('d-none');
                            }
                        } catch (e) {
                            $('#payout_type').text('');
                            $('#payout_details').html('');
                            $('#no_payout_info').removeClass('d-none');
                        }

                        $('#provider_id').val(providerId);
                        $('#provider_name').val(providerName);
                        $('#provider_email').val(providerEmail);
                        $('#total_bookings').val(totalBookings);
                        $('#total_gross_amount').val(totalGrossAmount);
                        $('#total_commission_amount').val(totalCommissionAmount);
                        $('#total_reduced_amount').val(totalReducedAmount);
                        $('#provider_amount_hidden').val(0);
                        $('#provider_amount').val(0); // For visible input
                        $('#remaining_amount').val(remaining_amount);


                        $('#provider_amount').attr('max', totalReducedAmount);
                        $('#uploadPaymentProof').prop('disabled', true); // Disable Submit Proof by default
                        $('#codFile').val('');

                        // Show the modal
                        $('#veiw_transaction').modal('show');

                        // Function to validate both conditions
                        function validateConditions() {
                            let enteredAmount = parseFloat($('#provider_amount').val()) || 0;
                            let remainingAmountValid = enteredAmount <= remaining_amount && enteredAmount > 0;
                            let fileUploaded = $('#codFile')[0].files.length > 0;

                            if (remainingAmountValid && fileUploaded) {
                                $('#amountError').hide(); // Hide error message if valid
                                $('#uploadPaymentProof').prop('disabled', false); // Enable submit button
                            } else {
                                if (!remainingAmountValid) {
                                    $('#amountError').show(); // Show error message for invalid amount
                                } else {
                                    $('#amountError').hide(); // Hide error message if valid
                                }
                                $('#uploadPaymentProof').prop('disabled', true); // Disable submit button
                            }
                        }

                        // Validate amount input
                        $('#provider_amount').on('input', function () {
                            validateConditions();
                        });

                        // Validate file upload
                        $('#codFile').on('change', function () {
                            validateConditions();
                        });
                    });

                    $('#loader-table').addClass('d-none');
                    $(".label-loader, .input-loader").hide();
                    $('#providertransactionlist, .real-label, .real-input').removeClass('d-none');

                    if ($('#providertransactionlist').length && !$.fn.DataTable.isDataTable('#providertransactionlist')) {
                        $('#providertransactionlist').DataTable({
                            ordering: true,
                            language: datatableLang
                        });
                    }
                } else {
                    toastr.error(response.message || 'Failed to load data.');
                }
            },
            error: function(error) {
                toastr.error('An error occurred while fetching the data.');
            }
        });
    }
}

if (pageValue === 'admin.providerrequest') {

    $(document).on('change', '#codFile', function () {
        let fileInput = $(this);
        let file = fileInput[0].files[0]; // Get the selected file

        // Check if a file is selected
        if (file) {
            // Enable the submit button
            $('#uploadPaymentProof').prop('disabled', false);
        } else {
            // Disable the submit button if no file is selected
            $('#uploadPaymentProof').prop('disabled', true);
        }
    });

    $(document).on('click', '#uploadPaymentProof', function () {
        let providerId = $('#provider_id').val();
        let Id = $('#id').val();
        let providerAmount = $('#provider_amount').val();
        let fileInput = $('#codFile')[0];
        let file = fileInput.files[0];

        if (!file) {
            toastr.error('Please select a file before submitting.');
            return;
        }

        let formData = new FormData();
        formData.append('provider_id', providerId);
        formData.append('id', Id);
        formData.append('provider_amount', providerAmount);
        formData.append('payment_proof', file);
        formData.append('payment_method', $("#payment_method").val());

        $.ajax({
            url: '/api/updateproviderrequest',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    toastr.success('Payment proof submitted successfully.');
                    $('#veiw_transaction').modal('hide');
                    podiverRequest();
                } else {
                    toastr.error(response.message || 'Failed to submit payment proof.');
                }
            },
            error: function (xhr) {
                let errorMessage = xhr.responseJSON?.message || 'An error occurred while submitting the payment proof.';
                toastr.error(errorMessage);
            }
        });
    });

    podiverRequest();
    function podiverRequest(){
        $.ajax({
            url: '/api/list/provider/request',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {

                if (response.success) {
                    let tableBody = $('.providerrequestlist');
                    let currencySymbol = response.currencySymbol ?? '$';
                    tableBody.empty();

                    response.data.forEach(function(item, index) {
                        let statusLabel = item.status_label;
                        let date = new Date(item.created_at);
                        let formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;  // Show date in DD-MM-YYYY format

                        let paymentType = '';
                        switch (item.payment_id) {
                            case 1:
                                paymentType = 'PayPal';
                                break;
                            case 2:
                                paymentType = 'Stripe';
                                break;
                            case 4:
                                paymentType = 'Bank Transfer';
                                break;
                            default:
                                paymentType = 'Unknown';
                                break;
                        }

                        let row = `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.provider_name}</td>
                                <td>${currencySymbol}${item.amount}</td>
                                <td>${paymentType}</td>
                                <td>${formattedDate}</td>
                                <td>${statusLabel}</td>
                               <td>
                               <div class="table-actions d-flex">
                                    <a class="delete-table view-transaction" href="javascript:void(0);"
                                        data-provider-amount="${item.amount}"
                                        data-provider-id="${item.provider_id}"
                                        data-status="${item.status}"
                                        data-id="${item.id}"
                                        data-currency-symbol="${currencySymbol}"
                                        data-payout-details='${JSON.stringify(item.provider_payout_details).replace(/'/g, "&apos;")}'>
                                        <i class="ti ti-eye fs-20 m-2"></i>                                    
                                    </a>
                                </div>
                            </td>
                            </tr>
                        `;
                        tableBody.append(row);
                    });

                    $(document).on('click', '.view-transaction', function () {
                        let providerAmount = $(this).data('provider-amount');
                        let providerId = $(this).data('provider-id');
                        let status = $(this).data('status');
                        let Id = $(this).data('id');
                        let payoutDetailRaw = $(this).attr('data-payout-details'); // always use attr when dealing with full JSON strings
                        let currencySymbol = $(this).data('currency-symbol');

                        try {
                            let payoutDetail = JSON.parse(payoutDetailRaw);
                            if (payoutDetail && Object.keys(payoutDetail).length > 0) {
                                $('#payout_type').text($('.provider_payout').data('payment_method') + ': ' + payoutDetail.payment_method);
                                $('#payment_method').val(payoutDetail.payment_method);
                                if (payoutDetail.payment_method == 'Bank Transfer') {
                                    $('#payout_details').html(`
                                        <p>${$('.provider_payout').data('holder_name')}: ${payoutDetail.payout_details.holder_name}</p>
                                        <p>${$('.provider_payout').data('bank_name')}: ${payoutDetail.payout_details.bank_name}</p>
                                        <p>${$('.provider_payout').data('account_number')}: ${payoutDetail.payout_details.account_number}</p>
                                        <p>${$('.provider_payout').data('ifsc')}: ${payoutDetail.payout_details.ifsc}</p>
                                    `);
                                } else {
                                    $('#payout_details').html(`
                                        <p>${$('.provider_payout').data('id')}: ${payoutDetail.payout_details}</p>
                                    `);
                                }
                                $('#no_payout_info').addClass('d-none');
                            } else {
                                $('#payout_type').text('');
                                $('#payout_details').html('');
                                $('#no_payout_info').removeClass('d-none');
                            }
                        } catch (e) {
                            $('#payout_type').text('');
                            $('#payout_details').html('');
                            $('#no_payout_info').removeClass('d-none');
                        }

                        $('#id').val(Id);
                        $('#provider_id').val(providerId);
                        $('#provider_amount').val(providerAmount);
                        $('.provider_requested_amount').text(currencySymbol + providerAmount);
                        $('#codFile').val('');
                        if (status == 1) {
                            $('#codUploadSection').hide();
                            $('#filePreview')
                                .html('<div class="alert alert-success mt-3" role="alert">Amount Paid Successfully</div>')
                                .show();
                        } else if (status == 0) {
                            $('#codUploadSection').show();
                            $('#filePreview').hide();
                        }

                        // Open the modal
                        $('#veiw_transaction').modal('show');
                    });

                    $('#loader-table').addClass('d-none');
                    $(".label-loader, .input-loader").hide();
                    $('#providerrequestlist, .real-label, .real-input').removeClass('d-none');

                    if ($('#providerrequestlist').length && !$.fn.DataTable.isDataTable('#providerrequestlist')) {
                        $('#providerrequestlist').DataTable({
                            ordering: true,
                            language: datatableLang
                        });
                    }

                } else {
                    toastr.error('Failed to load provider requests.');
                }
            },
            error: function(error) {
                toastr.error('An error occurred while fetching the data.');
            }
        });

    }


}
if (pageValue === 'admin.refund') {
    function truncateText(text, maxLength = 10) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    $(document).ready(function () {
        list_table();
        // Handle search input
        $('#searchLanguage').on('input', function () {
            list_table(1); // Reset to the first page on new search
        });


    });

    function list_table(page) {
        $.ajax({
            url: '/api/userpayoutrequestlist',
            type: 'POST',
            dataType: 'json',
            data: {
                order_by: 'desc',
                sort_by: 'id',
                page: page,
                search: $('#searchLanguage').val(),
                type:type
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function (response) {
                if (response.code == '200') {
                    listTable(response.data, response.meta);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (error) {
                if (error.status === 422) {
                    var errors = error.responseJSON.errors;
                    if (errors) {
                        $.each(errors, function (key, messages) {
                            toastr.error(messages[0]);
                        });
                    } else {
                        toastr.error('An error occurred while fetching list.');
                    }
                } else {
                    toastr.error('An error occurred while fetching list.');
                }
            }
        });
    }

    function listTable(response, meta) {
        let list = response.transactions;
        let tableBody = '';

        if (list.length > 0) {
            i=0;
            list.forEach(transaction => {
                i++;
                let statusClass = '';
                switch (transaction.status) {
                    case 'Unpaid':
                        statusClass = 'text-warning';
                        break;
                    case 'Paid':
                        statusClass = 'text-success';
                        break;
                    case 'Refund':
                        statusClass = 'text-danger';
                        break;
                    case 'In Progress':
                        statusClass = 'text-primary';
                        break;
                    case 'Completed':
                        statusClass = 'text-success';
                        break;
                    default:
                        statusClass = 'text-secondary';
                        break;
                }

                const providerdefaultImage = '/assets/img/profile-default.png';
                const userdefaultImage = '/assets/img/user-default.jpg';
                let customerImage = transaction.userimage && transaction.userimage !== ''
                    ? `${transaction.userimage}`
                    : userdefaultImage;
                let productdefault='/front/img/services/add-service-04.jpg';
                let productImagePath = transaction.source_Values && transaction.source_Values !== 'N/A'
                    ? `/storage/${transaction.source_Values}` : productdefault;
                let currency = response.currencySymbol;
                let paymentType = transaction.payment_type || '';
                let paymentStatus = transaction.status || '';

                 tableBody += `
                    <tr>
                        <td>${i}</td>
                        <td>${transaction.bookingdate}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${customerImage}" class="transactionimg me-3 rounded-circle"  style="width: 50px; height: 50px; object-fit: cover;">
                                <div>
                                    <span class="fw-bold d-block">${truncateText(transaction.username)}</span>
                                    <small class="text-muted">${truncateText(transaction.useremail)}</small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href="javascript:void(0);" class="table-imgname">
                               <img src="${productImagePath}" alt="Product Image" class="transactionimg me-2">
                               <span>${transaction.productname}</span>
                            </a>
                        </td>
                        <td>${currency}${transaction.service_amount}</td>
                        <td>${transaction.payment_type}</td>
                        <td <h6 class="badge-active ${statusClass}">${transaction.status}</td>
                        <td>
                            <div class="table-actions d-flex">
                                <a class="delete-table view-transaction" href="javascript:void(0);"
                                data-bookingid="${transaction.id}" data-currency="${currency}" data-amount="${transaction.service_amount}"> <i class="ti ti-receipt fs-20 m-2"></i></a>
                        </td>
                    </tr>
                `;

            });
            $('#userrequestlist tbody').html(tableBody);
        } else {
            if (!list || list.length === 0) {
                $('#userrequestlist').DataTable().destroy();
                $('#userrequestlist').DataTable({
                    paging: false,
                    language: {
                        emptyTable: $('#userrequestlist').data('empty')
                    },
                });
            }
        }

        $('#loader-table').addClass('d-none');
        $(".label-loader, .input-loader").hide();
        $('#userrequestlist, .real-label, .real-input').removeClass('d-none');

        if (!$.fn.dataTable.isDataTable('#userrequestlist')) {
            if (languageId === 2) {


                if ($('#userrequestlist').length && !$.fn.DataTable.isDataTable('#userrequestlist')) {
                    $('#userrequestlist').DataTable({
                        ordering: true,
                        paging: true,
                        pageLength: 10,
                        "language":
                        {
                            "sProcessing": "جارٍ التحميل...",
                            "sLengthMenu": "أظهر _MENU_ مدخلات",
                            "sZeroRecords": "لم يعثر على أية سجلات",
                            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                            "sInfoPostFix": "",
                            "sSearch": "ابحث:",
                            "sUrl": "",
                            "oPaginate": {
                                "sFirst": "الأول",
                                "sPrevious": "السابق",
                                "sNext": "التالي",
                                "sLast": "الأخير"
                            }
                        }
                    });
                }
            }else{
                $('#userrequestlist').DataTable({
                    "ordering": true,
                });
            }
        }
    }


    function setupPagination(meta) {
        let paginationHtml = '';
        for (let i = 1; i <= meta.last_page; i++) {
            paginationHtml += `<li class="page-item ${meta.current_page === i ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
        }

        // Handle click event for pagination
        $('#pagination').on('click', '.page-link', function (e) {
            e.preventDefault();
            const page = $(this).text();
        });
    }
    $(document).on('click', '.view-transaction', function() {
        let bookingid = $(this).data('bookingid');
        let amount = $(this).data('amount');
        let currency= $(this).data('currency');
        $('#booking_id').val(bookingid);
        if (amount && currency) {
            $('.refundamt').empty().append(currency+amount);
        }
        $('#veiw_transaction').modal('show');
    });
    $(document).on('change', '#codFile', function () {
        let fileInput = $(this);
        let file = fileInput[0].files[0]; // Get the selected file

        // Check if a file is selected
        if (file) {
            // Enable the submit button
            $('#uploadPaymentProof').prop('disabled', false);
        } else {
            // Disable the submit button if no file is selected
            $('#uploadPaymentProof').prop('disabled', true);
        }
    });
    $(document).on('click', '#uploadPaymentProof', function() {

        let bookingid = $('#booking_id').val();
        // Get the file (payment proof)
        let paymentProof = $('#codFile')[0].files[0]; // The file selected for proof
        let formData = new FormData();
        formData.append('bookingid', bookingid);
        formData.append('payment_proof', paymentProof);
        $.ajax({
            url: '/api/updaterefund',
            type: 'POST',
            data:formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.code==200) {
                    list_table();
                    toastr.success(response.message);
                    $('#veiw_transaction').modal('hide');
                } else {
                    toastr.error(response.message || 'Failed to Refund.');
                }
            },
            error: function(xhr, status, error) {
                toastr.error('An error occurred while submitting the proof: ' + error);
            }
        });
    });
}

if (pageValue === 'admin.appointment-settings') {

    loadAppointmentSettings();

    function loadAppointmentSettings() {
        $.ajax({
            url: '/api/admin/index-invoice-setting',
            type: 'POST',
            data: {'group_id': 33},
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            success: function(response) {
                if (response.code === 200) {
                    const requiredKeys = ['appointment_time_intervals', 'multiple_booking_same_time', 'min_booking_time', 'max_booking_time', 'cancel_time_before', 'reschedule_time_before'];
                    const filteredSettings = response.data.settings.filter(setting => requiredKeys.includes(setting.key));

                    filteredSettings.forEach(setting => {
                        const element = $('#' + setting.key);
                        if (element.is(':checkbox')) {
                            element.prop('checked', setting.value === '1');
                        } else {
                            element.val(setting.value);
                        }
                    });
                }
            },
            error: function(xhr) {
                if (xhr.responseJSON && xhr.responseJSON.code === 404) {
                    toastr.error(xhr.responseJSON.message);
                }
            }
        });
    }

    $('#appointmentForm').submit(function(event) {
        event.preventDefault();

        let formData = new FormData();

        formData.append('group_id', 33);
        formData.append('appointment_time_intervals', $('#appointment_time_intervals').is(':checked') ? 1 : 0);
        formData.append('multiple_booking_same_time', $('#multiple_booking_same_time').is(':checked') ? 1 : 0);
        formData.append('min_booking_time', $('#min_booking_time').is(':checked') ? 1 : 0);
        formData.append('max_booking_time', $('#max_booking_time').is(':checked') ? 1 : 0);
        formData.append('cancel_time_before', $('#cancel_time_before').is(':checked') ? 1 : 0);
        formData.append('reschedule_time_before', $('#reschedule_time_before').is(':checked') ? 1 : 0);

        $.ajax({
            url: "/api/admin/update-appointment-setting",
            method: "POST",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_token'),
                'Accept': 'application/json'
            },
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('.appointment_setting_btn').attr('disabled', true).html('<div class="spinner-border text-light" role="status"></div>');
            },
        }).done((response) => {
            $(".appointment_setting_btn").removeAttr('disabled').html($('.appointment_setting_btn').data('save'));
            if (response.code === 200) {
                toastr.success(response.message);
                loadAppointmentSettings();
            }
        }).fail((error) => {
            $('.appointment_setting_btn').removeAttr('disabled').html($('.appointment_setting_btn').data('save'));
            if (error.status == 422) {
                $.each(error.responseJSON.errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#" + key + "_error").text(val[0]);
                });
            } else {
                toastr.error(error.responseJSON.message, "bg-danger");
            }
        });
    });

}
