jQuery(document).ready(function(){
	jQuery('.mySwipers').each(function(index){
	var ids = jQuery(this).attr('id');
	var delays = jQuery(this).attr('delay');
    var swiper = new Swiper("#"+ids, {
 	speed: 700,
	autoplay: {
	  delay: delays,
	  disableOnInteraction: false,
	},
	allowTouchMove: false,
	direction: 'vertical',
      });
    });
})