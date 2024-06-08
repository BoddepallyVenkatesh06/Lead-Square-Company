jQuery(document).ready(function( $ ) {
    jQuery('.news-section-main').each(function(index){
    var ids = jQuery(this).attr('id');
    var desktopNo = jQuery(this).attr('desktopNo');
    var mobNo = jQuery(this).attr('mobNo');
     var owl = jQuery('#'+ids).owlCarousel({
        loop:true,
        margin:0,
        pagination: false,
        navigation: true,
        autoplay:false,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        slideSpeed : 100,
        responsive:{
            0:{
                items: mobNo
            },
            600:{
                items:2
            },
            1000:{
                items: desktopNo
            }
        }
    })
  jQuery('.customNavigation.customNavigation-award.news .awardnext').click(function() {
    owl.trigger('next.owl.carousel');
  });
  jQuery('.customNavigation.customNavigation-award.news .awardprev').click(function() {
    owl.trigger('prev.owl.carousel');
  });
});
});