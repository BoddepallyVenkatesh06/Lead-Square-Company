jQuery(document).ready(function() {
   jQuery('.custom-lan').hover(
      function () {
         jQuery('.topbar-header .triangle').attr('style', "display:block !important");
         jQuery('#trp-floater-ls-language-list').attr('style', "display:block !important");
      }, 
      function () {
         jQuery('.topbar-header .triangle').attr('style', "display:none !important");
         jQuery('#trp-floater-ls-language-list').attr('style', "display:none !important");
      
      }
   );
/*Ebook*/

jQuery('#webinar-nav-main-ebook li').click(function(){
   console.log('webinar-nav-main');
   var datatype = jQuery(this).attr('data-type');
   var datasub = jQuery(this).attr('data-sub');
   var manxnum = jQuery(this).attr('maxnum');
   var remainder = Math.ceil(manxnum / 8);
   var filterUrl = jQuery(this).attr('filterUrl');
   window.history.pushState("Details", "Title", filterUrl);
   parseInt(jQuery('.loadMoreEbook').attr('max',remainder));
   jQuery('.info-panel.hide').hide(); 
   jQuery('#tab-'+datatype).show();    
   jQuery(this).addClass('active').siblings().removeClass('active');
   //Remove sub tab class
   jQuery('.webinar-sub-nav-item').removeClass('active');
   jQuery('li.webinar-sub-nav-item.pl0').addClass('active');
   //set taxonomy params
   jQuery('.loadMoreEbook').attr('filter-taxonomy',datatype);
   jQuery('.loadMoreEbook').attr('filter-taxonomy-name',datasub);
      //Call ajax function
      var params = {
         page: 1,
         max: remainder,
         taxParam: datatype,
         taxNameParam: datasub,
     };
     jQuery('.inner-rec-ebook-b').remove();
     jQuery('.loadMoreEbook').show();
     loadMoreEbook(params);
      //End
});
jQuery('#ebook-nav-sub-industry li, #ebook-nav-sub-category li').click(function(){
   jQuery(this).addClass('active').siblings().removeClass('active');
   var taxonomyType = jQuery(this).attr('data-main');
   var taxonomyName = jQuery(this).attr('data-sub');
   var manxnum = jQuery(this).attr('maxnum');
   var remainder = Math.ceil(manxnum / 8); //3
   var currentUrl = jQuery(this).attr('currentUrl');
   window.history.pushState("Details", "Title", currentUrl);
   parseInt(jQuery('.loadMoreEbook').attr('max',remainder));
   //set taxonomy params
   jQuery('.loadMoreEbook').attr('filter-taxonomy',taxonomyType);
   jQuery('.loadMoreEbook').attr('filter-taxonomy-name',taxonomyName);
   //Call ajax function
   var params = {
      page: 1,
      max: remainder,
      taxParam: taxonomyType,
      taxNameParam: taxonomyName,
  };
//   parseInt(jQuery('.loadMoreEbook').attr('data-page', 1));
//   jQuery('.inner-rec-ebook-b').remove();
//   jQuery('.loadMoreEbook').show();
  loadMoreEbook(params);
   //End
});
/*Load more*/
jQuery('#loadMoreEbook').click(function(){
   var filterTaxonomy = jQuery(this).attr('filter-taxonomy');
   var filterTaxonomyName = jQuery(this).attr('filter-taxonomy-name');
   var dataPage = parseInt(jQuery(this).attr('data-page'));
   var max = jQuery(this).attr('max');
   var wstext = jQuery('#wstext').val();
   var newPage = parseInt(dataPage + 1);
   parseInt(jQuery(this).attr('data-page',newPage));
   var params = {
      page: newPage,
      taxParam: filterTaxonomy,
      taxNameParam: filterTaxonomyName,
      max: max
  };
  loadMoreEbook(params);
});

/*Move Left to Right*/
jQuery(".arrow-left").click(function() {
      var sectionId = jQuery(this).attr('section-id');
       var navwidth = jQuery("#"+sectionId);
       navwidth.scrollLeft(navwidth.scrollLeft() - 200);
   }
);
jQuery(".arrow-right").click(function() {
      var sectionId = jQuery(this).attr('section-id');
       var navwidth = jQuery("#"+sectionId);
       navwidth.scrollLeft(navwidth.scrollLeft() + 200);
   }
); 
/*Recorded webinars*/
/*Webinar filter*/
jQuery('#webinar-nav-main li').click(function(){
   var datatype = jQuery(this).attr('data-type');
   var datasub = jQuery(this).attr('data-sub');
   var manxnum = jQuery(this).attr('maxnum');
   var remainder = Math.ceil(manxnum / 3); //3
   var filterUrl = jQuery(this).attr('filterUrl');
   window.history.pushState("Details", "Title", filterUrl);
   parseInt(jQuery('#loadMoreWebinar').attr('max',remainder));
   jQuery('.info-panel.hide').hide(); 
   jQuery('#tab-'+datatype).show();    
   jQuery(this).addClass('active').siblings().removeClass('active');
   //Remove sub tab class
   jQuery('.webinar-sub-nav-item').removeClass('active');
   jQuery('li.webinar-sub-nav-item.pl0').addClass('active');
   //set taxonomy params
   jQuery('.loadMoreWebinar').attr('filter-taxonomy',datatype);
   jQuery('.loadMoreWebinar').attr('filter-taxonomy-name',datasub);
   //Set params in search
   jQuery('#taxonomy').val(datatype);
   jQuery('#taxonomyname').val(datasub);
   var wstext = jQuery('#wstext').val();
      //Call ajax function
      var params = {
         page: 1,
         maxpage: remainder,
         wsText: wstext,
         taxParam: datatype,
         taxNameParam: datasub,
     };
     parseInt(jQuery('#loadMoreWebinar').attr('data-page', 1));
     jQuery('.inner-rec-webinar-b').remove();
     jQuery('#loadMoreWebinar').show();
      webinarAjaxFilter(params);
      //End
});
/*sub nav*/
jQuery('.webinar-nav-sub-industry li, .webinar-nav-sub-category li').click(function(){
   jQuery(this).addClass('active').siblings().removeClass('active');
   var taxonomyType = jQuery(this).attr('data-main');
   var taxonomyName = jQuery(this).attr('data-sub');
   var manxnum = jQuery(this).attr('maxnum');
   var wstext = jQuery('#wstext').val();
   var remainder = Math.ceil(manxnum / 3); //3
    var filterUrl = jQuery(this).attr('currenturl');
   window.history.pushState("Details", "Title", filterUrl);
   parseInt(jQuery('#loadMoreWebinar').attr('max',remainder));
   //set taxonomy params
   jQuery('.loadMoreWebinar').attr('filter-taxonomy',taxonomyType);
   jQuery('.loadMoreWebinar').attr('filter-taxonomy-name',taxonomyName);

   //Set params in search
   jQuery('#taxonomy').val(taxonomyType);
   jQuery('#taxonomyname').val(taxonomyName);
   //Call ajax function
   var params = {
      page: 1,
      maxpage: remainder,
      wsText: wstext,
      taxParam: taxonomyType,
      taxNameParam: taxonomyName,
  };
  parseInt(jQuery('#loadMoreWebinar').attr('data-page', 1));
  jQuery('.inner-rec-webinar-b').remove();
  jQuery('#loadMoreWebinar').show();
   webinarAjaxFilter(params);
   //End
});
/*Webinar load more button*/
   jQuery('#loadMoreWebinar').click(function(){
      var filterTaxonomy = jQuery(this).attr('filter-taxonomy');
      var filterTaxonomyName = jQuery(this).attr('filter-taxonomy-name');
      var dataPage = jQuery(this).attr('data-page');
      var max = jQuery(this).attr('max');
      var wstext = jQuery('#wstext').val();
      var params = {
         page: dataPage,
         taxParam: filterTaxonomy,
         taxNameParam: filterTaxonomyName,
         max: max,
         wsText: wstext,
         type: 'all'
     };
      webinarAjaxFilter(params);
   });
   jQuery("#webinarFilterForm").submit(function(e) {
      e.preventDefault();
      var taxonomy = jQuery('#taxonomy').val();
      var taxonomyname = jQuery('#taxonomyname').val();
      var wstext = jQuery('#wstext').val();
      var maxnum = jQuery('#maxnum').val();
      var params = {
         page: 1,
         wsText: wstext,
         taxParam: taxonomy,
         taxNameParam: taxonomyname,
         max: maxnum
     };
     if(wstext == ''){
      jQuery('li.webinar-nav-item.active').click();
     }else{
      webinarAjaxFilter(params);
     }
      return false;
   });
   jQuery(".mega-menu-toggle").on("click", function(e) {
    if ( jQuery(e.target).is(".mega-menu-toggle, .mega-menu-toggle-custom-block *, .mega-menu-toggle-block, .mega-menu-toggle-animated-block, .mega-menu-toggle-animated-block *, .mega-toggle-blocks-left, .mega-toggle-blocks-center, .mega-toggle-blocks-right, .mega-toggle-label, .mega-toggle-label span") ) {
        e.preventDefault();
        
        if (jQuery(this).hasClass("mega-menu-open")) {
            jQuery('#drift-frame-chat, #drift-frame-controller').removeClass('hidden');
        } else {
            jQuery('#drift-frame-chat, #drift-frame-controller').addClass('hidden');
        }
    }
});
   jQuery('.mega-toggle-animated').click(function (e) {
    e.preventDefault();
    var fdmActive = jQuery('.mega-menu-toggle').hasClass('mega-menu-open');
    if(fdmActive == true){
      jQuery('#drift-frame-chat, #drift-frame-controller').addClass('hidden');
    }else{
        jQuery('#drift-frame-chat, #drift-frame-controller').removeClass('hidden');
    }
  });
/* ========================================== 
scrollTop() >= 300
Should be equal the the height of the header
========================================== */

        jQuery(window).scroll(function(e){
        var $sticky = jQuery('.glossary-bg .av-tab-section-tab-title-container.avia-tab-title-padding-none');
        var position = ($sticky.css('position') == 'fixed');
        if (jQuery(this).scrollTop() > 235 && !position){
          $sticky.css({'position': 'fixed', 'top': '90px', 'right': '0%','z-index': '9','border-left': '1px solid #d7d7d7','border-right': '1px solid #d7d7d7','border-bottom': '1px solid #d7d7d7','width' : $sticky.innerWidth() });
          //$sticky.next().css('float', 'right');
          $sticky.addClass('fixed_element_style');
        }
        if (jQuery(this).scrollTop() < 235 && position)
        {
          $sticky.css({'position': 'static', 'top': '0px', 'width' : '','z-index' : '','border-left' : '','border-right' : '','border-bottom' : '' });
          //$sticky.next().css('float', 'left');
          $sticky.removeClass('fixed_element_style');
        }
      });
        jQuery('.glossary-bg .av-tab-section-tab-title-container.avia-tab-title-padding-none a').on("click",function(){
      window.scroll({top: 235, behavior: "smooth"})
});
/*Hover show section*/
jQuery('.togglecontainer').each(function(index){
var toggleId = jQuery(this).attr('id');
jQuery("#"+toggleId+ ".custom-accordion .single_toggle p.toggler").mouseenter(function() {
      jQuery("#"+toggleId+ ".custom-accordion .single_toggle").removeClass('toggle-active');
      jQuery(this).parent().addClass('toggle-active');
      /*Start tab style*/
      jQuery("#"+toggleId+ ".single_toggle .toggler").removeClass('activeTitle');
      jQuery("#"+toggleId+ ".custom-accordion .toggle_wrap").removeClass('active_tc');
      jQuery("#"+toggleId+ ".custom-accordion .toggle_wrap").attr('style','');
      //
      jQuery(this).addClass('activeTitle');
      jQuery(this).next().addClass('active_tc');
      jQuery(this).next().attr('style','display:block');
      /*End*/
      var getClass = jQuery(this).attr('data-fake-id');
      jQuery("#"+toggleId+ " #slide-toggle-id ul li a").each(function(index){
      var getslide = jQuery(this).attr('href');
      if(getslide == getClass) {
        /*Get image height*/
        var imageH = Math.floor(jQuery(this).height()); 
        jQuery("#"+toggleId+ " .avia-slideshow-inner").attr('style', 'padding: 0px; transition: none 0s ease 0s; transform: translateZ(0px); height: '+imageH+'px;');
         jQuery(this).parent().attr('style','visibility: visible; opacity: 1; transition: opacity 1s ease 0s !important; transform: translate3d(0px, 0px, 0px); z-index: 4; left: 0px; top: 0px;');
      } else {
          jQuery(this).parent().attr('style','transition: none 0s ease 0s; transform: translate3d(-564px, 0px, 0px); visibility: hidden; z-index: 4; opacity: 0; left: 0px; top: 0px;');
      }
});
}).mouseleave(function() {
      
});
});
//shadow when toggle
jQuery('.custom-accordion p.toggler.activeTitle').parent().addClass('toggle-active');
jQuery("input.wpcf7-form-control, textarea.wpcf7-form-control").attr("autocomplete", "negative");
});
function loadMoreEbook(params){
   jQuery('#loadMoreEbook').html('Loading...').addClass('disabled');
   jQuery.ajax({
      url: post_ajax_object.ajaxurl,
      type: 'post',
      data: {
         paramData: params,
         action: 'load_more_ebook'

      },
      error: function(response) {
         
      },
      success: function(response) {
         //check
         ajaxloadmore.reset();
         jQuery('#row-recent-regular-ebooks').html(response);
            // jQuery('.loadmore-overlay').hide(); 

         }
   });  
}
function webinarAjaxFilter(params){
   jQuery('.loadmore-overlay').show();
   var page = parseInt(jQuery('#loadMoreWebinar').attr('data-page'));
   var newPage = parseInt(page + 1);
   var max = jQuery('#loadMoreWebinar').attr('max');
   var taxonomy = jQuery('#loadMoreWebinar').attr('filter-taxonomy');
   var taxonomyName = jQuery('#loadMoreWebinar').attr('filter-taxonomy-name');
   jQuery.ajax({
      url: post_ajax_object.ajaxurl,
      type: 'post',
      data: {
         paramData: params,
         action: 'load_more_webinars'

      },
      error: function(response) {
         
      },
      success: function(response) {
         ajaxloadmore.reset();
             jQuery('#ajaxWebinar-load').html(response);
            jQuery('.loadmore-overlay').hide(); 
      }
   });
}

