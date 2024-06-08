/**
 * Support for footer behaviour
 * ============================
 *
 *	- Curtain effect
 *
 * @since 4.8.6.3
 */
(function($)
{
	"use strict";

	var win = null,
		body = null,
		placeholder = null,
		footer = null,
		max_height = null;

	$( function()
	{
		win = $(window);
		body = $('body');

		if( body.hasClass( 'av-curtain-footer' ) )
		{
			aviaFooterCurtain();
			return;
		}

		return;
	});


	function aviaFooterCurtain()
	{
		footer = body.find( '.av-curtain-footer-container' );

		//	remove classes
		if( footer.length == 0 )
		{
			body.removeClass( 'av-curtain-footer av-curtain-activated av-curtain-numeric av-curtain-screen' );
			return;
		}

		placeholder = $( '<div id="av-curtain-footer-placeholder"></div>' );
		footer.before( placeholder );

		if( body.hasClass( 'av-curtain-numeric' ) )
		{
			max_height = footer.data( 'footer_max_height' );
			if( 'undefined' == typeof max_height )
			{
				max_height = 70;
			}
			else
			{
				max_height = parseInt( max_height, 10 );
				if( isNaN( max_height ) )
				{
					max_height = 70;
				}
			}
		}

		aviaCurtainEffects();

		win.on( 'debouncedresize', aviaCurtainEffects );
	}

	function aviaCurtainEffects()
	{
		var height = Math.floor( footer.outerHeight() ),
			viewportHeight = win.innerHeight();

		//	screen width based
		if( null == max_height )
		{
			placeholder.css( { height: height + 'px' } );
		}
		else
		{
			var limit = Math.floor( viewportHeight * ( max_height / 100.0 ) );
			if( height > limit )
			{
				body.removeClass( 'av-curtain-activated' );
				placeholder.css( { height: '' } );
			}
			else
			{
				body.addClass( 'av-curtain-activated' );
				placeholder.css( { height: height + 'px' } );
			}
		}

	}

})(jQuery);
