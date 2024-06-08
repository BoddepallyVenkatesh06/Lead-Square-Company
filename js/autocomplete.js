 jQuery(document).ready(function(){  
      jQuery('#app-search').keyup(function(e){ 
		  var query = jQuery(this).val(); 
		  	if(e.which !== 13){
				pc_auto_filter(query);
			}
      });  
      jQuery(document).on('click', 'li', function(){  
           jQuery('#countryList').fadeOut();  
      });
	jQuery(document).on('click', '.active-data', function(){ 
		jQuery('.lsq-top-filter').show(); 
		jQuery(this).removeClass('active-data').addClass('active-data-search');
		 jQuery('#countryList').html(''); 
			jQuery('#app-search').val('');
			jQuery('#pc-searchform').trigger('submit');
			 var filterCheckboxes = jQuery('input[type="checkbox"]');
			  filterCheckboxes.filter(":checked").each(function() {
				  jQuery(this).prop('checked', false);
			  });
      });  
	jQuery('#pc-searchform').submit(function(e) {
			e.preventDefault();
			 jQuery("#spinner-div").show();
			 var query = jQuery('#app-search').val();
			 var filterCheckboxes = jQuery('input[type="checkbox"]');
			  filterCheckboxes.filter(":checked").each(function() {
				  jQuery(this).prop('checked', false);
			  });
			    jQuery.ajax({
				method: "POST",  
				url: pc_appsautocompletesearch.ajax_url,
				data: {
                    formsearch: query,
					action: 'pc_filter_apps_combine',
				},
				success: function(data) {
					jQuery('.pc-right').html(data);
				},
				complete: function () {
                     var el = document.querySelector('.ajax-load-more-wrap'); 
                    ajaxloadmore.start(el);
                    setTimeout(function(){
					    jQuery("#spinner-div").hide();
						jQuery('#countryList').hide();
                    }, 600);//Request is complete so hide spinner
				}
				
			});
}); 
 });
 function pc_auto_filter(query){
           if(query.length >= 3)  
           { 
			jQuery.ajax({
				// dataType: 'json',
				method: "POST",  
				url: pc_appsautocompletesearch.ajax_url,
				data: {
					term: query,
					action: 'pc_appsautocompletesearch',
				},
				success: function(data) {
					jQuery('#searchsubmit').addClass('active-data');
					jQuery('#countryList').fadeIn();  
                    jQuery('#countryList').html(data); 
				},
				
			}); 
           }else{
			   jQuery('#countryList').html(''); 
			   jQuery('#searchsubmit').removeClass('active-data');
		   } 
 }