jQuery(document).ready(function() {
    jQuery(window).on('load',function(){
        var url = window.location.search;
        var hadID = jQuery("#prag-filter-tab");
        if(url.indexOf("tab") !== -1 && hadID.length){
            setTimeout(function() {
            jQuery('html, body').animate({
                scrollTop: jQuery(hadID).offset().top-100
           }, 1500,'linear');
            },500);
        }
    });
    jQuery('.filter-taxonomy').on('click',function(){
        jQuery(this).addClass('active').siblings().removeClass('active');
        var selAttr = jQuery(this).attr('taxonomy-name');
        var taxonomylist = jQuery(this).attr('taxonomylist');
        var pageid = jQuery(this).attr('page-id');
        var search = jQuery('#pragpost-search').val();
        var currentUrl = jQuery(this).attr('currentUrl');
        jQuery('#tab-'+selAttr).addClass('active').siblings().removeClass('active');
        window.history.pushState("Details", "Title", currentUrl);
        var queries = {};
        jQuery.each(document.location.search.substr(1).split('&'),function(c,q){
            var i = q.split('=');
            queries[i[0].toString()] = i[1].toString();
        });
            jQuery.ajax({
                url: pragma_ajax_object.ajaxurl,
                type: 'post',
                data: {
                    taxonomy: queries,
                    taxonomylist: taxonomylist,
                    search: search,
                    pageid: pageid,
                    action: 'casestudy_post_load'

                },
                error: function(response) {
                console.log(response);
                },
                success: function(response) {
                //check
                jQuery('#pragma_main_grid').html(response);
                var element = document.querySelector(".ajax-load-more-wrap"); // Ajax Load More div wrapper.
                ajaxloadmore.start(element);
                }
            });
    });
     jQuery(document).delegate(".taxonomylist li","click",function(){
        jQuery(this).addClass('active').siblings().removeClass('active');
         var hrefurl = jQuery(this).attr('hrefurl');
         window.history.pushState("Details", "Title", hrefurl);
        var selAttr = jQuery(this).attr('taxonomy-name');
        var taxonomy = jQuery(this).attr('taxonomy');
        var taxonomylist = jQuery(this).attr('taxonomylist');
         var pageid = jQuery('button.filter-taxonomy.active').attr('page-id');
         var search = jQuery('#pragpost-search').val();
                 var queries = {};
        jQuery.each(document.location.search.substr(1).split('&'),function(c,q){
            var i = q.split('=');
            queries[i[0].toString()] = i[1].toString();
        });
            jQuery.ajax({
                url: pragma_ajax_object.ajaxurl,
                type: 'post',
                data: {
                    taxonomy: queries,
                    taxonomylist: taxonomylist,
                    search: search,
                    pageid: pageid,
                    type:'subdata',
                    action: 'casestudy_post_load'

                },
                error: function(response) {
                console.log(response);
                },
                success: function(response) {
                //check
                jQuery('#pragma_main_grid').html(response);
                var element = document.querySelector(".ajax-load-more-wrap"); // Ajax Load More div wrapper.
                ajaxloadmore.start(element);
                }
            });
    });
    // jQuery('li.filter-taxonomy-list-l a, .filter-taxonomy').on('click',function(){
    //     var qurvar = jQuery(this).attr('taxonomylist');
    //     var meta = jQuery(this).attr('metaparams');
    //     var search = jQuery('#pragpost-search').val();
    //     postData(qurvar, meta, search);
    // });

    jQuery(document).delegate(".loadPragPost","click",function(){
        var qurvar = jQuery(this).attr('taxonomylist');
        var meta = jQuery(this).attr('metaparams');
        var datapage = jQuery(this).attr('data-page');
        var max = jQuery(this).attr('max');
        var search = jQuery('#pragpost-search').val();
        postDataLoad(qurvar, meta, datapage, max, search);
    });
    jQuery("#pragfilter-form").submit(function(e) {
        e.preventDefault();
        jQuery('li.filter-taxonomy-list-l.active').trigger('click');
    });
   /*Move Left to Right*/
    jQuery(document).on('click', '.prag-arrow-left', function () {
    var sectionId = jQuery(this).attr('section-id');
     var navwidth = jQuery("#"+sectionId);
     navwidth.scrollLeft(navwidth.scrollLeft() - 200);
 });
 jQuery(document).on('click', '.prag-arrow-right', function () {
    var sectionId = jQuery(this).attr('section-id');
     var navwidth = jQuery("#"+sectionId);
     navwidth.scrollLeft(navwidth.scrollLeft() + 200);
 }); 
});
function postData(params, meta, search){
    jQuery('.prag-overlay').addClass('prag-overlay-show');
    jQuery.ajax({
        url: pragma_ajax_object.ajaxurl,
        type: 'post',
        data: {
            param: JSON.parse(params),
            parammeta: meta,
            search: search,
            action: 'ajax_prag_post_load'

        },
        error: function(response) {
           console.log(response);
        },
        success: function(response) {
           //check
           jQuery('#post-id-25976').html(response);
           jQuery('.prag-overlay').removeClass('prag-overlay-show');
        }
    });
}
function postDataLoad(params, meta, datapage, max, search){
    jQuery('.prag-overlay').addClass('prag-overlay-show');
    var page = parseInt(jQuery('#loadPragPost').attr('data-page'));
    var newPage = parseInt(page + 1);
    jQuery.ajax({
        url: pragma_ajax_object.ajaxurl,
        type: 'post',
        data: {
            param: JSON.parse(params),
            parammeta: meta,
            max: max,
            datapage: datapage,
            search: search,
            action: 'ajax_prag_post_load_more'

        },
        error: function(response) {
           console.log(response);
        },
        success: function(response) {
           //check
           jQuery('.prag-overlay').removeClass('prag-overlay-show');
           if(newPage >= max){
            jQuery('#loadPragPost').hide();
         }
           parseInt(jQuery('#loadPragPost').attr('data-page', newPage));
           jQuery('#loadPragPost').before(response);
        }
    });
}