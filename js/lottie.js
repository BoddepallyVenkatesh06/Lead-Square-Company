jQuery.fn.isInViewport = function() {

	var elementTop = jQuery(this).offset().top;

	var elementBottom = elementTop + jQuery(this).outerHeight() / 2;

	var viewportTop = jQuery(window).scrollTop()+100;

	var viewportHalf = viewportTop + jQuery(window).height() / 2;

	return elementBottom > viewportTop && elementTop < viewportHalf;

};
var Playarr = [];
 jQuery(window).scroll(function(){
      $val = jQuery(window).scrollTop();
      if($val > 740){
            jQuery('#tab-slider-sticky, #my-tab-sticky').addClass('active');
      }else{
        jQuery('#tab-slider-sticky, #my-tab-sticky').removeClass('active');  
      }
})
jQuery(window).on('scroll', function() {
jQuery('.lottie-player-html-mm').removeClass("is-active");
	jQuery('#functions section').each(function(i,e) {
    var hasClassAcive = jQuery('.lottie-player-html-mm').hasClass('is-active');
		if (jQuery(this).isInViewport()) {
			jQuery(this).addClass("is-active");
      var activeId = jQuery(this).attr('id');
      var activeSrc = jQuery(this).attr('lottieurl');
      let player = document.querySelector("#lsq-"+activeId+" lottie-player");
      jQuery('#lsq-'+activeId).addClass("is-active");
      if(!Playarr.includes(activeId)){
        player.play();
      Playarr.push(activeId);
      }
       if(Playarr.length>1){
         document.querySelector('#lsq-'+Playarr[Playarr.length-2]+' lottie-player').stop();  
         Playarr.splice(Playarr.length-2,1);
      }  
		} else {
      let player = document.querySelector("lottie-player");
			jQuery(this).removeClass("is-active");
		}
	});
  if(jQuery(window).scrollTop() <= 200){
      Playarr = [];
    }
});