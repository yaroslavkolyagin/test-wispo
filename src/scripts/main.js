$('.carousel-list').slick({
	slidesToShow: 4,
	prevArrow: $('.carousel__nav-btn--prev'),
	nextArrow: $('.carousel__nav-btn--next'),
	responsive: [
	  {
		breakpoint: 1400,
		settings: {
		  slidesToShow: 3,
		}
	  },
	  {
		breakpoint: 767,
		settings: {
		  slidesToShow: 2,
		}
	  },
	  {
		breakpoint: 480,
		settings: {
		  slidesToShow: 1,
		}
	  }
	]
  });
