jQuery(document).ready(function( $ ) {
    jQuery('.award-row').each(function(index){
    var ids = jQuery(this).attr('id');
    var desktopNo = jQuery(this).attr('desktopNo');
    var mobNo = jQuery(this).attr('mobNo');
     var owl = jQuery('#'+ids).owlCarousel({
        loop:true,
        margin:0,
        pagination: false,
        navigation: true,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        slideSpeed : 100,
        responsive:{
            0:{
                items: mobNo
            },
            600:{
                items:3
            },
            1000:{
                items: desktopNo
            }
        }
    })
  jQuery('.awardnext').click(function() {
    owl.trigger('next.owl.carousel');
  });
  jQuery('.awardprev').click(function() {
    owl.trigger('prev.owl.carousel');
  });
});
});