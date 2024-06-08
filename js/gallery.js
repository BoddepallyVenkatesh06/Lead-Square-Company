(function($)
{
	'use strict';

	// -------------------------------------------------------------------------------------------
	// Gallery shortcode javascript
	// -------------------------------------------------------------------------------------------

	$.fn.avia_sc_gallery = function(options)
	{
		return this.each(function()
		{
			var gallery = $(this),
				images = gallery.find('img'),
				big_prev = gallery.find('.avia-gallery-big');


			//trigger displaying of thumbnails
			gallery.on( 'avia_start_animation', function()
			{
				images.each(function(i)
				{
					var image = $(this);
					setTimeout( function(){ image.addClass('avia_start_animation') }, (i * 110) );
				});
			});

			if( gallery.hasClass('deactivate_avia_lazyload') )
			{
				gallery.trigger('avia_start_animation');
			}

			//trigger thumbnail hover and big prev image change
			if( big_prev.length )
			{
				gallery.on( 'mouseenter','.avia-gallery-thumb a', function()
				{
					var _self = $(this),
						newImgSrc = _self.attr('data-prev-img'),
						oldImg = big_prev.find('img'),
						oldImgSrc = oldImg.attr('src');

					if( newImgSrc == oldImgSrc )
					{
						return;
					}

					big_prev.height( big_prev.height() );

					big_prev.attr('data-onclick', _self.attr('data-onclick'));
					big_prev.attr('href', _self.attr('href'));
					big_prev.attr('title', _self.attr('title'));

					//	copy lightbox attributes
					if( 'undefined' == typeof _self.data('srcset') )
					{
						big_prev.removeAttr('data-srcset');
						big_prev.removeData('srcset');
					}
					else
					{
						big_prev.data('srcset', _self.data('srcset'));
						big_prev.attr('data-srcset', _self.data('srcset'));
					}

					if( 'undefined' == typeof _self.data('sizes') )
					{
						big_prev.removeAttr('data-sizes');
						big_prev.removeData('sizes');
					}
					else
					{
						big_prev.data('sizes', _self.data('sizes'));
						big_prev.attr('data-sizes', _self.data('sizes'));
					}

					//	since 4.8.8.2 we have a hidden img to support scrset and sizes - fallback to old version if missing
					var newPrev = _self.find( '.big-prev-fake img' ).clone( true );
					if( newPrev.length == 0 )
					{
						var next_img = new Image();
						next_img.src = newImgSrc;
						newPrev = $(next_img);
					}

					if( big_prev.hasClass( 'avia-gallery-big-no-crop-thumb' ) )
					{
						newPrev.css( {'height':big_prev.height(),'width':'auto'} );
					}

					big_prev.stop().animate( {opacity:0}, function()
					{
						newPrev.insertAfter( oldImg );
						oldImg.remove();
						big_prev.animate( {opacity:1} );
					});

				});

				big_prev.on( 'click', function()
				{
					var imagelink = gallery.find('.avia-gallery-thumb a').eq( this.getAttribute('data-onclick') - 1 );

					if( imagelink && ! imagelink.hasClass('aviaopeninbrowser') )
					{
						imagelink.trigger('click');
					}
					else if( imagelink )
					{
						var imgurl = imagelink.attr('href');
						var secure = imagelink.hasClass( 'custom_link' ) ? 'noopener,noreferrer' : '';

						if( imagelink.hasClass('aviablank') && imgurl != '' )
						{
							window.open( imgurl, '_blank', secure );
						}
						else if( imgurl != '' )
						{
							window.open( imgurl, '_self', secure );
						}
					}
					return false;
				});


				$(window).on( 'debouncedresize', function()
				{
				  	big_prev.height('auto');
				});
			}
		});
	};

}(jQuery));
