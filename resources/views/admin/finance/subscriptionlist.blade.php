@extends('admin.admin')
@section('content')

<div class="page-wrapper">
	<div class="content bg-white">
		<div class="d-md-flex d-block align-items-center justify-content-between pb-3">
			<div class="my-auto mb-2">
			<h3 class="page-title mb-1">{{ __('subscription_list')}}</h3>
				<nav>
					<ol class="breadcrumb mb-0">
						<li class="breadcrumb-item">
							<a href="{{route('admin.dashboard')}}">{{ __('Dashboard')}}</a>
						</li>
						<li class="breadcrumb-item">
							<a href="javascript:void(0);">{{ __('finance')}}</a>
						</li>
						<li class="breadcrumb-item active" aria-current="page">{{ __('subscription_list')}}</li>
					</ol>
				</nav>
			</div>
		</div>
		<div class="card">
			<div class="card-body p-0">
				<div class="col-xxl-12">
					<form>
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
								<table class="table d-none" id="ListTable">
									<thead class="thead-light">
										<tr>
											<th>{{ __('Plan Name')}}</th>
											<th>{{ __('Price')}}</th>
											<th>{{ __('Subscription_Type')}}</th>
											<th>{{ __('Description')}}</th>
											<th>{{ __('Provider')}}</th>
											<th>{{ __('Status')}}</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</form>
				</div>
			</div>
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
					<h4>Confirm Deletion</h4>
					<p>You want to delete this template, this cant be undone once you delete.</p>
					<div class="d-flex justify-content-center">
						<a href="javascript:void(0);" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
						<button type="submit" class="btn btn-danger" id="confirmDelete">Yes, Delete</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
@endsection
