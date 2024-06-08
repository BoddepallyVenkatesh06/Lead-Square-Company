jQuery('.slick-slide-content').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: '.slick-slide-nav',
  infinite: false,
  dots: false,
  useTransform: true,
  speed: 400,
        		responsive: [{
 			breakpoint: 640,
 			settings: {
 				slidesToShow: 1,
 				slidesToScroll: 1,
			}
 		}, {
 			breakpoint: 420,
 			settings: {
 				slidesToShow: 1,
 				slidesToScroll: 1,
		}
 		}]
  
});
jQuery('.slick-slide-nav').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: '.slick-slide-content',
  dots: true,
  focusOnSelect: true,
  infinite: false,
  dots: false,
variableWidth: true,
responsive: [{
 			breakpoint: 1199,
 			settings: {
 				slidesToShow: 3,
 				slidesToScroll: 1,
 			}
 		},{
 			breakpoint: 1024,
 			settings: {
 				slidesToShow: 3,
 				slidesToScroll: 1,
 			}
 		}, {
 			breakpoint: 640,
 			settings: {
 				slidesToShow: 3,
 				slidesToScroll: 1,
			}
 		}, {
 			breakpoint: 420,
 			settings: {
 				slidesToShow: 2,
 				slidesToScroll: 1,
		}
 		}]
});
jQuery(".prev-btn").click(function () {
		jQuery('.slick-slide-nav .slick-slide.slick-current.slick-active').prev().click();
         jQuery(".next-btn").removeClass("slick-disabled");
	});

	jQuery(".next-btn").click(function () {
		jQuery('.slick-slide-nav .slick-slide.slick-current.slick-active').next().click();
        jQuery(".prev-btn").removeClass("slick-disabled");
	});
    var SlideLegth = jQuery('.slick-slide-nav .slick-slide-nav-row').length;
	jQuery(".slick-slide-nav").on("afterChange", function (event, slick, currentSlide) {
		if(currentSlide == 0){
            jQuery(".prev-btn").addClass("slick-disabled");
        }
        if(currentSlide == (SlideLegth-1)){
            jQuery(".next-btn").addClass("slick-disabled");
        }
	});
    	jQuery(".slick-slide-content").on("afterChange", function (event, slick, currentSlide) {
            console.log('currentSlide',currentSlide);
		if(currentSlide == 0){
            jQuery(".prev-btn").addClass("slick-disabled");
        }else{
            jQuery(".prev-btn").removeClass("slick-disabled");
        }
        if(currentSlide == (SlideLegth-1)){
            jQuery(".next-btn").addClass("slick-disabled");
        }else{
            jQuery(".next-btn").removeClass("slick-disabled");
        }
        jQuery('.slick-slide-nav').slick('slickGoTo', currentSlide);
	});
    