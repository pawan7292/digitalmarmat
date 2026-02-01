<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">

	<meta name="description" content="Truelysell Admin">

	<meta name="keywords" content="admin">

	<meta name="author" content="Dreams technologies - Truelysell">

	<meta name="robots" content="noindex, nofollow">


	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>{{ $companyName }} {{ __('Admin') }}</title>

	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="{{ $dynamicFavicon }}">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">

	<!-- Feather CSS -->
	<link rel="stylesheet" href="{{ asset('assets/plugins/icons/feather/feather.css') }}">

	<!-- Tabler Icon CSS -->
	<link rel="stylesheet" href="{{ asset('assets/plugins/tabler-icons/tabler-icons.css') }}">

	<!-- Fontawesome CSS -->
	<link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome/css/fontawesome.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome/css/all.min.css') }}">

	<!-- Select2 CSS -->
	<link rel="stylesheet" href="{{ asset('assets/plugins/select2/css/select2.min.css') }}">

	<!-- Toastr CSS -->
	<link href="{{ asset('assets/plugins/toastr/toatr.css') }}" rel="stylesheet">

	<!-- Main CSS -->
	<link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">

</head>

<body class="account-page" data-page="{{ Route::currentRouteName() }}">



	<div class="main-wrapper">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-5 mx-auto">
					<form name="adminLoginForm" id="adminLoginForm" action="javascript:void(0);">
						<div class="d-flex flex-column justify-content-between">
							<div class="mx-auto p-4 text-center">
								<img src="{{ $dynamicLogo }}"
									class="img-fluid" alt="Logo" style="height: 36px">
							</div>
							<div class="card">
								<div class="card-body p-4">
									<div class=" mb-4">
										<h2 class="mb-2">{{ __('Welcome') }}</h2>
										<p class="mb-0">{{ __('Please enter your details to sign in') }}</p>
									</div>
									<div class="mb-3 ">
										<label class="form-label">{{ __('Email Address') }}</label>
										<div class="input-icon mb-3 position-relative">
											<span class="input-icon-addon">
												<i class="ti ti-mail"></i>
											</span>
											<input type="text" name="email" id="email" class="form-control">
										</div>
										<label class="form-label">{{ __('Password') }}</label>
										<div class="pass-group">
											<input type="password" name="password" id="password" class="pass-input form-control">
											<span class="ti toggle-password ti-eye-off"></span>
										</div>
									</div>
									<div class="mb-3 mt-3">
										<button type="submit" class="btn btn-primary w-100" id="signInBtn">{{ __('Signin') }}</button>
									</div>
									<div id="error-message" class="text-danger"></div>
								</div>
							</div>
							<div class="p-4 text-center">
								<p class="mb-0 ">{!! $copyRight !!}</p>
							</div>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
	<!-- jQuery -->
	<script src="{{ asset('assets/js/jquery-3.7.1.min.js') }}"></script>

	<!-- jQuery validation -->
	<script src="{{ asset('assets/js/jquery-validation.min.js') }}"></script>
	<script src="{{ asset('assets/js/jquery-validation-additional-methods.min.js') }}"></script>

	<!-- Bootstrap Core JS -->
	<script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>

	<!-- Feather Icon JS -->
	<script src="{{ asset('assets/js/feather.min.js') }}"></script>

	<!-- Slimscroll JS -->
	<script src="{{ asset('assets/js/jquery.slimscroll.min.js') }}"></script>

	<!-- Select2 JS -->
	<script src="{{ asset('assets/plugins/select2/js/select2.min.js') }}"></script>

	<!-- Custom JS -->
	<script src="{{ asset('assets/js/script.js') }}"></script>

	<!-- Toastr JS -->
	<script src="{{ asset('assets/plugins/toastr/toastr.min.js') }}"></script>

	<!-- Custom JS -->
	<script src="{{ asset('assets/js/adminscript.js') }}"></script>


</body>

</html>