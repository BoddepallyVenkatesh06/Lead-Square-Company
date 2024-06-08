(function ( $ ) {
    "use strict";
jQuery('#menu-toggle-icon').on('click', function(e) {
    jQuery(this).toggleClass("menu-show");
    jQuery('.c360-nav__overlay').toggleClass("c360-nav__overlay--active");
    jQuery('.ruby-menu-demo-header').toggleClass("lsq-menu-expended");
    jQuery('.nav-item--l0').removeClass('active-l1');
     jQuery('.nav-item--l1').removeClass('active-l2');
     jQuery('.nav-item--l2').removeClass('active-l3');
     jQuery('.lsq-level2-menu-info').removeClass('mobile-menu-expended');
     jQuery('.lsq-level2-menu-right').removeClass('l2-menu-expended');
     jQuery('.lsq-level2-menus > li').removeClass('mob-l2-active-l2');
     jQuery('#header').toggleClass('toggle-main-menu');
    e.preventDefault();
});
jQuery( document ).on( 'click', '.lsq-mob-expand-submenu' , function ( e ) {
      lsqmobmenuOpenSubmenus( jQuery(this) );
      e.preventDefault();
      e.stopPropagation();
});
jQuery( document ).on( 'click', '.panel-back' , function ( e ) {
    var getbackpanel = jQuery(this).attr('backpanel');
      lsqmobmenuPanelback( getbackpanel );
      e.preventDefault();
      e.stopPropagation();
});
jQuery( document ).on( 'click', '.nav-item--l0 span.menu-item-a.lsq-main-menu-item-a' , function ( e ) {
      lsqMainMenu( jQuery(this) );
      AllClassess();
      e.preventDefault();
      e.stopPropagation();
});
jQuery( document ).on( 'mouseenter', '.depth-1 li.menu-item' , function ( e ) {
    if (window.innerWidth > 1180) {
         e.preventDefault();
        lsqMainSubMenu(jQuery(this));
    }
    
});
jQuery( document ).on( 'mouseenter', '.header-meta-language' , function ( e ) {
    e.preventDefault();
     jQuery('.lang_sel_list_vertical').addClass('show-language');
});
jQuery( document ).on( 'mouseleave', '.show-language' , function ( e ) {
    e.preventDefault();
     jQuery('.lang_sel_list_vertical').removeClass('show-language');
});
jQuery("#main, .desktop-close").on("click", function (e) {
    removeActiveMenuOnMain();
});
jQuery(window).on("resize", resizeLinks);
  resizeLinks();
}( jQuery ));
function lsqmobmenuOpenSubmenus( menu ) {
   var topMenu = jQuery(menu).parent().parent().parent();
   var getDepth = menu.attr('depth');
   var incClass = parseInt(getDepth)+1;
   topMenu.toggleClass('active-l'+incClass);
      if(incClass == 2){
    jQuery('.active-l'+incClass+' .columns-menu-column .two-column-style-bg').first().addClass('active-l3');
   }
   jQuery('.lsq-main-menu-v2.ruby-menu-demo-header').css({
            left: -(jQuery('.container.av-logo-container').offset().left) +
            "px"
        });
}
function lsqmobmenuPanelback(panelback){
    var incbackpanel = parseInt(panelback)+1;
    jQuery('.lsq-main-menu-v2 li').each(function(index, value) {
         jQuery(this).removeClass('active-l'+incbackpanel);
    });
    
}
function resizeLinks(){
      if (window.innerWidth <= 1180) {
        console.log('resizeLinks');
        jQuery('.lsq-main-menu-v2.ruby-menu-demo-header').css({
            width: jQuery('#header_main').outerWidth(),
            left: -(jQuery('.container.av-logo-container').offset().left) +
            "px"
        });
    }else{
        jQuery('.lsq-main-menu-v2.ruby-menu-demo-header').removeAttr('style');
    }
}
function removeActiveMenuOnMain(){
    jQuery('.nav-item--l0').removeClass('active-l1');
     jQuery('.nav-item--l1').removeClass('active-l2');
      jQuery('.nav-item--l2').removeClass('active-l3');
       jQuery('.c360-nav__overlay').removeClass("c360-nav__overlay--active");
       jQuery('#header').removeClass('toggle-main-menu');
}
function lsqMainMenu( menu ) {
     jQuery('#header').addClass('toggle-main-menu');
   jQuery(menu).closest("li").toggleClass('active-l1').siblings().closest("li").removeClass('active-l1');
   if(jQuery(menu).closest("li").hasClass('active-l1')){
   jQuery('.c360-nav__overlay').addClass("c360-nav__overlay--active");
   }else{
       jQuery('.c360-nav__overlay').removeClass("c360-nav__overlay--active"); 
   }
}
function lsqMainSubMenu( submenu ) {
    jQuery(submenu).addClass('active-l2').siblings().removeClass('active-l2');
}
function AllClassess(){
     jQuery('.lsq-main-menu-v2 li').each(function(index, value) {
         jQuery(this).removeClass('active-l2');
         jQuery(this).removeClass('active-l3');
    });
}