jQuery('.animation-testimonial-right-contents').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
 arrows: true,
  infinite: true,
  dots: true,
  speed: 500,
  fade: true,
  cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  draggable: true,
swipe: true,
touchMove: true,
autoplay: true,
autoplaySpeed: 10000,
// speed: 2000,
// cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
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
let circularProgress = jQuery(".slick-slide.slick-current.slick-active .circular-progress"),
progressValue = jQuery(".slick-slide.slick-current.slick-active .progress-value"),
progressEnd = jQuery(".slick-slide.slick-current.slick-active .progress-value").attr('counter');
circleAnimation(circularProgress, progressValue, progressEnd);
    	jQuery(".animation-testimonial-right-contents").on("afterChange", function (event, slick, currentSlide) {
		jQuery('.animation-testimonial-leftimages-rows[data-slick-index="'+currentSlide+'"]').addClass('active').siblings().removeClass('active');
		let circularProgressChange = jQuery(".slick-slide.slick-current.slick-active .circular-progress"),
progressValueChange = jQuery(".slick-slide.slick-current.slick-active .progress-value"),
progressEndchange = jQuery(".slick-slide.slick-current.slick-active .progress-value").attr('counter');
		circleAnimation(circularProgressChange, progressValueChange, progressEndchange);
});
function circleAnimation(circularProgress, progressValue, progressEnd){
	let progressStartValue = 0,    
    progressEndValue = progressEnd,    
    speed = 10;
	let progress = setInterval(() => {
    progressStartValue++;
	progressValue.html(`${progressStartValue}%`);
    circularProgress.attr('style',`background: conic-gradient(#0040DF ${progressStartValue * 3.6}deg, #ededed 0deg)`);
    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }    
}, speed);
}
