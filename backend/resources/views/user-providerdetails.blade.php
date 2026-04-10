@extends('front')

@section('content')

	<div class="breadcrumb-bar text-center">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-12">
					<h2 class="breadcrumb-title mb-2">{{__('Provider Detail')}}</h2>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb justify-content-center mb-0">
							<li class="breadcrumb-item"><a href="{{ route('user.dashboard') }}"><i class="ti ti-home-2"></i></a></li>
							<li class="breadcrumb-item active" aria-current="page">{{__('Provider Detail')}}</li>
						</ol>
					</nav>
				</div>
			</div>
			<div class="breadcrumb-bg">
				<img src="/assets/img/bg/breadcrumb-bg-01.png" class="breadcrumb-bg-1" alt="Img">
				<img src="/assets/img/bg/breadcrumb-bg-02.png" class="breadcrumb-bg-2" alt="Img">
			</div>
		</div>
	</div>

	<div class="page-wrapper">
		<div class="content content-two">
            <div id="pageLoader1" class="loader_front">
                <div>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">..</span>
                    </div>
                </div>
            </div>
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<div class="row gy-3">
									<div class="col-xl-5">
										<div class="provider-detail d-flex align-items-center flex-wrap row-gap-2">
											<span class="avatar provider-pic flex-shrink-0 me-3">
												<img src="/assets/img/profile-default.png" alt="Img">
											</span>
											<div>
												<div class="rating provider_rate mb-2">
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fa-solid fa-star-half-stroke filled"></i> 4.9<span class="d-inline-block">(255 reviews)</span>
												</div>
												<h5 class="d-flex align-items-center mb-1"><a href="provider-details.html"></a><span class="text-success ms-2"><i class="fa fa-check-circle fs-14"></i></span></h5>
												<div class="d-flex align-items-center flex-wrap row-gap-2">
                                                    <p class="mb-0 fs-14 me-2"><i class="feather feather-grid me-1"></i><span class="category_name"></span></p>
                                                    <p class="mb-0 fs-14"><i class="ti ti-calendar me-1"></i><span class="date_format"></span></p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-7">
										<div class="row">
											<div class="col-md-4">
												<div class="provider-bio-info mb-3">
													<h6><i></i>{{__('Email')}}</h6>
													<p></p>
												</div>
												<div class="provider-bio-info">
													<h6><i></i>{{__('Phone Number')}}</h6>
													<p></p>
												</div>
											</div>
											<div class="col-md-4">
												<div class="provider-bio-info mb-3">
													<h6><i></i>{{__('Language Known')}}</h6>
													<p> <a href="#" class="text-primary">{{__('+4 More')}}</a></p>
												</div>
												<div class="provider-bio-info">
													<h6><i></i>{{__('Address')}}</h6>
													<p></p>
												</div>
											</div>
											<div class="col-md-4">
												<div>
													<a href="/services?provider=64" class="btn btn-primary w-100 mb-3 provider_id"><i class="feather-calendar me-2"></i>Book Service</a>
													<h6 class="fw-medium mb-2 d-none">Social Profiles</h6>
													<ul class="social-icon flex-wrap row-gap-2 mb-3 d-none">
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/fb.svg" class="img" alt="icon"></a>
														</li>
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/instagram.svg" class="img" alt="icon"></a>
														</li>
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/twitter.svg" class="img" alt="icon"></a>
														</li>
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/whatsapp.svg" class="img" alt="icon"></a>
														</li>
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/youtube.svg" class="img" alt="icon"></a>
														</li>
														<li>
															<a href="javascript:void(0);"><img src="/front/img/icons/linkedin.svg" class="img" alt="icon"></a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-8">
						<div class="card">
							<div class="card-body">
								<div class="accordion" id="accordionPanelsStayOpenExample">
									<div class="accordion-item mb-3 d-none">
										<div class="accordion-header" id="accordion-headingOne">
											<div class="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-collapseOne" aria-expanded="true" aria-controls="accordion-collapseOne" role="button">
												{{__('Overview')}}
											</div>
										</div>
										<div id="accordion-collapseOne" class="accordion-collapse collapse show" aria-labelledby="accordion-headingOne">
										<div class="accordion-body p-0 mt-3 pb-1">
											<div class="more-text">
												<p class="mb-4">We bring over 20 years of expertise to your doorstep, offering a full range of electrical
													services tailored to meet the needs of homeowners, businesses, and industrial clients. Our
													commitment to safety, reliability, and customer satisfaction has
													made us a trusted name in the industry. Whether you're in need of
													a simple repair or a complex installation, our team of certified electricians is here to help.
												</p>
												<p>we bring over 20 years of expertise to your doorstep, offering a full range of electrical services tailored to meet the needs of homeowners, businesses, and industrial clients. </p>
											</div>
											<a href="javascript:void(0);" class="text-primary d-inline-block more-btn mb-2">Read More</a>
										</div>
										</div>
									</div>
									<div class="accordion-item mb-3 d-none">
										<div class="accordion-header" id="accordion-headingTwo">
											<div class="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-collapseTwo" aria-expanded="true" aria-controls="accordion-collapseTwo" role="button">
												Area Of Expertise
											</div>
										</div>
										<div id="accordion-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="accordion-headingTwo">
										<div class="accordion-body p-0 mt-3 pb-1">
											<P>From small residential repairs to large-scale commercial and industrial projects,
												is your go-to provider for all electrical needs. Contact us today to schedule a
												consultation or to learn more about how we can assist with your next project.
											</P>
											<div>
												<div class="row g-3">
													<div class="col-xl-12">
														<div class="area-expert-slider owl-carousel mb-3">
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-01.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Construction</p>
															</div>
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-02.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Car Wash</p>
															</div>
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-03.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Electrical</p>
															</div>
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-04.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Cleaning</p>
															</div>
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-05.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Carpentry</p>
															</div>
															<div class="text-center area-expert">
																<span class="d-block mb-2"><img src="/front/img/icons/consultation-icon-06.svg" class="w-auto m-auto" alt="Img"></span>
																<p class="fw-medium fs-14">Plumbing</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										</div>
									</div>

									<div class="accordion-item mb-3">
										<div class="accordion-header" id="accordion-headingFour">
											<div class="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-collapseFour" aria-expanded="true" aria-controls="accordion-collapseFour" role="button">
												{{__('Our Services')}}
											</div>
										</div>
										<div id="accordion-collapseFour" class="accordion-collapse collapse show" aria-labelledby="accordion-headingFour">
										<div class="accordion-body p-0 mt-3 pb-1">
											<div class="row">
												<div class="col-md-12">
													<div class="our-services-slider custom-owl-dot owl-carousel product_details">


													</div>
												</div>
											</div>
										</div>
										</div>
									</div>
									<div class="accordion-item mb-3 d-none">
										<div class="accordion-header" id="accordion-headingSix">
											<div class="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-collapseSix" aria-expanded="true" aria-controls="accordion-collapseSix" role="button">
												{{__('Our Branches')}}
											</div>
										</div>
										<div id="accordion-collapseSix" class="accordion-collapse collapse show" aria-labelledby="accordion-headingSix">
										<div class="accordion-body p-0 mt-3 pb-1">
											<div class="our-branches-slider owl-carousel custom-owl-dot">


											</div>
										</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xl-4 theiaStickySidebar">
						<div class="card shadow-none">
							<div class="card-body lh-1">
								<h4 class="mb-3">{{__('Location')}}</h4>
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="contact-map w-100"></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

@endsection
