jQuery(document).ready(function () {
/*Name validation*/
jQuery( "input[name='leadsquared-FirstName']" )
  .mouseout(function() {
      var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your name.'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqNameValidation, message);
  })
  .focusout(function() {
    var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your name.'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqNameValidation, message);
  });
jQuery( "input[name='leadsquared-LastName']" )
  .mouseout(function() {
      var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your last name'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqNameValidation, message);
  })
  .focusout(function() {
    var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your last name'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqNameValidation, message);
  });
/*Email validation*/
jQuery( "input[name='leadsquared-EmailAddress']" )
  .mouseout(function() {
      var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your work email'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqEmailValidation, message);
  })
  .focusout(function() {
    var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your work email'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqEmailValidation, message);
  });
  /*Phone validation*/
jQuery( "input[name='leadsquared-Phone']" )
  .mouseout(function() {
      var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter a valid phone number.'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqPhoneValidation, message);
  })
  .focusout(function() {
    var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter a valid phone number.'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqPhoneValidation, message);
  });
  /*Phone validation*/
jQuery( "input[name='leadsquared-Company']" )
  .mouseout(function() {
    var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your company name'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqCompanyValidation, message); 
  })
  .focusout(function() {
        var fieldValue = jQuery(this).val();
      var fieldName = jQuery(this).attr('name');
      var message = 'Please enter your company name'
      var fieldsValidatorvar = fieldsValidator(fieldValue, fieldName, lsqCompanyValidation, message); 
  });
jQuery(".wpcf7-form").submit(function () {
    jQuery('.ppc-validation-hide').remove();
});
});
function fieldsValidator(fieldValue, fieldName, ValidationMethod, message){
      if(fieldValue == ''){
        return;
      }
      var test = ValidationMethod(fieldValue);
      if(!test == true){
        jQuery('.ppc-'+fieldName+'').remove();
        jQuery('span[data-name="'+fieldName+'"] span.wpcf7-not-valid-tip').remove();
        jQuery( 'span[data-name="'+fieldName+'"]' ).after('<span class="wpcf7-not-valid-tip ppc-validation-hide ppc-'+fieldName+'">'+message+'</span>');
      }else{
        jQuery('.ppc-'+fieldName+'').remove();
        jQuery('span[data-name="'+fieldName+'"] span.wpcf7-not-valid-tip').remove();
      }
}
function lsqEmailValidation(email){
  var filterEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,}|[0-9]{1,})(\]?)$/;
      			if (filterEmail.test(email)) {  
      				var allowedDomains = ['2mailnext', 'getnada', 'Leadsquared', 'fiib.edu.in', 'fiib', 'fiib.edu', 'gmail', 'mailinator', 'yopmail', 'googlemail', 'yopmail.com', 'mailexpire', 'yahoo', 'yahoo.com', 'hotmail', 'outlook', 'gmail.com','mailed', 'mailinator', 'trash2009', 'mailexpire',' maileater', 'jetable', 'onlatedotcom', 'guerrillamailblock', 'spamhole', 'uggsrock', 'tempemail', 'smapfree24', 'smapfree24.de', 'smapfree24.info', 'smapfree24.com', 'smapfree24.eu', 'spamspot', 'spam', 'meltmail', 'anonymbox', 'dodgit', 'e4ward', 'gishpuppy', 'haltospam', 'mailnull', 'mintemail', 'sneakemailom', 'rediffmail', 'yahoo.co.in', 'yahoo.co.uk'];
         			var domain = email.split("@")[1].toLowerCase();
         			var ddd = domain.split(".")[0];
         			if (jQuery.inArray(ddd, allowedDomains) !== -1) {
         				return false;
         			}else{
         				return true;
         			}
         			return false;
      			}else{
              return false;
            }
}
function lsqNameValidation(name){
  var filtername = /^[a-zA-Z ]*$/;
      			if (filtername.test(name)) {  
         			return true;
      			}else{
              return false;
            }
}
function lsqPhoneValidation(phone){
  var filterPhone = /^[ 0-9+-]*$/;
      			if (filterPhone.test(phone)) {  
         			return true;
      			}else{
              return false;
            }
}
function lsqCompanyValidation(company){
  var filtercompany = /^[ a-zA-Z0-9'’.\-\_()!#]*$/;
      			if (filtercompany.test(company)) {  
         			return true;
      			}else{
              return false;
            }
}