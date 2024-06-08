jQuery(document).ready(function( $ ) {
    jQuery('.logo-row').each(function(index){
    var ids = jQuery(this).attr('id');
    var desktopNo = jQuery(this).attr('desktopNo');
    var mobNo = jQuery(this).attr('mobNo');
    var loop = jQuery(this).attr('logoloop') == 1 ? true : false;
    var autoplay = jQuery(this).attr('logoautoplay') == 1 ? true : false;
    var touchdrag = jQuery(this).attr('loopdrag') == 1 ? true : false;
     var owl = jQuery('#'+ids).owlCarousel({
        loop:loop,
        items:6,
        margin:0,
        pagination: false,
        navigation: true,
        autoplay:autoplay,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        slideSpeed : 100,
        touchDrag  : touchdrag,
        mouseDrag  : touchdrag,
        responsive:{
            0:{
                items: mobNo,
                touchDrag  : true,
                mouseDrag  : true,
            },
            600:{
                items:3,
                touchDrag  : true,
                mouseDrag  : true,
            },
            1000:{
                items: desktopNo
            }
        }
    })
});
});