jQuery(document).ready(function() {
	jQuery('.my-slider').cardslider({
		dots: false,
		loop:true,
		nav: true,
		afterCardChange: getSlideBg
	});
});

function getSlideBg(index){
	var circleImg = jQuery('.card-active').attr('src');
	jQuery('.my-slider').parent().css({
   'background-image' : 'url(' + circleImg + ')',
   'background-position' : 'center center',
   'background-repeat' : 'no-repeat',
   'background-size' : 'contain',
   '-webkit-transition' : 'background-image 1s ease-in-out',
   'transition' : 'background-image 1s ease-in-out'
});
}