jQuery('img').removeAttr('title');
jQuery ( document ).ready ( function($) {

var hash= window.location.hash

if ( hash == '' || hash == '#' || hash == undefined ) return false;

	    
      var target = jQuery(hash);
    
      headerHeight = 120;
      target = target.length ? target : 'dds';
      if (target.length) {
        jQuery('html,body').stop().animate({
          scrollTop: target.offset().top - 125 //offsets for fixed header
        }, 'linear');
        
      }

} );
jQuery(window).on('load',function(){
   var url = window.location.search;
    var hadID = jQuery(".webinar-nav");
   if(url.indexOf("tab") !== -1 && hadID.length){
      setTimeout(function() {
      jQuery('html, body').animate({
            scrollTop: jQuery(hadID).offset().top-100
      }, 1500,'linear');
      },500);
   }
});
(function($) {
var lp, rp, mItems, menu, sc, pos;
lp = $(".left-pointer");
rp = $(".right-pointer");
mItems = $(".menu-items");
lp.click(function(){
	sc = 150;
  pos = mItems.scrollLeft() - sc;
  mItems.animate({'scrollLeft': pos}, 'slow');
});
rp.click(function(){
  sc = 150;
  pos = mItems.scrollLeft() + sc;
  mItems.animate({'scrollLeft': pos}, 'slow');
});
var scrollLeftPrev = 0; 
mItems.scroll(function(){
  var newScrollLeft = mItems.scrollLeft(),width=mItems.width(),
            scrollWidth=mItems.get(0).scrollWidth;
  var offset=8;
  if (scrollWidth - newScrollLeft - width < offset) {
    $(".right-pointer").addClass("dis");
    $(".right-pointer").parent().parent().removeClass('add-right-pointer');
  }else{
    $(".right-pointer").removeClass("dis");
    $(".right-pointer").parent().parent().addClass('add-right-pointer');
  }
  if( $(this).scrollLeft() == 0){
    $(".left-pointer").addClass("dis");
    $(".right-pointer").parent().parent().removeClass('add-left-pointer');
  }else{
    $(".left-pointer").removeClass("dis");
    $(".right-pointer").parent().parent().addClass('add-left-pointer');
  }
  scrollLeftPrev = newScrollLeft;
}); 
	jQuery('.blog-banner-inner-col-right li').on('click',function(e){
		jQuery(this).addClass('blog-tab-active').siblings().removeClass('blog-tab-active');
      var currentTab = jQuery(this).attr('tab');
      jQuery('#'+currentTab).show().siblings().hide();
      jQuery('#'+currentTab+ ' .menu-items a:first').click();
	});
    jQuery(window).scroll(function(event) {
        var lastScrollTop = 200;
        var stblog = jQuery(this).scrollTop();
        if (stblog > lastScrollTop) {
            jQuery('.blog-banner').addClass('sticky-blog-banner');
            resizeLinksfoBlog();
        }
        if (stblog <= 0) {
            jQuery('.blog-banner').removeClass('sticky-blog-banner');
            jQuery('.blog-banner').removeAttr('style');

        }
    });
 jQuery(window).on("resize", resizeLinksfoBlog);
  resizeLinksfoBlog();
  function resizeLinksfoBlog(){
        jQuery('.sticky-blog-banner').css({
            width: jQuery('#header_main').outerWidth(),
            left: "0px"
        });
  }
})(jQuery);
