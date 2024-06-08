jQuery(document).ready(function () {
  jQuery("#owl-demo").owlCarousel({
    nav: true, // Show next and prev buttons
    dots: true,
    slideSpeed: 300,
    paginationSpeed: 400,
    navText: [
      "<div class='nav-btn prev-slide'></div>",
      "<div class='nav-btn next-slide'></div>",
    ],
    items: 1,
  });
  jQuery(".material-tabs-active a").click(function () {
    // Check for active
    var getattr = jQuery(this).attr('id-attr');
    jQuery(".material-tabs-active a").removeClass("active");
    jQuery(this).addClass("active");
    /**/
    jQuery(".material-tabs-has-sticky a").removeClass("active");
    jQuery("#"+getattr).addClass("active");

    return false;
  });

   jQuery(".material-tabs-has-sticky a").click(function () {
    // Check for active
    var getattr = jQuery(this).attr('id-attr');
    jQuery(".material-tabs-has-sticky a").removeClass("active");
    jQuery(this).addClass("active");
    /**/
    jQuery(".material-tabs-sticky a").removeClass("active");
    jQuery("#"+getattr).addClass("active");

    return false;
  });
  // jQuery(".wpcf7-form").submit(function () {
  //   jQuery(this).find(".wpcf7-submit").prop("disabled", true);
  //   var wpcf7Elm = document.querySelector(".wpcf7");
  //   wpcf7Elm.addEventListener(
  //     "wpcf7submit",
  //     function (event) {
  //       jQuery(".wpcf7-submit").prop("disabled", false);
  //     },
  //     false
  //   );
  //   wpcf7Elm.addEventListener(
  //     "wpcf7invalid",
  //     function () {
  //       jQuery(".wpcf7-submit").prop("disabled", false);
  //     },
  //     false
  //   );
  // });
  jQuery('.wpcf7-form input').keyup(function() {
  if (jQuery(this).val().length != 0) {
    jQuery('input:focus').next('.wpcf7-not-valid-tip').hide();
  } else {
    jQuery('input:focus').next('.wpcf7-not-valid-tip').show();
  }     
})
});
jQuery(function() {
    jQuery('input[type="checkbox"]').on('change', function() {

        jQuery('html, body').animate({
            scrollTop: jQuery("#pc-main-list").offset().top - 200
        }, 1000);

    });
});
